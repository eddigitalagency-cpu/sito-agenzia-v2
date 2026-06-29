import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_img: string;
  author: string;
  read_time: number;
  created_at: string;
}

interface Props {
  posts: BlogPost[];
}

const ease = [0.25, 0.1, 0.25, 1.0] as const;

const CATEGORIES = ['Tutti', 'Social Media', 'Advertising', 'Web Design', 'E-Commerce', 'SEO', 'Brand Identity', 'AI & Automazioni'];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, delay: index * 0.06, ease }}
      className="group block t-card t-border border rounded-[1.75rem] overflow-hidden hover:border-[rgba(255,106,0,0.35)] transition-all duration-400"
    >
      {/* Cover image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: 'rgba(var(--c-text),0.05)' }}>
        {post.cover_img ? (
          <img
            src={post.cover_img}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: 'rgba(var(--c-text),0.15)' }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="m3 9 4-4 4 4 4-4 4 4" />
              <circle cx="8.5" cy="13.5" r="1.5" />
            </svg>
          </div>
        )}
        {/* Category badge */}
        {post.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ background: '#FF6A00', color: '#000' }}>
              {post.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 space-y-4">
        <h2 className="font-cal font-semibold t-text text-xl md:text-2xl leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="t-muted text-sm leading-relaxed font-[300]" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 text-xs" style={{ color: 'rgba(var(--c-text),0.35)' }}>
            <span>{formatDate(post.created_at)}</span>
            <span>·</span>
            <span>{post.read_time} min di lettura</span>
          </div>
          <span className="text-xs font-semibold text-[#FF6A00] group-hover:translate-x-1 transition-transform duration-300 inline-block">
            Leggi →
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function BlogPage({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState('Tutti');

  const categories = ['Tutti', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))];
  const filtered = activeCategory === 'Tutti' ? posts : posts.filter(p => p.category === activeCategory);

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <div className="t-bg t-text overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, Inter, system-ui, sans-serif' }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="space-y-7">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full t-border border t-text-50 text-xs uppercase tracking-widest" style={{ backgroundColor: 'rgba(var(--c-text),0.04)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block" />
              Risorse & Approfondimenti
            </div>
          </FadeIn>
          <FadeIn delay={0.07}>
            <h1 className="font-cal font-semibold uppercase tracking-tighter italic t-text text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.9]">
              Blog <br /><span className="text-[#FF6A00]">ED Digital</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="t-muted font-[250] text-base leading-6 max-w-xl">
              Strategie, guide e casi studio sul marketing digitale per le piccole e medie imprese italiane.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Category filter ───────────────────────────────── */}
      {posts.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-10">
          <FadeIn>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                  style={
                    activeCategory === cat
                      ? { background: '#FF6A00', color: '#000' }
                      : { background: 'rgba(var(--c-text),0.06)', color: 'rgba(var(--c-text),0.55)', border: '1px solid rgba(var(--c-text),0.1)' }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {/* ── Posts ─────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-24 md:pb-32">
        {filtered.length === 0 ? (
          <FadeIn>
            <div className="text-center py-24" style={{ color: 'rgba(var(--c-text),0.25)' }}>
              <p className="text-5xl mb-4">✦</p>
              <p className="text-base">Nessun articolo {activeCategory !== 'Tutti' ? `in "${activeCategory}"` : 'ancora'}.</p>
              {activeCategory !== 'Tutti' && (
                <button onClick={() => setActiveCategory('Tutti')} className="mt-4 text-[#FF6A00] text-sm hover:underline">
                  Vedi tutti gli articoli
                </button>
              )}
            </div>
          </FadeIn>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <motion.a
                href={`/blog/${featured.slug}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.85, ease }}
                className="group block t-card t-border border rounded-[2rem] overflow-hidden hover:border-[rgba(255,106,0,0.35)] transition-all duration-400 mb-8"
              >
                <div className="md:grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ minHeight: 280, background: 'rgba(var(--c-text),0.05)' }}>
                    {featured.cover_img ? (
                      <img
                        src={featured.cover_img}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center absolute inset-0">
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: 'rgba(var(--c-text),0.1)' }}>
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="m3 9 4-4 4 4 4-4 4 4" />
                          <circle cx="8.5" cy="13.5" r="1.5" />
                        </svg>
                      </div>
                    )}
                    {featured.category && (
                      <div className="absolute top-5 left-5 z-10">
                        <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ background: '#FF6A00', color: '#000' }}>
                          {featured.category}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-5">
                    <span className="text-xs text-[#FF6A00] uppercase tracking-widest font-semibold">Articolo in evidenza</span>
                    <h2 className="font-cal font-semibold t-text text-2xl md:text-4xl leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="t-muted text-sm md:text-base leading-relaxed font-[300]">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3 text-xs" style={{ color: 'rgba(var(--c-text),0.35)' }}>
                        <span>{formatDate(featured.created_at)}</span>
                        <span>·</span>
                        <span>{featured.read_time} min</span>
                      </div>
                      <span className="text-sm font-semibold text-[#FF6A00] group-hover:translate-x-1 transition-transform duration-300 inline-block">
                        Leggi l'articolo →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            )}

            {/* Rest grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-24 md:pb-32">
        <FadeIn>
          <div className="t-card t-border border rounded-[2rem] p-10 md:p-16 text-center space-y-6">
            <p className="text-xs text-[#FF6A00] uppercase tracking-widest font-semibold">Vuoi crescere online?</p>
            <h2 className="font-cal font-semibold uppercase tracking-tighter italic t-text text-[clamp(2rem,5vw,3.5rem)] leading-[0.95]">
              Parliamo del <br /><span className="text-[#FF6A00]">tuo progetto</span>
            </h2>
            <a
              href="/contatti"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-200 active:scale-95"
              style={{ background: '#FF6A00', color: '#000' }}
            >
              Inizia ora →
            </a>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
