export const prerender = false;

import type { APIRoute } from 'astro';
import { getPool, initDB } from '../../../lib/db';

export const GET: APIRoute = async ({ params }) => {
  const id = parseInt(params.id ?? '0');
  if (!id || id < 1) return new Response('Not found', { status: 404 });

  try {
    await initDB();
    const res = await getPool().query<{ mime_type: string; data: Buffer }>(
      'SELECT mime_type, data FROM uploaded_images WHERE id = $1', [id],
    );
    if (!res.rowCount) return new Response('Not found', { status: 404 });
    const { mime_type, data } = res.rows[0];
    return new Response(data, {
      headers: {
        'Content-Type': mime_type,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Error', { status: 500 });
  }
};
