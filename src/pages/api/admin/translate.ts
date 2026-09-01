export const prerender = false;

import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';

function sessionToken(pwd: string) {
  return createHash('sha256').update(`ed-admin-session:${pwd}`).digest('hex');
}

function json(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json' } });
}

const LANG_NAME: Record<string, string> = { en: 'English', de: 'German (formal "Sie" register — never "du", this is a B2B site)' };

export const POST: APIRoute = async ({ request, cookies }) => {
  const auth   = cookies.get('ed-admin');
  const stored = process.env.ADMIN_PASSWORD ?? '';
  if (!stored || auth?.value !== sessionToken(stored)) return json({ error: 'Non autorizzato' }, 401);

  let body: {
    type?: 'blog' | 'project';
    lang?: 'en' | 'de';
    title?: string; excerpt?: string; content?: string; keywords?: string;
    tagline?: string; description?: string; what?: string[]; results?: { value: string; label: string }[];
  };
  try { body = await request.json(); } catch { return json({ error: 'Richiesta non valida' }, 400); }

  const { type, lang } = body ?? {};
  if (type !== 'blog' && type !== 'project') return json({ error: 'Tipo non valido.' }, 400);
  if (lang !== 'en' && lang !== 'de') return json({ error: 'Lingua non valida.' }, 400);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return json({ error: 'GROQ_API_KEY non configurata. Aggiungila nelle variabili Railway.' }, 500);

  const targetLang = LANG_NAME[lang];

  const systemPrompt = `You are a professional translator for ED Digital Agency, an Italian digital agency based in Vittorio Veneto (Treviso), expanding into Austria. Translate the given Italian marketing/website content into natural, professional ${targetLang}, written as if originally composed by a native copywriter — never literal word-for-word machine translation.

Rules:
- Keep proper nouns, brand names, platform/technology names unchanged (Shopify, WordPress, Meta Ads, Google Ads, Next.js, React Native, WooCommerce, etc.)
- Keep numeric values, percentages and euro amounts unchanged
- Where the Italian text names a specific Italian city/province as the service area (Treviso, Vittorio Veneto, Veneto, Trevigiano), reframe it more broadly for an international/Austrian reader (e.g. "we work with clients in Italy, Austria and internationally, remotely") — do NOT invent a fake Austrian or foreign office address, the agency's only real office is in Italy
- If translating HTML content, preserve every HTML tag exactly (h2, h3, p, ul, li, strong, em, blockquote, a href, etc.) — translate only the text nodes, keep href targets unchanged
- Respond with ONLY valid JSON, matching exactly the requested schema, no extra text`;

  let userPrompt = '';
  if (type === 'blog') {
    const { title = '', excerpt = '', content = '', keywords = '' } = body;
    if (!title && !content) return json({ error: 'Nessun contenuto da tradurre.' }, 400);
    userPrompt = `Translate this Italian blog post into ${targetLang}.

TITLE: ${title}
EXCERPT: ${excerpt}
KEYWORDS (comma-separated): ${keywords}
CONTENT (HTML): ${content}

Respond with this exact JSON schema:
{
  "title": "translated title",
  "excerpt": "translated excerpt",
  "keywords": "5-8 realistic ${targetLang} SEO search phrases a reader would actually type, comma-separated — rewritten for the target market, not a literal translation of the Italian keywords",
  "content": "translated HTML content, same tag structure as the source"
}`;
  } else {
    const { tagline = '', description = '', what = [], results = [] } = body;
    if (!tagline && !description) return json({ error: 'Nessun contenuto da tradurre.' }, 400);
    userPrompt = `Translate this Italian project case study into ${targetLang}. Do not translate the numeric "value" fields in results (e.g. "+320%") — keep them exactly as given, translate only the "label".

TAGLINE: ${tagline}
DESCRIPTION: ${description}
WHAT WE DID (bullet list): ${JSON.stringify(what)}
RESULTS: ${JSON.stringify(results)}

Respond with this exact JSON schema:
{
  "tagline": "translated tagline",
  "description": "translated description",
  "what": ["translated bullet 1", "translated bullet 2", "..."],
  "results": [{"value": "unchanged value", "label": "translated label"}, ...]
}`;
  }

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
        temperature: 0.4,
        max_tokens: 4000,
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
    if (type === 'blog') {
      return json({
        title:    String(parsed.title    ?? ''),
        excerpt:  String(parsed.excerpt  ?? ''),
        keywords: String(parsed.keywords ?? ''),
        content:  String(parsed.content  ?? ''),
      });
    } else {
      return json({
        tagline:     String(parsed.tagline     ?? ''),
        description: String(parsed.description ?? ''),
        what:        Array.isArray(parsed.what)    ? parsed.what.map(String) : [],
        results:     Array.isArray(parsed.results) ? parsed.results          : [],
      });
    }
  } catch (e) {
    console.error('Translate error:', e);
    return json({ error: 'Errore durante la traduzione. Riprova.' }, 500);
  }
};
