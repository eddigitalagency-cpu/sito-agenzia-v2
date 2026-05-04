import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Apple-style easing
const ease = [0.25, 0.1, 0.25, 1.0] as const;

const reveal = {
  hidden:  { opacity: 0, y: 24, scale: 0.98 },
  visible: (i = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.9, delay: i * 0.08, ease },
  }),
};

const fadeIn = {
  hidden:  { opacity: 0, scale: 1.03 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease } },
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

const services = [
  { name: 'Social Media Management', slug: 'social-media-management', icon: '◈' },
  { name: 'Advertising',             slug: 'advertising',             icon: '◉' },
  { name: 'Website',                 slug: 'website',                 icon: '◎' },
  { name: 'E-Commerce',              slug: 'ecommerce',               icon: '⬡' },
  { name: 'Photo & Video',           slug: 'photo-video',             icon: '◫' },
  { name: 'Visual Identity',         slug: 'visual-identity',         icon: '◭' },
  { name: 'MVP & SaaS',              slug: 'mvp-saas',                icon: '◬' },
  { name: 'App',                     slug: 'app',                     icon: '⬢' },
];

const caseStudies = [
  { title: 'Italia Contract',   service: 'Web Design',        img: '/images/Cover-Italia-Contract.jpg' },
  { title: 'Val Longa',         service: 'Web Design',        img: '/images/Cover-ValLonga.jpg' },
  { title: 'Espressione Danza', service: 'Social Management', img: '/images/Cover-Espressione-Danza.jpg' },
  { title: 'Ottica Toffoli',    service: 'Web Design',        img: '/images/Cover-Otica-Toffoli.jpg' },
  { title: 'SoloMattia',        service: 'Social Management', img: '/images/Cover-SoloMattia.jpg' },
  { title: 'Disegno Italia',    service: 'Web Design',        img: '/images/Cover-Disegno-Italia.jpg' },
];

const stats = [
  { value: '50+', label: 'Progetti completati' },
  { value: '5+',  label: 'Anni di esperienza' },
  { value: '98%', label: 'Clienti soddisfatti' },
  { value: '3×',  label: 'Crescita media' },
];

const partners = [
  { src: '/images/shopify-partner.png',                   alt: 'Shopify Partner' },
  { src: '/images/wordpress-logo-png-transparent.png',    alt: 'WordPress' },
  { src: '/images/keliweb-logo-e1522914795801.png',        alt: 'Keliweb' },
  { src: '/images/Logo-Litchi-solutions-intero.png',       alt: 'Litchi' },
  { src: '/images/ED-logo-completo.svg',                   alt: 'ED Digital' },
];

