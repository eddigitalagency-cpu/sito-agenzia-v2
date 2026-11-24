import sanitize from 'sanitize-html';

/**
 * Sanifica l'HTML degli articoli del blog (scritto a mano, generato o tradotto da AI)
 * prima di mostrarlo: tiene la formattazione editoriale, elimina script, handler on*,
 * iframe, stili inline e URL pericolosi (javascript:, data:, ecc.).
 */
const SAFE_URL = /^(?:https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i;

export function sanitizeArticleHtml(html: string): string {
  return sanitize(String(html ?? ''), {
    allowedTags: [
      'h2', 'h3', 'h4', 'p', 'br', 'hr', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'u', 's',
      'blockquote', 'a', 'img', 'figure', 'figcaption', 'code', 'pre', 'span', 'div',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'sub', 'sup', 'mark',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      th: ['colspan', 'rowspan'],
      td: ['colspan', 'rowspan'],
      '*': ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? '';
        const out: Record<string, string> = { ...attribs };
        if (href && !SAFE_URL.test(href)) delete out.href;
        if (out.target === '_blank') out.rel = 'noopener noreferrer';
        else delete out.target;
        return { tagName, attribs: out };
      },
    },
  });
}
