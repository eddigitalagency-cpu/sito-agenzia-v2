export const prerender = false;

import type { APIRoute } from 'astro';
import { initDB, getPool } from '../../../lib/db';
import { createSession, verifyPassword } from '../../../lib/adminAuth';

// Brute-force protection: max 10 attempts per IP per 15 min
const _attempts = new Map<string, { count: number; resetAt: number }>();

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  const ip = clientAddress ?? 'unknown';
  const now = Date.now();
  const rec = _attempts.get(ip) ?? { count: 0, resetAt: now + 15 * 60 * 1000 };
  if (now > rec.resetAt) { rec.count = 0; rec.resetAt = now + 15 * 60 * 1000; }

  if (rec.count >= 10) {
    return new Response(null, { status: 302, headers: { Location: '/admin/login?err=2' } });
  }

  const data  = await request.formData();
  const email = String(data.get('email') ?? '').trim().toLowerCase();
  const pwd   = String(data.get('password') ?? '');

  await initDB();

  let token: string | null = null;

  if (!email) {
    // Owner login — same single password as before.
    const stored = process.env.ADMIN_PASSWORD ?? '';
    if (stored && pwd === stored) {
      token = await createSession(null, true);
    }
  } else {
    // Collaborator login — email + password against admin_users.
    const res = await getPool().query<{ id: number; password_hash: string; active: boolean }>(
      'SELECT id, password_hash, active FROM admin_users WHERE email=$1', [email],
    );
    const u = res.rows[0];
    if (u && u.active && verifyPassword(pwd, u.password_hash)) {
      token = await createSession(u.id, false);
    }
  }

  if (token) {
    rec.count = 0;
    _attempts.set(ip, rec);
    cookies.set('ed-admin', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return new Response(null, { status: 302, headers: { Location: '/admin' } });
  }

  rec.count++;
  _attempts.set(ip, rec);
  return new Response(null, { status: 302, headers: { Location: '/admin/login?err=1' } });
};
