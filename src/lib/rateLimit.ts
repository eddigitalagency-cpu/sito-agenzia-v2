// Simple in-memory per-IP rate limiter (resets on deploy/restart — fine at this scale).
const _buckets = new Map<string, { count: number; resetAt: number }>();

/** Returns true if the request is allowed, false if the limit was exceeded. */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const rec = _buckets.get(key) ?? { count: 0, resetAt: now + windowMs };
  if (now > rec.resetAt) { rec.count = 0; rec.resetAt = now + windowMs; }
  rec.count++;
  _buckets.set(key, rec);
  return rec.count <= max;
}
