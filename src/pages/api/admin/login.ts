export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  const data   = await request.formData();
  const pwd    = (data.get('password') as string) ?? '';
  const stored = process.env.ADMIN_PASSWORD ?? '';

  if (stored && pwd === stored) {
    cookies.set('ed-admin', stored, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return new Response(null, { status: 302, headers: { Location: '/admin' } });
  }

  return new Response(null, { status: 302, headers: { Location: '/admin/login?err=1' } });
};
