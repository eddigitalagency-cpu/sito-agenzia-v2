import { motion } from 'framer-motion';
import type { Project } from '../data/projects';

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProjectDetailPage({ project }: { project: Project }) {
  return (
    <div className="t-bg t-text overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, system-ui, sans-serif' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.45)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(var(--c-bg)) 0%, transparent 60%)' }} />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-12 pb-16 pt-40 w-full">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
            {/* Back link */}
            <a href="/#casistudio" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] mb-8 hover:text-[#FF6A00] transition-colors"
              style={{ color: 'rgba(var(--c-text),0.4)' }}>
              ← Portfolio
            </a>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{ background: 'rgba(255,106,0,0.15)', color: '#FF6A00' }}>
                {project.service}
              </span>
              <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(var(--c-text),0.3)' }}>
                {project.year}
              </span>
            </div>

            <h1 className="font-cal font-semibold uppercase italic t-text leading-[0.9] tracking-tight mb-4"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
              {project.title}
            </h1>
            <p className="text-lg md:text-xl font-[250] max-w-xl" style={{ color: 'rgba(var(--c-muted),1)' }}>
              {project.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_360px] gap-16 md:gap-24 items-start">

          {/* Left: description + what we did */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }}>
            <p className="text-xs uppercase tracking-[0.2em] mb-4 font-medium" style={{ color: 'rgba(var(--c-text),0.35)' }}>
              Il progetto
            </p>
            <p className="text-base md:text-lg font-[250] leading-8 mb-14" style={{ color: 'rgba(var(--c-muted),1)' }}>
              {project.description}
            </p>

            <p className="text-xs uppercase tracking-[0.2em] mb-8 font-medium" style={{ color: 'rgba(var(--c-text),0.35)' }}>
              Cosa abbiamo fatto
            </p>
            <ul className="space-y-4">
              {project.what.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF6A00] flex-shrink-0" />
                  <span className="text-sm md:text-base font-[250] leading-7" style={{ color: 'rgba(var(--c-muted),1)' }}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: results + service CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="md:sticky md:top-28 space-y-4"
          >
            {/* Results */}
            <div className="rounded-[1.75rem] p-7" style={{ background: 'rgb(var(--c-card))', border: '1px solid rgba(var(--c-text),0.07)' }}>
              <p className="text-xs uppercase tracking-[0.2em] mb-6 font-medium" style={{ color: 'rgba(var(--c-text),0.35)' }}>
                Risultati
              </p>
              <div className="space-y-6">
                {project.results.map((r, i) => (
                  <div key={i}>
                    <p className="font-cal font-semibold italic text-3xl text-[#FF6A00] leading-none mb-1">{r.value}</p>
                    <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'rgba(var(--c-text),0.4)' }}>{r.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service pill */}
            <a href={`/servizi/${project.serviceSlug}`}
              className="flex items-center justify-between gap-4 rounded-[1.75rem] p-6 group transition-colors duration-300"
              style={{ background: 'rgb(var(--c-card))', border: '1px solid rgba(var(--c-text),0.07)' }}
            >
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(var(--c-text),0.35)' }}>Servizio</p>
                <p className="font-semibold text-sm group-hover:text-[#FF6A00] transition-colors">{project.service}</p>
              </div>
              <span className="w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#FF6A00] group-hover:text-black transition-all duration-300"
                style={{ border: '1px solid rgba(var(--c-text),0.15)' }}>→</span>
            </a>

            {/* CTA */}
            <a href="/contatti"
              className="block w-full text-center py-4 rounded-[1.75rem] font-bold text-sm uppercase tracking-widest transition-all duration-200 active:scale-[0.98]"
              style={{ background: '#FF6A00', color: '#000' }}>
              Vuoi un progetto simile? →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Full image ───────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-12 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="rounded-[2rem] overflow-hidden"
          style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' } as React.CSSProperties}
        >
          <img src={project.img} alt={project.title} className="w-full h-auto object-cover" />
        </motion.div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-12 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
          className="rounded-[2.5rem] overflow-hidden text-center px-8 py-16 md:py-20"
          style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #FF8C00 100%)' }}
        >
          <p className="text-black/60 text-xs uppercase tracking-[0.2em] font-medium mb-4">Lavoriamo insieme</p>
          <h2 className="font-cal font-semibold uppercase italic text-black leading-tight tracking-tight mb-8"
            style={{ fontSize: 'clamp(2rem,5vw,4rem)' }}>
            Costruiamo il tuo<br className="hidden sm:block" /> prossimo progetto.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contatti"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold rounded-full hover:scale-[1.04] active:scale-[0.97] transition-transform text-sm uppercase tracking-widest">
              Inizia ora →
            </a>
            <a href="/#casistudio"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black/20 text-black font-semibold rounded-full hover:bg-black/30 transition-colors text-sm uppercase tracking-widest">
              Altri progetti
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