export default function HomePage() {
  return (
    <div className="t-bg t-text overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, Inter, system-ui, sans-serif' }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28">
        <Section className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

          <div className="space-y-7 md:space-y-8">
            <motion.div variants={reveal} className="inline-flex items-center gap-2 px-4 py-2 rounded-full t-border t-text-50 border text-xs uppercase tracking-widest" style={{ backgroundColor: 'rgba(var(--c-text),0.04)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block" />
              Partner Strategico Digitale
            </motion.div>

            <motion.h1 variants={reveal} custom={1}
              className="font-cal font-semibold uppercase tracking-tighter italic t-text text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.9]"
            >
              La nostra <br />
              <span className="text-[#FF6A00]">creatività</span> <br />
              la tua visione.
            </motion.h1>

            <motion.p variants={reveal} custom={2} className="t-muted font-[250] text-base md:text-lg leading-7 max-w-md">
              Siamo il motore digitale della tua crescita. Strategie sartoriali per brand che non temono di farsi notare.
            </motion.p>

            <motion.div variants={reveal} custom={3} className="flex flex-wrap gap-3">
              <a href="#casistudio" className="px-7 py-3.5 bg-[#FF6A00] text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm">
                I Nostri Lavori
              </a>
              <a href="mailto:ed.digitalagency@gmail.com" className="px-7 py-3.5 t-border t-text border rounded-full font-semibold hover:bg-[#FF6A00] hover:border-[#FF6A00] hover:text-black transition-all uppercase tracking-widest text-sm">
                Contattaci
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="relative group order-first lg:order-last">
            <div className="absolute -inset-8 md:-inset-12 bg-[#FF6A00]/8 blur-[90px] rounded-full pointer-events-none group-hover:bg-[#FF6A00]/14 transition-all duration-700" />
            <img
              src="/images/GrandeProgetto-sesnza-titolo-6-copia.png"
              alt="ED Digital Agency"
              className="relative z-10 w-full rounded-[2rem] md:rounded-[2.5rem] shadow-2xl"
            />
          </motion.div>

        </Section>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(var(--c-text),0.06)', borderBottom: '1px solid rgba(var(--c-text),0.06)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-10 md:py-12">
          <Section className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.value} variants={reveal} custom={i} className="text-center">
                <p className="text-4xl md:text-5xl font-black text-[#FF6A00] italic font-cal">{s.value}</p>
                <p className="text-xs md:text-sm t-text-40 mt-2 uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────── */}
      <section id="services" className="max-w-[1400px] mx-auto px-5 md:px-12 py-20 md:py-28">
        <Section>
          <motion.div variants={reveal} className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 gap-6">
            <h2 className="font-cal font-semibold uppercase tracking-tighter italic t-text text-3xl md:text-5xl leading-tight">
              Cosa facciamo <span className="text-[#FF6A00]">/</span>
            </h2>
            <p className="t-muted font-[250] text-sm leading-6 max-w-xs">
              Ogni servizio è studiato per portare risultati concreti e misurabili al tuo business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {services.map((s, i) => (
              <motion.a
                key={s.slug}
                href={`/servizi/${s.slug}`}
                variants={reveal}
                custom={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="t-card t-border border p-7 md:p-8 rounded-[1.75rem] group relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.75rem]" style={{ background: 'linear-gradient(135deg, rgba(255,106,0,0.06) 0%, transparent 100%)' }} />
                <span className="text-xl t-text-25 group-hover:text-[#FF6A00] transition-colors duration-300">{s.icon}</span>
                <h3 className="mt-7 md:mt-8 text-base md:text-lg font-semibold t-text leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">{s.name}</h3>
                <p className="mt-3 text-[11px] t-text-30 uppercase tracking-widest">Digital Service →</p>
              </motion.a>
            ))}
          </div>
        </Section>
      </section>

      {/* ── Case Studies ──────────────────────────────────── */}
      <section id="casistudio" className="pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 mb-10 md:mb-12">
          <Section>
            <motion.h2 variants={reveal} className="font-cal font-semibold uppercase tracking-tighter italic t-text text-3xl md:text-5xl">
              Progetti Selezionati <span className="text-[#FF6A00]">/</span>
            </motion.h2>
          </Section>
        </div>

        <div className="flex gap-4 md:gap-6 overflow-x-auto px-5 md:px-12 pb-6 no-scrollbar">
          {caseStudies.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: i * 0.07, ease }}
              whileHover={{ scale: 1.02 }}
              className="min-w-[280px] sm:min-w-[340px] lg:min-w-[420px] aspect-[4/5] relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group flex-shrink-0"
            >
              <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
              <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8">
                <p className="text-[#FF6A00] font-bold text-[10px] uppercase tracking-[0.3em] mb-1.5">{s.service}</p>
                <h3 className="text-xl md:text-2xl font-black text-white">{s.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-20 md:pb-28">
        <Section>
          <motion.div variants={fadeIn} className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-[#FF6A00] px-8 py-14 md:p-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <p className="text-black/60 text-xs uppercase tracking-widest mb-4 font-medium">Pronto a crescere?</p>
            <h2 className="font-cal font-semibold uppercase tracking-tighter italic text-black text-3xl md:text-6xl leading-tight mb-8">
              Costruiamo qualcosa <br className="hidden sm:block" /> di straordinario.
            </h2>
            <a href="mailto:ed.digitalagency@gmail.com" className="inline-block px-8 md:px-10 py-4 bg-black text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm">
              Inizia ora
            </a>
          </motion.div>
        </Section>
      </section>

      {/* ── Partners ──────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(var(--c-text),0.06)' }} className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <Section>
            <motion.p variants={reveal} className="text-center text-[10px] t-text-25 uppercase tracking-widest mb-10">Technology partners</motion.p>
            <motion.div variants={stagger} className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {partners.map(p => (
                <motion.img key={p.alt} variants={reveal} src={p.src} alt={p.alt} className="h-6 md:h-8 w-auto opacity-25 hover:opacity-60 transition-opacity duration-300" style={{ filter: 'var(--partner-filter, invert(1))' }} />
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
