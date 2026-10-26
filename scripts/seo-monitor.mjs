#!/usr/bin/env node
// Controllo SEO/salute del sito — nessuna AI, nessuna dipendenza, zero token.
// Uso: node scripts/seo-monitor.mjs [baseUrl]
// Exit code 1 se c'è almeno un problema grave (utile per cron / avvisi).

const BASE = (process.argv[2] || 'https://eddigitalagency.it').replace(/\/$/, '');
const SLOW_MS = 2500;

const problems = [];
const warnings = [];
const fail = (m) => problems.push(m);
const warn = (m) => warnings.push(m);

async function get(path) {
  const url = path.startsWith('http') ? path : BASE + path;
  const t0 = Date.now();
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'ED-SEO-Monitor/1.0' } });
    const body = await res.text();
    return { url, status: res.status, body, ms: Date.now() - t0, headers: res.headers };
  } catch (e) {
    return { url, status: 0, body: '', ms: Date.now() - t0, error: e.message };
  }
}

// ── Pagine chiave ───────────────────────────────────────────
const PAGES = ['/', '/servizi', '/servizi/website', '/servizi/advertising', '/contatti', '/blog', '/prodotti', '/en', '/de'];

for (const p of PAGES) {
  const r = await get(p);
  if (r.status !== 200) { fail(`${p}: HTTP ${r.status || 'errore'} ${r.error || ''}`); continue; }
  if (r.ms > SLOW_MS) warn(`${p}: lenta (${r.ms} ms)`);

  const html = r.body;
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] || '';

  if (!title) fail(`${p}: <title> mancante`);
  else if (title.length > 90) warn(`${p}: title lungo (${title.length} caratteri)`);
  if (!desc) fail(`${p}: meta description mancante`);
  else if (desc.length < 70 || desc.length > 330) warn(`${p}: description di ${desc.length} caratteri`);
  if (!canonical) fail(`${p}: canonical mancante`);
  else if (canonical.endsWith('/') && canonical !== BASE + '/') warn(`${p}: canonical con slash finale (${canonical})`);
  if (/noindex/i.test(robots)) fail(`${p}: NOINDEX attivo — la pagina sparirà da Google`);
  if (!/<h1[\s>]/.test(html)) warn(`${p}: nessun <h1>`);

  // JSON-LD valido e un solo FAQPage per pagina
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!blocks.length) fail(`${p}: nessun JSON-LD`);
  let faq = 0;
  for (const b of blocks) {
    try { faq += (JSON.stringify(JSON.parse(b)).match(/"@type":"FAQPage"/g) || []).length; }
    catch { fail(`${p}: JSON-LD non valido`); }
  }
  if (faq > 1) fail(`${p}: ${faq} FAQPage duplicati`);
}

// ── robots.txt ──────────────────────────────────────────────
const robots = await get('/robots.txt');
if (robots.status !== 200) fail(`robots.txt: HTTP ${robots.status}`);
else {
  if (/^User-agent:\s*\*\s*\n(?:.*\n)*?Disallow:\s*\/\s*$/m.test(robots.body)) fail('robots.txt: blocca tutto il sito (Disallow: /)');
  if (!/Sitemap:/i.test(robots.body)) fail('robots.txt: nessuna Sitemap dichiarata');
}

// ── Sitemap: valide e URL raggiungibili ─────────────────────
const sitemaps = ['/sitemap-index.xml', '/sitemap-0.xml', '/blog-sitemap.xml', '/progetti-sitemap.xml'];
const urls = new Set();
for (const s of sitemaps) {
  const r = await get(s);
  if (r.status !== 200) { fail(`${s}: HTTP ${r.status}`); continue; }
  if (!/<(urlset|sitemapindex)/.test(r.body)) { fail(`${s}: XML non valido`); continue; }
  for (const m of r.body.matchAll(/<loc>([^<]+)<\/loc>/g)) if (s !== '/sitemap-index.xml') urls.add(m[1]);
}
if (!urls.size) fail('Sitemap: nessun URL trovato');

let broken = 0;
for (const u of urls) {
  const r = await get(u);
  if (r.status !== 200) { broken++; fail(`Sitemap → ${u}: HTTP ${r.status}`); }
  else if (/noindex/i.test(r.body.match(/<meta name="robots" content="([^"]*)"/)?.[1] || '')) warn(`Sitemap → ${u}: è noindex ma è in sitemap`);
}

// ── llms.txt (GEO) ──────────────────────────────────────────
const llms = await get('/llms.txt');
if (llms.status !== 200) fail(`llms.txt: HTTP ${llms.status}`);

// ── Report ──────────────────────────────────────────────────
const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16);
const lines = [`SEO monitor ${stamp} — ${BASE}`, `Pagine: ${PAGES.length} · URL in sitemap: ${urls.size} (rotti: ${broken})`];
if (!problems.length && !warnings.length) lines.push('✅ Tutto ok');
if (problems.length) lines.push(`\n❌ PROBLEMI (${problems.length})`, ...problems.map((p) => ` - ${p}`));
if (warnings.length) lines.push(`\n⚠️  AVVISI (${warnings.length})`, ...warnings.map((w) => ` - ${w}`));
console.log(lines.join('\n'));
process.exit(problems.length ? 1 : 0);
