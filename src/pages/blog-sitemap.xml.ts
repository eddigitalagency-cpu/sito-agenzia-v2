export const prerender = false;

import type { APIRoute } from 'astro';
import { getPool, initDB } from '../lib/db';

const BASE = 'https://eddigitalagency.it';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async () => {
  await initDB();
  const db = getPool();

  type Row = { slug: string; updated_at: string; has_en: boolean; has_de: boolean };
  const { rows } = await db.query<Row>(
    `SELECT slug, updated_at,
            (title_en IS NOT NULL AND title_en != '') AS has_en,
            (title_de IS NOT NULL AND title_de != '') AS has_de
     FROM blog_posts WHERE published=true ORDER BY updated_at DESC`
  );

  // Per-language URLs are listed only when a real translation exists (untranslated
  // EN/DE pages are noindex), with hreflang cross-links between the live versions.
  const postUrls = rows.map(p => {
    const lastmod = new Date(p.updated_at || Date.now()).toISOString().split('T')[0];
    const versions: { hreflang: string; loc: string }[] = [{ hreflang: 'it', loc: `${BASE}/blog/${p.slug}` }];
    if (p.has_en) versions.push({ hreflang: 'en', loc: `${BASE}/en/blog/${p.slug}` });
    if (p.has_de) versions.push({ hreflang: 'de', loc: `${BASE}/de/blog/${p.slug}` });
    const alternates = versions.length > 1
      ? versions.map(v => `\n    <xhtml:link rel="alternate" hreflang="${v.hreflang}" href="${esc(v.loc)}"/>`).join('')
        + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(versions[0].loc)}"/>`
      : '';
    return versions.map(v => `  <url>
    <loc>${esc(v.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>${alternates}
  </url>`).join('\n');
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${BASE}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${postUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
