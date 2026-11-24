/**
 * Legge il JSON di una richiesta rifiutando corpi troppo grandi (anti memory-DoS).
 * Controlla sia Content-Length sia la dimensione effettivamente ricevuta.
 */
export async function readJsonLimited<T = any>(request: Request, maxBytes: number): Promise<T> {
  const declared = Number(request.headers.get('content-length') ?? 0);
  if (declared > maxBytes) throw new Error('Payload troppo grande');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Corpo mancante');
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) { await reader.cancel(); throw new Error('Payload troppo grande'); }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as T;
}
