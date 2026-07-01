export const prerender = false;

import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';

function sessionToken(pwd: string) {
  return createHash('sha256').update(`ed-admin-session:${pwd}`).digest('hex');
}

function json(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json' } });
}

async function fetchPageText(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ED-Blog-Bot/1.0)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return '';
    const html = await res.text();
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s{2,}/g, ' ')
      .trim()
      .slice(0, 4000);
  } catch {
    return '';
  }
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const auth   = cookies.get('ed-admin');
  const stored = process.env.ADMIN_PASSWORD ?? '';
  if (!stored || auth?.value !== sessionToken(stored)) return json({ error: 'Non autorizzato' }, 401);

  let body: {
    topic?: string;
    keywords?: string;
    notes?: string;
    inspirationUrls?: string[];
    geoTarget?: boolean;
    tone?: string;
    category?: string;
  };
  try { body = await request.json(); } catch { return json({ error: 'Richiesta non valida' }, 400); }

  const { topic, keywords, notes, inspirationUrls, geoTarget, tone, category } = body ?? {};
  if (!topic) return json({ error: 'Indica almeno il topic dell\'articolo.' }, 400);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return json({ error: 'GROQ_API_KEY non configurata. Aggiungila nelle variabili Railway.' }, 500);

  // Fetch inspiration URL content server-side
  let inspirationContent = '';
  if (Array.isArray(inspirationUrls) && inspirationUrls.length > 0) {
    const texts = await Promise.all(
      inspirationUrls.slice(0, 3).map(u => {
        try { new URL(u); return fetchPageText(u); } catch { return Promise.resolve(''); }
      })
    );
    const combined = texts.filter(Boolean).join('\n\n---\n\n');
    if (combined.length > 50) {
      inspirationContent = `\n\nCONTENUTO DI ISPIRAZIONE (da analizzare per struttura e angolazioni, NON copiare):\n"""\n${combined.slice(0, 6000)}\n"""`;
    }
  }

  const geoContext = geoTarget
    ? 'Dove rilevante, aggiungi riferimenti geo-localizzati a Treviso, Vittorio Veneto, Veneto e PMI italiane per massimizzare la SEO locale. Integra naturalmente termini come "a Treviso", "nel Veneto", "per le PMI italiane" nei punti strategici dell\'articolo (non forzare se non pertinente al topic).'
    : '';

  const systemPrompt = `Sei il SEO Content Strategist senior di ED Digital Agency, agenzia digitale a Vittorio Veneto (Treviso, Italia).
Scrivi articoli blog che:
1. Posizionano su Google grazie a struttura semantica corretta (H2/H3 ben gerarchizzati, keyword nel titolo e primo paragrafo)
2. Portano valore reale al lettore PMI italiano — no fuffa, no jargon, esempi pratici
3. Hanno voce diretta, competente, di un esperto che condivide know-how reale
4. Sono ottimizzati per la SEO on-page senza sembrare "scritti per i motori"

FORMATO OUTPUT — solo HTML puro per il corpo dell'articolo (no <html>, no <head>, no <body>):
- Usa <h2> per le sezioni principali (3-5 sezioni)
- Usa <h3> per sottosezioni quando necessario
- Usa <p> per i paragrafi
- Usa <ul><li> o <ol><li> per le liste
- Usa <strong> per enfatizzare concetti chiave (non keyword stuffing)
- Usa <blockquote> per citazioni o highlight importanti
- NO <h1> nel contenuto (il titolo è fuori dall'articolo)
- Il contenuto deve essere 700-1200 parole

${geoContext}

Rispondi SOLO con JSON valido, zero testo fuori dal JSON.`;

  const userPrompt = `Scrivi un articolo blog SEO-ottimizzato con questi parametri:

TOPIC: "${topic}"
KEYWORD TARGET: "${keywords || topic}"
CATEGORIA: "${category || 'non specificata'}"
TONO: "${tone || 'professionale ma diretto, esperto di marketing digitale'}"
NOTE AGGIUNTIVE: "${notes || 'nessuna'}"${inspirationContent}

Genera un JSON con questa struttura esatta:
{
  "title": "Titolo SEO ottimizzato (max 65 caratteri, contiene la keyword principale)",
  "slug": "titolo-in-formato-slug-kebab-case",
  "excerpt": "Meta description SEO (130-155 caratteri, contiene la keyword, invoglia al click)",
  "keywords": "keyword1, keyword2, keyword3, keyword4, keyword5 (5-8 keyword rilevanti per SEO, separate da virgola)",
  "category": "Categoria suggerita tra: Social Media, Advertising, Web Design, E-Commerce, SEO, Brand Identity, AI & Automazioni, Foto & Video, News",
  "read_time": 5,
  "content": "<h2>Prima sezione...</h2><p>Testo...</p>..."
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
        temperature: 0.68,
        max_tokens: 3000,
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
      title:     String(parsed.title     ?? ''),
      slug:      String(parsed.slug      ?? '').toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-'),
      excerpt:   String(parsed.excerpt   ?? ''),
      keywords:  String(parsed.keywords  ?? keywords ?? ''),
      category:  String(parsed.category  ?? category ?? ''),
      read_time: parseInt(String(parsed.read_time ?? 5)) || 5,
      content:   String(parsed.content   ?? ''),
    });
  } catch (e) {
    console.error('Generate blog error:', e);
    return json({ error: 'Errore durante la generazione. Riprova.' }, 500);
  }
};
