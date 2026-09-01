// ── i18n dictionary ──────────────────────────────────────────
// All static UI copy for the site, one object per language.
// Database-driven content (blog posts, projects) is translated separately
// via the `_en`/`_de` columns on `blog_posts` and `projects_db` — see src/lib/db.ts.

export type Lang = 'it' | 'en' | 'de';
export const LOCALES: Lang[] = ['it', 'en', 'de'];
export const DEFAULT_LOCALE: Lang = 'it';

export const LOCALE_LABELS: Record<Lang, string> = { it: 'IT', en: 'EN', de: 'DE' };
export const LOCALE_NAMES: Record<Lang, string> = { it: 'Italiano', en: 'English', de: 'Deutsch' };
export const HTML_LANG: Record<Lang, string> = { it: 'it', en: 'en', de: 'de' };
export const OG_LOCALE: Record<Lang, string> = { it: 'it_IT', en: 'en_US', de: 'de_AT' };

const it = {
  nav: {
    home: 'Home', services: 'Servizi', projects: 'Progetti', blog: 'Blog', contact: 'Contatti',
    ctaDesktop: 'Inizia un progetto', ctaMobile: 'Lavoriamo insieme',
    mainNavLabel: 'Navigazione principale', mobileNavLabel: 'Navigazione mobile',
    openMenu: 'Apri menu', closeMenu: 'Chiudi menu', themeToggle: 'Cambia tema',
  },
  footer: {
    tagline: "Il partner strategico per le PMI italiane che vogliono crescere nel digitale.",
    cta: 'Inizia un progetto →',
    servicesHeading: 'Servizi', agencyHeading: 'Agenzia', contactHeading: 'Contatti', navHeading: 'Navigazione footer',
    home: 'Home', services: 'Servizi', projects: 'Progetti', blog: 'Blog', contact: 'Contatti',
    copyright: '© 2026 ED Digital Agency. Tutti i diritti riservati.',
    privacy: 'Privacy Policy', cookie: 'Cookie Policy',
    countryLine: 'Vittorio Veneto (TV) · Italia',
  },
  cookieBanner: {
    dialogLabel: 'Gestione cookie',
    title: 'Questo sito utilizza i cookie',
    desc: "Utilizziamo cookie tecnici (necessari al funzionamento) e cookie analitici di prima parte per migliorare l'esperienza. Nessun dato viene condiviso con terze parti.",
    cookiePolicy: 'Cookie Policy', privacyPolicy: 'Privacy Policy',
    acceptAll: 'Accetta tutti', onlyNecessary: 'Solo necessari',
  },
  home: {
    badge: 'Partner Strategico Digitale',
    headlinePrefix: 'La nostra', headlineSuffix: 'La tua visione.',
    cyclingWords: ['creatività', 'strategia', 'innovazione', 'identità', 'performance', 'visione', 'crescita'],
    desc: 'Strategie sartoriali per brand che non temono di farsi notare. Dal digitale al fisico, sempre con un obiettivo: far crescere il tuo business.',
    ctaWork: 'I Nostri Lavori', ctaStart: 'Inizia un progetto →', scrollHint: 'Scorri',
    statProjects: 'Progetti completati', statYears: 'Anni di esperienza', statClients: 'Clienti soddisfatti', statGrowth: 'Crescita media',
    statementLine1: "Non siamo solo un'agenzia.", statementLine2: 'Siamo il motore digitale', statementLine3: 'della tua crescita.',
    whatWeDo: 'Cosa facciamo', servicesTitle: 'Servizi', seeAll: 'Vedi tutti →',
    portfolioLabel: 'Portfolio', projectsTitle: 'Progetti', swipeHint: '← scorri per vedere altri →',
    ctaTagline: 'Pronto a crescere?', ctaTitle1: 'Costruiamo qualcosa', ctaTitle2: 'di straordinario.', ctaButton: 'Inizia ora',
    partnersLabel: 'Technology partners',
    marqueeItems: ['Social Media', 'Advertising', 'Web Design', 'E-Commerce', 'Photo & Video', 'Visual Identity', 'MVP & SaaS', 'App Development', 'Brand Strategy', 'Digital Growth'],
    servicesBento: [
      { name: 'Social Media Management', slug: 'social-media-management', tagline: 'Community che converte.' },
      { name: 'Advertising', slug: 'advertising', tagline: 'ROI misurabile.' },
      { name: 'Website', slug: 'website', tagline: '24/7 per te.' },
      { name: 'E-Commerce', slug: 'ecommerce', tagline: 'Negozi che vendono.' },
      { name: 'Photo & Video', slug: 'photo-video', tagline: 'Contenuti straordinari.' },
      { name: 'Visual Identity', slug: 'visual-identity', tagline: 'Brand memorabile.' },
      { name: 'MVP & SaaS', slug: 'mvp-saas', tagline: 'Idea → Prodotto.' },
      { name: 'App', slug: 'app', tagline: 'Nelle loro tasche.' },
      { name: 'Integrazioni & Automazioni', slug: 'integrazioni', tagline: 'Stack connesso, zero sprechi.' },
    ],
  },
  serviziHub: {
    badge: 'Cosa facciamo',
    h1a: 'Servizi che', h1b: 'fanno la', h1c: 'differenza.',
    intro: "Ogni servizio è studiato per portare risultati concreti e misurabili. Lavoriamo come un'estensione del tuo team, non come fornitori anonimi.",
    digitalService: 'Digital Service', whatIncludes: 'Cosa include', learnMore: 'Scopri di più su questo servizio',
    ctaTagline: 'Hai un progetto in mente?', ctaTitle1: 'Iniziamo a', ctaTitle2: 'costruire insieme.', ctaButton: 'Scrivici ora',
  },
  serviceDetail: {
    badge: 'Servizio', overview: 'Overview', whatIncludes: 'Cosa include', howWeWork: 'Come lavoriamo',
    relatedWork: 'Lavori correlati', relatedServices: 'Servizi correlati', faqTitle: 'Domande frequenti',
    faqCta: 'Hai altre domande? Contattaci →', startProject: 'Inizia il progetto', digitalService: 'Digital Service',
    ctaTagline: 'Inizia oggi', ctaTitle1: 'Parliamo del', ctaTitle2: 'tuo progetto.', ctaButton: 'Scrivici ora',
  },
  contatti: {
    badge: 'Inizia la conversazione',
    h1a: 'Parliamo del', h1b: 'tuo progetto.',
    intro: 'Rispondiamo entro 24 ore. Nessun impegno, nessuna pressione — solo una conversazione onesta su come possiamo aiutarti.',
    form: {
      name: 'Nome completo *', namePh: 'Mario Rossi',
      email: 'Email *', emailPh: 'mario@esempio.it',
      phone: 'Telefono', phonePh: '+39 333 000 0000',
      company: 'Azienda', companyPh: 'Nome azienda',
      service: 'Servizio di interesse', serviceSelect: 'Seleziona un servizio...', serviceOther: 'Non so ancora',
      message: 'Messaggio *', messagePh: 'Raccontaci il tuo progetto, i tuoi obiettivi, o semplicemente salutaci...',
      submit: 'Invia il messaggio →', sending: 'Invio in corso...',
      privacyNote: 'Inviando il modulo accetti la nostra privacy policy. Non condividiamo i tuoi dati con terze parti.',
      errName: 'Il nome è obbligatorio.', errEmail: "L'email è obbligatoria.", errEmailInvalid: 'Email non valida.',
      errMessage: 'Il messaggio è obbligatorio.', errUnknown: 'Errore sconosciuto.', errNetwork: 'Errore di rete. Riprova.',
    },
    sent: {
      title: 'Messaggio inviato!',
      desc: "Grazie per averci scritto. Ti risponderemo all'indirizzo fornito entro 24 ore lavorative.",
      another: 'Invia un altro messaggio',
    },
    contactEmail: 'Email', contactPhone: 'Telefono',
    responseTime: 'Risposta garantita entro', responseTimeSuffix: 'lavorative.', responseTimeStrong: '24 ore',
  },
  blog: {
    badge: 'Risorse & Approfondimenti', h1a: 'Blog', h1b: 'ED Digital',
    intro: 'Strategie, guide e casi studio sul marketing digitale per le piccole e medie imprese italiane.',
    all: 'Tutti', noArticlesIn: 'Nessun articolo in', noArticlesYet: 'Nessun articolo ancora.', seeAllArticles: 'Vedi tutti gli articoli',
    featured: 'Articolo in evidenza', readArticle: "Leggi l'articolo →", read: 'Leggi →', minRead: 'min di lettura', min: 'min',
    ctaTagline: 'Vuoi crescere online?', ctaTitle1: 'Parliamo del', ctaTitle2: 'tuo progetto', ctaButton: 'Inizia ora →',
  },
  blogPost: {
    back: 'Blog', writtenBy: 'Scritto da', agencyLine: 'ED Digital Agency', minRead: 'min di lettura',
    contactCta: 'Contattaci →',
    continueReading: 'Continua a leggere', backTitlePrefix: 'Torna al', backTitleHighlight: 'Blog',
    allArticles: '← Tutti gli articoli', letsTalk: 'Parliamo →',
  },
  project: {
    backPortfolio: '← Portfolio', theProject: 'Il progetto', whatWeDid: 'Cosa abbiamo fatto', results: 'Risultati',
    service: 'Servizio', also: 'Anche', ctaSimilar: 'Vuoi un progetto simile? →',
    ctaTagline: 'Lavoriamo insieme', ctaTitle1: 'Costruiamo il tuo', ctaTitle2: 'prossimo progetto.',
    ctaButtonStart: 'Inizia ora →', ctaButtonOther: 'Altri progetti',
  },
  langSwitcher: { label: 'Lingua' },
  notAvailableBanner: {
    text: 'Questo contenuto non è ancora disponibile in questa lingua — mostrato in italiano.',
  },
  seo: {
    defaultTitle: 'Agenzia Digitale a Treviso e Vittorio Veneto',
    defaultDescription: "ED Digital Agency è l'agenzia digitale di riferimento a Vittorio Veneto, in provincia di Treviso. Social media, advertising, siti web, e-commerce, visual identity e sviluppo di software gestionali e applicazioni su misura per PMI che vogliono crescere online.",
    defaultKeywords: 'agenzia digitale Treviso, agenzia marketing Treviso, web agency Vittorio Veneto, social media management Treviso, siti web Treviso, advertising Meta Google Treviso, e-commerce Treviso, agenzia comunicazione Veneto, marketing PMI Treviso, software gestionale personalizzato, sviluppo applicazioni web su misura, ED Digital Agency',
    orgDescription: "ED Digital Agency è l'agenzia digitale di riferimento a Vittorio Veneto e nella provincia di Treviso. Specializzata in social media marketing, advertising, siti web, e-commerce, visual identity, software gestionali su misura e automazioni per PMI italiane, con clienti anche in Austria e in tutta Europa.",
    websiteName: 'ED Digital Agency — Agenzia Digitale Treviso',
    websiteDescription: 'Agenzia digitale a Vittorio Veneto (Treviso). Social media, advertising, siti web, e-commerce, visual identity e software gestionali su misura per PMI italiane ed europee.',
    faq: [
      {
        q: 'Dove si trova ED Digital Agency?',
        a: 'ED Digital Agency ha sede a Vittorio Veneto, in provincia di Treviso (Veneto). Operiamo in tutta Italia, in Austria e a livello internazionale, anche da remoto.',
      },
      {
        q: 'Quali servizi offre ED Digital Agency?',
        a: 'Offriamo social media management, advertising su Meta e Google, sviluppo siti web e e-commerce, produzione foto e video, visual identity e logo design, sviluppo MVP, SaaS, app mobile e software gestionali personalizzati per aziende, integrazioni e automazioni tra tool aziendali.',
      },
      {
        q: 'ED Digital Agency segue anche clienti fuori dall\'Italia?',
        a: 'Sì, lavoriamo con clienti in tutta Italia, in Austria e a livello internazionale. Stiamo espandendo la nostra presenza in Austria e collaboriamo da remoto con aziende in tutta Europa.',
      },
      {
        q: 'Quanto costa un sito web con ED Digital Agency?',
        a: 'Il costo di un sito web varia in base alle esigenze del progetto. Offriamo soluzioni per PMI con prezzi competitivi. Contattaci per un preventivo gratuito e personalizzato entro 24 ore.',
      },
    ],
  },
} as const;

