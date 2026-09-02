export const prerender = false;

import type { APIRoute } from 'astro';
import { initDB } from '../../../lib/db';
import { destroySession } from '../../../lib/adminAuth';

export const POST: APIRoute = async ({ cookies }) => {
  const token = cookies.get('ed-admin')?.value;
  if (token) {
    try { await initDB(); await destroySession(token); } catch { /* still clear the cookie below */ }
  }
  cookies.delete('ed-admin', { path: '/' });
  cookies.delete('ed-admin-exp', { path: '/' }); // clean up the old expiry cookie, no longer used
  return new Response(null, { status: 302, headers: { Location: '/admin/login' } });
};
