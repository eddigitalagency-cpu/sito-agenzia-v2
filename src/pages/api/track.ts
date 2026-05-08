export const prerender = false;

import type { APIRoute } from 'astro';
import { getPool, initDB } from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const type      = String(body.type ?? 'pageview').slice(0, 20);
    const path      = String(body.path ?? '/').slice(0, 500);
    const sessionId = body.sessionId ? String(body.sessionId).slice(0, 64) : null;
    const ua        = (request.headers.get('user-agent') ?? '').slice(0, 300) || null;

    await initDB();
    const db = getPool();

    if (type === 'pageview') {
      const referrer = body.referrer ? String(body.referrer).slice(0, 500) : null;
      await db.query(
        'INSERT INTO page_views (path, referrer, ua, session_id) VALUES ($1,$2,$3,$4)',
        [path, referrer, ua, sessionId],
      );
      if (sessionId) {
        await db.query(
          'INSERT INTO user_events (session_id, event_type, path, referrer, ua) VALUES ($1,$2,$3,$4,$5)',
          [sessionId, 'pageview', path, referrer, ua],
        );
      }
    } else if (type === 'click' || type === 'section') {
      if (!sessionId) return new Response(null, { status: 204 });
      const element = body.element ? String(body.element).slice(0, 200) : null;
      if (!element) return new Response(null, { status: 204 });
      await db.query(
        'INSERT INTO user_events (session_id, event_type, path, element) VALUES ($1,$2,$3,$4)',
        [sessionId, type, path, element],
      );
    } else if (type === 'timeonpage') {
      if (!sessionId) return new Response(null, { status: 204 });
      const value = Math.min(Math.max(parseInt(String(body.value ?? 0), 10) || 0, 0), 7200);
      if (value < 1) return new Response(null, { status: 204 });
      await db.query(
        'INSERT INTO user_events (session_id, event_type, path, value) VALUES ($1,$2,$3,$4)',
        [sessionId, 'timeonpage', path, value],
      );
    }
  } catch {
    // never break the page over analytics
  }
  return new Response(null, { status: 204 });
};
