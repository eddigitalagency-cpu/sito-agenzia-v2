export interface Project {
  slug: string;
  title: string;
  service: string;
  serviceSlug: string;
  img: string;
  tagline: string;
  description: string;
  what: string[];
  results: { value: string; label: string }[];
  year: string;
}

export const projects: Project[] = [
  {
    slug: 'zenia',
    title: 'Zenia',
    service: 'Web Design',
    serviceSlug: 'website',
    img: '/Images/Zenia.png',
    tagline: 'Un sito che rispecchia l\'eleganza del brand.',
    description: 'Zenia è un brand che incarna raffinatezza e stile. Abbiamo progettato e sviluppato un sito web che traduce questi valori in ogni dettaglio: layout pulito, tipografia curata, immagini impattanti. Il risultato è una presenza digitale che comunica qualità ancora prima che il visitatore legga una parola.',
    what: [
      'Progettazione UX/UI personalizzata sul brand',
      'Sviluppo sito web custom, responsive e veloce',
      'Ottimizzazione SEO on-page per i motori di ricerca',
      'Integrazione form di contatto e mappa',
      'Shooting fotografico dei prodotti/servizi',
    ],
    results: [
      { value: '↑ 3×', label: 'Traffico organico' },
      { value: '< 1s', label: 'Tempo di caricamento' },
      { value: '100%', label: 'Mobile responsive' },
    ],
    year: '2025',
  },
  {
    slug: 'italia-contract',
    title: 'Italia Contract',
    service: 'Web Design',
    serviceSlug: 'website',
    img: '/Images/Lavori%20Clienti/Sito%20web%20Italia%20Contract.png',
    tagline: 'Il design italiano per hotel, ristoranti e spazi di lusso.',
    description: "Italia Contract è un'azienda leader nel settore del Contract e dell'arredamento di lusso, specializzata nella fornitura di soluzioni per hotel, ristoranti e spazi pubblici — il mondo HoReCa. Portano il Made in Italy in tutto il mondo, offrendo sedie, tavoli, sgabelli, divani e complementi d'arredo con un rapporto qualità-prezzo imbattibile. Il loro target sono architetti e professionisti internazionali che cercano unicità, stile e qualità senza compromessi. Abbiamo progettato un sito premium che mette al centro le immagini dei prodotti e la forza del brand, con una navigazione pensata per convertire professionisti e buyer internazionali.",
    what: [
      'Design premium pulito ed elegante, centrato sulle immagini di prodotto',
      'Portfolio "Nostri Lavori" per mostrare i progetti realizzati nel settore HoReCa',
      'Sezione cataloghi sfogliabili, inclusi prodotti iconici come il tavolo Radik',
      'Struttura SEO internazionale per architetti e professionisti del contract',
      'Ottimizzazione per un target globale con focus sul Made in Italy',
      'Performance ottimizzate per gallery fotografiche ad alta risoluzione',
    ],
    results: [
      { value: '+210%', label: 'Richieste da professionisti internazionali' },
      { value: 'Global', label: 'Presenza in mercati Europa, Asia e Americhe' },
      { value: '↑ 3×', label: 'Tempo medio sul sito' },
    ],
    year: '2024',
  },
  {
    slug: 'espressione-danza',
    title: 'Espressione Danza',
    service: 'Social Media',
    serviceSlug: 'social-media-management',
    img: '/Images/Lavori%20Clienti/Espressione%20Danza.jpg',
    tagline: 'Una community che balla insieme al brand.',
    description: 'Espressione Danza è una scuola di danza che volevamettere in connessione la propria community con un piano social coerente e coinvolgente. Abbiamo gestito i canali Instagram e Facebook con contenuti creativi, reel dei saggi e delle lezioni, e una comunicazione calda e autentica che rispecchia l\'anima della scuola.',
    what: [
      'Piano editoriale mensile su misura',
      'Produzione grafica e video per Instagram e Facebook',
      'Gestione community e risposta ai commenti',
      'Campagne di acquisizione nuovi iscritti a settembre',
      'Report mensile con KPI e insights',
    ],
    results: [
      { value: '+320%', label: 'Follower in 6 mesi' },
      { value: '+40%', label: 'Iscrizioni nuovi corsi' },
      { value: '8%', label: 'Tasso di engagement medio' },
    ],
    year: '2024',
  },
  {
    slug: 'cdvi',
    title: 'CDVI',
    service: 'Video',
    serviceSlug: 'photo-video',
    img: '/Images/Lavori%20Clienti/CDVI.jpg',
    tagline: 'La tecnologia raccontata con immagini.',
    description: 'CDVI è un\'azienda specializzata in sistemi di controllo accessi e sicurezza. Abbiamo prodotto una serie di video istituzionali e di prodotto per comunicare la complessità tecnologica in modo chiaro, professionale e coinvolgente. Dal concept alla post-produzione, ogni frame è stato pensato per valorizzare il brand.',
    what: [
      'Video istituzionale aziendale',
      'Video dimostrativi dei prodotti e sistemi',
      'Riprese in location e in studio',
      'Post-produzione con motion graphics e sottotitoli',
      'Versioni ottimizzate per web, social e fiere',
    ],
    results: [
      { value: '↑ 4×', label: 'Visualizzazioni sui canali digitali' },
      { value: '3', label: 'Video prodotti' },
      { value: '+65%', label: 'Engagement sui social' },
    ],
    year: '2024',
  },
  {
    slug: 'gallo-immobiliare',
    title: 'Gallo Immobiliare',
    service: 'Web Design',
    serviceSlug: 'website',
    img: '/Images/Lavori%20Clienti/Gallo%20Immobiliare.jpg',
    tagline: 'Trovare casa, inizia da qui.',
    description: 'Gallo Immobiliare è un\'agenzia immobiliare locale con anni di esperienza nel Trevigiano. Abbiamo creato un sito moderno e funzionale con listing degli immobili, ricerca filtrata per categoria e zona, e un sistema di contatto diretto per ogni annuncio. Il tutto ottimizzato per portare lead qualificati.',
    what: [
      'Sito web con catalogo immobili dinamico',
      'Filtri di ricerca per zona, tipologia e prezzo',
      'Schede dettaglio con gallery e mappa integrata',
      'Form di contatto diretto per ogni annuncio',
      'SEO locale per ricerche immobiliari nella provincia di Treviso',
    ],
    results: [
      { value: '+220%', label: 'Richieste di appuntamento' },
      { value: 'Top 3', label: 'Google "immobiliare Vittorio Veneto"' },
      { value: '+90%', label: 'Visualizzazioni annunci' },
    ],
    year: '2024',
  },
  {
    slug: 'disegno-italia',
    title: 'Disegno Italia',
    service: 'Web Design',
    serviceSlug: 'website',
    img: '/Images/Lavori%20Clienti/Disegno%20Italia.png',
    tagline: 'Il design italiano in un\'unica vetrina.',
    description: 'Disegno Italia celebra il meglio del design e dell\'artigianato italiano. Abbiamo progettato un sito che è esso stesso un\'opera di design: minimalista, elegante, con una navigazione fluida che lascia spazio ai prodotti. Una vetrina digitale pensata per attrarre clienti internazionali e valorizzare ogni singolo pezzo.',
    what: [
      'Design editoriale con forte identità visiva',
      'Catalogo prodotti con filtri e ricerca avanzata',
      'Ottimizzazione per un pubblico internazionale',
      'Integrazione e-commerce su richiesta',
      'Performance ottimizzate per immagini ad alta qualità',
    ],
    results: [
      { value: '+150%', label: 'Traffico internazionale' },
      { value: '0.8s', label: 'Tempo medio di caricamento' },
      { value: '+200%', label: 'Prodotti visualizzati per sessione' },
    ],
    year: '2023',
  },
  {
    slug: 'solo-mattia',
    title: 'Solo Mattia',
    service: 'Web Design',
    serviceSlug: 'website',
    img: '/Images/Lavori%20Clienti/Sito%20web%20Solo%20Mattia.jpg',
    tagline: 'La tradizione del gusto, in una posizione da sogno.',
    description: 'Ristorante Pizzeria Solo Mattia si trova in una posizione suggestiva a Cison di Valmarino (TV), immerso nella natura della Valle di San Daniele, vicino al Bosco delle Penne Mozze. Gestito da Marta e Mattia — giovane coppia formata alla scuola alberghiera di Vittorio Veneto — il locale unisce cucina della tradizione, pizze cotte in forno a legna rotante e una cantina curata da Marta in qualità di sommelier. Abbiamo realizzato un sito che racconta questa storia con calore e autenticità, facilitando le prenotazioni e mettendo in risalto la versatilità della struttura per eventi privati.',
    what: [
      'Sito web custom con design caldo e familiare',
      'Sezione menu ristorante con piatti stagionali e pasta fatta in casa',
      'Sezione pizzeria con tipologie di impasto e cottura a legna',
      'Cantina e selezione vini del territorio curata dalla sommelier',
      'Pagina eventi per cerimonie, battesimi, comunioni, lauree e compleanni',
      'Integrazione prenotazioni via telefono, email e WhatsApp',
      'Sezione accessibilità: intolleranze, vegetariano, servizi famiglia',
      'SEO locale per ricerche ristoranti a Cison di Valmarino e Treviso',
    ],
    results: [
      { value: '+240%', label: 'Prenotazioni online' },
      { value: 'Top 3', label: 'Google "ristorante Cison di Valmarino"' },
      { value: '+180%', label: 'Richieste eventi privati' },
    ],
    year: '2024',
  },
  {
    slug: 'upbeat-tattoo',
    title: 'UpBeat Tattoo',
    service: 'Social Media',
    serviceSlug: 'social-media-management',
    img: '/Images/Lavori%20Clienti/UpBeat%20Tattoo.jpg',
    tagline: 'L\'arte sulla pelle, raccontata sui social.',
    description: 'UpBeat Tattoo è uno studio di tatuaggi con un\'identità visiva forte e un team di artisti di talento. Abbiamo costruito la loro presenza social da zero, creando un feed coerente e accattivante che mette in mostra il lavoro degli artisti. Il risultato: una community fedele e una lista d\'attesa piena.',
    what: [
      'Strategia social da zero su Instagram e TikTok',
      'Produzione contenuti fotografici e video dei lavori',
      'Piano editoriale mensile con storytelling degli artisti',
      'Gestione diretta messaggi e prenotazioni via DM',
      'Campagne di acquisizione clienti locali',
    ],
    results: [
      { value: '+850%', label: 'Follower in 12 mesi' },
      { value: 'Lista piena', label: 'Prenotazioni 2 mesi in anticipo' },
      { value: '12%', label: 'Tasso di engagement medio' },
    ],
    year: '2023',
  },
  {
    slug: 'i-bamboi',
    title: 'I Bamboi',
    service: 'Web Design',
    serviceSlug: 'website',
    img: '/Images/Lavori%20Clienti/3.png',
    tagline: 'La tradizione locale, con una veste moderna.',
    description: 'I Bamboi è una realtà locale radicata nel territorio trevigiano. Abbiamo realizzato un sito web che celebra la loro storia e i loro valori con un design caldo e autentico. La navigazione semplice e il contenuto curato trasmettono immediatamente la qualità e l\'accoglienza che contraddistingue il brand.',
    what: [
      'Sito web su misura con design caldo e territoriale',
      'Sezione storia e valori del brand',
      'Galleria fotografica e sezione contatti',
      'Ottimizzazione SEO locale per il Trevigiano',
      'Versione mobile perfettamente ottimizzata',
    ],
    results: [
      { value: '+170%', label: 'Visite al sito' },
      { value: 'Top 5', label: 'Ricerche locali su Google' },
      { value: '+95%', label: 'Richieste di contatto' },
    ],
    year: '2023',
  },
];

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug);
}
