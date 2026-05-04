import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { getPool, initDB } from '../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Richiesta non valida.' }, 400);
  }

  const { name, email, phone, company, service, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return json({ error: 'Nome, email e messaggio sono obbligatori.' }, 400);
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    return json({ error: 'Inserisci un indirizzo email valido.' }, 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY non configurata');
    return json({ error: 'Configurazione email mancante.' }, 500);
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px">
      <div style="background:#FF6A00;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:#000;font-size:22px;margin:0">Nuovo messaggio dal sito</h1>
      </div>
      <div style="background:#141414;padding:32px;border-radius:0 0 12px 12px;color:#fff">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;width:140px">Nome</td>
              <td style="padding:10px 0;border-bottom:1px solid #333;font-weight:600">${esc(name)}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #333"><a href="mailto:${esc(email)}" style="color:#FF6A00">${esc(email)}</a></td></tr>
          ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999">Telefono</td>
              <td style="padding:10px 0;border-bottom:1px solid #333">${esc(phone)}</td></tr>` : ''}
          ${company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999">Azienda</td>
              <td style="padding:10px 0;border-bottom:1px solid #333">${esc(company)}</td></tr>` : ''}
          ${service ? `<tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999">Servizio</td>
              <td style="padding:10px 0;border-bottom:1px solid #333;color:#FF6A00;font-weight:600">${esc(service)}</td></tr>` : ''}
        </table>
        <div style="margin-top:24px">
          <p style="color:#999;margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.08em">Messaggio</p>
          <p style="margin:0;line-height:1.7;color:#e5e5e5">${esc(message).replace(/\n/g, '<br>')}</p>
        </div>
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #333;color:#555;font-size:12px">
          Inviato da eddigitalagency.it
        </div>
      </div>
    </div>
  `;

  // Save to DB (non-blocking — never fail the request over this)
  initDB()
    .then(() => getPool().query(
      'INSERT INTO form_submissions (name,email,phone,company,service,message) VALUES ($1,$2,$3,$4,$5,$6)',
      [name, email, phone ?? null, company ?? null, service ?? null, message],
    ))
    .catch(err => console.error('DB save error:', err));

  try {
    await resend.emails.send({
      from:     'ED Digital Agency <onboarding@resend.dev>',
      to:       'info@eddigitalagency.it',
      replyTo:  email,
      subject:  `✉️ ${name} — ${service || 'Contatto dal sito'}`,
      html,
    });

    return json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return json({ error: "Errore durante l'invio. Riprova o scrivici direttamente." }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
