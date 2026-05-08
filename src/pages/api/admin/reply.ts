export const prerender = false;

import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import { getPool, initDB } from '../../../lib/db';
import { Resend } from 'resend';

function sessionToken(pwd: string) {
  return createHash('sha256').update(`ed-admin-session:${pwd}`).digest('hex');
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const auth   = cookies.get('ed-admin');
  const stored = process.env.ADMIN_PASSWORD ?? '';
  if (!stored || auth?.value !== sessionToken(stored)) {
    return json({ error: 'Non autorizzato' }, 401);
  }

  let body: { id: number; replyText: string };
  try { body = await request.json(); } catch { return json({ error: 'Richiesta non valida' }, 400); }

  const { id, replyText } = body ?? {};
  if (!id || !replyText?.trim()) return json({ error: 'Dati mancanti' }, 400);

  const safeReply = replyText.trim().slice(0, 5000);

  await initDB();
  const db = getPool();

  const res = await db.query<{ name: string; email: string }>(
    'SELECT name, email FROM form_submissions WHERE id=$1', [id],
  );
  if (!res.rowCount) return json({ error: 'Richiesta non trovata' }, 404);

  const { name, email } = res.rows[0];

  const apiKey = process.env.RESEND_API_KEY ?? (import.meta.env.RESEND_API_KEY as string | undefined);
  if (!apiKey) return json({ error: 'Email non configurata' }, 500);

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px">
      <div style="background:#FF6A00;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:#000;font-size:22px;margin:0">ED Digital Agency</h1>
      </div>
      <div style="background:#141414;padding:32px;border-radius:0 0 12px 12px;color:#fff">
        <p style="margin:0 0 20px;color:#e5e5e5">Ciao ${esc(name)},</p>
        <div style="line-height:1.75;color:#e5e5e5;white-space:pre-wrap">${esc(safeReply)}</div>
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #333;color:#666;font-size:12px">
          ED Digital Agency — <a href="https://eddigitalagency.it" style="color:#FF6A00">eddigitalagency.it</a>
        </div>
      </div>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from:    'ED Digital Agency <onboarding@resend.dev>',
      to:      email,
      replyTo: 'enzo@eddigitalagency.it',
      subject: 'Risposta da ED Digital Agency',
      html,
    });
  } catch (err) {
    console.error('Resend reply error:', err);
    return json({ error: 'Errore invio email. Controlla Resend.' }, 500);
  }

  await db.query(
    'UPDATE form_submissions SET replied_at=NOW(), reply_text=$1 WHERE id=$2',
    [safeReply, id],
  );

  return json({ ok: true });
};

function json(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json' } });
}
function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
