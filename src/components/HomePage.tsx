import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
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

const services = [
  { name: 'Social Media Management', icon: '◈' },
  { name: 'Advertising', icon: '◉' },
  { name: 'Website', icon: '◎' },
  { name: 'E-Commerce', icon: '⬡' },
  { name: 'Photo & Video', icon: '◫' },
  { name: 'Visual Identity', icon: '◭' },
  { name: 'MVP & SaaS', icon: '◬' },
  { name: 'App', icon: '⬢' },
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
  { value: '5+', label: 'Anni di esperienza' },
  { value: '98%', label: 'Clienti soddisfatti' },
  { value: '3×', label: 'Crescita media' },
];

const partners = [
  { src: '/images/shopify-partner.png', alt: 'Shopify Partner' },
  { src: '/images/wordpress-logo-png-transparent.png', alt: 'WordPress' },
  { src: '/images/keliweb-logo-e1522914795801.png', alt: 'Keliweb' },
  { src: '/images/Logo-Litchi-solutions-intero.png', alt: 'Litchi' },
  { src: '/images/ED-logo-completo.svg', alt: 'ED Digital' },
];

export default function HomePage() {
  return (
    <div className="bg-[#0f0f0f] text-white overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, Inter, system-ui, sans-serif' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-36 pb-24">
        <Section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/50 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block"></span>
              Partner Strategico Digitale
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-6xl lg:text-8xl font-black uppercase leading-[0.88] tracking-tighter italic"
            >
              La nostra <br />
              <span className="text-[#FF6A00]">creatività</span> <br />
              la tua visione.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-md leading-relaxed">
              Siamo il motore digitale della tua crescita. Strategie sartoriali per brand che non temono di farsi notare.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="#casistudio"
                className="px-8 py-4 bg-[#FF6A00] text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm"
              >
                I Nostri Lavori
              </a>
              <a
                href="mailto:ed.digitalagency@gmail.com"
                className="px-8 py-4 border border-white/15 rounded-full font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm"
              >
                Contattaci
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="relative group">
            <div className="absolute -inset-12 bg-[#FF6A00]/8 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#FF6A00]/15 transition-all duration-700"></div>
            <img
              src="/images/GrandeProgetto-sesnza-titolo-6-copia.png"
              alt="ED Digital Agency"
              className="relative z-10 w-full rounded-[2.5rem] shadow-2xl"
            />
          </motion.div>
        </Section>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
          <Section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <motion.div key={s.value} variants={fadeUp} className="text-center">
                <p className="text-4xl lg:text-5xl font-black text-[#FF6A00] italic">{s.value}</p>
                <p className="text-sm text-white/40 mt-2 uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* ── Services Bento ───────────────────────────────── */}
      <section id="services" className="max-w-[1400px] mx-auto px-6 md:px-12 py-28">
        <Section>
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-16 gap-8 flex-wrap">
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic leading-tight">
              Cosa facciamo <span className="text-[#FF6A00]">/</span>
            </h2>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed">
              Ogni servizio è studiato per portare risultati concreti e misurabili al tuo business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4, borderColor: 'rgba(255, 106, 0, 0.5)' }}
                transition={{ duration: 0.2 }}
                className="bg-[#1a1a1a] border border-white/[0.07] p-8 rounded-[2rem] cursor-default group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>
                <span className="text-2xl text-white/20 group-hover:text-[#FF6A00] transition-colors duration-300">{s.icon}</span>
                <h3 className="mt-8 text-lg font-bold leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">{s.name}</h3>
                <p className="mt-3 text-xs text-white/30 uppercase tracking-widest">Digital Service</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── Case Studies ─────────────────────────────────── */}
      <section id="casistudio" className="pb-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
          <Section>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">
              Progetti Selezionati <span className="text-[#FF6A00]">/</span>
            </motion.h2>
          </Section>
        </div>

        <div className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-6 no-scrollbar">
          {caseStudies.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.02 }}
              className="min-w-[320px] lg:min-w-[420px] aspect-[4/5] relative rounded-[2.5rem] overflow-hidden group flex-shrink-0 cursor-pointer"
            >
              <img
                src={s.img}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[#FF6A00] font-bold text-[11px] uppercase tracking-[0.3em] mb-2">{s.service}</p>
                <h3 className="text-2xl font-black">{s.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-28">
        <Section>
          <motion.div
            variants={fadeUp}
            className="relative rounded-[3rem] overflow-hidden bg-[#FF6A00] p-16 lg:p-24 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            <p className="text-black/60 text-sm uppercase tracking-widest mb-4 font-medium">Pronto a crescere?</p>
            <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter italic text-black leading-tight mb-8">
              Costruiamo qualcosa <br /> di straordinario.
            </h2>
            <a
              href="mailto:ed.digitalagency@gmail.com"
              className="inline-block px-10 py-4 bg-black text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm"
            >
              Inizia ora
            </a>
          </motion.div>
        </Section>
      </section>

      {/* ── Partners ─────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Section>
            <motion.p variants={fadeUp} className="text-center text-xs text-white/25 uppercase tracking-widest mb-12">
              Technology partners
            </motion.p>
            <motion.div
              variants={stagger}
              className="flex flex-wrap justify-center items-center gap-10 lg:gap-20"
            >
              {partners.map((p) => (
                <motion.img
                  key={p.alt}
                  variants={fadeUp}
                  src={p.src}
                  alt={p.alt}
                  className="h-7 lg:h-8 w-auto invert opacity-30 hover:opacity-70 transition-opacity duration-300"
                />
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
