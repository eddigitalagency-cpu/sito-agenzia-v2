import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import WorldGlobe, { type OfficeMarker } from './WorldGlobe';
import { dict, type Lang } from '../i18n/dictionary';

interface Props {
  offices: OfficeMarker[];
  lang?: Lang;
}

export default function OfficesGlobeSection({ offices, lang = 'it' }: Props) {
  const t = dict[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  if (!offices.length) return null;

  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-center text-xs uppercase tracking-[0.2em] mb-4 font-medium" style={{ color: 'rgba(var(--c-text),0.55)' }}>
            {t.home.officesLabel}
          </p>
          <h2
            className="font-cal font-semibold uppercase italic t-text leading-tight text-center mb-10"
            style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.03em' }}
          >
            {t.home.officesTitle}<span className="text-[#FF6A00]">.</span>
          </h2>

          <div>
            <div className="pt-4 pb-4 px-4">
              <WorldGlobe offices={offices} />
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 px-6 pt-2">
              {offices.map((o) => (
                <a
                  key={`${o.code}-${o.label}`}
                  href={o.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs md:text-sm hover:text-[#FF6A00] transition-colors"
                  style={{ color: 'rgba(var(--c-text),0.6)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block flex-shrink-0" />
                  {o.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
