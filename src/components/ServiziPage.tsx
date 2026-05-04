import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { services } from '../data/services';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServiziPage() {
  return (
    <div className="bg-[#0f0f0f] text-white overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, Inter, system-ui, sans-serif' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-40 pb-24">
        <Section className="space-y-8">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/50 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block"></span>
            Cosa facciamo
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-cal font-semibold uppercase tracking-tighter italic text-white text-5xl leading-tight lg:text-heading"
          >
            Servizi che <br />
            <span className="text-[#FF6A00]">fanno la</span> <br />
            differenza.
          </motion.h1>

          <motion.p variants={fadeUp} className="font-body font-[250] text-body-text text-base leading-6 max-w-xl">
            Ogni servizio è studiato per portare risultati concreti e misurabili. Lavoriamo come un'estensione del tuo team, non come fornitori anonimi.
          </motion.p>
        </Section>
      </section>

      {/* ── Services List ────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <div className="space-y-6">
          {services.map((service, i) => (
            <motion.a
              key={service.slug}
              href={`/servizi/${service.slug}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group block bg-[#141414] border border-white/[0.07] rounded-[2.5rem] overflow-hidden hover:border-[#FF6A00]/30 transition-colors duration-500"
            >
              <div className="p-10 md:p-14 grid md:grid-cols-2 gap-10 items-start">

                {/* Left column */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-white/25 uppercase tracking-widest">
                      0{i + 1}
                    </span>
                    <span className="w-8 h-px bg-white/10"></span>
                    <span className="text-xs font-medium text-[#FF6A00] uppercase tracking-widest">
                      Digital Service
                    </span>
                  </div>

                  <h2 className="font-cal font-semibold text-white text-3xl lg:text-4xl leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">
                    {service.name}
                  </h2>

                  <p className="font-body font-[250] text-[#FF6A00] text-lg leading-tight italic">
                    {service.tagline}
                  </p>

                  <p className="font-body font-[250] text-body-text text-base leading-6">
                    {service.description}
                  </p>

                  {service.platforms.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.platforms.map((p) => (
                        <span key={p} className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-white/50">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right column — includes list */}
                <div className="md:pl-10 md:border-l border-white/[0.07]">
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Cosa include</p>
                  <ul className="space-y-4">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 w-4 h-4 rounded-full bg-[#FF6A00]/15 border border-[#FF6A00]/40 flex items-center justify-center flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] block"></span>
                        </span>
                        <span className="font-body font-[250] text-body-text text-base leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Bottom bar — link arrow */}
              <div className="px-10 md:px-14 py-6 border-t border-white/[0.05] flex items-center justify-between gap-4">
                <span className="font-body font-[250] text-body-text text-sm">
                  Scopri di più su questo servizio
                </span>
                <span className="flex-shrink-0 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-[#FF6A00] group-hover:border-[#FF6A00] group-hover:text-black transition-all duration-300">
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <Section>
          <motion.div
            variants={fadeUp}
            className="relative rounded-[3rem] overflow-hidden bg-[#FF6A00] p-16 lg:p-24 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            <p className="text-black/60 text-sm uppercase tracking-widest mb-4 font-medium">Hai un progetto in mente?</p>
            <h2 className="font-cal font-semibold uppercase tracking-tighter italic text-black text-4xl lg:text-6xl leading-tight mb-8">
              Iniziamo a <br /> costruire insieme.
            </h2>
            <a
              href="mailto:ed.digitalagency@gmail.com"
              className="inline-block px-10 py-4 bg-black text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm"
            >
              Scrivici ora
            </a>
          </motion.div>
        </Section>
      </section>

    </div>
  );
}
