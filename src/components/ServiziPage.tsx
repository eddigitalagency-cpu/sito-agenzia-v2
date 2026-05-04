import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

const services = [
  {
    id: 'social',
    name: 'Social Media Management',
    tagline: 'Costruiamo community, non solo follower.',
    description:
      'Gestiamo i tuoi canali social da zero a cento: strategia editoriale mensile, creazione di contenuti visivi e testuali, pubblicazione e community management. Ogni post ha uno scopo preciso.',
    includes: [
      'Strategia editoriale su misura',
      'Creazione grafica e copywriting',
      'Pubblicazione e scheduling',
      'Community management',
      'Report mensile delle performance',
    ],
    platforms: ['Instagram', 'Facebook', 'LinkedIn', 'TikTok'],
    color: '#FF6A00',
    size: 'lg',
  },
  {
    id: 'advertising',
    name: 'Advertising',
    tagline: 'Ogni euro investito deve tornare moltiplicato.',
    description:
      'Campagne a pagamento su Meta, Google e TikTok con targeting laser. Ottimizzazione continua basata sui dati reali del tuo business.',
    includes: [
      'Campagne Meta Ads (FB + IG)',
      'Google Ads (Search, Display, Shopping)',
      'TikTok Ads',
      'A/B testing su creatività e audience',
      'Report settimanali con KPI chiari',
    ],
    platforms: ['Meta', 'Google', 'TikTok'],
    color: '#FF6A00',
    size: 'sm',
  },
  {
    id: 'website',
    name: 'Website',
    tagline: 'Il tuo sito web lavora per te, 24/7.',
    description:
      'Progettiamo e sviluppiamo siti web custom che convertono i visitatori in clienti. Veloci, responsive, ottimizzati per i motori di ricerca.',
    includes: [
      'Design UI/UX su misura',
      'Sviluppo su WordPress o Astro/React',
      'Ottimizzazione SEO on-page',
      'Integrazione Google Analytics 4',
      'Hosting e manutenzione inclusi nel primo anno',
    ],
    platforms: ['WordPress', 'Astro', 'React'],
    color: '#FF6A00',
    size: 'sm',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    tagline: 'Negozi online che vendono davvero.',
    description:
      'Dal catalogo prodotti al checkout, costruiamo e-commerce performanti su Shopify o WooCommerce. Setup completo con pagamenti, spedizioni e gestione ordini.',
    includes: [
      'Setup Shopify o WooCommerce',
      'Design tema custom',
      'Integrazione gateway di pagamento',
      'Configurazione spedizioni e tasse',
      'Formazione per la gestione autonoma',
    ],
    platforms: ['Shopify', 'WooCommerce'],
    color: '#FF6A00',
    size: 'lg',
  },
  {
    id: 'photo-video',
    name: 'Photo & Video',
    tagline: 'Il tuo brand merita contenuti straordinari.',
    description:
      'Produzione fotografica e video professionale per ogni esigenza: shooting prodotti, video istituzionale, contenuti per social e campagne advertising.',
    includes: [
      'Shooting fotografico prodotti e team',
      'Video istituzionale e brand film',
      'Reels e contenuti verticali per social',
      'Editing e color grading professionale',
      'Consegna file ottimizzati per ogni piattaforma',
    ],
    platforms: [],
    color: '#FF6A00',
    size: 'sm',
  },
  {
    id: 'identity',
    name: 'Visual Identity',
    tagline: 'Un brand riconoscibile vale più di mille pubblicità.',
    description:
      'Creiamo identità visive coerenti e memorabili. Dal logo al brandbook completo, ogni elemento è progettato per comunicare i valori del tuo brand.',
    includes: [
      'Logo design + varianti',
      'Palette colori e tipografia',
      'Brand guidelines (brandbook)',
      'Template social e materiali stampati',
      'Mockup e presentazione finale',
    ],
    platforms: [],
    color: '#FF6A00',
    size: 'sm',
  },
  {
    id: 'mvp',
    name: 'MVP & SaaS',
    tagline: "Dal prototipo al prodotto in settimane, non anni.",
    description:
      'Trasformiamo la tua idea in un prodotto digitale funzionante. Sviluppiamo MVP con le tecnologie più moderne per validare il mercato rapidamente.',
    includes: [
      'Discovery e definizione del prodotto',
      'UX design e prototipo interattivo',
      'Sviluppo full-stack (Next.js, Node, Supabase)',
      'Deploy su infrastruttura cloud scalabile',
      'Supporto post-lancio e iterazioni',
    ],
    platforms: ['Next.js', 'Supabase', 'Railway'],
    color: '#FF6A00',
    size: 'lg',
  },
  {
    id: 'app',
    name: 'App',
    tagline: 'La tua app nelle tasche dei tuoi clienti.',
    description:
      "Sviluppiamo applicazioni mobile iOS e Android con React Native. Un'unica codebase, due piattaforme, esperienza nativa.",
    includes: [
      'UX/UI design nativo (iOS & Android)',
      'Sviluppo React Native cross-platform',
      'Integrazione API e backend',
      'Pubblicazione su App Store e Google Play',
      'Manutenzione e aggiornamenti',
    ],
    platforms: ['iOS', 'Android', 'React Native'],
    color: '#FF6A00',
    size: 'sm',
  },
];

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

      {/* ── Services Grid ────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <div className="space-y-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group bg-[#141414] border border-white/[0.07] rounded-[2.5rem] overflow-hidden hover:border-[#FF6A00]/30 transition-colors duration-500"
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

                  <h2 className="font-cal font-semibold text-white text-3xl lg:text-4xl leading-tight">
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

              {/* Bottom bar — CTA */}
              <div className="px-10 md:px-14 py-6 border-t border-white/[0.05] flex items-center justify-between gap-4">
                <span className="font-body font-[250] text-body-text text-sm">
                  Vuoi sapere di più su questo servizio?
                </span>
                <a
                  href="mailto:ed.digitalagency@gmail.com"
                  className="flex-shrink-0 px-6 py-2.5 border border-white/15 rounded-full text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-200 uppercase tracking-widest"
                >
                  Contattaci
                </a>
              </div>
            </motion.div>
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
