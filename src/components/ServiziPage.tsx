import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { services } from '../data/services';

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

export default function ServiziPage() {
  return (
    <div className="t-bg t-text overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, Inter, system-ui, sans-serif' }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pt-36 md:pt-44 pb-16 md:pb-24">
        <Section className="space-y-7 md:space-y-8">
          <motion.div variants={reveal} className="inline-flex items-center gap-2 px-4 py-2 rounded-full t-border border t-text-50 text-xs uppercase tracking-widest" style={{ backgroundColor: 'rgba(var(--c-text),0.04)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block" />
            Cosa facciamo
          </motion.div>
          <motion.h1 variants={reveal} custom={1}
            className="font-cal font-semibold uppercase tracking-tighter italic t-text text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.9]"
          >
            Servizi che <br /><span className="text-[#FF6A00]">fanno la</span> <br />differenza.
          </motion.h1>
          <motion.p variants={reveal} custom={2} className="t-muted font-[250] text-base leading-6 max-w-xl">
            Ogni servizio è studiato per portare risultati concreti e misurabili. Lavoriamo come un'estensione del tuo team, non come fornitori anonimi.
          </motion.p>
        </Section>
      </section>

      {/* ── Services List ─────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-24 md:pb-32">
        <div className="space-y-4 md:space-y-6">
          {services.map((service, i) => (
            <motion.a
              key={service.slug}
              href={`/servizi/${service.slug}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.04, ease }}
              className="group block t-card t-border border rounded-[2rem] md:rounded-[2.5rem] overflow-hidden hover:border-[rgba(255,106,0,0.35)] transition-colors duration-400"
            >
              <div className="p-8 md:p-14 grid md:grid-cols-2 gap-8 md:gap-10 items-start">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs t-text-25 uppercase tracking-widest">0{i + 1}</span>
                    <span className="w-6 h-px" style={{ backgroundColor: 'rgba(var(--c-text),0.1)' }} />
                    <span className="text-xs text-[#FF6A00] uppercase tracking-widest">Digital Service</span>
                  </div>
                  <h2 className="font-cal font-semibold t-text text-2xl md:text-4xl leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">
                    {service.name}
                  </h2>
                  <p className="font-[250] text-[#FF6A00] text-base md:text-lg leading-tight italic">{service.tagline}</p>
                  <p className="font-[250] t-muted text-sm md:text-base leading-6">{service.description}</p>
                  {service.platforms.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {service.platforms.map(p => (
                        <span key={p} className="px-3 py-1 text-xs t-border border t-text-40 rounded-full" style={{ backgroundColor: 'rgba(var(--c-text),0.04)' }}>{p}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="md:pl-10 md:border-l t-border">
                  <p className="text-xs t-text-30 uppercase tracking-widest mb-5 md:mb-6">Cosa include</p>
                  <ul className="space-y-3 md:space-y-4">
                    {service.includes.map(item => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255,106,0,0.12)', border: '1px solid rgba(255,106,0,0.35)' }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] block" />
                        </span>
                        <span className="font-[250] t-muted text-sm md:text-base leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-8 md:px-14 py-5 flex items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(var(--c-text),0.05)' }}>
                <span className="font-[250] t-muted text-xs md:text-sm">Scopri di più su questo servizio</span>
                <span className="w-9 h-9 rounded-full flex items-center justify-center t-text t-border border group-hover:bg-[#FF6A00] group-hover:border-[#FF6A00] group-hover:text-black transition-all duration-300 text-sm flex-shrink-0">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-24 md:pb-32">
        <Section>
          <motion.div variants={reveal} className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-[#FF6A00] px-8 py-14 md:p-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <p className="text-black/60 text-xs uppercase tracking-widest mb-4 font-medium">Hai un progetto in mente?</p>
            <h2 className="font-cal font-semibold uppercase tracking-tighter italic text-black text-3xl md:text-6xl leading-tight mb-8">
              Iniziamo a <br className="hidden sm:block" /> costruire insieme.
            </h2>
            <a href="/contatti" className="inline-block px-8 md:px-10 py-4 bg-black text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm">
              Scrivici ora
            </a>
          </motion.div>
        </Section>
      </section>

    </div>
  );
}
