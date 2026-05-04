export const prerender = false;

import type { APIRoute } from 'astro';
import { getPool, initDB } from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { path, referrer } = await request.json();
    const safePath = String(path ?? '/').slice(0, 500);
    const safeRef  = referrer ? String(referrer).slice(0, 500) : null;
    const safeUA   = (request.headers.get('user-agent') ?? '').slice(0, 300) || null;
    await initDB();
    await getPool().query(
      'INSERT INTO page_views (path, referrer, ua) VALUES ($1, $2, $3)',
      [safePath, safeRef, safeUA],
    );
  } catch {
    // silent — never break the page over analytics
  }
  return new Response(null, { status: 204 });
};
