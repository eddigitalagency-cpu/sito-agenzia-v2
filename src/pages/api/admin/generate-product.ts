export const prerender = false;

import type { APIRoute } from 'astro';
import { rateLimit } from '../../../lib/rateLimit';
import { hasPermission } from '../../../lib/adminAuth';

export const POST: APIRoute = async ({ request, locals, clientAddress }) => {
  if (!hasPermission(locals.adminUser, 'prodotti')) return json({ error: 'Non autorizzato' }, 401);
  if (!rateLimit(`ai:${clientAddress ?? 'unknown'}`, 20, 60 * 60 * 1000)) return json({ error: 'Troppe richieste. Riprova tra qualche minuto.' }, 429);

  let body: { name?: string; category?: string; q1?: string; q2?: string; q3?: string };
  try { body = await request.json(); } catch { return json({ error: 'Richiesta non valida' }, 400); }

  const { name, category, q1, q2, q3 } = body ?? {};
  if (!name || !q1 || !q2) return json({ error: 'Compila almeno nome, target e funzionalità.' }, 400);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return json({ error: 'GROQ_API_KEY non configurata. Aggiungila nelle variabili Railway.' }, 500);

  const systemPrompt = `Sei il Head of Copy di ED Digital Agency. Scrivi la presentazione di un software gestionale in abbonamento (SaaS) sviluppato dall'agenzia stessa e venduto ad aziende del settore indicato.

REGOLE:
- Tagline: hook breve e concreto, max 65 caratteri, NO punto finale, NO frasi vuote tipo "la soluzione definitiva".
- Descrizione: 3-4 frasi in prima persona plurale. Spiega il problema che risolve, per chi è pensato, e cosa lo rende pratico da usare ogni giorno. Tono diretto, concreto, mai gonfio. NO "innovativo", "rivoluzionario", "all'avanguardia".
- Funzionalità: specifiche e concrete, mai generiche ("gestione anagrafica clienti con storico contatti" non "CRM integrato"). Da 4 a 6 voci.
- Rispondi SOLO con JSON valido, zero testo fuori dal JSON.`;

  const userPrompt = `Presenta questo prodotto software:

NOME PRODOTTO: "${name}"
CATEGORIA / SETTORE TARGET: "${category || 'non specificato'}"
A CHI È RIVOLTO E CHE PROBLEMA RISOLVE: "${q1}"
FUNZIONALITÀ PRINCIPALI: "${q2}"
COSA LO DIFFERENZIA DALLA CONCORRENZA: "${q3 || 'non specificato'}"

Genera un JSON con questa struttura esatta:
{
  "tagline": "Hook breve, max 65 caratteri",
  "description": "3-4 frasi, max 500 caratteri totali",
  "features": [
    "Funzionalità specifica 1",
    "Funzionalità specifica 2",
    "Funzionalità specifica 3",
    "Funzionalità specifica 4",
    "Funzionalità specifica 5 (opzionale)",
    "Funzionalità specifica 6 (opzionale)"
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
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
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
      features:    Array.isArray(parsed.features) ? parsed.features.map(String) : [],
    });
  } catch (e) {
    console.error('Generate product error:', e);
    return json({ error: 'Errore durante la generazione. Riprova.' }, 500);
  }
};

function json(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json' } });
}
