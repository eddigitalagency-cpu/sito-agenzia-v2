import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1.0] as const;

const serviceOptions = [
  'Social Media Management',
  'Advertising',
  'Website',
  'E-Commerce',
  'Photo & Video',
  'Visual Identity',
  'MVP & SaaS',
  'App',
  'Non so ancora',
];

const contacts = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'info@eddigitalagency.it',
    href: 'mailto:info@eddigitalagency.it',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.22 2.2 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    label: 'Telefono',
    value: '+39 379 324 8371',
    href: 'tel:+393793248371',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Indirizzo',
    value: 'Via Carlo Torres, 17/Interno 13\n31029 Vittorio Veneto (TV)',
    href: 'https://maps.google.com/?q=Via+Carlo+Torres+17,+Vittorio+Veneto',
  },
];

interface FormState {
  name: string; email: string; phone: string;
  company: string; service: string; message: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContattiPage() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', company: '', service: '', message: '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(ev => ({ ...ev, [k]: '' }));
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = 'Il nome è obbligatorio.';
    if (!form.email.trim())   e.email   = "L'email è obbligatoria.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email non valida.';
    if (!form.message.trim()) e.message = 'Il messaggio è obbligatorio.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      } else {
        setErrorMsg(data.error || 'Errore sconosciuto.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Errore di connessione. Riprova tra qualche secondo.');
      setStatus('error');
    }
  };

  return (
    <div className="t-bg t-text overflow-x-hidden" style={{ fontFamily: 'GraphikLCG, Inter, system-ui, sans-serif' }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pt-36 md:pt-44 pb-16 md:pb-24">
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, ease }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full t-border border t-text-50 text-xs uppercase tracking-widest mb-8" style={{ backgroundColor:'rgba(var(--c-text),0.04)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block" />
            Inizia la conversazione
          </div>
          <h1 className="font-cal font-semibold uppercase tracking-tighter italic t-text text-[clamp(2.8rem,7vw,5rem)] leading-[0.9] mb-6">
            Parliamo del <br /><span className="text-[#FF6A00]">tuo progetto.</span>
          </h1>
          <p className="t-muted font-[250] text-base leading-7 max-w-lg">
            Rispondiamo entro 24 ore. Nessun impegno, nessuna pressione — solo una conversazione onesta su come possiamo aiutarti.
          </p>
        </motion.div>
      </section>

      {/* ── Main grid ─────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-24 md:pb-32">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 md:gap-16 items-start">

          {/* ── Form ────────────────────────────────────────── */}
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.1, ease }}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                  transition={{ duration:0.5, ease }}
                  className="t-card t-border border rounded-[2.5rem] p-12 md:p-16 text-center flex flex-col items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FF6A00] flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h2 className="font-cal font-semibold t-text text-3xl uppercase italic">Messaggio inviato!</h2>
                  <p className="t-muted font-[250] text-base leading-7 max-w-sm">
                    Grazie per averci scritto. Ti risponderemo all'indirizzo fornito entro 24 ore lavorative.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 px-8 py-3 t-border border t-text rounded-full text-sm font-semibold hover:bg-[#FF6A00] hover:border-[#FF6A00] hover:text-black transition-all duration-200"
                  >
                    Invia un altro messaggio
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate className="space-y-5">

                  {/* Row 1: name + email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Nome completo *" error={errors.name}>
                      <input type="text" autoComplete="name" placeholder="Mario Rossi" value={form.name} onChange={set('name')} className={field(!!errors.name)} />
                    </Field>
                    <Field label="Email *" error={errors.email}>
                      <input type="email" autoComplete="email" inputMode="email" placeholder="mario@esempio.it" value={form.email} onChange={set('email')} className={field(!!errors.email)} />
                    </Field>
                  </div>

                  {/* Row 2: phone + company */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Telefono">
                      <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+39 333 000 0000" value={form.phone} onChange={set('phone')} className={field(false)} />
                    </Field>
                    <Field label="Azienda">
                      <input type="text" autoComplete="organization" placeholder="Nome azienda" value={form.company} onChange={set('company')} className={field(false)} />
                    </Field>
                  </div>

                  {/* Service */}
                  <Field label="Servizio di interesse">
                    <select value={form.service} onChange={set('service')} className={field(false) + ' appearance-none'}>
                      <option value="">Seleziona un servizio...</option>
                      {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>

                  {/* Message */}
                  <Field label="Messaggio *" error={errors.message}>
                    <textarea
                      rows={6}
                      placeholder="Raccontaci il tuo progetto, i tuoi obiettivi, o semplicemente salutaci..."
                      value={form.message}
                      onChange={set('message')}
                      className={field(!!errors.message) + ' resize-none'}
                    />
                  </Field>

                  {/* Error banner */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="flex items-start gap-3 p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                        <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 bg-[#FF6A00] text-black font-bold rounded-2xl text-sm uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity=".25"/><path d="M21 12a9 9 0 00-9-9"/></svg>
                        Invio in corso...
                      </>
                    ) : 'Invia il messaggio →'}
                  </motion.button>

                  <p className="text-xs t-text-25 text-center leading-5">
                    Inviando il modulo accetti la nostra privacy policy. Non condividiamo i tuoi dati con terze parti.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Contact cards ───────────────────────────────── */}
          <motion.div
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.9, delay:0.2, ease }}
            className="space-y-4 lg:sticky lg:top-28"
          >
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.label === 'Indirizzo' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity:0, x:20 }}
                animate={{ opacity:1, x:0 }}
                transition={{ duration:0.7, delay:0.25 + i*0.1, ease }}
                whileHover={{ x: 4 }}
                className="group flex items-start gap-5 t-card t-border border rounded-2xl p-6 hover:border-[rgba(255,106,0,0.35)] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FF6A00]/10 border border-[#FF6A00]/20 flex items-center justify-center text-[#FF6A00] flex-shrink-0 group-hover:bg-[#FF6A00]/20 transition-colors duration-300">
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs t-text-30 uppercase tracking-widest mb-1">{c.label}</p>
                  <p className="t-text font-medium text-sm leading-6 whitespace-pre-line">{c.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Response time badge */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.7, delay:0.6 }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl t-border border"
              style={{ backgroundColor:'rgba(var(--c-text),0.03)' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6A00] opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6A00]" />
              </span>
              <p className="text-xs t-muted font-[250]">Risposta garantita entro <strong className="t-text font-semibold">24 ore</strong> lavorative.</p>
            </motion.div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────── */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs t-text-40 uppercase tracking-wider font-medium">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="text-xs text-red-400">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function field(hasError: boolean) {
  return [
    'w-full px-4 py-3.5 rounded-xl text-[16px] font-[250] outline-none transition-all duration-200',
    'bg-[rgba(var(--c-text),0.05)] t-text placeholder:text-[rgba(var(--c-text),0.25)]',
    'border focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15',
    hasError ? 'border-red-500/60' : 't-border',
  ].join(' ');
}
