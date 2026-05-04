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
}

export const services: Service[] = [
  {
    slug: 'social-media-management',
    name: 'Social Media Management',
    tagline: 'Costruiamo community, non solo follower.',
    description: 'Gestiamo i tuoi canali social da zero a cento: strategia editoriale mensile, creazione di contenuti visivi e testuali, pubblicazione e community management.',
    longDescription: "I social media sono il punto di contatto più diretto tra il tuo brand e i tuoi clienti. Non basta postare: serve una strategia precisa, contenuti di qualità e una presenza costante. Noi ci occupiamo di tutto, dalla pianificazione editoriale alla risposta ai commenti, così tu puoi concentrarti sul tuo business.",
    heroImage: '/images/Copia-di-Progetto-senza-titolo-1-copia-3.jpg',
    overviewImage: '/images/marquee-image1.jpg',
    gallery: [
      '/images/Cover-Espressione-Danza.jpg',
      '/images/Cover-SoloMattia.jpg',
      '/images/marquee-image2.jpg',
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
  },
  {
    slug: 'advertising',
    name: 'Advertising',
    tagline: 'Ogni euro investito deve tornare moltiplicato.',
    description: 'Campagne a pagamento su Meta, Google e TikTok con targeting laser. Ottimizzazione continua basata sui dati reali del tuo business.',
    longDescription: "La pubblicità digitale, fatta bene, è l'investimento più misurabile che esiste. Sappiamo esattamente quante persone vedono il tuo annuncio, quante cliccano e quante comprano. Gestiamo campagne su Meta, Google e TikTok con un approccio data-driven: test continui, budget ottimizzato e report trasparenti.",
    heroImage: '/images/Copia-di-Progetto-senza-titolo-1-copia-2.jpg',
    overviewImage: '/images/marquee-image3.jpg',
    gallery: [
      '/images/marquee-image2.jpg',
      '/images/Cover-Italia-Contract.jpg',
      '/images/marquee-image4.jpg',
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
  },
  {
    slug: 'website',
    name: 'Website',
    tagline: 'Il tuo sito lavora per te, 24 ore su 24.',
    description: 'Progettiamo e sviluppiamo siti web custom che convertono i visitatori in clienti. Veloci, responsive, ottimizzati per i motori di ricerca.',
    longDescription: "Un sito web non è una vetrina statica: è il tuo commerciale migliore, sempre online. Progettiamo ogni sito partendo dagli obiettivi di business, non dall'estetica. Velocità, SEO, conversioni: ogni scelta tecnica ha uno scopo preciso. Dal concept al lancio, gestiamo tutto noi.",
    heroImage: '/images/Copia-di-Progetto-senza-titolo-1-1.jpg',
    overviewImage: '/images/Cover-ValLonga.jpg',
    gallery: [
      '/images/Cover-Italia-Contract.jpg',
      '/images/Cover-ValLonga.jpg',
      '/images/Cover-Disegno-Italia.jpg',
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
  },
  {
    slug: 'ecommerce',
    name: 'E-Commerce',
    tagline: 'Negozi online che vendono davvero.',
    description: 'Dal catalogo prodotti al checkout, costruiamo e-commerce performanti su Shopify o WooCommerce. Setup completo con pagamenti, spedizioni e gestione ordini.',
    longDescription: "Vendere online è molto più di caricare prodotti su una piattaforma. Serve un design che ispiri fiducia, un checkout fluido che non perda clienti a metà strada, e un'integrazione perfetta con pagamenti, spedizioni e gestione magazzino. Siamo partner Shopify certificati e costruiamo negozi che convertono.",
    heroImage: '/images/Copia-di-Progetto-senza-titolo-1-copia.jpg',
    overviewImage: '/images/Cover-Otica-Toffoli.jpg',
    gallery: [
      '/images/Cover-Italia-Contract.jpg',
      '/images/marquee-image4.jpg',
      '/images/Cover-Otica-Toffoli.jpg',
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
  },
  {
    slug: 'photo-video',
    name: 'Photo & Video',
    tagline: 'Il tuo brand merita contenuti straordinari.',
    description: 'Produzione fotografica e video professionale per ogni esigenza: shooting prodotti, video istituzionale, contenuti per social e campagne advertising.',
    longDescription: "In un mondo dove l'attenzione dura tre secondi, la qualità visiva è tutto. Produciamo contenuti fotografici e video che fermano lo scroll: dalla campagna prodotto al brand film, dal Reel per Instagram al video istituzionale. Tutto in studio o in location, con attrezzatura professionale.",
    heroImage: '/images/Copia-di-Progetto-senza-titolo-1-copia-4.jpg',
    overviewImage: '/images/marquee-image5.jpg',
    gallery: [
      '/images/marquee-image5.jpg',
      '/images/marquee-image6.jpeg',
      '/images/Copia-di-Progetto-senza-titolo-1-copia-1.jpg',
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
  },
  {
    slug: 'visual-identity',
    name: 'Visual Identity',
    tagline: 'Un brand riconoscibile vale più di mille pubblicità.',
    description: "Creiamo identità visive coerenti e memorabili. Dal logo al brandbook completo, ogni elemento è progettato per comunicare i valori del tuo brand.",
    longDescription: "L'identità visiva è il primo linguaggio con cui il tuo brand comunica. Prima ancora che leggano cosa fai, le persone vedono come sei fatto. Costruiamo identità visive solide che restano riconoscibili su qualsiasi superficie: digitale, stampa, packaging. Dal naming al brand manual completo.",
    heroImage: '/images/Copia-di-Progetto-senza-titolo-1-copia-1.jpg',
    overviewImage: '/images/Cover-Disegno-Italia.jpg',
    gallery: [
      '/images/Cover-Disegno-Italia.jpg',
      '/images/Copia-di-Progetto-senza-titolo-1-copia-5.jpg',
      '/images/marquee-image2.jpg',
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
  },
  {
    slug: 'mvp-saas',
    name: 'MVP & SaaS',
    tagline: "Dal prototipo al prodotto in settimane, non anni.",
    description: 'Trasformiamo la tua idea in un prodotto digitale funzionante. Sviluppiamo MVP con le tecnologie più moderne per validare il mercato rapidamente.',
    longDescription: "Hai un'idea per un prodotto digitale ma non sai da dove iniziare? Lavoriamo con startup e imprenditori per trasformare idee in prodotti reali. Seguiamo la metodologia lean: costruiamo il minimo necessario per validare il mercato, raccogliere feedback reali e iterare velocemente.",
    heroImage: '/images/Copia-di-Progetto-senza-titolo-1-copia-2-1.jpg',
    overviewImage: '/images/Copia-di-Progetto-senza-titolo.jpg',
    gallery: [
      '/images/GrandeProgetto-sesnza-titolo-6-copia.png',
      '/images/marquee-image3.jpg',
      '/images/Copia-di-Progetto-senza-titolo-1-copia-2.jpg',
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
  },
  {
    slug: 'app',
    name: 'App',
    tagline: "La tua app nelle tasche dei tuoi clienti.",
    description: "Sviluppiamo applicazioni mobile iOS e Android con React Native. Un'unica codebase, due piattaforme, esperienza nativa.",
    longDescription: "Un'app non è solo una versione mobile del sito: è uno spazio dedicato dove i tuoi utenti scelgono attivamente di stare. Progettiamo app con UX nativa per iOS e Android, costruite con React Native per massimizzare la qualità e minimizzare i tempi di sviluppo. Dalla prima schermata alla pubblicazione sugli store.",
    heroImage: '/images/Copia-di-Progetto-senza-titolo-1-copia-5.jpg',
    overviewImage: '/images/marquee-image1.jpg',
    gallery: [
      '/images/GrandeProgetto-sesnza-titolo-6-copia.png',
      '/images/Cover-SoloMattia.jpg',
      '/images/marquee-image6.jpeg',
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
  },
  {
    slug: 'integrazioni',
    name: 'Integrazioni & Automazioni',
    tagline: 'Il tuo stack parla finalmente una sola lingua.',
    description: 'Integriamo qualsiasi tool del tuo stack: CRM, ERP, email, e-commerce, contabilità, HR. API dirette, Make, Zapier e n8n per la soluzione più efficace e sostenibile.',
    longDescription: "Ogni azienda accumula nel tempo decine di strumenti che non comunicano tra loro: il CRM non sa cosa fa l'e-commerce, la contabilità non parla con l'HR, le email partono a mano. Noi colleghiamo tutto. Utilizziamo API dirette quando servono performance e affidabilità massima, Make o Zapier quando la velocità è prioritaria, n8n quando serve controllo completo e costo zero. Il risultato: dati sincronizzati, team più libero, errori umani eliminati.",
    heroImage: '/images/Copia-di-Progetto-senza-titolo-1-copia-2-1.jpg',
    overviewImage: '/images/Copia-di-Progetto-senza-titolo.jpg',
    gallery: [
      '/images/marquee-image3.jpg',
      '/images/Copia-di-Progetto-senza-titolo-1-copia-2.jpg',
      '/images/marquee-image4.jpg',
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
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): Service[] {
  return slugs.map((s) => services.find((sv) => sv.slug === s)).filter(Boolean) as Service[];
}
