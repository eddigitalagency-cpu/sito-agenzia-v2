export const prerender = false;

import type { APIRoute } from 'astro';
import { getPool, initDB } from '../../../lib/db';
import { hasAnyPermission } from '../../../lib/adminAuth';

function isAuth(locals: App.Locals): boolean {
  return hasAnyPermission(locals.adminUser, ['richieste', 'email']);
}

// PATCH: archive or unarchive a submission
export const PATCH: APIRoute = async ({ request, locals }) => {
  if (!isAuth(locals)) return json({ error: 'Non autorizzato' }, 401);

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
export const DELETE: APIRoute = async ({ request, locals }) => {
  if (!isAuth(locals)) return json({ error: 'Non autorizzato' }, 401);

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
