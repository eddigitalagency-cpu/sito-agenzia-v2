import { defineMiddleware } from 'astro:middleware';
import { initDB } from './lib/db';
import { getSessionUser, hasPermission, type PermissionKey } from './lib/adminAuth';

// Section → permission required. Anything under /admin or /api/admin not
// listed here just needs a valid session (no extra permission check) — e.g.
// the dashboard overview itself, or /admin/seed-translations (owner tool,
// gated separately below).
const SECTION_PERMISSION: { prefix: string; key: PermissionKey }[] = [
  { prefix: '/admin/email', key: 'email' },
  { prefix: '/admin/blog', key: 'blog' },
  { prefix: '/admin/progetti', key: 'progetti' },
  { prefix: '/admin/prodotti', key: 'prodotti' },
  { prefix: '/admin/partners', key: 'partners' },
  { prefix: '/admin/sedi', key: 'sedi' },
];

export const onRequest = defineMiddleware(async (ctx, next) => {
  const path = ctx.url.pathname.replace(/\/$/, '') || '/';
  // /api/admin/login and /logout must stay reachable even with no/expired
  // session — otherwise nobody could ever log in or clear a stale session.
  const EXEMPT_API = ['/api/admin/login', '/api/admin/logout'];
  const isAdminApi  = path.startsWith('/api/admin/') && !EXEMPT_API.includes(path);
  const isAdminPage = path.startsWith('/admin') && path !== '/admin/login';
  const isAdminArea = path.startsWith('/admin') || path.startsWith('/api/admin');

  // CSRF defence in depth (Astro's own checkOrigin is off because of the reverse proxy):
  // a state-changing request to the admin area must come from our own site. Browsers always
  // send Origin on cross-site POSTs, so a forged form on another domain is rejected here.
  if (isAdminArea && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(ctx.request.method)) {
    const origin = ctx.request.headers.get('origin');
    if (origin) {
      let originHost = '';
      try { originHost = new URL(origin).host; } catch { /* malformed → rejected below */ }
      const own = new Set<string>([
        ctx.url.host,
        ctx.request.headers.get('host') ?? '',
        (ctx.request.headers.get('x-forwarded-host') ?? '').split(',')[0].trim(),
        'eddigitalagency.it',
        'www.eddigitalagency.it',
      ]);
      own.delete('');
      if (!originHost || !own.has(originHost)) {
        return new Response(JSON.stringify({ error: 'Origine non consentita' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  }

  if (isAdminApi || isAdminPage) {
    let user = null;
    try {
      await initDB();
      user = await getSessionUser(ctx.cookies.get('ed-admin')?.value);
    } catch {
      user = null;
    }

    if (!user) {
      if (isAdminApi) {
        return new Response(JSON.stringify({ error: 'Sessione scaduta' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return ctx.redirect('/admin/login');
    }

    // Owner-only tools
    if ((path === '/admin/impostazioni' || path.startsWith('/admin/impostazioni/') || path.startsWith('/api/admin/users')
      || path === '/admin/seed-translations') && !user.isOwner) {
      return isAdminApi
        ? new Response(JSON.stringify({ error: 'Non autorizzato' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
        : ctx.redirect('/admin');
    }

    // Section-level permission gate
    const section = SECTION_PERMISSION.find(s => path.startsWith(s.prefix) || path.startsWith(`/api${s.prefix}`));
    if (section && !hasPermission(user, section.key)) {
      return isAdminApi
        ? new Response(JSON.stringify({ error: 'Non autorizzato' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
        : ctx.redirect('/admin');
    }

    ctx.locals.adminUser = user;
  }

  const response = await next();
  const h = response.headers;

  // Security headers
  h.set('X-Frame-Options', 'DENY');
  h.set('X-Content-Type-Options', 'nosniff');
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  h.set('X-XSS-Protection', '0'); // legacy auditor is itself exploitable; CSP is the real protection
  h.set('Cross-Origin-Opener-Policy', 'same-origin');
  h.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  // Routes may set a stricter CSP of their own (e.g. /api/img): never loosen it.
  if (!h.has('Content-Security-Policy')) h.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  );

  // Admin pages and admin APIs: never cached by browsers/proxies, never indexed.
  if (isAdminArea) {
    h.set('Cache-Control', 'no-store');
    h.set('X-Robots-Tag', 'noindex, nofollow');
  }

  // Cache-Control for static assets
  const url = ctx.url.pathname;
  if (/\.(woff2|woff|ttf|otf)$/.test(url)) {
    h.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (/\.(js|css)$/.test(url) && /\.[a-zA-Z0-9]{6,}\./.test(url)) {
    h.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (/\.(jpg|jpeg|png|webp|avif|gif|svg|ico|mp4|webm)$/.test(url)) {
    h.set('Cache-Control', 'public, max-age=31536000');
  } else if (/\.(txt|xml|json)$/.test(url)) {
    h.set('Cache-Control', 'public, max-age=86400');
  }

  return response;
});
