// Rate limiter in memoria per chiave (si azzera a ogni deploy/riavvio — sufficiente a questa scala).
// I bucket scaduti vengono eliminati, così la mappa non cresce senza limite.
const _buckets = new Map<string, { count: number; resetAt: number }>();
const MAX_KEYS = 20_000;
let _lastSweep = 0;

function sweep(now: number) {
  if (now - _lastSweep < 60_000 && _buckets.size < MAX_KEYS) return;
  _lastSweep = now;
  for (const [k, v] of _buckets) if (now > v.resetAt) _buckets.delete(k);
  // Difesa in profondità: se qualcuno gonfia le chiavi (es. IP falsificati), azzera tutto.
  if (_buckets.size >= MAX_KEYS) _buckets.clear();
}

/** Returns true if the request is allowed, false if the limit was exceeded. */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);
  const rec = _buckets.get(key) ?? { count: 0, resetAt: now + windowMs };
  if (now > rec.resetAt) { rec.count = 0; rec.resetAt = now + windowMs; }
  rec.count++;
  _buckets.set(key, rec);
  return rec.count <= max;
}

/** Conta senza incrementare: true se la chiave ha già superato `max` nella finestra. */
export function isLimited(key: string, max: number): boolean {
  const rec = _buckets.get(key);
  return !!rec && Date.now() <= rec.resetAt && rec.count >= max;
}

/** Azzera una chiave (es. dopo un login riuscito). */
export function resetLimit(key: string): void {
  _buckets.delete(key);
}
