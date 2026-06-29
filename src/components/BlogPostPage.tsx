import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface BlogPostFull {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  cover_img: string;
  author: string;
  read_time: number;
  created_at: string;
}

interface Props {
  post: BlogPostFull;
}

const ease = [0.25, 0.1, 0.25, 1.0] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function BlogPostPage({ post }: Props) {
  return (
    <div className="t-bg t-text overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, Inter, system-ui, sans-serif' }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="max-w-[900px] mx-auto px-5 md:px-12 pt-36 md:pt-44 pb-10 md:pb-14">
        <div className="space-y-6">
          {/* Back + category */}
          <FadeIn>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="/blog" className="flex items-center gap-2 text-xs uppercase tracking-widest transition-colors duration-200 hover:text-[#FF6A00]" style={{ color: 'rgba(var(--c-text),0.4)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M5 12l7-7M5 12l7 7" />
                </svg>
                Blog
              </a>
              {post.category && (
                <>
                  <span style={{ color: 'rgba(var(--c-text),0.2)' }}>·</span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ background: '#FF6A00', color: '#000' }}>
                    {post.category}
                  </span>
                </>
              )}
            </div>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={0.07}>
            <h1 className="font-cal font-semibold t-text text-[clamp(2rem,6vw,3.8rem)] leading-[1.05] tracking-tight">
              {post.title}
            </h1>
          </FadeIn>

          {/* Excerpt */}
          {post.excerpt && (
            <FadeIn delay={0.14}>
              <p className="text-base md:text-xl font-[300] leading-relaxed" style={{ color: 'rgba(var(--c-text),0.6)' }}>
                {post.excerpt}
              </p>
            </FadeIn>
          )}

          {/* Meta */}
          <FadeIn delay={0.18}>
            <div className="flex items-center gap-4 text-sm" style={{ color: 'rgba(var(--c-text),0.35)' }}>
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.created_at)}</span>
              <span>·</span>
              <span>{post.read_time} min di lettura</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Cover image ───────────────────────────────────── */}
      {post.cover_img && (
        <section className="max-w-[1200px] mx-auto px-5 md:px-12 pb-12 md:pb-16">
          <FadeIn>
            <div className="rounded-[1.75rem] overflow-hidden" style={{ aspectRatio: '16/7' }}>
              <img
                src={post.cover_img}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </FadeIn>
        </section>
      )}

      {/* ── Content ───────────────────────────────────────── */}
      <section className="max-w-[750px] mx-auto px-5 md:px-12 pb-24 md:pb-32">
        <FadeIn>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              lineHeight: '1.85',
              fontSize: '1.0625rem',
              color: 'rgba(var(--c-text),0.82)',
              fontWeight: 300,
            }}
          />
        </FadeIn>

        {/* Divider */}
        <div className="my-16 t-border border-t" />

        {/* Author + CTA */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(var(--c-text),0.3)' }}>Scritto da</p>
              <p className="font-semibold t-text">{post.author}</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(var(--c-text),0.4)' }}>ED Digital Agency — Vittorio Veneto (TV)</p>
            </div>
            <a
              href="/contatti"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-200 active:scale-95 whitespace-nowrap"
              style={{ background: '#FF6A00', color: '#000' }}
            >
              Contattaci →
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── More articles ─────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-24">
        <FadeIn>
          <div className="t-card t-border border rounded-[2rem] p-10 md:p-14 text-center space-y-5">
            <p className="text-xs text-[#FF6A00] uppercase tracking-widest font-semibold">Continua a leggere</p>
            <h2 className="font-cal font-semibold uppercase tracking-tighter italic t-text text-[clamp(1.8rem,4vw,3rem)] leading-tight">
              Torna al <span className="text-[#FF6A00]">Blog</span>
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-200"
                style={{ border: '1px solid rgba(var(--c-text),0.2)', color: 'rgb(var(--c-text))' }}
              >
                ← Tutti gli articoli
              </a>
              <a
                href="/contatti"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-200 active:scale-95"
                style={{ background: '#FF6A00', color: '#000' }}
              >
                Parliamo →
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      <style>{`
        .blog-content h1,.blog-content h2,.blog-content h3,.blog-content h4 {
          font-family: 'CalSans', serif;
          font-weight: 600;
          color: rgb(var(--c-text));
          margin-top: 2.5em;
          margin-bottom: 0.75em;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        .blog-content h2 { font-size: clamp(1.4rem, 3vw, 2rem); }
        .blog-content h3 { font-size: clamp(1.15rem, 2vw, 1.5rem); }
        .blog-content h4 { font-size: 1.1rem; }
        .blog-content p { margin-bottom: 1.5em; }
        .blog-content ul,.blog-content ol { margin: 1.2em 0 1.5em 1.5em; }
        .blog-content li { margin-bottom: 0.5em; }
        .blog-content strong { font-weight: 600; color: rgb(var(--c-text)); }
        .blog-content em { font-style: italic; }
        .blog-content a { color: #FF6A00; text-decoration: underline; text-underline-offset: 3px; }
        .blog-content a:hover { opacity: 0.8; }
        .blog-content blockquote {
          border-left: 3px solid #FF6A00;
          padding: 0.75em 1.25em;
          margin: 2em 0;
          background: rgba(255,106,0,0.05);
          border-radius: 0 12px 12px 0;
          font-style: italic;
          color: rgba(var(--c-text),0.7);
        }
        .blog-content code {
          background: rgba(var(--c-text),0.08);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.88em;
          font-family: monospace;
        }
        .blog-content pre {
          background: rgba(var(--c-text),0.06);
          border: 1px solid rgba(var(--c-text),0.1);
          border-radius: 12px;
          padding: 1.25em;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .blog-content pre code { background: none; padding: 0; }
        .blog-content hr {
          border: none;
          border-top: 1px solid rgba(var(--c-text),0.08);
          margin: 2.5em 0;
        }
        .blog-content img {
          width: 100%;
          border-radius: 12px;
          margin: 1.5em 0;
        }
      `}</style>

    </div>
  );
}
