export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  overviewImage: string;
  gallery: string[];
  includes: string[];
  platforms: string[];
  process: { step: string; title: string; description: string }[];
  related: string[];
  keywords: string[];
  faq: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: 'social-media-management',
    name: 'Social Media Management',
    tagline: 'Costruiamo community, non solo follower.',
    description: 'Gestiamo i tuoi canali social da zero a cento: strategia editoriale mensile, creazione di contenuti visivi e testuali, pubblicazione e community management.',
    longDescription: "I social media sono il punto di contatto più diretto tra il tuo brand e i tuoi clienti. Non basta postare: serve una strategia precisa, contenuti di qualità e una presenza costante. Noi ci occupiamo di tutto, dalla pianificazione editoriale alla risposta ai commenti, così tu puoi concentrarti sul tuo business.",
    heroImage: '/Images/Servizio_Social%20Media%20Management.jpg',
    overviewImage: '/Images/Servizio_Gestione%20social.jpg',
    gallery: [
      '/Images/Lavori%20Clienti/Espressione%20Danza.jpg',
      '/Images/Lavori%20Clienti/UpBeat%20Tattoo.jpg',
      '/Images/Servizio_Gestione%20social.jpg',
    ],
    includes: [
      'Strategia editoriale mensile su misura',
      'Creazione grafica e copywriting dei post',
      'Pubblicazione e scheduling automatico',
      'Community management (risposte e interazioni)',
      'Analisi delle performance e report mensile',
      'Gestione Stories e Reels',
    ],
    platforms: ['Instagram', 'Facebook', 'LinkedIn', 'TikTok'],
    process: [
      { step: '01', title: 'Analisi', description: 'Studiamo il tuo brand, i competitor e il tuo pubblico per capire la strategia più efficace.' },
      { step: '02', title: 'Strategia', description: 'Definiamo tono di voce, piano editoriale mensile e obiettivi misurabili.' },
      { step: '03', title: 'Produzione', description: 'Creiamo grafiche, copy e video ottimizzati per ogni piattaforma.' },
      { step: '04', title: 'Ottimizzazione', description: 'Analizziamo i dati ogni mese e aggiustiamo la strategia in base ai risultati.' },
    ],
    related: ['advertising', 'photo-video', 'visual-identity'],
    keywords: [
      'gestione social media Treviso', 'social media manager Treviso', 'social media marketing Veneto',
      'community management PMI', 'piano editoriale Instagram Treviso', 'agenzia social Vittorio Veneto',
      'gestione Instagram Facebook Treviso', 'content creator Treviso',
    ],
    faq: [
      {
        question: 'Quanto costa la gestione social media a Treviso?',
        answer: 'I nostri pacchetti di gestione social media per PMI partono da €350/mese per una piattaforma. Il costo varia in base al numero di canali gestiti e alla frequenza di pubblicazione. Offriamo un preventivo gratuito e personalizzato entro 24 ore.',
      },
      {
        question: 'Quanti post a settimana pubblicate?',
        answer: 'In base al piano scelto, pubblichiamo da 3 a 7 contenuti a settimana per piattaforma, incluse Stories e Reels ottimizzati per l\'algoritmo di Instagram e Facebook.',
      },
      {
        question: 'Gestite anche i commenti e i messaggi?',
        answer: 'Sì, il community management è incluso in tutti i nostri piani. Rispondiamo a commenti e messaggi entro poche ore, mantenendo un tono coerente con il tuo brand e costruendo relazioni autentiche con i tuoi follower.',
      },
      {
        question: 'Su quali piattaforme social lavorate a Treviso?',
        answer: 'Gestiamo Instagram, Facebook, LinkedIn e TikTok. La scelta delle piattaforme più adatte dipende dal tuo target di clienti, dal settore e dai tuoi obiettivi di business. Te la consigliamo noi in fase di analisi.',
      },
    ],
  },
  {
    slug: 'advertising',
    name: 'Advertising',
    tagline: 'Ogni euro investito deve tornare moltiplicato.',
    description: 'Campagne a pagamento su Meta, Google e TikTok con targeting laser. Ottimizzazione continua basata sui dati reali del tuo business.',
    longDescription: "La pubblicità digitale, fatta bene, è l'investimento più misurabile che esiste. Sappiamo esattamente quante persone vedono il tuo annuncio, quante cliccano e quante comprano. Gestiamo campagne su Meta, Google e TikTok con un approccio data-driven: test continui, budget ottimizzato e report trasparenti.",
    heroImage: '/Images/Servizio_Advertising.jpg',
    overviewImage: '/Images/Servizio_Advertising.jpg',
    gallery: [
      '/Images/Lavori%20Clienti/CDVI.jpg',
      '/Images/Lavori%20Clienti/Sito%20web%20Italia%20Contract.png',
      '/Images/Servizio_Advertising.jpg',
    ],
    includes: [
      'Setup e configurazione campagne Meta Ads',
      'Google Ads (Search, Display, Shopping, YouTube)',
      'TikTok Ads per audience giovani',
      'Creazione creatività (banner, video, copy)',
      'A/B testing su audience e formati',
      'Report settimanale con KPI chiari e ROAS',
    ],
    platforms: ['Meta Ads', 'Google Ads', 'TikTok Ads'],
    process: [
      { step: '01', title: 'Briefing', description: 'Definiamo obiettivi, budget, target e KPI da raggiungere.' },
      { step: '02', title: 'Setup', description: 'Configuriamo pixel, tag e audience personalizzate per un tracking preciso.' },
      { step: '03', title: 'Lancio', description: 'Pubblichiamo le campagne con creatività testate e audience segmentate.' },
      { step: '04', title: 'Ottimizzazione', description: 'Monitoriamo quotidianamente e ottimizziamo per massimizzare il ROAS.' },
    ],
    related: ['social-media-management', 'website', 'ecommerce'],
    keywords: [
      'Meta Ads Treviso', 'Google Ads Treviso', 'agenzia advertising Veneto',
      'campagne pubblicitarie online Treviso', 'Facebook Ads PMI Treviso', 'Google Ads PMI Veneto',
      'advertising digitale Vittorio Veneto', 'gestione campagne Meta Google Treviso',
    ],
    faq: [
      {
        question: 'Qual è il budget minimo consigliato per le campagne advertising?',
        answer: 'Consigliamo un budget media minimo di €500/mese per Meta Ads e €600/mese per Google Ads Search, a cui si aggiunge la nostra fee di gestione. Con budget più contenuti i risultati richiedono più tempo per ottimizzarsi.',
      },
      {
        question: 'Quanto tempo prima di vedere i primi risultati dalle campagne?',
        answer: 'Le prime ottimizzazioni sono visibili entro 2-4 settimane. Risultati stabili e un ROAS ottimizzato arrivano dopo 2-3 mesi di test continui. Il digitale richiede dati per imparare: più tempo e budget, migliori i risultati.',
      },
      {
        question: 'Cosa include la gestione delle campagne advertising?',
        answer: 'Include setup completo degli account, installazione pixel e tag, creazione delle creatività (immagini, video, copy), A/B testing su audience e formati, ottimizzazione settimanale e report KPI dettagliati ogni settimana.',
      },
      {
        question: 'Lavorate con aziende di qualsiasi settore nel Trevigiano?',
        answer: 'Sì, gestiamo campagne per PMI di tutti i settori: retail, ristorazione, immobiliare, moda, artigianato, servizi professionali. Abbiamo esperienza con aziende di Treviso, Vittorio Veneto, Conegliano e in tutto il Veneto.',
      },
    ],
  },
  {
    slug: 'website',
    name: 'Website',
    tagline: 'Il tuo sito lavora per te, 24 ore su 24.',
    description: 'Progettiamo e sviluppiamo siti web custom che convertono i visitatori in clienti. Veloci, responsive, ottimizzati per i motori di ricerca.',
    longDescription: "Un sito web non è una vetrina statica: è il tuo commerciale migliore, sempre online. Progettiamo ogni sito partendo dagli obiettivi di business, non dall'estetica. Velocità, SEO, conversioni: ogni scelta tecnica ha uno scopo preciso. Dal concept al lancio, gestiamo tutto noi.",
    heroImage: '/Images/Servizio_Siti%20web.jpg',
    overviewImage: '/Images/Servizio_Siti%20web.jpg',
    gallery: [
      '/Images/Lavori%20Clienti/Sito%20web%20Italia%20Contract.png',
      '/Images/Lavori%20Clienti/Gallo%20Immobiliare.jpg',
      '/Images/Lavori%20Clienti/Disegno%20Italia.png',
    ],
    includes: [
      'Design UI/UX su misura (wireframe + mockup)',
      'Sviluppo su WordPress, Astro o React',
      'Ottimizzazione SEO on-page completa',
      'Integrazione Google Analytics 4 e Search Console',
      'Sito responsive per ogni dispositivo',
      'Hosting e manutenzione inclusi nel primo anno',
    ],
    platforms: ['WordPress', 'Astro', 'React', 'Next.js'],
    process: [
      { step: '01', title: 'Discovery', description: 'Analizziamo obiettivi, competitor e utenti target per definire la struttura ideale.' },
      { step: '02', title: 'Design', description: 'Progettiamo wireframe e mockup fedeli prima di scrivere una riga di codice.' },
      { step: '03', title: 'Sviluppo', description: 'Costruiamo il sito con le tecnologie più adatte, veloci e sicure.' },
      { step: '04', title: 'Lancio', description: 'Testiamo ogni dettaglio, ottimizziamo le performance e pubblichiamo online.' },
    ],
    related: ['ecommerce', 'visual-identity', 'mvp-saas'],
    keywords: [
      'realizzazione siti web Treviso', 'web agency Treviso', 'siti web PMI Veneto',
      'sviluppo sito web Vittorio Veneto', 'sito web aziendale Treviso', 'web design Treviso',
      'agenzia web Conegliano', 'sito web professionale Veneto', 'WordPress Treviso',
    ],
    faq: [
      {
        question: 'Quanto costa un sito web professionale a Treviso?',
        answer: 'Un sito web vetrina per PMI parte da €1.500-2.500. Siti con funzionalità avanzate (blog, area riservata, CRM) vanno da €3.000 a €7.000. Il costo dipende dalla complessità. Offriamo preventivi gratuiti entro 24 ore.',
      },
      {
        question: 'Quanto tempo ci vuole per realizzare un sito web?',
        answer: 'In media 3-6 settimane dal brief iniziale alla pubblicazione, a seconda della complessità. Siti vetrina semplici possono essere pronti in 2-3 settimane. Lavoriamo con revisioni condivise per rispettare i tempi.',
      },
      {
        question: 'Il sito web sarà ottimizzato per Google (SEO)?',
        answer: 'Sì, ogni sito include SEO on-page completa: ottimizzazione titoli, meta description, struttura URL, velocità di caricamento (Core Web Vitals), dati strutturati JSON-LD e integrazione con Google Search Console e Analytics 4.',
      },
      {
        question: 'Dopo il lancio, chi gestisce il sito?',
        answer: 'Il primo anno di hosting e manutenzione ordinaria è incluso. Dopodiché offriamo piani di assistenza mensile o aggiornamenti a richiesta. Ti formiamo anche per gestire autonomamente i contenuti se preferisci.',
      },
    ],
  },
  {
    slug: 'ecommerce',
    name: 'E-Commerce',
    tagline: 'Negozi online che vendono davvero.',
    description: 'Dal catalogo prodotti al checkout, costruiamo e-commerce performanti su Shopify o WooCommerce. Setup completo con pagamenti, spedizioni e gestione ordini.',
    longDescription: "Vendere online è molto più di caricare prodotti su una piattaforma. Serve un design che ispiri fiducia, un checkout fluido che non perda clienti a metà strada, e un'integrazione perfetta con pagamenti, spedizioni e gestione magazzino. Siamo partner Shopify certificati e costruiamo negozi che convertono.",
    heroImage: '/Images/Servizio_e-commerce.jpg',
    overviewImage: '/Images/Servizio_e-commerce.jpg',
    gallery: [
      '/Images/Lavori%20Clienti/Sito%20web%20Italia%20Contract.png',
      '/Images/Servizio_e-commerce.jpg',
      '/Images/Lavori%20Clienti/Gallo%20Immobiliare.jpg',
    ],
    includes: [
      'Setup Shopify o WooCommerce completo',
      'Design tema custom ottimizzato per conversioni',
      'Integrazione gateway di pagamento (Stripe, PayPal)',
      'Configurazione spedizioni, tasse e fatturazione',
      'Schede prodotto ottimizzate SEO',
      'Formazione per la gestione autonoma del negozio',
    ],
    platforms: ['Shopify', 'WooCommerce', 'Stripe'],
    process: [
      { step: '01', title: 'Pianificazione', description: 'Definiamo struttura catalogo, categorie, metodi di pagamento e logistica.' },
      { step: '02', title: 'Design', description: 'Progettiamo un tema custom che rispecchi il brand e massimizzi le conversioni.' },
      { step: '03', title: 'Sviluppo', description: 'Costruiamo e configuriamo ogni aspetto tecnico del negozio.' },
      { step: '04', title: 'Go Live', description: 'Testiamo il flusso di acquisto completo, formiamo il tuo team e lanciamo.' },
    ],
    related: ['website', 'advertising', 'social-media-management'],
    keywords: [
      'e-commerce Treviso', 'negozio online Treviso', 'Shopify Treviso', 'WooCommerce Veneto',
      'realizzazione e-commerce Vittorio Veneto', 'shop online PMI Treviso',
      'agenzia e-commerce Veneto', 'vendita online Treviso', 'partner Shopify Treviso',
    ],
    faq: [
      {
        question: 'Quanto costa realizzare un e-commerce a Treviso?',
        answer: 'Un negozio online completo su Shopify o WooCommerce parte da €2.500 per cataloghi semplici, fino a €8.000+ per e-commerce con funzionalità avanzate (configuratori, abbonamenti, marketplace). Preventivo gratuito in 24 ore.',
      },
      {
        question: 'Meglio Shopify o WooCommerce per la mia azienda?',
        answer: 'Shopify è ideale per chi vuole partire velocemente, con meno complessità tecnica e pagamenti semplificati. WooCommerce su WordPress è preferibile se hai già un sito WordPress o hai bisogno di personalizzazioni spinte. Te lo consigliamo noi dopo una call gratuita.',
      },
      {
        question: 'L\'e-commerce sarà ottimizzato per apparire su Google Shopping?',
        answer: 'Sì, configuriamo il feed prodotti per Google Shopping, ottimizziamo le schede prodotto per la SEO (titoli, descrizioni, dati strutturati Product schema) e colleghiamo Google Merchant Center.',
      },
      {
        question: 'Riuscirò a gestire il negozio autonomamente dopo il lancio?',
        answer: 'Assolutamente sì. Includiamo una sessione di formazione pratica in cui ti insegniamo a caricare prodotti, gestire ordini, impostare sconti e leggere le statistiche. Siamo poi disponibili per supporto tecnico post-lancio.',
      },
    ],
  },
  {
    slug: 'photo-video',
    name: 'Photo & Video',
    tagline: 'Il tuo brand merita contenuti straordinari.',
    description: 'Produzione fotografica e video professionale per ogni esigenza: shooting prodotti, video istituzionale, contenuti per social e campagne advertising.',
    longDescription: "In un mondo dove l'attenzione dura tre secondi, la qualità visiva è tutto. Produciamo contenuti fotografici e video che fermano lo scroll: dalla campagna prodotto al brand film, dal Reel per Instagram al video istituzionale. Tutto in studio o in location, con attrezzatura professionale.",
    heroImage: '/Images/Servizio_shooting%20fotografico.jpg',
    overviewImage: '/Images/Servizio_Videomaking.jpg',
    gallery: [
      '/Images/Servizio_shooting%20fotografico.jpg',
      '/Images/Servizio_Videomaking.jpg',
      '/Images/Lavori%20Clienti/CDVI.jpg',
    ],
    includes: [
      'Shooting fotografico prodotti, team e location',
      'Video istituzionale e brand film',
      'Reels e contenuti verticali per social media',
      'Editing, color grading e post-produzione',
      'Musiche royalty-free e sound design',
      'Consegna file ottimizzati per ogni piattaforma',
    ],
    platforms: [],
    process: [
      { step: '01', title: 'Brief creativo', description: 'Definiamo mood, riferimenti visivi, location e lista degli scatti necessari.' },
      { step: '02', title: 'Pre-produzione', description: 'Prepariamo storyboard, scouting location e tutto il necessario per il giorno del set.' },
      { step: '03', title: 'Produzione', description: 'Realizziamo shooting o riprese video con attrezzatura professionale.' },
      { step: '04', title: 'Post-produzione', description: 'Editing, ritocco, color grading e consegna dei file finali.' },
    ],
    related: ['social-media-management', 'visual-identity', 'advertising'],
    keywords: [
      'fotografo aziendale Treviso', 'videomaking Treviso', 'shooting fotografico prodotti Veneto',
      'video istituzionale Treviso', 'fotografia commerciale Vittorio Veneto',
      'produzione video social Treviso', 'content creation Veneto', 'fotografo professionista Treviso',
    ],
    faq: [
      {
        question: 'Quanto costa uno shooting fotografico aziendale a Treviso?',
        answer: 'Uno shooting fotografico professionale per aziende parte da €400 per mezza giornata in studio o location a Treviso e provincia. Include editing e consegna dei file ad alta risoluzione. Preventivo gratuito su misura per il tuo progetto.',
      },
      {
        question: 'Realizzate video per i social media e i Reels Instagram?',
        answer: 'Sì, produciamo contenuti video ottimizzati per ogni formato: Reels verticali per Instagram e TikTok, video orizzontali per YouTube e LinkedIn, story animate. Consegniamo file pronti alla pubblicazione in tutti i formati richiesti.',
      },
      {
        question: 'Venite anche fuori da Treviso per le riprese?',
        answer: 'Assolutamente sì. Lavoriamo in tutta la provincia di Treviso, il Veneto e in tutta Italia per progetti più grandi. Il costo di trasferta è quotato caso per caso nel preventivo.',
      },
      {
        question: 'Quanto tempo ci vuole dalla ripresa alla consegna dei file?',
        answer: 'La post-produzione standard richiede 5-10 giorni lavorativi per la fotografia e 2-4 settimane per la produzione video. Per esigenze urgenti offriamo un servizio fast-delivery con tempi ridotti.',
      },
    ],
  },
  {
    slug: 'visual-identity',
    name: 'Visual Identity',
    tagline: 'Un brand riconoscibile vale più di mille pubblicità.',
    description: "Creiamo identità visive coerenti e memorabili. Dal logo al brandbook completo, ogni elemento è progettato per comunicare i valori del tuo brand.",
    longDescription: "L'identità visiva è il primo linguaggio con cui il tuo brand comunica. Prima ancora che leggano cosa fai, le persone vedono come sei fatto. Costruiamo identità visive solide che restano riconoscibili su qualsiasi superficie: digitale, stampa, packaging. Dal naming al brand manual completo.",
    heroImage: '/Images/Servizio_Visual%20Design.jpg',
    overviewImage: '/Images/Servizio_Visual%20Design.jpg',
    gallery: [
      '/Images/Lavori%20Clienti/Disegno%20Italia.png',
      '/Images/Servizio_Visual%20Design.jpg',
      '/Images/Lavori%20Clienti/UpBeat%20Tattoo.jpg',
    ],
    includes: [
      'Logo design + varianti (colore, b/n, negativo)',
      'Palette colori primaria e secondaria',
      'Tipografia istituzionale (font selection)',
      'Brand guidelines completo (brandbook PDF)',
      'Template social media e presentazioni',
      'Mockup su materiali fisici e digitali',
    ],
    platforms: [],
    process: [
      { step: '01', title: 'Discovery', description: 'Esploriamo i valori del tuo brand, i competitor e il posizionamento desiderato.' },
      { step: '02', title: 'Concept', description: 'Sviluppiamo 2-3 direzioni creative diverse, ognuna con moodboard e rationale.' },
      { step: '03', title: 'Sviluppo', description: 'Raffiniamo la direzione scelta fino alla versione finale di ogni elemento.' },
      { step: '04', title: 'Consegna', description: 'Consegniamo tutti i file sorgente e il brandbook con le regole di utilizzo.' },
    ],
    related: ['website', 'social-media-management', 'photo-video'],
    keywords: [
      'logo design Treviso', 'brand identity Treviso', 'identità visiva aziendale Veneto',
      'grafica aziendale Treviso', 'logo professionista Vittorio Veneto',
      'brand design PMI Treviso', 'brandbook Veneto', 'visual identity Treviso',
    ],
    faq: [
      {
        question: 'Quanto costa il design di un logo professionale a Treviso?',
        answer: 'Il design di un logo professionale per PMI parte da €800, incluse varianti cromatiche e file sorgente in tutti i formati (AI, SVG, PNG, PDF). Un pacchetto visual identity completo con brandbook parte da €1.800. Preventivo gratuito.',
      },
      {
        question: 'Quante proposte di logo ricevo e quante revisioni sono incluse?',
        answer: 'Sviluppiamo 2-3 direzioni creative distinte nella fase di concept, ognuna con moodboard e rationale. Una volta scelta la direzione, sono incluse 3 round di revisioni per arrivare al risultato perfetto.',
      },
      {
        question: 'Cosa ricevo alla fine del progetto di visual identity?',
        answer: 'Consegniamo tutti i file sorgente editabili (Illustrator, Figma), il logo in tutti i formati (SVG, PNG, PDF, JPG) e dimensioni, il brandbook PDF con regole d\'uso, palette colori con codici HEX/CMYK/Pantone e tipografie.',
      },
      {
        question: 'Realizzate anche il materiale di stampa (biglietti da visita, brochure)?',
        answer: 'Sì, dopo la creazione dell\'identità visiva progettiamo qualsiasi materiale di comunicazione: biglietti da visita, brochure, roll-up, packaging, carta intestata. Tutto coerente con il brand manual appena creato.',
      },
    ],
  },
  {
    slug: 'mvp-saas',
    name: 'MVP & SaaS',
    tagline: "Dal prototipo al prodotto in settimane, non anni.",
    description: 'Trasformiamo la tua idea in un prodotto digitale funzionante. Sviluppiamo MVP con le tecnologie più moderne per validare il mercato rapidamente.',
    longDescription: "Hai un'idea per un prodotto digitale ma non sai da dove iniziare? Lavoriamo con startup e imprenditori per trasformare idee in prodotti reali. Seguiamo la metodologia lean: costruiamo il minimo necessario per validare il mercato, raccogliere feedback reali e iterare velocemente.",
    heroImage: '/Images/Servizio_Gestionale%26Software.jpg',
    overviewImage: '/Images/Servizio_Gestionale%26Software.jpg',
    gallery: [
      '/Images/Servizio_App.jpg',
      '/Images/Lavori%20Clienti/CDVI.jpg',
      '/Images/Servizio_Gestionale%26Software.jpg',
    ],
    includes: [
      'Discovery e definizione del prodotto',
      'UX design e prototipo interattivo (Figma)',
      'Sviluppo full-stack (Next.js, Node.js, Supabase)',
      'Autenticazione, database e API',
      'Deploy su infrastruttura cloud scalabile',
      'Supporto post-lancio e sviluppo iterativo',
    ],
    platforms: ['Next.js', 'Node.js', 'Supabase', 'Railway', 'Vercel'],
    process: [
      { step: '01', title: 'Ideazione', description: 'Definiamo il core del prodotto: quali problemi risolve e per chi.' },
      { step: '02', title: 'Design', description: 'Prototipiamo il flusso utente principale in Figma prima di scrivere codice.' },
      { step: '03', title: 'Build', description: 'Sviluppiamo le feature core con sprint settimanali e review frequenti.' },
      { step: '04', title: 'Launch & Iterate', description: 'Pubblichiamo, raccogliamo feedback reali e continuiamo a costruire.' },
    ],
    related: ['app', 'website', 'visual-identity'],
    keywords: [
      'sviluppo software Treviso', 'MVP startup Veneto', 'SaaS development Treviso',
      'sviluppo prodotto digitale Veneto', 'software house Treviso', 'prototipo digitale PMI',
      'sviluppo web app Treviso', 'Next.js sviluppo Veneto',
    ],
    faq: [
      {
        question: 'Quanto costa sviluppare un MVP a Treviso?',
        answer: 'Un MVP ben costruito per validare un\'idea di business parte da €5.000-8.000 per prodotti semplici, fino a €15.000+ per piattaforme più complesse. Il costo dipende dalle funzionalità core necessarie. Prima valutiamo insieme l\'idea gratuitamente.',
      },
      {
        question: 'Quanto tempo ci vuole per andare live con il primo prodotto?',
        answer: 'Con la metodologia lean, il primo MVP funzionante è disponibile in 6-12 settimane. Lavoriamo in sprint settimanali con demo frequenti così puoi vedere il progresso e dare feedback in ogni fase.',
      },
      {
        question: 'Cosa succede se voglio aggiungere funzionalità dopo il lancio?',
        answer: 'Il nostro approccio è pensato per crescere nel tempo. Dopo il lancio dell\'MVP raccogliamo feedback reali degli utenti e continuiamo a sviluppare le feature più richieste con sprint iterativi. Puoi scalare il prodotto a tuo ritmo.',
      },
      {
        question: 'Il codice sarà nostro o rimarrà vostro?',
        answer: 'Tutto il codice sorgente è di tua proprietà al 100%. Al termine del progetto ricevi l\'accesso completo a tutti i repository, incluse istruzioni per gestire autonomamente il deployment e gli aggiornamenti.',
      },
    ],
  },
  {
    slug: 'app',
    name: 'App',
    tagline: "La tua app nelle tasche dei tuoi clienti.",
    description: "Sviluppiamo applicazioni mobile iOS e Android con React Native. Un'unica codebase, due piattaforme, esperienza nativa.",
    longDescription: "Un'app non è solo una versione mobile del sito: è uno spazio dedicato dove i tuoi utenti scelgono attivamente di stare. Progettiamo app con UX nativa per iOS e Android, costruite con React Native per massimizzare la qualità e minimizzare i tempi di sviluppo. Dalla prima schermata alla pubblicazione sugli store.",
    heroImage: '/Images/Servizio_App.jpg',
    overviewImage: '/Images/Servizio_App.jpg',
    gallery: [
      '/Images/Servizio_App.jpg',
      '/Images/Lavori%20Clienti/CDVI.jpg',
      '/Images/Servizio_Gestionale%26Software.jpg',
    ],
    includes: [
      'UX/UI design nativo per iOS e Android',
      'Sviluppo React Native cross-platform',
      'Integrazione con API e backend esistenti',
      'Push notifications e funzionalità offline',
      'Testing su dispositivi reali (iOS + Android)',
      'Pubblicazione su App Store e Google Play',
    ],
    platforms: ['iOS', 'Android', 'React Native', 'Expo'],
    process: [
      { step: '01', title: 'Discovery', description: 'Definiamo le feature essenziali, i flussi utente e la piattaforma tecnica.' },
      { step: '02', title: 'Design', description: 'Progettiamo ogni schermata rispettando le Human Interface Guidelines di iOS e Material Design.' },
      { step: '03', title: 'Sviluppo', description: 'Costruiamo in sprint settimanali con build testabili su dispositivo reale.' },
      { step: '04', title: 'Store', description: 'Gestiamo la pubblicazione su App Store e Google Play, inclusa la revisione.' },
    ],
    related: ['mvp-saas', 'website', 'advertising'],
    keywords: [
      'sviluppo app Treviso', 'app iOS Android Treviso', 'applicazione mobile Veneto',
      'React Native Treviso', 'sviluppo app aziendale Veneto', 'app store Treviso',
      'mobile developer Vittorio Veneto', 'agenzia sviluppo app Treviso',
    ],
    faq: [
      {
        question: 'Quanto costa sviluppare un\'app mobile a Treviso?',
        answer: 'Un\'app mobile con funzionalità standard parte da €8.000-12.000 per iOS e Android insieme con React Native. App più complesse con integrazioni avanzate possono superare i €20.000. Offriamo una valutazione gratuita della tua idea.',
      },
      {
        question: 'Quanto tempo ci vuole per pubblicare un\'app sugli store?',
        answer: 'Lo sviluppo di un\'app completa richiede in media 3-5 mesi. La pubblicazione su App Store e Google Play aggiunge 1-2 settimane per i processi di review. Lavoriamo in sprint settimanali con build testabili su dispositivo reale.',
      },
      {
        question: 'L\'app funzionerà sia su iPhone che Android?',
        answer: 'Sì, sviluppiamo con React Native che genera un\'unica codebase per entrambe le piattaforme, garantendo un\'esperienza nativa di qualità sia su iOS che Android, riducendo i costi rispetto allo sviluppo nativo separato.',
      },
      {
        question: 'Cosa succede se ho già un sito web e voglio affiancarlo un\'app?',
        answer: 'Integriamo l\'app con il tuo sito e sistema di gestione esistenti tramite API. L\'app diventa un canale aggiuntivo per i tuoi clienti, con accesso alle stesse informazioni del sito ma con funzionalità native (notifiche push, offline, ecc.).',
      },
    ],
  },
  {
    slug: 'integrazioni',
    name: 'Integrazioni & Automazioni',
    tagline: 'Il tuo stack parla finalmente una sola lingua.',
    description: 'Integriamo qualsiasi tool del tuo stack: CRM, ERP, email, e-commerce, contabilità, HR. API dirette, Make, Zapier e n8n per la soluzione più efficace e sostenibile.',
    longDescription: "Ogni azienda accumula nel tempo decine di strumenti che non comunicano tra loro: il CRM non sa cosa fa l'e-commerce, la contabilità non parla con l'HR, le email partono a mano. Noi colleghiamo tutto. Utilizziamo API dirette quando servono performance e affidabilità massima, Make o Zapier quando la velocità è prioritaria, n8n quando serve controllo completo e costo zero. Il risultato: dati sincronizzati, team più libero, errori umani eliminati.",
    heroImage: '/Images/Servizio_Gestionale%26Software.jpg',
    overviewImage: '/Images/Servizio_Gestionale%26Software.jpg',
    gallery: [
      '/Images/Servizio_Gestionale%26Software.jpg',
      '/Images/Servizio_App.jpg',
      '/Images/Servizio_Siti%20web.jpg',
    ],
    includes: [
      'API dirette per performance massima e affidabilità',
      'Make e Zapier per integrazioni rapide senza codice',
      'Connettori custom quando le piattaforme lo richiedono',
      'Supporto per webhook ed eventi in tempo reale',
      'Integrazione CRM, ERP, email, contabilità, HR',
      'Documentazione e manutenzione dei flussi automatizzati',
    ],
    platforms: ['Make', 'Zapier', 'n8n', 'REST API', 'Webhooks'],
    process: [
      { step: '01', title: 'Mappatura', description: 'Analizziamo tutti i tool del tuo stack e i flussi di lavoro esistenti per identificare colli di bottiglia e opportunità.' },
      { step: '02', title: 'Progettazione', description: 'Definiamo l\'architettura delle integrazioni, scegliendo la tecnologia più adatta per ogni connessione.' },
      { step: '03', title: 'Sviluppo', description: 'Implementiamo i flussi automatizzati con test su ogni scenario, inclusi i casi di errore.' },
      { step: '04', title: 'Monitoraggio', description: 'Attiviamo alerting sui flussi critici e forniamo dashboard per controllare che tutto funzioni.' },
    ],
    related: ['mvp-saas', 'ecommerce', 'website'],
    keywords: [
      'automazioni aziendali Treviso', 'integrazioni CRM ERP Veneto', 'Make Zapier Treviso',
      'automazione processi PMI Veneto', 'integrazione software aziendale Treviso',
      'n8n sviluppo Veneto', 'workflow automation Treviso', 'API integration Veneto',
    ],
    faq: [
      {
        question: 'Quali strumenti aziendali riuscite a integrare a Treviso?',
        answer: 'Integriamo praticamente qualsiasi software aziendale: CRM (HubSpot, Salesforce, Zoho), ERP (SAP, Odoo), e-commerce (Shopify, WooCommerce), contabilità (Fatture in Cloud, TeamSystem), email marketing (Mailchimp, Klaviyo), HR e molto altro.',
      },
      {
        question: 'Quanto costa implementare automazioni aziendali?',
        answer: 'Un\'automazione semplice (es. sincronizzazione CRM-email) parte da €500-800 una tantum. Flussi più complessi con più sistemi coinvolti vanno da €1.500 a €5.000+. Poi c\'è solo il costo mensile degli strumenti usati (Make, Zapier, ecc.), spesso €30-100/mese.',
      },
      {
        question: 'Ho bisogno di un tecnico per gestire le automazioni dopo che le avete create?',
        answer: 'No. Le automazioni funzionano in modo autonomo 24/7. Ti forniamo documentazione chiara e una dashboard di monitoraggio. Per modifiche future siamo disponibili, ma i flussi più semplici li puoi gestire autonomamente anche senza conoscenze tecniche.',
      },
      {
        question: 'Quanto tempo risparmia mediamente un\'azienda grazie alle automazioni?',
        answer: 'Le nostre integrazioni risparmiano in media 5-20 ore di lavoro manuale a settimana per PMI con 5-20 dipendenti. Il ROI è solitamente raggiunto entro 2-4 mesi dal go-live. Ogni progetto parte da un\'analisi gratuita del potenziale di risparmio.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): Service[] {
  return slugs.map((s) => services.find((sv) => sv.slug === s)).filter(Boolean) as Service[];
}
