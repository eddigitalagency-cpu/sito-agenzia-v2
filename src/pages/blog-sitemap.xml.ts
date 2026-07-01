export const prerender = false;

import type { APIRoute } from 'astro';
import { getPool, initDB } from '../lib/db';

export const GET: APIRoute = async () => {
  await initDB();
  const db = getPool();

  type Row = { slug: string; updated_at: string };
  const { rows } = await db.query<Row>(
    'SELECT slug, updated_at FROM blog_posts WHERE published=true ORDER BY updated_at DESC'
  );

  const base = 'https://eddigitalagency.it';

  const postUrls = rows.map(p => {
    const lastmod = new Date(p.updated_at || Date.now()).toISOString().split('T')[0];
    return `  <url>
    <loc>${base}/blog/${p.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${base}/blog</loc>
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
