export const prerender = false;

import type { APIRoute } from 'astro';
import { getPool, initDB } from '../../../lib/db';
import { sniffImageType } from '../../../lib/imageType';

export const GET: APIRoute = async ({ params }) => {
  const id = parseInt(params.id ?? '0');
  if (!id || id < 1) return new Response('Not found', { status: 404 });

  try {
    await initDB();
    const res = await getPool().query<{ data: Buffer }>(
      'SELECT data FROM uploaded_images WHERE id = $1', [id],
    );
    if (!res.rowCount) return new Response('Not found', { status: 404 });
    const { data } = res.rows[0];
    // Solo tipi raster noti: anche se in DB ci fosse un vecchio upload con tipo anomalo
    // (es. SVG), non viene mai servito come documento attivo.
    const type = sniffImageType(data) ?? 'application/octet-stream';
    return new Response(data, {
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Security-Policy': "default-src 'none'; sandbox",
        'Content-Disposition': 'inline',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new Response('Error', { status: 500 });
  }
};
