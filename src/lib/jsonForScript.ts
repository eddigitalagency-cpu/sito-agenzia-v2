/**
 * Serializza dati per un <script type="application/json">: i caratteri che potrebbero
 * chiudere il tag o aprire commenti HTML vengono scritti come escape unicode, quindi anche
 * un valore ostile salvato nel database non può uscire dal contesto dello script (XSS).
 */
export function jsonForScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(new RegExp(String.fromCharCode(0x2028), 'g'), '\\u2028')
    .replace(new RegExp(String.fromCharCode(0x2029), 'g'), '\\u2029');
}
