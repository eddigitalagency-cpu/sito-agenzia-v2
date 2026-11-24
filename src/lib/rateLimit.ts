// Rate limiter in memoria per chiave (si azzera a ogni deploy/riavvio — sufficiente a questa scala).
// Le chiavi scadute vengono eliminate; se la mappa è comunque piena si scartano solo le voci
// usate meno di recente (mai un azzeramento totale, che permetterebbe di aggirare i limiti).
const _buckets = new Map<string, { count: number; resetAt: number }>();
const MAX_KEYS = 20_000;
let _lastSweep = 0;

function sweep(now: number) {
  if (now - _lastSweep < 60_000 && _buckets.size < MAX_KEYS) return;
  _lastSweep = now;
  for (const [k, v] of _buckets) if (now > v.resetAt) _buckets.delete(k);
  if (_buckets.size >= MAX_KEYS) {
    // La Map conserva l'ordine di inserimento e a ogni accesso la chiave viene rimessa in coda,
    // quindi le prime sono le meno recenti: ne scartiamo il 10%.
    let toDrop = Math.ceil(MAX_KEYS * 0.1);
    for (const k of _buckets.keys()) { _buckets.delete(k); if (--toDrop <= 0) break; }
  }
}

/** Returns true if the request is allowed, false if the limit was exceeded. */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);
  const rec = _buckets.get(key) ?? { count: 0, resetAt: now + windowMs };
  if (now > rec.resetAt) { rec.count = 0; rec.resetAt = now + windowMs; }
  rec.count++;
  _buckets.delete(key); // rimette la chiave in coda (più recente)
  _buckets.set(key, rec);
  return rec.count <= max;
}

/** Numero di richieste contate nella finestra corrente (senza incrementare). */
export function getCount(key: string): number {
  const rec = _buckets.get(key);
  return rec && Date.now() <= rec.resetAt ? rec.count : 0;
}

/** Conta senza incrementare: true se la chiave ha già raggiunto `max` nella finestra. */
export function isLimited(key: string, max: number): boolean {
  return getCount(key) >= max;
}

/** Azzera una chiave (es. dopo un login riuscito). */
export function resetLimit(key: string): void {
  _buckets.delete(key);
}
