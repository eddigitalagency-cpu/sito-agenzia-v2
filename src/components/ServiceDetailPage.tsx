import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Service } from '../data/services';

const ease = [0.25, 0.1, 0.25, 1.0] as const;
const reveal = (i = 0) => ({
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: i * 0.1, ease },
});
const scaleIn = {
  initial:  { opacity: 0, scale: 0.97 },
  animate:  { opacity: 1, scale: 1 },
  transition: { duration: 1.0, ease },
};

function FaqAccordion({ faq }: { faq: Service['faq'] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faq.map((item, i) => (
        <div key={i} className="t-card t-border border rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            aria-expanded={open === i}
          >
            <span className="font-medium t-text text-sm md:text-base leading-snug">{item.question}</span>
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300" style={{ backgroundColor: 'rgba(255,106,0,0.12)', color: '#FF6A00', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25,0.1,0.25,1] }}
                style={{ overflow: 'hidden' }}
              >
                <p className="px-6 pb-5 font-[250] t-muted text-sm md:text-base leading-7" style={{ borderTop: '1px solid rgba(var(--c-text),0.06)', paddingTop: '1rem' }}>
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

interface Props { service: Service; related: Service[]; }

export default function ServiceDetailPage({ service, related }: Props) {
  return (
    <div className="t-bg t-text overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, Inter, system-ui, sans-serif' }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[460px] md:h-[70vh] md:min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.heroImage} alt={service.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.55) 50%, rgba(15,15,15,0.15) 100%)' }} />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-12 pb-12 md:pb-16">
          <motion.div {...reveal(0)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-5" style={{ borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.5)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block" />
            Servizio
          </motion.div>

          <motion.h1 {...reveal(1)} className="font-cal font-semibold uppercase tracking-tighter italic text-white text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.9]">
            {service.name}
          </motion.h1>

          <motion.p {...reveal(2)} className="font-[250] text-[#FF6A00] text-lg md:text-xl leading-tight italic mt-4 max-w-xl">
            {service.tagline}
          </motion.p>
        </div>
      </section>

      {/* ── Overview ──────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 py-20 md:py-24 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-6 md:space-y-8"
        >
          <motion.p variants={{ hidden: { opacity:0 }, visible: { opacity:1, transition:{ duration:0.6 } } }} className="text-xs t-text-30 uppercase tracking-widest">
            Overview
          </motion.p>
          <motion.p variants={{ hidden:{opacity:0,y:20}, visible:{opacity:1,y:0,transition:{duration:0.85,ease}} }} className="font-[250] t-muted text-base md:text-lg leading-7 md:leading-8">
            {service.longDescription}
          </motion.p>
          {service.platforms.length > 0 && (
            <motion.div variants={{ hidden:{opacity:0,y:16}, visible:{opacity:1,y:0,transition:{duration:0.7,ease}} }} className="flex flex-wrap gap-2">
              {service.platforms.map(p => (
                <span key={p} className="px-3 py-1.5 text-xs t-border border t-text-40 rounded-full" style={{ backgroundColor: 'rgba(var(--c-text),0.04)' }}>{p}</span>
              ))}
            </motion.div>
          )}
          <motion.a
            variants={{ hidden:{opacity:0,y:16}, visible:{opacity:1,y:0,transition:{duration:0.7,ease}} }}
            href="/contatti"
            className="inline-block px-8 py-4 bg-[#FF6A00] text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm"
          >
            Inizia il progetto
          </motion.a>
        </motion.div>

        <motion.div {...scaleIn} whileInView="animate" viewport={{ once: true, margin: '-60px' }} className="relative">
          <div className="absolute -inset-8 blur-[80px] rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(255,106,0,0.06)' }} />
          <img src={service.overviewImage} alt={service.name} className="relative z-10 w-full rounded-[2rem] md:rounded-[2.5rem] object-cover aspect-[4/3]" />
        </motion.div>
      </section>

      {/* ── Includes ──────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(var(--c-text),0.06)', borderBottom: '1px solid rgba(var(--c-text),0.06)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-16 md:py-20">
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="text-xs t-text-30 uppercase tracking-widest mb-8 md:mb-12">
            Cosa include
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {service.includes.map((item, i) => (
              <motion.div key={item} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay: i*0.07, ease }} className="flex items-start gap-4 p-5 md:p-6 t-card rounded-2xl t-border border">
                <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor:'rgba(255,106,0,0.12)', border:'1px solid rgba(255,106,0,0.35)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] block" />
                </span>
                <span className="font-[250] t-muted text-sm md:text-base leading-6">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 py-20 md:py-24">
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="text-xs t-text-30 uppercase tracking-widest mb-10 md:mb-14">
          Come lavoriamo
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {service.process.map((step, i) => (
            <motion.div key={step.step} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-40px' }} transition={{ duration:0.75, delay:i*0.1, ease }} className="space-y-4">
              <span className="text-4xl md:text-5xl font-black font-cal italic" style={{ color:'rgba(255,106,0,0.2)' }}>{step.step}</span>
              <h3 className="font-cal font-semibold t-text text-lg md:text-xl">{step.title}</h3>
              <p className="font-[250] t-muted text-sm leading-6">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-20 md:pb-24">
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="text-xs t-text-30 uppercase tracking-widest mb-8 md:mb-12">
          Lavori correlati
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {service.gallery.map((img, i) => (
            <motion.div
              key={img}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.75, delay:i*0.1, ease }}
              className={`relative overflow-hidden rounded-[2rem] group ${i===0 ? 'md:row-span-2' : ''}`}
              style={{ minHeight: i===0 ? 480 : 220 }}
            >
              <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" style={{ background:'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)' }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Related ───────────────────────────────────────── */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid rgba(var(--c-text),0.06)' }} className="py-20 md:py-24">
          <div className="max-w-[1400px] mx-auto px-5 md:px-12">
            <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="text-xs t-text-30 uppercase tracking-widest mb-10 md:mb-12">
              Servizi correlati
            </motion.p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((rel, i) => (
                <motion.a
                  key={rel.slug} href={`/servizi/${rel.slug}`}
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.08, ease }}
                  whileHover={{ y:-4 }}
                  className="group block t-card t-border border rounded-[2rem] overflow-hidden hover:border-[rgba(255,106,0,0.3)] transition-colors duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={rel.heroImage} alt={rel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5 md:p-6">
                    <p className="text-[10px] text-[#FF6A00] uppercase tracking-widest mb-1.5">Digital Service</p>
                    <h3 className="font-cal font-semibold t-text text-base md:text-lg group-hover:text-[#FF6A00] transition-colors">{rel.name}</h3>
                    <p className="font-[250] t-muted text-xs md:text-sm leading-5 mt-1.5 line-clamp-2">{rel.tagline}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ───────────────────────────────────────────── */}
      {service.faq.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-20 md:pb-24">
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="text-xs t-text-30 uppercase tracking-widest mb-8 md:mb-12">
            Domande frequenti
          </motion.p>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, ease }} className="max-w-3xl">
            <FaqAccordion faq={service.faq} />
          </motion.div>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }} className="mt-8">
            <a href="/contatti" className="inline-flex items-center gap-2 text-[#FF6A00] text-sm font-medium hover:underline">
              Hai altre domande? Contattaci →
            </a>
          </motion.div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-24 md:pb-32">
        <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9, ease }} className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-[#FF6A00] px-8 py-14 md:p-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <p className="text-black/60 text-xs uppercase tracking-widest mb-4 font-medium">Inizia oggi</p>
          <h2 className="font-cal font-semibold uppercase tracking-tighter italic text-black text-3xl md:text-6xl leading-tight mb-8">
            Parliamo del <br className="hidden sm:block" /> tuo progetto.
          </h2>
          <a href="/contatti" className="inline-block px-8 md:px-10 py-4 bg-black text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm">
            Scrivici ora
          </a>
        </motion.div>
      </section>

    </div>
  );
}
