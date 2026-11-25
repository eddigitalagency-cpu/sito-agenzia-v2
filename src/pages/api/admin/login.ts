export const prerender = false;

import type { APIRoute } from 'astro';
import { initDB, getPool } from '../../../lib/db';
import { createSession, verifyPassword, verifyOwnerPassword } from '../../../lib/adminAuth';
import { rateLimit, isLimited, getCount, resetLimit } from '../../../lib/rateLimit';

// Brute-force protection. The client IP can be spoofed through X-Forwarded-For, so besides
// the per-IP limit there is a per-account limit and a global failure counter. The global one
// never locks the owner out on its own: past SLOW_GLOBAL failures every attempt is slowed
// down heavily, and only an extreme flood (MAX_GLOBAL) is refused outright.
const WINDOW = 15 * 60 * 1000;
const MAX_PER_IP = 10;
const MAX_PER_EMAIL = 10;
const SLOW_GLOBAL = 60;
const MAX_GLOBAL = 600;

const redirect = (to: string) => new Response(null, { status: 302, headers: { Location: to } });
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// Under attack (many global failures) attempts are processed ONE AT A TIME, 2.5 s apart, so
// parallel requests can't multiply the guessing rate. The queue is bounded: beyond MAX_QUEUE
// waiting attempts new ones are refused, which keeps the server itself from being tied up.
const MAX_QUEUE = 8;
let queueTail: Promise<void> = Promise.resolve();
let queued = 0;
async function throttled<T>(fn: () => Promise<T>): Promise<T | null> {
  if (queued >= MAX_QUEUE) return null;
  queued++;
  const prev = queueTail;
  let release!: () => void;
  queueTail = new Promise<void>(r => (release = r));
  try {
    await prev;
    return await fn();
  } finally {
    await sleep(2500);
    queued--;
    release();
  }
}

const handle = async ({ request, cookies, clientAddress }: Parameters<APIRoute>[0]): Promise<Response> => {
  const ip = `login:ip:${clientAddress ?? 'unknown'}`;
  if (isLimited(ip, MAX_PER_IP) || isLimited('login:global', MAX_GLOBAL)) return redirect('/admin/login?err=2');

  let data: FormData;
  try { data = await request.formData(); } catch { return redirect('/admin/login?err=1'); }
  const email = String(data.get('email') ?? '').trim().toLowerCase().slice(0, 150);
  const pwd   = String(data.get('password') ?? '').slice(0, 256);

  const emailKey = `login:email:${email}`;
  if (email && isLimited(emailKey, MAX_PER_EMAIL)) return redirect('/admin/login?err=2');

  await initDB();

  let token: string | null = null;

  if (verifyOwnerPassword(pwd)) {
    // Owner password always wins, no matter what ended up in the email field
    // (e.g. browser autofill) — this must never lock the owner out.
    token = await createSession(null, true);
  } else if (email) {
    // Collaborator login — email + password against admin_users.
    const res = await getPool().query<{ id: number; password_hash: string; active: boolean }>(
      'SELECT id, password_hash, active FROM admin_users WHERE email=$1', [email],
    );
    const u = res.rows[0];
    // Always run a hash verification so response time doesn't reveal whether the account exists.
    const ok = verifyPassword(pwd, u?.password_hash ?? 'x:y');
    if (u && u.active && ok) token = await createSession(u.id, false);
  }

  if (token) {
    resetLimit(ip);
    if (email) resetLimit(emailKey);
    cookies.set('ed-admin', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return redirect('/admin');
  }

  rateLimit(ip, MAX_PER_IP, WINDOW);
  rateLimit('login:global', MAX_GLOBAL, WINDOW);
  if (email) rateLimit(emailKey, MAX_PER_EMAIL, WINDOW);
  await sleep(400); // slows automated guessing
  return redirect('/admin/login?err=1');
};

export const POST: APIRoute = async (ctx) => {
  if (getCount('login:global') >= SLOW_GLOBAL) {
    return (await throttled(() => handle(ctx))) ?? redirect('/admin/login?err=2');
  }
  return handle(ctx);
};
