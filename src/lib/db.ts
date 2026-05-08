import pkg from 'pg';
const { Pool } = pkg;
import type { Pool as PgPool } from 'pg';

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
  `);
  _ready = true;
}