const en: typeof it = {
  nav: {
    home: 'Home', services: 'Services', projects: 'Projects', blog: 'Blog', contact: 'Contact',
    ctaDesktop: 'Start a project', ctaMobile: "Let's work together",
    mainNavLabel: 'Main navigation', mobileNavLabel: 'Mobile navigation',
    openMenu: 'Open menu', closeMenu: 'Close menu', themeToggle: 'Toggle theme',
  },
  footer: {
    tagline: 'The strategic partner for companies that want to grow their digital presence.',
    cta: 'Start a project →',
    servicesHeading: 'Services', agencyHeading: 'Agency', contactHeading: 'Contact', navHeading: 'Footer navigation',
    home: 'Home', services: 'Services', projects: 'Projects', blog: 'Blog', contact: 'Contact',
    copyright: '© 2026 ED Digital Agency. All rights reserved.',
    privacy: 'Privacy Policy', cookie: 'Cookie Policy',
    countryLine: 'Vittorio Veneto (TV) · Italy',
  },
  cookieBanner: {
    dialogLabel: 'Cookie settings',
    title: 'This website uses cookies',
    desc: 'We use technical cookies (necessary for the site to work) and first-party analytics cookies to improve your experience. No data is shared with third parties.',
    cookiePolicy: 'Cookie Policy', privacyPolicy: 'Privacy Policy',
    acceptAll: 'Accept all', onlyNecessary: 'Necessary only',
  },
  home: {
    badge: 'Strategic Digital Partner',
    headlinePrefix: 'Our', headlineSuffix: 'Your vision.',
    cyclingWords: ['creativity', 'strategy', 'innovation', 'identity', 'performance', 'vision', 'growth'],
    desc: 'Tailored strategies for brands that aren\'t afraid to stand out. From digital to physical, always with one goal: growing your business.',
    ctaWork: 'Our Work', ctaStart: 'Start a project →', scrollHint: 'Scroll',
    statProjects: 'Projects completed', statYears: 'Years of experience', statClients: 'Satisfied clients', statGrowth: 'Average growth',
    statementLine1: "We're not just an agency.", statementLine2: 'We are the digital engine', statementLine3: 'behind your growth.',
    whatWeDo: 'What we do', servicesTitle: 'Services', seeAll: 'See all →',
    portfolioLabel: 'Portfolio', projectsTitle: 'Projects', swipeHint: '← swipe to see more →',
    ctaTagline: 'Ready to grow?', ctaTitle1: "Let's build something", ctaTitle2: 'extraordinary.', ctaButton: 'Start now',
    partnersLabel: 'Technology partners',
    marqueeItems: ['Social Media', 'Advertising', 'Web Design', 'E-Commerce', 'Photo & Video', 'Visual Identity', 'MVP & SaaS', 'App Development', 'Brand Strategy', 'Digital Growth'],
    servicesBento: [
      { name: 'Social Media Management', slug: 'social-media-management', tagline: 'Community that converts.' },
      { name: 'Advertising', slug: 'advertising', tagline: 'Measurable ROI.' },
      { name: 'Website', slug: 'website', tagline: 'Working for you 24/7.' },
      { name: 'E-Commerce', slug: 'ecommerce', tagline: 'Stores that sell.' },
      { name: 'Photo & Video', slug: 'photo-video', tagline: 'Extraordinary content.' },
      { name: 'Visual Identity', slug: 'visual-identity', tagline: 'A memorable brand.' },
      { name: 'MVP & SaaS', slug: 'mvp-saas', tagline: 'Idea → Product.' },
      { name: 'App', slug: 'app', tagline: 'In their pocket.' },
      { name: 'Integrations & Automation', slug: 'integrazioni', tagline: 'One connected stack, zero waste.' },
    ],
  },
  serviziHub: {
    badge: 'What we do',
    h1a: 'Services that', h1b: 'make the', h1c: 'difference.',
    intro: "Every service is designed to deliver real, measurable results. We work as an extension of your team, not as an anonymous vendor.",
    digitalService: 'Digital Service', whatIncludes: "What's included", learnMore: 'Learn more about this service',
    ctaTagline: 'Have a project in mind?', ctaTitle1: "Let's start", ctaTitle2: 'building together.', ctaButton: 'Get in touch',
  },
  serviceDetail: {
    badge: 'Service', overview: 'Overview', whatIncludes: "What's included", howWeWork: 'How we work',
    relatedWork: 'Related work', relatedServices: 'Related services', faqTitle: 'Frequently asked questions',
    faqCta: 'Have more questions? Contact us →', startProject: 'Start the project', digitalService: 'Digital Service',
    ctaTagline: 'Start today', ctaTitle1: "Let's talk about", ctaTitle2: 'your project.', ctaButton: 'Get in touch',
  },
  contatti: {
    badge: "Let's start the conversation",
    h1a: "Let's talk about", h1b: 'your project.',
    intro: 'We reply within 24 hours. No commitment, no pressure — just an honest conversation about how we can help.',
    form: {
      name: 'Full name *', namePh: 'John Smith',
      email: 'Email *', emailPh: 'john@example.com',
      phone: 'Phone', phonePh: '+43 660 000 0000',
      company: 'Company', companyPh: 'Company name',
      service: 'Service of interest', serviceSelect: 'Select a service...', serviceOther: "I'm not sure yet",
      message: 'Message *', messagePh: 'Tell us about your project, your goals, or just say hi...',
      submit: 'Send message →', sending: 'Sending...',
      privacyNote: 'By submitting the form you accept our privacy policy. We never share your data with third parties.',
      errName: 'Name is required.', errEmail: 'Email is required.', errEmailInvalid: 'Invalid email address.',
      errMessage: 'Message is required.', errUnknown: 'Unknown error.', errNetwork: 'Network error. Please try again.',
    },
    sent: {
      title: 'Message sent!',
      desc: "Thanks for reaching out. We'll reply to the address you provided within 24 business hours.",
      another: 'Send another message',
    },
    contactEmail: 'Email', contactPhone: 'Phone',
    responseTime: 'Guaranteed reply within', responseTimeSuffix: 'business hours.', responseTimeStrong: '24 hours',
  },
  blog: {
    badge: 'Resources & Insights', h1a: 'Blog', h1b: 'ED Digital',
    intro: 'Strategies, guides and case studies on digital marketing for small and medium businesses.',
    all: 'All', noArticlesIn: 'No articles in', noArticlesYet: 'No articles yet.', seeAllArticles: 'See all articles',
    featured: 'Featured article', readArticle: 'Read the article →', read: 'Read →', minRead: 'min read', min: 'min',
    ctaTagline: 'Want to grow online?', ctaTitle1: "Let's talk about", ctaTitle2: 'your project', ctaButton: 'Start now →',
  },
  blogPost: {
    back: 'Blog', writtenBy: 'Written by', agencyLine: 'ED Digital Agency', minRead: 'min read',
    contactCta: 'Contact us →',
    continueReading: 'Continue reading', backTitlePrefix: 'Back to the', backTitleHighlight: 'Blog',
    allArticles: '← All articles', letsTalk: "Let's talk →",
  },
  project: {
    backPortfolio: '← Portfolio', theProject: 'The project', whatWeDid: 'What we did', results: 'Results',
    service: 'Service', also: 'Also', ctaSimilar: 'Want a similar project? →',
    ctaTagline: "Let's work together", ctaTitle1: "Let's build your", ctaTitle2: 'next project.',
    ctaButtonStart: 'Start now →', ctaButtonOther: 'Other projects',
  },
  langSwitcher: { label: 'Language' },
  notAvailableBanner: {
    text: 'This content is not yet available in this language — shown in Italian.',
  },
  seo: {
    defaultTitle: 'Digital Agency from Italy — Custom Software, Web & Marketing',
    defaultDescription: 'ED Digital Agency is an Italian digital agency serving clients across Europe and internationally. Social media, advertising, websites, e-commerce, brand identity, and custom business software and web applications for growing companies.',
    defaultKeywords: 'digital marketing agency Italy, custom software development agency, social media management agency, web design agency, e-commerce development, custom business software, bespoke web applications, MVP development agency, ED Digital Agency',
    orgDescription: 'ED Digital Agency is an Italian digital agency based in the Veneto region, serving companies across Italy, Austria and internationally. We specialize in social media marketing, advertising, websites, e-commerce, brand identity, custom business software and workflow automation.',
    websiteName: 'ED Digital Agency — Digital Agency from Italy',
    websiteDescription: 'Italian digital agency. Social media, advertising, websites, e-commerce, brand identity and custom business software for companies across Europe.',
    faq: [
      {
        q: 'Where is ED Digital Agency based?',
        a: 'ED Digital Agency is based in Vittorio Veneto, in the Veneto region of Italy. We work with clients across Italy, Austria and internationally, remotely as well as in person.',
      },
      {
        q: 'What services does ED Digital Agency offer?',
        a: 'We offer social media management, Meta and Google advertising, website and e-commerce development, professional photo and video production, brand identity and logo design, MVP, SaaS, mobile app development and custom business software, plus integrations and workflow automation.',
      },
      {
        q: 'Does ED Digital Agency work with clients outside Italy?',
        a: 'Yes, we work with clients across Italy, Austria and internationally. We are expanding our presence in Austria and collaborate remotely with companies across Europe.',
      },
      {
        q: 'How much does a website cost with ED Digital Agency?',
        a: 'The cost of a website depends on the specific requirements of the project. We offer competitive pricing for small and medium businesses. Contact us for a free, personalized quote within 24 hours.',
      },
    ],
  },
};

