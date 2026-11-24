export const prerender = false;

import type { APIRoute } from 'astro';
import { getPool, initDB } from '../../../lib/db';
import { hasAnyPermission } from '../../../lib/adminAuth';
import { sniffImageType } from '../../../lib/imageType';

export const POST: APIRoute = async ({ request, locals }) => {
  if (!hasAnyPermission(locals.adminUser, ['blog', 'progetti', 'partners'])) return json({ error: 'Non autorizzato' }, 401);

  let form: FormData;
  try { form = await request.formData(); } catch { return json({ error: 'Form non valida' }, 400); }

  const file = form.get('file') as File | null;
  if (!file || file.size === 0) return json({ error: 'Nessun file selezionato' }, 400);
  if (file.size > 8 * 1024 * 1024) return json({ error: 'File troppo grande (max 8 MB)' }, 400);

  const buffer = Buffer.from(await file.arrayBuffer());
  // Il tipo dichiarato dal browser non è affidabile: si decide dai byte del file (magic number).
  const mimeType = sniffImageType(buffer);
  if (!mimeType) return json({ error: 'Formato non supportato. Usa JPG, PNG, WebP, GIF o AVIF.' }, 400);
  const safeName = file.name.replace(/[^\w.\- ]+/g, '_').slice(0, 120);
  await initDB();
  const res = await getPool().query<{ id: number }>(
    'INSERT INTO uploaded_images (filename, mime_type, data) VALUES ($1,$2,$3) RETURNING id',
    [safeName, mimeType, buffer],
  );
  const id = res.rows[0].id;
  return json({ id, url: `/api/img/${id}` });
};

function json(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json' } });
}
