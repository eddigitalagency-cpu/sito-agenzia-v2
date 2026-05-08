export const prerender = false;

import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import { getPool, initDB } from '../../../lib/db';

function sessionToken(pwd: string) {
  return createHash('sha256').update(`ed-admin-session:${pwd}`).digest('hex');
}
function isAuth(cookies: Parameters<APIRoute>[0]['cookies']): boolean {
  const a = cookies.get('ed-admin');
  const s = process.env.ADMIN_PASSWORD ?? '';
  return !!(s && a?.value === sessionToken(s));
}

// PATCH: archive or unarchive a submission
export const PATCH: APIRoute = async ({ request, cookies }) => {
  if (!isAuth(cookies)) return json({ error: 'Non autorizzato' }, 401);

  let body: { id: number; archive: boolean };
  try { body = await request.json(); } catch { return json({ error: 'Richiesta non valida' }, 400); }

  const { id, archive } = body ?? {};
  if (!id) return json({ error: 'ID mancante' }, 400);

  await initDB();
  await getPool().query(
    archive
      ? 'UPDATE form_submissions SET archived_at = NOW() WHERE id = $1'
      : 'UPDATE form_submissions SET archived_at = NULL WHERE id = $1',
    [id],
  );
  return json({ ok: true });
};

// DELETE: permanently delete a submission
export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!isAuth(cookies)) return json({ error: 'Non autorizzato' }, 401);

  let body: { id: number };
  try { body = await request.json(); } catch { return json({ error: 'Richiesta non valida' }, 400); }

  const { id } = body ?? {};
  if (!id) return json({ error: 'ID mancante' }, 400);

  await initDB();
  await getPool().query('DELETE FROM form_submissions WHERE id = $1', [id]);
  return json({ ok: true });
};

function json(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json' } });
}
