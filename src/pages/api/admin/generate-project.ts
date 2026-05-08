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

  let body: { title?: string; service?: string; q1?: string; q2?: string; q3?: string };
  try { body = await request.json(); } catch { return json({ error: 'Richiesta non valida' }, 400); }

  const { title, service, q1, q2, q3 } = body ?? {};
  if (!title || !q1 || !q2) return json({ error: 'Compila tutti i campi richiesti.' }, 400);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return json({ error: 'GROQ_API_KEY non configurata. Aggiungila nelle variabili Railway.' }, 500);

  const systemPrompt = `Sei il Head of Copy di ED Digital Agency, agenzia digitale a Vittorio Veneto (Treviso, Italia).
Il tuo punto di forza è il copywriting persuasivo applicato al marketing digitale. Scrivi case study che convertono.

FRAMEWORK COPYWRITING CHE USI:
- Tagline: tecnica HOOK — deve bloccare il lettore in meno di 65 caratteri. Formula preferita: [Risultato inaspettato] o [Trasformazione specifica]. NO punti interrogativi, NO esclamativi, NO punto finale. Mai generico.
- Descrizione: struttura PAS/Storytelling — Problema (contesto del cliente) → Approccio (cosa avete fatto di specifico) → Soluzione e risultato (impatto concreto). Tono: prima persona plurale, diretto, concreto. NO jargon, NO superlativi vuoti come "innovativo" o "all'avanguardia".
- What (attività): specifiche e tecniche, non generiche. "Strategia editoriale su Instagram e TikTok" non "Gestione social". "Campagne Google Ads con target ROAS 4x" non "Advertising". Massimo 5 voci, minimo 4.
- Results: metriche credibili e contestualizzate. Un business locale in 3-6 mesi: +20/40% contatti è realistico, +500% non lo è. Usa valori percentuali, assoluti, temporali. NON inventare, stima in modo conservativo se non hai dati precisi.

REGOLE FERREE:
- MAI "siamo i migliori", "soluzione su misura", "approccio innovativo" — sono frasi morte
- MAI risultati gonfiati — la credibilità è il valore più alto del case study
- SEMPRE concreto: nomi di piattaforme reali, metriche vere, azioni specifiche
- Il tono si adatta al cliente (lusso = sobrio ed elegante, startup = dinamico e diretto, B2B = professionale e autorevole)
- Rispondi SOLO con JSON valido, zero testo aggiuntivo fuori dal JSON`;

  const userPrompt = `Crea i contenuti per il case study di ED Digital Agency:

PROGETTO: "${title}"
SERVIZIO PRINCIPALE: "${service || 'non specificato'}"
CLIENTE E SETTORE: "${q1}"
OBIETTIVI E RISULTATI OTTENUTI: "${q2}"
TONO DEL BRAND E TARGET: "${q3 || 'professionale, target PMI italiana'}"

Genera un JSON con questa struttura esatta (nessun campo opzionale):
{
  "tagline": "Hook breve e incisivo, max 65 caratteri, NO punto finale — es: 'Da locale sconosciuto a punto di riferimento del quartiere'",
  "description": "3-4 frasi in prima persona plurale. Prima frase = contesto/problema del cliente. Seconda = approccio specifico adottato. Terza = risultati concreti. Quarta (opzionale) = impatto a lungo termine o continuità del progetto. Max 520 caratteri totali.",
  "what": [
    "Attività specifica 1 — con piattaforma/strumento se rilevante",
    "Attività specifica 2",
    "Attività specifica 3",
    "Attività specifica 4",
    "Attività specifica 5 (opzionale)"
  ],
  "results": [
    {"value": "+XX%", "label": "Metrica specifica e contestualizzata"},
    {"value": "...",  "label": "..."},
    {"value": "...",  "label": "..."}
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
        temperature: 0.72,
        max_tokens: 1100,
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
      what:        Array.isArray(parsed.what)    ? parsed.what.map(String)  : [],
      results:     Array.isArray(parsed.results) ? parsed.results            : [],
    });
  } catch (e) {
    console.error('Generate project error:', e);
    return json({ error: 'Errore durante la generazione. Riprova.' }, 500);
  }
};

function json(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json' } });
}
