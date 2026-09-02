import { defineMiddleware } from 'astro:middleware';
import { createHash, timingSafeEqual } from 'node:crypto';

// ── Admin session expiry (defense-in-depth, centralized) ──────────────────
// The main `ed-admin` cookie is a fixed hash of the password with no time
// component, so on its own it never expires server-side. `ed-admin-exp`
// carries a signed expiry set at login (see /api/admin/login) — verified
// here for every /admin and /api/admin request so a leaked cookie can't be
// replayed forever.
function isSessionExpired(expCookie: string | undefined, adminPassword: string): boolean {
  if (!adminPassword) return true;
  if (!expCookie) return true;
  const [expStr, sig] = expCookie.split('.');
  const expiresAt = Number(expStr);
  if (!expiresAt || !sig) return true;
  const expected = createHash('sha256').update(`ed-admin-exp:${expiresAt}:${adminPassword}`).digest('hex');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return true;
  return Date.now() > expiresAt;
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  const path = ctx.url.pathname.replace(/\/$/, '') || '/';
  // /api/admin/login and /logout must stay reachable even with an expired/missing
  // session — otherwise nobody could ever renew or clear a stale session.
  const EXEMPT_API = ['/api/admin/login', '/api/admin/logout'];
  const isAdminApi  = path.startsWith('/api/admin/') && !EXEMPT_API.includes(path);
  const isAdminPage = path.startsWith('/admin') && path !== '/admin/login';

  if (isAdminApi || isAdminPage) {
    const stored = process.env.ADMIN_PASSWORD ?? '';
    const expCookie = ctx.cookies.get('ed-admin-exp')?.value;
    if (isSessionExpired(expCookie, stored)) {
      if (isAdminApi) {
        return new Response(JSON.stringify({ error: 'Sessione scaduta' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return ctx.redirect('/admin/login');
    }
  }

  const response = await next();
  const h = response.headers;

  // Security headers
  h.set('X-Frame-Options', 'DENY');
  h.set('X-Content-Type-Options', 'nosniff');
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  h.set('X-XSS-Protection', '1; mode=block');
  h.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  h.set(
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
    ].join('; '),
  );

  // Cache-Control for static assets
  const url = ctx.url.pathname;
  if (/\.(woff2|woff|ttf|otf)$/.test(url)) {
    // Fonts never change filename — cache forever
    h.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (/\.(js|css)$/.test(url) && /\.[a-zA-Z0-9]{6,}\./.test(url)) {
    // Hashed JS/CSS bundles — cache forever (hash changes on update)
    h.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (/\.(jpg|jpeg|png|webp|avif|gif|svg|ico|mp4|webm)$/.test(url)) {
    // Images — cache for 1 year
    h.set('Cache-Control', 'public, max-age=31536000');
  } else if (/\.(txt|xml|json)$/.test(url)) {
    // Sitemaps, robots, llms — cache for 1 day
    h.set('Cache-Control', 'public, max-age=86400');
  }

  return response;
});
