export const prerender = false;

import type { APIRoute } from 'astro';
import { getPool, initDB } from '../lib/db';

// Projects + products are rendered on demand (SSR), so the static sitemap
// integration can't see them — this endpoint lists them from the database.
const BASE = 'https://eddigitalagency.it';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const day = (d: string | Date | null) => new Date(d || Date.now()).toISOString().split('T')[0];

export const GET: APIRoute = async () => {
  await initDB();
  const db = getPool();

  const projects = (await db.query<{ slug: string; created_at: string; has_en: boolean; has_de: boolean }>(
    `SELECT slug, created_at,
            (tagline_en IS NOT NULL AND tagline_en != '') AS has_en,
            (tagline_de IS NOT NULL AND tagline_de != '') AS has_de
     FROM projects_db WHERE published=true ORDER BY display_order, created_at DESC`
  )).rows;
  const products = (await db.query<{ slug: string; updated_at: string }>(
    'SELECT slug, updated_at FROM products WHERE published=true ORDER BY display_order, created_at DESC'
  )).rows;

  const entry = (loc: string, lastmod: string, priority: string, alternates = '') => `  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>${alternates}
  </url>`;

  const projectUrls = projects.flatMap(p => {
    const lastmod = day(p.created_at);
    const versions = [{ hreflang: 'it', loc: `${BASE}/progetti/${p.slug}` }];
    if (p.has_en) versions.push({ hreflang: 'en', loc: `${BASE}/en/progetti/${p.slug}` });
    if (p.has_de) versions.push({ hreflang: 'de', loc: `${BASE}/de/progetti/${p.slug}` });
    const alternates = versions.length > 1
      ? versions.map(v => `\n    <xhtml:link rel="alternate" hreflang="${v.hreflang}" href="${esc(v.loc)}"/>`).join('')
        + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(versions[0].loc)}"/>`
      : '';
    return versions.map(v => entry(v.loc, lastmod, '0.6', alternates));
  });
  const productUrls = products.map(p => entry(`${BASE}/prodotti/${p.slug}`, day(p.updated_at), '0.6'));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entry(`${BASE}/prodotti`, day(null), '0.7')}
${[...projectUrls, ...productUrls].join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
