import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (ctx, next) => {
  const response = await next();
  const h = response.headers;

  // Security headers
  h.set('X-Frame-Options', 'DENY');
  h.set('X-Content-Type-Options', 'nosniff');
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  h.set('X-XSS-Protection', '1; mode=block');

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
