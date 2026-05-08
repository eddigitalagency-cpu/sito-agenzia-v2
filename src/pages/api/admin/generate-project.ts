export const prerender = false;

import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';

function sessionToken(pwd: string) {
  return createHash('sha256').update(`ed-admin-session:${pwd}`).digest('hex');
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const auth   = cookies.get('ed-admin');
  const stored = process.env.ADMIN_PASSWORD ?? '';
  if (!stored || auth?.value !== sessionToken(stored)) return json({ error: 'Non autorizzato' }, 401);

  let body: { title?: string; service?: string; q1?: string; q2?: string };
  try { body = await request.json(); } catch { return json({ error: 'Richiesta non valida' }, 400); }

  const { title, service, q1, q2 } = body ?? {};
  if (!title || !q1 || !q2) return json({ error: 'Compila tutti i campi richiesti.' }, 400);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return json({ error: 'GROQ_API_KEY non configurata. Aggiungila nelle variabili Railway.' }, 500);

  const userPrompt = `Crea i contenuti per la pagina case study di ED Digital Agency:
- Progetto: "${title}"
- Servizio: "${service || 'non specificato'}"
- Info cliente e settore: "${q1}"
- Obiettivi e risultati: "${q2}"

Genera un JSON con questa struttura esatta:
{
  "tagline": "Frase breve e incisiva, max 65 caratteri, senza punto finale",
  "description": "3-5 frasi in prima persona plurale (Abbiamo...). Concreta, senza esagerazioni. Max 500 caratteri.",
  "what": ["voce specifica 1", "voce specifica 2", "voce specifica 3", "voce specifica 4", "voce specifica 5"],
  "results": [
    {"value": "+XX%", "label": "Metrica concreta"},
    {"value": "...", "label": "..."},
    {"value": "...", "label": "..."}
  ]
}`;

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `Sei il copywriter di ED Digital Agency, agenzia digitale a Vittorio Veneto (Treviso, Italia).
Scrivi contenuti per case study: tono professionale, diretto, concreto, in italiano.
I risultati devono essere plausibili e realistici — nessun numero gonfiato.
Rispondi SOLO con JSON valido, nessun testo aggiuntivo.`,
          },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.65,
        max_tokens: 900,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Groq error:', errText);
      return json({ error: `Errore Groq (${res.status}). Controlla la chiave API.` }, 502);
    }

    const groqData = await res.json();
    const content  = groqData.choices?.[0]?.message?.content ?? '';
    if (!content) return json({ error: 'Risposta Groq vuota.' }, 502);

    const parsed = JSON.parse(content);
    return json({
      tagline:     String(parsed.tagline     ?? ''),
      description: String(parsed.description ?? ''),
      what:        Array.isArray(parsed.what)     ? parsed.what.map(String)     : [],
      results:     Array.isArray(parsed.results)  ? parsed.results               : [],
    });
  } catch (e) {
    console.error('Generate project error:', e);
    return json({ error: 'Errore durante la generazione. Riprova.' }, 500);
  }
};

function json(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json' } });
}