const de: typeof it = {
  nav: {
    home: 'Startseite', services: 'Leistungen', projects: 'Projekte', blog: 'Blog', contact: 'Kontakt',
    ctaDesktop: 'Projekt starten', ctaMobile: 'Lassen Sie uns zusammenarbeiten',
    mainNavLabel: 'Hauptnavigation', mobileNavLabel: 'Mobile Navigation',
    openMenu: 'Menü öffnen', closeMenu: 'Menü schließen', themeToggle: 'Design wechseln',
  },
  footer: {
    tagline: 'Der strategische Partner für Unternehmen, die im Digitalen wachsen wollen.',
    cta: 'Projekt starten →',
    servicesHeading: 'Leistungen', agencyHeading: 'Agentur', contactHeading: 'Kontakt', navHeading: 'Footer-Navigation',
    home: 'Startseite', services: 'Leistungen', projects: 'Projekte', blog: 'Blog', contact: 'Kontakt',
    copyright: '© 2026 ED Digital Agency. Alle Rechte vorbehalten.',
    privacy: 'Datenschutzerklärung', cookie: 'Cookie-Richtlinie',
    countryLine: 'Vittorio Veneto (TV) · Italien',
  },
  cookieBanner: {
    dialogLabel: 'Cookie-Einstellungen',
    title: 'Diese Website verwendet Cookies',
    desc: 'Wir verwenden technisch notwendige Cookies sowie eigene Analyse-Cookies, um Ihre Erfahrung zu verbessern. Es werden keine Daten an Dritte weitergegeben.',
    cookiePolicy: 'Cookie-Richtlinie', privacyPolicy: 'Datenschutzerklärung',
    acceptAll: 'Alle akzeptieren', onlyNecessary: 'Nur notwendige',
  },
  home: {
    badge: 'Strategischer Digitalpartner',
    headlinePrefix: 'Unsere', headlineSuffix: 'Ihre Vision.',
    cyclingWords: ['Kreativität', 'Strategie', 'Innovation', 'Identität', 'Performance', 'Vision', 'Wachstum'],
    desc: 'Maßgeschneiderte Strategien für Marken, die sich zu zeigen trauen. Von digital bis physisch, immer mit einem Ziel: Ihr Unternehmen wachsen zu lassen.',
    ctaWork: 'Unsere Arbeiten', ctaStart: 'Projekt starten →', scrollHint: 'Scrollen',
    statProjects: 'Abgeschlossene Projekte', statYears: 'Jahre Erfahrung', statClients: 'Zufriedene Kunden', statGrowth: 'Durchschnittliches Wachstum',
    statementLine1: 'Wir sind mehr als eine Agentur.', statementLine2: 'Wir sind der digitale Motor', statementLine3: 'Ihres Wachstums.',
    whatWeDo: 'Was wir tun', servicesTitle: 'Leistungen', seeAll: 'Alle ansehen →',
    portfolioLabel: 'Portfolio', projectsTitle: 'Projekte', swipeHint: '← wischen für mehr →',
    ctaTagline: 'Bereit zu wachsen?', ctaTitle1: 'Lassen Sie uns etwas', ctaTitle2: 'Außergewöhnliches schaffen.', ctaButton: 'Jetzt starten',
    partnersLabel: 'Technologiepartner',
    marqueeItems: ['Social Media', 'Advertising', 'Webdesign', 'E-Commerce', 'Foto & Video', 'Visual Identity', 'MVP & SaaS', 'App-Entwicklung', 'Markenstrategie', 'Digitales Wachstum'],
    servicesBento: [
      { name: 'Social Media Management', slug: 'social-media-management', tagline: 'Eine Community, die konvertiert.' },
      { name: 'Advertising', slug: 'advertising', tagline: 'Messbarer ROI.' },
      { name: 'Website', slug: 'website', tagline: '24/7 für Sie im Einsatz.' },
      { name: 'E-Commerce', slug: 'ecommerce', tagline: 'Shops, die verkaufen.' },
      { name: 'Foto & Video', slug: 'photo-video', tagline: 'Außergewöhnliche Inhalte.' },
      { name: 'Visual Identity', slug: 'visual-identity', tagline: 'Eine unverwechselbare Marke.' },
      { name: 'MVP & SaaS', slug: 'mvp-saas', tagline: 'Von der Idee zum Produkt.' },
      { name: 'App', slug: 'app', tagline: 'In der Tasche Ihrer Kunden.' },
      { name: 'Integrationen & Automatisierung', slug: 'integrazioni', tagline: 'Ein vernetzter Stack, keine Verschwendung.' },
    ],
  },
  serviziHub: {
    badge: 'Was wir tun',
    h1a: 'Leistungen, die', h1b: 'den', h1c: 'Unterschied machen.',
    intro: 'Jede Leistung ist auf konkrete, messbare Ergebnisse ausgelegt. Wir arbeiten als Erweiterung Ihres Teams, nicht als anonymer Dienstleister.',
    digitalService: 'Digitale Leistung', whatIncludes: 'Leistungsumfang', learnMore: 'Mehr über diese Leistung erfahren',
    ctaTagline: 'Haben Sie ein Projekt im Kopf?', ctaTitle1: 'Lassen Sie uns gemeinsam', ctaTitle2: 'loslegen.', ctaButton: 'Jetzt schreiben',
  },
  serviceDetail: {
    badge: 'Leistung', overview: 'Überblick', whatIncludes: 'Leistungsumfang', howWeWork: 'Wie wir arbeiten',
    relatedWork: 'Ähnliche Arbeiten', relatedServices: 'Weitere Leistungen', faqTitle: 'Häufige Fragen',
    faqCta: 'Weitere Fragen? Kontaktieren Sie uns →', startProject: 'Projekt starten', digitalService: 'Digitale Leistung',
    ctaTagline: 'Heute starten', ctaTitle1: 'Sprechen wir über', ctaTitle2: 'Ihr Projekt.', ctaButton: 'Jetzt schreiben',
  },
  contatti: {
    badge: 'Starten wir das Gespräch',
    h1a: 'Sprechen wir über', h1b: 'Ihr Projekt.',
    intro: 'Wir antworten innerhalb von 24 Stunden. Keine Verpflichtung, kein Druck — nur ein ehrliches Gespräch darüber, wie wir helfen können.',
    form: {
      name: 'Vollständiger Name *', namePh: 'Max Mustermann',
      email: 'E-Mail *', emailPh: 'max@beispiel.at',
      phone: 'Telefon', phonePh: '+43 660 000 0000',
      company: 'Unternehmen', companyPh: 'Firmenname',
      service: 'Interessierende Leistung', serviceSelect: 'Leistung auswählen...', serviceOther: 'Noch unklar',
      message: 'Nachricht *', messagePh: 'Erzählen Sie uns von Ihrem Projekt, Ihren Zielen — oder sagen Sie einfach Hallo...',
      submit: 'Nachricht senden →', sending: 'Wird gesendet...',
      privacyNote: 'Mit dem Absenden akzeptieren Sie unsere Datenschutzerklärung. Wir geben Ihre Daten nicht an Dritte weiter.',
      errName: 'Der Name ist erforderlich.', errEmail: 'Die E-Mail-Adresse ist erforderlich.', errEmailInvalid: 'Ungültige E-Mail-Adresse.',
      errMessage: 'Die Nachricht ist erforderlich.', errUnknown: 'Unbekannter Fehler.', errNetwork: 'Netzwerkfehler. Bitte versuchen Sie es erneut.',
    },
    sent: {
      title: 'Nachricht gesendet!',
      desc: 'Vielen Dank für Ihre Nachricht. Wir antworten innerhalb von 24 Werkstunden an die angegebene Adresse.',
      another: 'Weitere Nachricht senden',
    },
    contactEmail: 'E-Mail', contactPhone: 'Telefon',
    responseTime: 'Garantierte Antwort innerhalb von', responseTimeSuffix: 'Werkstunden.', responseTimeStrong: '24 Stunden',
  },
  blog: {
    badge: 'Ressourcen & Einblicke', h1a: 'Blog', h1b: 'ED Digital',
    intro: 'Strategien, Leitfäden und Fallstudien zum digitalen Marketing für kleine und mittlere Unternehmen.',
    all: 'Alle', noArticlesIn: 'Keine Artikel in', noArticlesYet: 'Noch keine Artikel.', seeAllArticles: 'Alle Artikel ansehen',
    featured: 'Empfohlener Artikel', readArticle: 'Artikel lesen →', read: 'Lesen →', minRead: 'Min. Lesezeit', min: 'Min.',
    ctaTagline: 'Online wachsen?', ctaTitle1: 'Sprechen wir über', ctaTitle2: 'Ihr Projekt', ctaButton: 'Jetzt starten →',
  },
  blogPost: {
    back: 'Blog', writtenBy: 'Geschrieben von', agencyLine: 'ED Digital Agency', minRead: 'Min. Lesezeit',
    contactCta: 'Kontaktieren Sie uns →',
    continueReading: 'Weiterlesen', backTitlePrefix: 'Zurück zum', backTitleHighlight: 'Blog',
    allArticles: '← Alle Artikel', letsTalk: 'Sprechen wir →',
  },
  project: {
    backPortfolio: '← Portfolio', theProject: 'Das Projekt', whatWeDid: 'Was wir umgesetzt haben', results: 'Ergebnisse',
    service: 'Leistung', also: 'Ebenfalls', ctaSimilar: 'Ähnliches Projekt gewünscht? →',
    ctaTagline: 'Lassen Sie uns zusammenarbeiten', ctaTitle1: 'Lassen Sie uns Ihr', ctaTitle2: 'nächstes Projekt umsetzen.',
    ctaButtonStart: 'Jetzt starten →', ctaButtonOther: 'Weitere Projekte',
  },
  langSwitcher: { label: 'Sprache' },
  notAvailableBanner: {
    text: 'Dieser Inhalt ist in dieser Sprache noch nicht verfügbar — auf Italienisch angezeigt.',
  },
  seo: {
    defaultTitle: 'Digitalagentur aus Italien — Individuelle Software, Web & Marketing',
    defaultDescription: 'ED Digital Agency ist eine italienische Digitalagentur, die Unternehmen in ganz Europa und international betreut. Social Media, Advertising, Websites, E-Commerce, Corporate Design sowie individuelle Businesssoftware und Webanwendungen für wachsende Unternehmen.',
    defaultKeywords: 'Digitalagentur Österreich, individuelle Businesssoftware, Social Media Marketing Agentur Österreich, Webagentur Österreich, E-Commerce Agentur, Software Entwicklung Österreich, App Entwicklung Österreich, MVP Entwicklung, ED Digital Agency',
    orgDescription: 'ED Digital Agency ist eine italienische Digitalagentur mit Sitz in der Region Venetien, die Unternehmen in Italien, Österreich und international betreut. Unsere Schwerpunkte: Social-Media-Marketing, Advertising, Websites, E-Commerce, Corporate Design, individuelle Businesssoftware und Prozessautomatisierung.',
    websiteName: 'ED Digital Agency — Digitalagentur aus Italien',
    websiteDescription: 'Italienische Digitalagentur. Social Media, Advertising, Websites, E-Commerce, Corporate Design und individuelle Businesssoftware für Unternehmen in ganz Europa.',
    faq: [
      {
        q: 'Wo hat ED Digital Agency ihren Sitz?',
        a: 'ED Digital Agency hat ihren Sitz in Vittorio Veneto, in der Region Venetien in Italien. Wir betreuen Kunden in Italien, Österreich und international — remote sowie persönlich.',
      },
      {
        q: 'Welche Leistungen bietet ED Digital Agency an?',
        a: 'Wir bieten Social Media Management, Meta- und Google-Advertising, Website- und E-Commerce-Entwicklung, professionelle Foto- und Videoproduktion, Corporate Design und Logo-Design, Entwicklung von MVPs, SaaS, mobilen Apps und individueller Businesssoftware sowie Integrationen und Prozessautomatisierung.',
      },
      {
        q: 'Betreut ED Digital Agency auch Kunden außerhalb Italiens?',
        a: 'Ja, wir betreuen Kunden in ganz Italien, in Österreich und international. Wir bauen unsere Präsenz in Österreich aktiv aus und arbeiten remote mit Unternehmen in ganz Europa zusammen.',
      },
      {
        q: 'Was kostet eine Website bei ED Digital Agency?',
        a: 'Die Kosten für eine Website hängen von den Anforderungen des Projekts ab. Wir bieten wettbewerbsfähige Preise für kleine und mittlere Unternehmen. Kontaktieren Sie uns für ein kostenloses, individuelles Angebot innerhalb von 24 Stunden.',
      },
    ],
  },
};

export const dict: Record<Lang, typeof it> = { it, en, de };

export function useTranslations(lang: Lang) {
  return dict[lang] ?? dict[DEFAULT_LOCALE];
}

/** Prefix an internal path with the locale segment (IT stays unprefixed). */
export function withLang(path: string, lang: Lang): string {
  if (lang === DEFAULT_LOCALE) return path;
  if (path === '/') return `/${lang}`;
  if (path.startsWith('#')) return path; // in-page anchors don't need a locale
  return `/${lang}${path}`;
}

/** Strip a leading /en or /de segment from a pathname, returning the IT-equivalent path. */
export function stripLangPrefix(pathname: string): string {
  const m = pathname.match(/^\/(en|de)(\/.*|$)/);
  if (!m) return pathname;
  return m[2] || '/';
}

/** Detect the current locale from an Astro URL pathname. */
export function getLangFromPathname(pathname: string): Lang {
  const m = pathname.match(/^\/(en|de)(\/|$)/);
  return (m ? m[1] : 'it') as Lang;
}
