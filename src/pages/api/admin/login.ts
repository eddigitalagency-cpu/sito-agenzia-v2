export const prerender = false;

import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';

// Brute-force protection: max 10 attempts per IP per 15 min
const _attempts = new Map<string, { count: number; resetAt: number }>();

function sessionToken(pwd: string) {
  return createHash('sha256').update(`ed-admin-session:${pwd}`).digest('hex');
}

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  const ip = clientAddress ?? 'unknown';
  const now = Date.now();
  const rec = _attempts.get(ip) ?? { count: 0, resetAt: now + 15 * 60 * 1000 };
  if (now > rec.resetAt) { rec.count = 0; rec.resetAt = now + 15 * 60 * 1000; }

  if (rec.count >= 10) {
    return new Response(null, { status: 302, headers: { Location: '/admin/login?err=2' } });
  }

  const data   = await request.formData();
  const pwd    = (data.get('password') as string) ?? '';
  const stored = process.env.ADMIN_PASSWORD ?? '';

  if (stored && pwd === stored) {
    rec.count = 0;
    _attempts.set(ip, rec);
    cookies.set('ed-admin', sessionToken(stored), {
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
