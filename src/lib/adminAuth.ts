import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { getPool } from './db';

// ── Permission keys — one per admin section. The owner always has all of
// them implicitly (is_owner=true); collaborators get an explicit subset. ──
export const PERMISSIONS = [
  { key: 'email',      label: 'Email' },
  { key: 'richieste',  label: 'Richieste (form contatti)' },
  { key: 'blog',       label: 'Blog' },
  { key: 'progetti',   label: 'Progetti' },
  { key: 'partners',   label: 'Technology Partners' },
  { key: 'sedi',       label: 'Sedi' },
] as const;
export type PermissionKey = typeof PERMISSIONS[number]['key'];

export interface AdminUser {
  isOwner: boolean;
  userId: number | null;
  email: string;
  name: string;
  permissions: PermissionKey[];
}

const SESSION_DAYS = 7;

// ── Password hashing (scrypt, built into Node — no extra dependency) ──────
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64).toString('hex');
  const a = Buffer.from(candidate, 'hex');
  const b = Buffer.from(hash, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}

// ── Sessions (random opaque token, stored + revocable server-side) ────────
export async function createSession(userId: number | null, isOwner: boolean): Promise<string> {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await getPool().query(
    'INSERT INTO admin_sessions (token, user_id, is_owner, expires_at) VALUES ($1,$2,$3,$4)',
    [token, userId, isOwner, expiresAt],
  );
  return token;
}

export async function destroySession(token: string): Promise<void> {
  await getPool().query('DELETE FROM admin_sessions WHERE token=$1', [token]);
}

export async function getSessionUser(token: string | undefined): Promise<AdminUser | null> {
  if (!token) return null;
  const res = await getPool().query<{
    is_owner: boolean; user_id: number | null; expires_at: Date;
    email: string | null; name: string | null; permissions: PermissionKey[] | null; active: boolean | null;
  }>(
    `SELECT s.is_owner, s.user_id, s.expires_at, u.email, u.name, u.permissions, u.active
     FROM admin_sessions s LEFT JOIN admin_users u ON u.id = s.user_id
     WHERE s.token = $1`,
    [token],
  );
  const row = res.rows[0];
  if (!row) return null;
  if (new Date(row.expires_at) < new Date()) {
    // Expired — clean it up lazily and reject.
    await destroySession(token);
    return null;
  }
  if (row.is_owner) {
    return { isOwner: true, userId: null, email: 'owner', name: 'Titolare', permissions: PERMISSIONS.map(p => p.key) };
  }
  if (!row.email || row.active === false) return null;
  return { isOwner: false, userId: row.user_id, email: row.email, name: row.name ?? '', permissions: row.permissions ?? [] };
}

export function hasPermission(user: AdminUser | null | undefined, key: PermissionKey): boolean {
  if (!user) return false;
  return user.isOwner || user.permissions.includes(key);
}

export function hasAnyPermission(user: AdminUser | null | undefined, keys: PermissionKey[]): boolean {
  if (!user) return false;
  return user.isOwner || keys.some(k => user.permissions.includes(k));
}
