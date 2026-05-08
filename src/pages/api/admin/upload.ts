export const prerender = false;

import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import { getPool, initDB } from '../../../lib/db';

function sessionToken(pwd: string) {
  return createHash('sha256').update(`ed-admin-session:${pwd}`).digest('hex');
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const auth   = cookies.get('ed-admin');
  const stored = process.env.ADMIN_PASSWORD ?? '';
  if (!stored || auth?.value !== sessionToken(stored)) return json({ error: 'Non autorizzato' }, 401);

  let form: FormData;
  try { form = await request.formData(); } catch { return json({ error: 'Form non valida' }, 400); }

  const file = form.get('file') as File | null;
  if (!file || file.size === 0) return json({ error: 'Nessun file selezionato' }, 400);
  if (file.size > 8 * 1024 * 1024) return json({ error: 'File troppo grande (max 8 MB)' }, 400);

  const mimeType = file.type || 'image/jpeg';
  if (!mimeType.startsWith('image/')) return json({ error: 'Solo file immagine' }, 400);

  const buffer = Buffer.from(await file.arrayBuffer());
  await initDB();
  const res = await getPool().query<{ id: number }>(
    'INSERT INTO uploaded_images (filename, mime_type, data) VALUES ($1,$2,$3) RETURNING id',
    [file.name, mimeType, buffer],
  );
  const id = res.rows[0].id;
  return json({ id, url: `/api/img/${id}` });
};

function json(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json' } });
}
