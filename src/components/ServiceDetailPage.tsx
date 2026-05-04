import { motion } from 'framer-motion';
import type { Service } from '../data/services';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

interface Props {
  service: Service;
  related: Service[];
}

export default function ServiceDetailPage({ service, related }: Props) {
  return (
    <div className="bg-[#0f0f0f] text-white overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, Inter, system-ui, sans-serif' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.heroImage}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-[#0f0f0f]/20" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm text-xs text-white/50 uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block" />
            Servizio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-cal font-semibold uppercase tracking-tighter italic text-white text-5xl leading-tight lg:text-heading"
          >
            {service.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-body font-[250] text-[#FF6A00] text-xl leading-tight italic mt-4 max-w-xl"
          >
            {service.tagline}
          </motion.p>
        </div>
      </section>

      {/* ── Overview ─────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-8"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs text-white/30 uppercase tracking-widest"
          >
            Overview
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="font-body font-[250] text-body-text text-lg leading-8"
          >
            {service.longDescription}
          </motion.p>

          {service.platforms.length > 0 && (
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-2">
              {service.platforms.map((p) => (
                <span key={p} className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full text-white/50">
                  {p}
                </span>
              ))}
            </motion.div>
          )}

          <motion.a
            variants={fadeUp}
            custom={3}
            href="mailto:ed.digitalagency@gmail.com"
            className="inline-block px-8 py-4 bg-[#FF6A00] text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm"
          >
            Inizia il progetto
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="absolute -inset-8 bg-[#FF6A00]/6 blur-[80px] rounded-full pointer-events-none" />
          <img
            src={service.overviewImage}
            alt={service.name}
            className="relative z-10 w-full rounded-[2.5rem] object-cover aspect-[4/3]"
          />
        </motion.div>
      </section>

      {/* ── Includes ─────────────────────────────────────── */}
      <section className="border-y border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs text-white/30 uppercase tracking-widest mb-12"
          >
            Cosa include
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.includes.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-start gap-4 p-6 bg-[#141414] rounded-2xl border border-white/[0.06]"
              >
                <span className="mt-1 w-5 h-5 rounded-full bg-[#FF6A00]/15 border border-[#FF6A00]/40 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] block" />
                </span>
                <span className="font-body font-[250] text-body-text text-base leading-6">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs text-white/30 uppercase tracking-widest mb-12"
        >
          Come lavoriamo
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {i < service.process.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent z-0" />
              )}
              <div className="relative z-10 space-y-4">
                <span className="text-4xl font-black text-[#FF6A00]/20 font-cal italic">{step.step}</span>
                <h3 className="font-cal font-semibold text-white text-xl">{step.title}</h3>
                <p className="font-body font-[250] text-body-text text-sm leading-6">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs text-white/30 uppercase tracking-widest mb-12"
        >
          Lavori correlati
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {service.gallery.map((img, i) => (
            <motion.div
              key={img}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`relative overflow-hidden rounded-[2rem] group ${i === 0 ? 'md:row-span-2' : ''}`}
              style={{ minHeight: i === 0 ? '500px' : '240px' }}
            >
              <img
                src={img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Related Services ─────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-white/[0.06] py-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs text-white/30 uppercase tracking-widest mb-12"
            >
              Servizi correlati
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((rel, i) => (
                <motion.a
                  key={rel.slug}
                  href={`/servizi/${rel.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group block bg-[#141414] border border-white/[0.07] rounded-[2rem] overflow-hidden hover:border-[#FF6A00]/30 transition-colors duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={rel.heroImage}
                      alt={rel.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] text-[#FF6A00] uppercase tracking-widest mb-2">Digital Service</p>
                    <h3 className="font-cal font-semibold text-white text-lg group-hover:text-[#FF6A00] transition-colors">{rel.name}</h3>
                    <p className="font-body font-[250] text-body-text text-sm leading-5 mt-2 line-clamp-2">{rel.tagline}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-[3rem] overflow-hidden bg-[#FF6A00] p-16 lg:p-24 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <p className="text-black/60 text-sm uppercase tracking-widest mb-4 font-medium">Inizia oggi</p>
          <h2 className="font-cal font-semibold uppercase tracking-tighter italic text-black text-4xl lg:text-6xl leading-tight mb-8">
            Parliamo del <br /> tuo progetto.
          </h2>
          <a
            href="mailto:ed.digitalagency@gmail.com"
            className="inline-block px-10 py-4 bg-black text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm"
          >
            Scrivici ora
          </a>
        </motion.div>
      </section>

    </div>
  );
}
