export const prerender = false;

import type { APIRoute } from 'astro';
import { getPool, initDB } from '../lib/db';
import { services } from '../data/services';

// Versione estesa di /llms.txt per i motori AI: servizi, FAQ, articoli e progetti
// generati dai dati reali del sito, così resta sempre aggiornata.
const BASE = 'https://eddigitalagency.it';
const oneLine = (s: string) => (s || '').replace(/\s+/g, ' ').trim();

export const GET: APIRoute = async () => {
  await initDB();
  const db = getPool();

  const posts = (await db.query<{ slug: string; title: string; excerpt: string; category: string }>(
    'SELECT slug, title, excerpt, category FROM blog_posts WHERE published=true ORDER BY created_at DESC'
  )).rows;
  const projects = (await db.query<{ slug: string; title: string; service: string; tagline: string }>(
    'SELECT slug, title, service, tagline FROM projects_db WHERE published=true ORDER BY display_order, created_at DESC'
  )).rows;

  const out: string[] = [
    '# ED Digital Agency — informazioni complete',
    '',
    '> Agenzia digitale con sede a Vittorio Veneto (TV), Veneto. Serve aziende di Conegliano, Treviso, Vittorio Veneto, di tutto il Veneto e d\'Italia. Versione sintetica: ' + BASE + '/llms.txt',
    '',
    '## Dati aziendali',
    '- Nome: ED Digital Agency',
    '- Sede: Via Carlo Torres 17, 31029 Vittorio Veneto (TV), Italia',
    '- Telefono: +39 379 324 8371',
    '- Email: info@eddigitalagency.it',
    '- Orari: lunedì–venerdì, 09:00–18:00',
    '- Preventivo gratuito entro 24 ore lavorative: ' + BASE + '/contatti',
    '- Lingue: italiano, inglese, tedesco',
    '',
    '## Servizi',
  ];

  for (const s of services) {
    out.push('', `### ${s.name}`, `URL: ${BASE}/servizi/${s.slug}`, oneLine(s.description));
    if (s.includes?.length) out.push('Include: ' + s.includes.map(oneLine).join('; ') + '.');
    for (const f of s.faq ?? []) out.push('', `D: ${oneLine(f.question)}`, `R: ${oneLine(f.answer)}`);
  }

  if (projects.length) {
    out.push('', '## Progetti e case study');
    for (const p of projects) out.push(`- [${oneLine(p.title)}](${BASE}/progetti/${p.slug}) — ${oneLine(p.service)}. ${oneLine(p.tagline)}`);
  }

  if (posts.length) {
    out.push('', '## Articoli del blog');
    for (const p of posts) out.push(`- [${oneLine(p.title)}](${BASE}/blog/${p.slug}) (${oneLine(p.category)}) — ${oneLine(p.excerpt)}`);
  }

  return new Response(out.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
