import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';

// Apple ease
const ease = [0.16, 1, 0.3, 1] as const;

// Clip-path text reveal (Apple style)
const clipReveal = {
  hidden:  { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 16 },
  visible: (i = 0) => ({
    clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0,
    transition: { duration: 1.0, delay: i * 0.1, ease },
  }),
};

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

// Counter animation hook
function useCountUp(target: number, suffix = '') {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return controls.stop;
  }, [inView]);

  return ref;
}

// ── Cycling hero word ──────────────────────────────────────
const cyclingWords = [
  'creatività',
  'strategia',
  'innovazione',
  'identità',
  'performance',
  'visione',
  'crescita',
];

function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % cyclingWords.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block align-bottom" style={{ minWidth: '0.6em' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={cyclingWords[index]}
          className="inline-block text-[#FF6A00]"
          initial={{ clipPath: 'inset(0 0 100% 0)', y: '60%', opacity: 0 }}
          animate={{ clipPath: 'inset(0 0 0% 0)', y: '0%', opacity: 1 }}
          exit={{ clipPath: 'inset(100% 0 0% 0)', y: '-60%', opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {cyclingWords[index]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Marquee strip ──────────────────────────────────────────
const marqueeItems = [
  'Social Media', 'Advertising', 'Web Design', 'E-Commerce',
  'Photo & Video', 'Visual Identity', 'MVP & SaaS', 'App Development',
  'Brand Strategy', 'Digital Growth',
];

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden py-5 border-y" style={{ borderColor: 'rgba(var(--c-text),0.06)' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="flex gap-10 whitespace-nowrap"
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-medium uppercase tracking-[0.18em]" style={{ color: 'rgba(var(--c-text),0.25)' }}>
            {item}
            <span className="text-[#FF6A00]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Services bento ─────────────────────────────────────────
const services = [
  { name: 'Social Media Management', slug: 'social-media-management', tagline: 'Community che converte.', span: 'lg:col-span-2', gradient: 'from-orange-500/10 via-transparent' },
  { name: 'Advertising',             slug: 'advertising',             tagline: 'ROI misurabile.',       span: 'lg:col-span-1', gradient: 'from-violet-500/8 via-transparent' },
  { name: 'Website',                 slug: 'website',                 tagline: '24/7 per te.',          span: 'lg:col-span-1', gradient: 'from-blue-500/8 via-transparent' },
  { name: 'E-Commerce',              slug: 'ecommerce',               tagline: 'Negozi che vendono.',   span: 'lg:col-span-2', gradient: 'from-emerald-500/8 via-transparent' },
  { name: 'Photo & Video',           slug: 'photo-video',             tagline: 'Contenuti straordinari.', span: 'lg:col-span-1', gradient: 'from-pink-500/8 via-transparent' },
  { name: 'Visual Identity',         slug: 'visual-identity',         tagline: 'Brand memorabile.',    span: 'lg:col-span-1', gradient: 'from-yellow-500/8 via-transparent' },
  { name: 'MVP & SaaS',              slug: 'mvp-saas',                tagline: 'Idea → Prodotto.',      span: 'lg:col-span-1', gradient: 'from-cyan-500/8 via-transparent' },
  { name: 'App',                     slug: 'app',                     tagline: 'Nelle loro tasche.',    span: 'lg:col-span-1', gradient: 'from-indigo-500/8 via-transparent' },
  { name: 'Integrazioni & Automazioni', slug: 'integrazioni',         tagline: 'Stack connesso, zero sprechi.', span: 'lg:col-span-1', gradient: 'from-teal-500/8 via-transparent' },
];

type CaseStudy = { slug: string; title: string; service: string; services?: string[]; img: string };

const partners = [
  { src: '/Images/shopify-partner.png',                alt: 'Shopify' },
  { src: '/Images/wordpress-logo-png-transparent.png', alt: 'WordPress' },
  { src: '/Images/keliweb-logo-e1522914795801.png',     alt: 'Keliweb' },
  { src: '/Images/Logo-Litchi-solutions-intero.svg',     alt: 'Litchi' },
];

// ── Stats ──────────────────────────────────────────────────
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useCountUp(value, suffix);
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { once: true });
  return (
    <motion.div ref={wrapRef} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease }} className="text-center space-y-2">
      <p className="text-5xl md:text-6xl font-black italic font-cal text-[#FF6A00] tabular-nums">
        <span ref={ref}>0{suffix}</span>
      </p>
      <p className="text-xs uppercase tracking-[0.18em] font-medium" style={{ color: 'rgba(var(--c-text),0.35)' }}>{label}</p>
    </motion.div>
  );
}

