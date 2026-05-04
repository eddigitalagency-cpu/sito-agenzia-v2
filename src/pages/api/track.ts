export const prerender = false;

import type { APIRoute } from 'astro';
import { getPool, initDB } from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { path, referrer } = await request.json();
    await initDB();
    await getPool().query(
      'INSERT INTO page_views (path, referrer, ua) VALUES ($1, $2, $3)',
      [path ?? '/', referrer || null, request.headers.get('user-agent') || null],
    );
  } catch {
    // silent — never break the page over analytics
  }
  return new Response(null, { status: 204 });
};
