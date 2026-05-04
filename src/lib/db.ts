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
      created_at TIMESTAMPTZ  DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS form_submissions (
      id         SERIAL       PRIMARY KEY,
      name       TEXT         NOT NULL,
      email      TEXT         NOT NULL,
      phone      TEXT,
      company    TEXT,
      service    TEXT,
      message    TEXT,
      created_at TIMESTAMPTZ  DEFAULT NOW()
    );
  `);
  _ready = true;
}
