import http from 'node:http';
import https from 'node:https';
import dns from 'node:dns';
import net from 'node:net';

/**
 * Fetch di una pagina esterna scelta da un utente (es. URL di ispirazione per l'AI del blog)
 * senza esporre la rete interna (SSRF): solo http/https, solo porte 80/443, e ogni
 * indirizzo IP risolto viene controllato AL MOMENTO DELLA CONNESSIONE (anti DNS-rebinding),
 * anche dopo ogni redirect. Il corpo è limitato in dimensione.
 */

// Intervalli non pubblici. net.BlockList normalizza da solo le varianti equivalenti
// (es. ::ffff:127.0.0.1 scritto anche come ::ffff:7f00:1), a differenza di un controllo a regex.
const blocked = new net.BlockList();
for (const [addr, prefix] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16],
  ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15],
  ['198.51.100.0', 24], ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4],
] as [string, number][]) blocked.addSubnet(addr, prefix, 'ipv4');
for (const [addr, prefix] of [
  ['::', 128], ['::1', 128], ['64:ff9b::', 96], ['64:ff9b:1::', 48],
  ['100::', 64], ['2001::', 32], ['2001:db8::', 32], ['2002::', 16], ['fc00::', 7], ['fe80::', 10], ['ff00::', 8],
] as [string, number][]) blocked.addSubnet(addr, prefix, 'ipv6');

function isPrivateIP(ip: string): boolean {
  const family = net.isIPv4(ip) ? 'ipv4' : net.isIPv6(ip) ? 'ipv6' : null;
  if (!family) return true; // non è un IP valido: nel dubbio blocca
  // IPv4-mapped (::ffff:a.b.c.d / ::ffff:hhhh:hhhh) è controllato da BlockList contro le regole IPv4;
  // NAT64, 6to4 e Teredo sono esclusi in blocco dalle regole IPv6 sopra.
  return blocked.check(ip, family);
}

const safeLookup: net.LookupFunction = (hostname, options, callback) => {
  dns.lookup(hostname, { ...(options as dns.LookupOptions), all: true }, (err, addresses) => {
    if (err) return (callback as any)(err);
    const list = addresses as dns.LookupAddress[];
    if (!list.length || list.some(a => isPrivateIP(a.address))) {
      return (callback as any)(new Error('Indirizzo non consentito'));
    }
    if ((options as dns.LookupOptions)?.all) return (callback as any)(null, list);
    return (callback as any)(null, list[0].address, list[0].family);
  });
};

function request(url: URL, timeoutMs: number, maxBytes: number): Promise<{ status: number; location?: string; body: string }> {
  return new Promise((resolve, reject) => {
    const lib = url.protocol === 'https:' ? https : http;
    const req = lib.request(url, {
      method: 'GET',
      lookup: safeLookup,
      timeout: timeoutMs,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ED-Blog-Bot/1.0)', Accept: 'text/html,text/plain;q=0.9' },
    }, (res) => {
      const status = res.statusCode ?? 0;
      if (status >= 300 && status < 400) {
        res.resume();
        return resolve({ status, location: res.headers.location, body: '' });
      }
      const type = String(res.headers['content-type'] ?? '');
      if (!/^(text\/|application\/xhtml)/i.test(type)) { res.destroy(); return resolve({ status, body: '' }); }
      const chunks: Buffer[] = [];
      let size = 0;
      res.on('data', (c: Buffer) => {
        size += c.length;
        if (size > maxBytes) { res.destroy(); return resolve({ status, body: Buffer.concat(chunks).toString('utf8') }); }
        chunks.push(c);
      });
      res.on('end', () => resolve({ status, body: Buffer.concat(chunks).toString('utf8') }));
      res.on('error', reject);
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.end();
  });
}

/** Restituisce il testo della pagina, oppure '' se l'URL non è valido/consentito/raggiungibile. */
export async function safeFetchText(rawUrl: string, opts: { timeoutMs?: number; maxBytes?: number; maxRedirects?: number } = {}): Promise<string> {
  const { timeoutMs = 8000, maxBytes = 500_000, maxRedirects = 3 } = opts;
  try {
    let url = new URL(rawUrl);
    for (let i = 0; i <= maxRedirects; i++) {
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
      if (url.username || url.password) return '';
      const port = url.port || (url.protocol === 'https:' ? '443' : '80');
      if (port !== '80' && port !== '443') return '';
      // IP letterale nell'URL: niente DNS, quindi va controllato qui.
      const host = url.hostname.replace(/^\[|\]$/g, '');
      if (net.isIP(host) && isPrivateIP(host)) return '';

      const r = await request(url, timeoutMs, maxBytes);
      if (r.status >= 300 && r.status < 400 && r.location) { url = new URL(r.location, url); continue; }
      return r.status >= 200 && r.status < 300 ? r.body : '';
    }
    return '';
  } catch {
    return '';
  }
}
