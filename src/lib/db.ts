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
    ALTER TABLE projects_db ADD COLUMN IF NOT EXISTS tagline_en     TEXT;
    ALTER TABLE projects_db ADD COLUMN IF NOT EXISTS tagline_de     TEXT;
    ALTER TABLE projects_db ADD COLUMN IF NOT EXISTS description_en TEXT;
    ALTER TABLE projects_db ADD COLUMN IF NOT EXISTS description_de TEXT;
    ALTER TABLE projects_db ADD COLUMN IF NOT EXISTS what_en        TEXT[];
    ALTER TABLE projects_db ADD COLUMN IF NOT EXISTS what_de        TEXT[];
    ALTER TABLE projects_db ADD COLUMN IF NOT EXISTS results_en     JSONB;
    ALTER TABLE projects_db ADD COLUMN IF NOT EXISTS results_de     JSONB;
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
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title_en    TEXT;
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title_de    TEXT;
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt_en  TEXT;
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt_de  TEXT;
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content_en  TEXT;
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content_de  TEXT;
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS keywords_en TEXT;
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS keywords_de TEXT;
    CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published, display_order);
    CREATE INDEX IF NOT EXISTS idx_blog_scheduled ON blog_posts(scheduled_at) WHERE scheduled_at IS NOT NULL;

    CREATE TABLE IF NOT EXISTS offices (
      id            SERIAL       PRIMARY KEY,
      country_code  TEXT         NOT NULL,
      region        TEXT         NOT NULL DEFAULT '',
      province      TEXT         NOT NULL DEFAULT '',
      city          TEXT         NOT NULL DEFAULT '',
      street        TEXT         NOT NULL DEFAULT '',
      display_order INT          NOT NULL DEFAULT 0,
      published     BOOLEAN      NOT NULL DEFAULT true,
      created_at    TIMESTAMPTZ  DEFAULT NOW(),
      updated_at    TIMESTAMPTZ  DEFAULT NOW()
    );
    ALTER TABLE offices ADD COLUMN IF NOT EXISTS city TEXT NOT NULL DEFAULT '';

    CREATE TABLE IF NOT EXISTS technology_partners (
      id            SERIAL       PRIMARY KEY,
      name          TEXT         NOT NULL,
      logo_url      TEXT         NOT NULL DEFAULT '',
      width         INT          NOT NULL DEFAULT 100,
      display_order INT          NOT NULL DEFAULT 0,
      published     BOOLEAN      NOT NULL DEFAULT true,
      created_at    TIMESTAMPTZ  DEFAULT NOW(),
      updated_at    TIMESTAMPTZ  DEFAULT NOW()
    );
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

  // Seed technology_partners from previous hardcoded list on first run
  try {
    const pool = getPool();
    const { rows: [{ count }] } = await pool.query<{ count: number }>(
      'SELECT COUNT(*)::int AS count FROM technology_partners'
    );
    if (count === 0) {
      const staticPartners = [
        { name: 'Shopify',   logo_url: '/Images/shopify-partner.png',                width: 93 },
        { name: 'WordPress', logo_url: '/Images/wordpress-logo-png-transparent.png', width: 96 },
        { name: 'Keliweb',   logo_url: '/Images/keliweb-logo-e1522914795801.png',    width: 112 },
        { name: 'Litchi',    logo_url: '/Images/Logo-Litchi-solutions-intero.svg',   width: 80 },
      ];
      for (let i = 0; i < staticPartners.length; i++) {
        const p = staticPartners[i];
        await pool.query(
          `INSERT INTO technology_partners (name,logo_url,width,display_order)
           VALUES ($1,$2,$3,$4)`,
          [p.name, p.logo_url, p.width, i],
        );
      }
    }
  } catch (e) { console.error('Seed error (partners):', e); }

  _ready = true;
}
