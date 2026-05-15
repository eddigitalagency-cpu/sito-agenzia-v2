import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ed-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('ed-cookie-consent', 'all');
    setVisible(false);
    window.dispatchEvent(new CustomEvent('ed-cookie-consent', { detail: 'all' }));
  }

  function necessary() {
    localStorage.setItem('ed-cookie-consent', 'necessary');
    setVisible(false);
    window.dispatchEvent(new CustomEvent('ed-cookie-consent', { detail: 'necessary' }));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestione cookie"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(92vw, 560px)',
        zIndex: 9999,
        background: 'rgb(var(--c-card))',
        border: '1px solid rgba(var(--c-text),0.1)',
        borderRadius: '1rem',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgb(var(--c-text))', marginBottom: '0.35rem' }}>
          Questo sito utilizza i cookie
        </p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(var(--c-text),0.55)', lineHeight: 1.6 }}>
          Utilizziamo cookie tecnici (necessari al funzionamento) e cookie analitici di prima parte per migliorare l'esperienza. Nessun dato viene condiviso con terze parti.{' '}
          <a href="/cookie-policy" style={{ color: '#FF6A00', textDecoration: 'underline' }}>
            Cookie Policy
          </a>{' '}
          ·{' '}
          <a href="/privacy-policy" style={{ color: '#FF6A00', textDecoration: 'underline' }}>
            Privacy Policy
          </a>
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
        <button
          onClick={accept}
          style={{
            flex: '1 1 auto',
            padding: '0.55rem 1.25rem',
            borderRadius: '999px',
            background: '#FF6A00',
            color: '#000',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Accetta tutti
        </button>
        <button
          onClick={necessary}
          style={{
            flex: '1 1 auto',
            padding: '0.55rem 1.25rem',
            borderRadius: '999px',
            background: 'transparent',
            color: 'rgba(var(--c-text),0.6)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            border: '1px solid rgba(var(--c-text),0.15)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Solo necessari
        </button>
      </div>
    </div>
  );
}
