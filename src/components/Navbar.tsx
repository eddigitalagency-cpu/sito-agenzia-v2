import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Home',     href: '/' },
  { label: 'Servizi',  href: '/servizi' },
  { label: 'Progetti', href: '/#casistudio' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contatti', href: '/contatti' },
];

export default function Navbar() {
  const [open, setOpen]     = useState(false);
  const [theme, setTheme]   = useState<'dark' | 'light'>('dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ed-theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('light', saved === 'light');
    }
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('ed-theme', next);
    document.documentElement.classList.toggle('light', next === 'light');
  };

  const isDark = theme === 'dark';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 nav-bg backdrop-blur-md nav-border transition-shadow duration-500 ${scrolled ? 'shadow-lg shadow-black/10' : ''}`}>
        <nav className="max-w-[1400px] mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="/" className="shrink-0">
            <img
              src="/Images/Logo%20ED%20Digitla.png"
              alt="ED Digital Agency"
              width="44" height="44"
              fetchpriority="high"
              className={`h-11 w-auto transition-all duration-300 ${isDark ? '' : 'invert'}`}
            />
          </a>

          {/* Desktop links */}
          <nav aria-label="Navigazione principale">
            <ul className="hidden md:flex items-center gap-8 text-[13px] font-medium flex-1 justify-center">
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="nav-link tracking-wide">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: theme + CTA + hamburger */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={toggle}
              whileTap={{ scale: 0.88 }}
              className="w-9 h-9 rounded-full nav-icon-btn flex items-center justify-center"
              aria-label="Cambia tema"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.svg key="sun" initial={{ opacity: 0, rotate: -60 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 60 }} transition={{ duration: 0.25 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </motion.svg>
                ) : (
                  <motion.svg key="moon" initial={{ opacity: 0, rotate: 60 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -60 }} transition={{ duration: 0.25 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA desktop */}
            <a
              href="/contatti"
              className="hidden md:inline-flex items-center nav-cta text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-200 active:scale-95"
            >
              Inizia un progetto
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-full nav-icon-btn"
              aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            >
              <motion.span animate={open ? { rotate: 45, y: 7 }  : { rotate: 0, y: 0 }}  transition={{ duration: 0.3 }} className="block w-5 h-[1.5px] ham-bar" />
              <motion.span animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} className="block w-5 h-[1.5px] ham-bar" />
              <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} className="block w-5 h-[1.5px] ham-bar" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 t-bg flex flex-col"
          >
            {/* spacer for header height */}
            <div className="h-[68px] shrink-0" />

            <nav aria-label="Navigazione mobile" className="flex-1 flex flex-col items-center justify-center gap-1 px-8 pb-24">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.07 + 0.05, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={() => setOpen(false)}
                  className="text-[11vw] sm:text-6xl font-cal font-semibold t-text uppercase italic py-2 hover:text-[#FF6A00] transition-colors duration-200"
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.a
                href="/contatti"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                onClick={() => setOpen(false)}
                className="mt-10 px-10 py-4 bg-[#FF6A00] text-black font-bold rounded-full uppercase tracking-widest text-sm active:scale-95 transition-transform"
              >
                Lavoriamo insieme
              </motion.a>
            </nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="absolute bottom-10 left-0 right-0 text-center text-xs t-text-30 uppercase tracking-widest"
            >
              ed.digitalagency@gmail.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