export default function HomePage({ projects = [] }: { projects?: CaseStudy[] }) {
  const caseStudies = projects;
  const heroRef = useRef(null);
  const caseScrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Wheel → horizontal scroll with lerp for case studies
  useEffect(() => {
    const el = caseScrollRef.current;
    if (!el) return;
    let target = 0;
    let rafId = 0;

    const tick = () => {
      const dx = target - el.scrollLeft;
      if (Math.abs(dx) < 0.5) { el.scrollLeft = target; return; }
      el.scrollLeft += dx * 0.1;
      rafId = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, target + e.deltaY));
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    const syncTarget = () => { target = el.scrollLeft; };
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('pointerenter', syncTarget);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerenter', syncTarget);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Hero parallax
  const heroTextY    = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity  = useTransform(scrollY, [0, 400], [1, 0]);
  const heroImageY   = useTransform(scrollY, [0, 600], [40, -40]);
  const heroImageScale = useTransform(scrollY, [0, 600], [1, 1.06]);

  return (
    <div className="t-bg t-text overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, system-ui, sans-serif' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.07) 0%, transparent 65%)' }} />
        </div>


        {/* Content */}
        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10 text-center px-5 max-w-6xl mx-auto pt-24 pb-16">

          {/* Label */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.1, ease }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border text-xs uppercase tracking-[0.2em] font-medium mb-10"
            style={{ borderColor:'rgba(var(--c-text),0.1)', backgroundColor:'rgba(var(--c-text),0.04)', color:'rgba(var(--c-text),0.5)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse inline-block" />
            Partner Strategico Digitale
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease }}
              className="font-cal font-semibold uppercase italic t-text leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)' }}
            >
              La nostra <CyclingWord />
              <br />La tua visione.
            </motion.h1>
          </div>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.45, ease }}
            className="font-[250] text-base md:text-xl leading-relaxed max-w-xl mx-auto mt-8 mb-10"
            style={{ color:'rgba(var(--c-muted),1)' }}>
            Strategie sartoriali per brand che non temono di farsi notare.
            <br className="hidden md:block" /> Dal digitale al fisico, sempre con un obiettivo: far crescere il tuo business.
          </motion.p>

          {/* Buttons */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.6, ease }} className="flex flex-wrap items-center justify-center gap-4">
            <a href="#casistudio" className="px-8 py-4 bg-[#FF6A00] text-black font-bold rounded-full hover:scale-[1.03] active:scale-[0.97] transition-transform text-sm uppercase tracking-widest shadow-lg shadow-orange-500/20">
              I Nostri Lavori
            </a>
            <a href="/contatti" className="px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-widest transition-all active:scale-[0.97]"
              style={{ border:'1px solid rgba(var(--c-text),0.15)', color:'rgb(var(--c-text))' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(var(--c-text),0.07)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; }}>
              Inizia un progetto →
            </a>
          </motion.div>
        </motion.div>


        {/* Scroll hint */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.6, duration:0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color:'rgba(var(--c-text),0.2)' }}>Scorri</span>
          <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.5, repeat:Infinity, ease:'easeInOut' }}
            className="w-px h-8" style={{ background:'linear-gradient(to bottom, rgba(var(--c-text),0.3), transparent)' }} />
        </motion.div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <Marquee />

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
            <StatItem value={200} suffix="+" label="Progetti completati" />
            <StatItem value={5}   suffix="+"  label="Anni di esperienza" />
            <StatItem value={98}  suffix="%" label="Clienti soddisfatti" />
            <StatItem value={3}   suffix="×"  label="Crescita media" />
          </div>
        </div>
      </section>

      {/* ── STATEMENT ────────────────────────────────────── */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          <Section>
            <motion.p variants={clipReveal}
              className="font-cal font-semibold italic t-text leading-tight tracking-tight text-center"
              style={{ fontSize:'clamp(1.8rem,4.5vw,3.5rem)', letterSpacing:'-0.03em' }}>
              Non siamo solo un'agenzia. <br />
              <span className="text-[#FF6A00]">Siamo il motore digitale</span> <br />
              della tua crescita.
            </motion.p>
          </Section>
        </div>
      </section>

      {/* ── SERVICES BENTO ───────────────────────────────── */}
      <section id="services" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          <Section>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] mb-4 font-medium" style={{ color:'rgba(var(--c-text),0.35)' }}>Cosa facciamo</p>
                <h2 className="font-cal font-semibold uppercase italic t-text leading-tight"
                  style={{ fontSize:'clamp(2.2rem,5vw,3.8rem)', letterSpacing:'-0.03em' }}>
                  Servizi<span className="text-[#FF6A00]">.</span>
                </h2>
              </div>
              <a href="/servizi" className="text-sm font-semibold text-[#FF6A00] hover:opacity-70 transition-opacity shrink-0">
                Vedi tutti →
              </a>
            </motion.div>
          </Section>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px]">
            {services.map((s, i) => (
              <motion.a
                key={s.slug}
                href={`/servizi/${s.slug}`}
                initial={{ opacity:0, y:32, scale:0.97 }}
                whileInView={{ opacity:1, y:0, scale:1 }}
                viewport={{ once:true, margin:'-40px' }}
                transition={{ duration:0.85, delay: i * 0.06, ease }}
                whileHover={{ scale:1.02, y:-2 }}
                className={`group relative rounded-[1.75rem] overflow-hidden flex flex-col justify-end p-7 ${s.span}`}
                style={{ backgroundColor:'rgb(var(--c-card))', border:'1px solid rgba(var(--c-text),0.07)' }}
              >
                {/* gradient bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* hover glow border */}
                <div className="absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ boxShadow:'inset 0 0 0 1px rgba(255,106,0,0.25)' }} />

                {/* Number */}
                <span className="absolute top-6 right-7 text-5xl font-black font-cal italic opacity-[0.07] group-hover:opacity-[0.12] transition-opacity" style={{ color:'rgb(var(--c-text))' }}>
                  {String(i+1).padStart(2,'0')}
                </span>

                <div className="relative z-10 space-y-1.5">
                  <p className="text-xs uppercase tracking-[0.15em] font-medium group-hover:text-[#FF6A00] transition-colors" style={{ color:'rgba(var(--c-text),0.35)' }}>
                    {s.tagline}
                  </p>
                  <h3 className="font-cal font-semibold t-text text-xl md:text-2xl leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">
                    {s.name}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────── */}
      <section id="casistudio" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 mb-12">
          <Section>
            <motion.div variants={fadeUp} className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] mb-4 font-medium" style={{ color:'rgba(var(--c-text),0.35)' }}>Portfolio</p>
                <h2 className="font-cal font-semibold uppercase italic t-text leading-tight"
                  style={{ fontSize:'clamp(2.2rem,5vw,3.8rem)', letterSpacing:'-0.03em' }}>
                  Progetti<span className="text-[#FF6A00]">.</span>
                </h2>
              </div>
            </motion.div>
          </Section>
        </div>

        {/* Swipe hint — mobile only */}
        <p className="md:hidden text-center text-[11px] uppercase tracking-[0.18em] mb-4 px-5" style={{ color: 'rgba(var(--c-text),0.25)' }}>
          ← scorri per vedere altri →
        </p>

        <div ref={caseScrollRef} className="flex gap-4 md:gap-5 overflow-x-auto px-5 md:px-12 pb-6 no-scrollbar" style={{ cursor: 'grab', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          {caseStudies.map((s, i) => (
            <motion.a
              key={s.title}
              href={`/progetti/${s.slug}`}
              initial={{ opacity:0, x:40 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:0.8, delay:i*0.07, ease }}
              whileHover={{ scale:1.02, y:-4 }}
              className="min-w-[260px] sm:min-w-[320px] lg:min-w-[380px] aspect-[3/4] relative rounded-[2rem] overflow-hidden flex-shrink-0 group border-0 outline-none ring-0"
              style={{ isolation: 'isolate', transform: 'translateZ(0)', willChange: 'transform' } as React.CSSProperties}
            >
              <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background:'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0) 55%)' }} />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[#FF6A00] text-[10px] uppercase tracking-[0.25em] font-bold mb-1.5">
                  {(s.services?.length ? s.services : [s.service]).join(' · ')}
                </p>
                <h3 className="text-white text-xl md:text-2xl font-black">{s.title}</h3>
              </div>
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="px-5 md:px-12 pb-24 md:pb-32">
        <div className="max-w-[1200px] mx-auto">
          <Section>
            <motion.div variants={fadeUp}
              className="relative rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden text-center px-8 py-20 md:py-28"
              style={{ background:'linear-gradient(135deg, #FF6A00 0%, #FF8C00 100%)' }}
            >
              <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at top, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <p className="text-black/60 text-xs uppercase tracking-[0.2em] font-medium mb-6">Pronto a crescere?</p>
                <h2 className="font-cal font-semibold uppercase italic text-black leading-tight tracking-tight mb-10"
                  style={{ fontSize:'clamp(2.4rem,6vw,5rem)', letterSpacing:'-0.03em' }}>
                  Costruiamo qualcosa<br className="hidden sm:block" /> di straordinario.
                </h2>
                <a href="/contatti"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white font-bold rounded-full hover:scale-[1.04] active:scale-[0.97] transition-transform text-sm uppercase tracking-widest shadow-xl shadow-black/30">
                  Inizia ora
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── PARTNERS ─────────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          <Section>
            <motion.p variants={fadeUp} className="text-center text-[10px] uppercase tracking-[0.2em] mb-12 font-medium" style={{ color:'rgba(var(--c-text),0.2)' }}>
              Technology partners
            </motion.p>
            <motion.div variants={stagger} className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
              {partners.map(p => (
                <motion.img key={p.alt} variants={fadeUp} src={p.src} alt={p.alt}
                  className="h-6 md:h-7 w-auto opacity-20 hover:opacity-50 transition-opacity duration-400"
                  style={{ filter:'var(--partner-filter)' }} />
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
