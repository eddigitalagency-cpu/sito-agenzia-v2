import pkg from 'pg';
const { Pool } = pkg;
import type { Pool as PgPool } from 'pg';
import { projects as staticProjects } from '../data/projects';

let _pool: PgPool | null = null;
let _ready = false;

export function getPool(): PgPool {
  if (!_pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL non configurata');
    _pool = new Pool({
      connectionString: url,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30_000,
    });
  }
  return _pool;
}

export async function initDB(): Promise<void> {
  if (_ready) return;
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS page_views (
      id         SERIAL       PRIMARY KEY,
      path       TEXT         NOT NULL,
      referrer   TEXT,
      ua         TEXT,
      session_id TEXT,
      created_at TIMESTAMPTZ  DEFAULT NOW()
    );
    ALTER TABLE page_views ADD COLUMN IF NOT EXISTS session_id TEXT;

    CREATE TABLE IF NOT EXISTS form_submissions (
      id         SERIAL       PRIMARY KEY,
      name       TEXT         NOT NULL,
      email      TEXT         NOT NULL,
      phone      TEXT,
      company    TEXT,
      service    TEXT,
      message    TEXT,
      replied_at TIMESTAMPTZ,
      reply_text TEXT,
      created_at TIMESTAMPTZ  DEFAULT NOW()
    );
    ALTER TABLE form_submissions ADD COLUMN IF NOT EXISTS replied_at TIMESTAMPTZ;
    ALTER TABLE form_submissions ADD COLUMN IF NOT EXISTS reply_text TEXT;
    ALTER TABLE form_submissions ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ;

    CREATE TABLE IF NOT EXISTS user_events (
      id         SERIAL       PRIMARY KEY,
      session_id TEXT         NOT NULL,
      event_type TEXT         NOT NULL,
      path       TEXT,
      element    TEXT,
      value      INT,
      referrer   TEXT,
      ua         TEXT,
      created_at TIMESTAMPTZ  DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_ue_session ON user_events(session_id);
    CREATE INDEX IF NOT EXISTS idx_ue_type    ON user_events(event_type, created_at);

    CREATE TABLE IF NOT EXISTS uploaded_images (
      id         SERIAL       PRIMARY KEY,
      filename   TEXT,
      mime_type  TEXT         NOT NULL,
      data       BYTEA        NOT NULL,
      created_at TIMESTAMPTZ  DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS projects_db (
      id            SERIAL       PRIMARY KEY,
      slug          TEXT         UNIQUE NOT NULL,
      title         TEXT         NOT NULL,
      service       TEXT         NOT NULL DEFAULT '',
      service_slug  TEXT         NOT NULL DEFAULT '',
      tagline       TEXT         NOT NULL DEFAULT '',
      description   TEXT         NOT NULL DEFAULT '',
      what          TEXT[]       NOT NULL DEFAULT '{}',
      results       JSONB        NOT NULL DEFAULT '[]',
      year          TEXT         NOT NULL DEFAULT '',
      cover_img     TEXT         NOT NULL DEFAULT '',
      display_order INT          NOT NULL DEFAULT 0,
      published     BOOLEAN      NOT NULL DEFAULT true,
      created_at    TIMESTAMPTZ  DEFAULT NOW(),
      updated_at    TIMESTAMPTZ  DEFAULT NOW()
    );
    ALTER TABLE projects_db ADD COLUMN IF NOT EXISTS services      text[] NOT NULL DEFAULT '{}';
    ALTER TABLE projects_db ADD COLUMN IF NOT EXISTS service_slugs text[] NOT NULL DEFAULT '{}';
    UPDATE projects_db
      SET services = ARRAY[service], service_slugs = ARRAY[service_slug]
      WHERE (array_length(services, 1) IS NULL OR array_length(services, 1) = 0)
        AND service != '';

    CREATE TABLE IF NOT EXISTS blog_posts (
      id            SERIAL       PRIMARY KEY,
      slug          TEXT         UNIQUE NOT NULL,
      title         TEXT         NOT NULL,
      excerpt       TEXT         NOT NULL DEFAULT '',
      content       TEXT         NOT NULL DEFAULT '',
      category      TEXT         NOT NULL DEFAULT '',
      cover_img     TEXT         NOT NULL DEFAULT '',
      author        TEXT         NOT NULL DEFAULT 'ED Digital Agency',
      read_time     INT          NOT NULL DEFAULT 5,
      published     BOOLEAN      NOT NULL DEFAULT false,
      display_order INT          NOT NULL DEFAULT 0,
      created_at    TIMESTAMPTZ  DEFAULT NOW(),
      updated_at    TIMESTAMPTZ  DEFAULT NOW()
    );
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS keywords TEXT NOT NULL DEFAULT '';
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ;
    CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published, display_order);
    CREATE INDEX IF NOT EXISTS idx_blog_scheduled ON blog_posts(scheduled_at) WHERE scheduled_at IS NOT NULL;
  `);

  // Seed projects_db from static data on first run
  try {
    const pool = getPool();
    const { rows: [{ count }] } = await pool.query<{ count: number }>(
      'SELECT COUNT(*)::int AS count FROM projects_db'
    );
    if (count === 0) {
      for (let i = 0; i < staticProjects.length; i++) {
        const p = staticProjects[i];
        await pool.query(
          `INSERT INTO projects_db
            (slug,title,service,service_slug,tagline,description,what,results,year,cover_img,display_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
           ON CONFLICT (slug) DO NOTHING`,
          [p.slug, p.title, p.service, p.serviceSlug, p.tagline, p.description,
           p.what, JSON.stringify(p.results), p.year, p.img, i],
        );
      }
    }
  } catch (e) { console.error('Seed error:', e); }

  _ready = true;
}
