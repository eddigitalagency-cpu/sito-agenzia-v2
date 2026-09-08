import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ease = [0.25, 0.1, 0.25, 1.0] as const;
const reveal = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, delay: i * 0.07, ease } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

export interface ProductCard {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  priceNote: string;
  coverImg: string;
}

export default function ProductsPage({ products }: { products: ProductCard[] }) {
  return (
    <div className="t-bg t-text overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, Inter, system-ui, sans-serif' }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pt-36 md:pt-44 pb-16 md:pb-24">
        <Section className="space-y-7 md:space-y-8">
          <motion.div variants={reveal} className="inline-flex items-center gap-2 px-4 py-2 rounded-full t-border border t-text-50 text-xs uppercase tracking-widest" style={{ backgroundColor: 'rgba(var(--c-text),0.04)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block" />
            Software firmati ED Digital
          </motion.div>
          <motion.h1 variants={reveal} custom={1}
            className="font-cal font-semibold uppercase tracking-tighter italic t-text text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.9]"
          >
            Prodotti che <br /><span className="text-[#FF6A00]">lavorano per</span> <br />il tuo settore.
          </motion.h1>
          <motion.p variants={reveal} custom={2} className="t-muted font-[250] text-base leading-6 max-w-xl">
            Gestionali in abbonamento sviluppati da noi per settori specifici — pensati per chi ogni giorno lavora sul campo, non per chi vende software.
          </motion.p>
        </Section>
      </section>

      {/* ── Products grid ─────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-24 md:pb-32">
        {products.length === 0 ? (
          <p className="t-muted text-sm">Nuovi prodotti in arrivo a breve.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {products.map((p, i) => (
              <motion.a
                key={p.slug}
                href={`/prodotti/${p.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: i * 0.06, ease }}
                className="group block t-card t-border border rounded-[1.75rem] overflow-hidden hover:border-[rgba(255,106,0,0.35)] transition-all duration-400"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/10', background: 'rgba(var(--c-text),0.05)' }}>
                  {p.coverImg ? (
                    <img src={p.coverImg} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl opacity-10">✦</span>
                    </div>
                  )}
                  {p.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ background: '#FF6A00', color: '#000' }}>
                        {p.category}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-2">
                  <h2 className="font-cal font-semibold t-text text-xl leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">
                    {p.name}
                  </h2>
                  {p.tagline && <p className="t-muted text-sm leading-relaxed font-[300]">{p.tagline}</p>}
                  <div className="flex items-center justify-between pt-3">
                    {p.priceNote && <span className="text-xs font-semibold text-[#FF6A00]">{p.priceNote}</span>}
                    <span className="text-xs font-semibold text-[#FF6A00] ml-auto group-hover:translate-x-1 transition-transform duration-300 inline-block">
                      Scopri →
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-24 md:pb-32">
        <Section>
          <motion.div variants={reveal} className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-[#FF6A00] px-8 py-14 md:p-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <p className="text-black/60 text-xs uppercase tracking-widest mb-4 font-medium">Hai un'idea per un gestionale?</p>
            <h2 className="font-cal font-semibold uppercase tracking-tighter italic text-black text-3xl md:text-6xl leading-tight mb-8">
              Lo costruiamo <br className="hidden sm:block" /> su misura.
            </h2>
            <a href="/contatti" className="inline-block px-8 md:px-10 py-4 bg-black text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm">
              Parliamone
            </a>
          </motion.div>
        </Section>
      </section>

    </div>
  );
}
