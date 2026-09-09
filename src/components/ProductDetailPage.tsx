import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

function isSafeUrl(u: string): boolean {
  try {
    const parsed = new URL(u, 'https://eddigitalagency.it');
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export interface ProductFull {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  priceNote: string;
  externalUrl: string;
  coverImg: string;
}

export default function ProductDetailPage({ product }: { product: ProductFull }) {
  return (
    <div className="t-bg t-text overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, system-ui, sans-serif' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {product.coverImg && (
            <img src={product.coverImg} alt={product.name} className="w-full h-full object-cover" style={{ filter: 'brightness(0.4)' }} />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(var(--c-bg)) 0%, transparent 60%)' }} />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-12 pb-16 pt-40 w-full">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
            <a href="/prodotti" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] mb-8 hover:text-[#FF6A00] transition-colors"
              style={{ color: 'rgba(var(--c-text),0.4)' }}>
              ← Prodotti
            </a>

            {product.category && (
              <div className="mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest" style={{ background: 'rgba(255,106,0,0.15)', color: '#FF6A00' }}>
                  {product.category}
                </span>
              </div>
            )}

            <h1 className="font-cal font-semibold uppercase italic t-text leading-[0.9] tracking-tight mb-4"
              style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)' }}>
              {product.name}
            </h1>
            {product.tagline && (
              <p className="text-lg md:text-xl font-[250] max-w-xl" style={{ color: 'rgba(var(--c-muted),1)' }}>
                {product.tagline}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_360px] gap-16 md:gap-24 items-start">

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }}>
            {product.description && (
              <>
                <p className="text-xs uppercase tracking-[0.2em] mb-4 font-medium" style={{ color: 'rgba(var(--c-text),0.35)' }}>
                  Il prodotto
                </p>
                <p className="text-base md:text-lg font-[250] leading-8 mb-14" style={{ color: 'rgba(var(--c-muted),1)' }}>
                  {product.description}
                </p>
              </>
            )}

            {product.features.length > 0 && (
              <>
                <p className="text-xs uppercase tracking-[0.2em] mb-8 font-medium" style={{ color: 'rgba(var(--c-text),0.35)' }}>
                  Funzionalità
                </p>
                <ul className="space-y-4">
                  {product.features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
                      className="flex items-start gap-4"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF6A00] flex-shrink-0" />
                      <span className="text-sm md:text-base font-[250] leading-7" style={{ color: 'rgba(var(--c-muted),1)' }}>
                        {f}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="md:sticky md:top-28 space-y-4"
          >
            {product.priceNote && (
              <div className="rounded-[1.75rem] p-7" style={{ background: 'rgb(var(--c-card))', border: '1px solid rgba(var(--c-text),0.07)' }}>
                <p className="text-xs uppercase tracking-[0.2em] mb-3 font-medium" style={{ color: 'rgba(var(--c-text),0.35)' }}>
                  Prezzo
                </p>
                <p className="font-cal font-semibold italic text-3xl text-[#FF6A00] leading-none">{product.priceNote}</p>
              </div>
            )}

            {product.externalUrl && isSafeUrl(product.externalUrl) && (
              <a href={product.externalUrl} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center py-4 rounded-[1.75rem] font-bold text-sm uppercase tracking-widest transition-all duration-200 active:scale-[0.98]"
                style={{ background: '#FF6A00', color: '#000' }}>
                Vai al prodotto →
              </a>
            )}

            <a href="/contatti"
              className="block w-full text-center py-4 rounded-[1.75rem] font-semibold text-sm uppercase tracking-widest transition-all duration-200"
              style={{ border: '1px solid rgba(var(--c-text),0.15)', color: 'rgb(var(--c-text))' }}>
              Richiedi una demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-12 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
          className="rounded-[2.5rem] overflow-hidden text-center px-8 py-16 md:py-20"
          style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #FF8C00 100%)' }}
        >
          <p className="text-black/60 text-xs uppercase tracking-[0.2em] font-medium mb-4">Serve qualcosa di diverso?</p>
          <h2 className="font-cal font-semibold uppercase italic text-black leading-tight tracking-tight mb-8"
            style={{ fontSize: 'clamp(2rem,5vw,4rem)' }}>
            Costruiamo il tuo<br className="hidden sm:block" /> gestionale su misura.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contatti"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold rounded-full hover:scale-[1.04] active:scale-[0.97] transition-transform text-sm uppercase tracking-widest">
              Parliamone →
            </a>
            <a href="/prodotti"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black/20 text-black font-semibold rounded-full hover:bg-black/30 transition-colors text-sm uppercase tracking-widest">
              Altri prodotti
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
