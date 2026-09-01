export interface ServiceTranslation {
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  includes: string[];
  process: { title: string; description: string }[];
  keywords: string[];
  faq: { question: string; answer: string }[];
}

export const serviceTranslations: Record<string, { en: ServiceTranslation; de: ServiceTranslation }> = {
  'social-media-management': {
    en: {
      name: 'Social Media Management',
      tagline: 'We build communities, not just followers.',
      description: 'We manage your social channels from zero to a hundred: monthly content strategy, creation of visual and written content, publishing and community management.',
      longDescription: "Social media is the most direct point of contact between your brand and your customers. Posting isn't enough: you need a precise strategy, quality content and a consistent presence. We take care of everything, from content planning to responding to comments, so you can focus on your business.",
      includes: [
        'Custom monthly content strategy',
        'Graphic design and copywriting for posts',
        'Publishing and automatic scheduling',
        'Community management (replies and interactions)',
        'Performance analysis and monthly report',
        'Stories and Reels management',
      ],
      process: [
        { title: 'Analysis', description: 'We study your brand, competitors and audience to identify the most effective strategy.' },
        { title: 'Strategy', description: 'We define tone of voice, monthly content plan and measurable goals.' },
        { title: 'Production', description: 'We create graphics, copy and video optimized for each platform.' },
        { title: 'Optimization', description: 'We analyze the data every month and adjust the strategy based on results.' },
      ],
      keywords: [
        'social media management agency', 'social media manager for small businesses', 'Instagram content strategy',
        'community management agency', 'social media marketing Italy', 'Instagram and Facebook management agency',
        'content creation for brands', 'outsourced social media team',
      ],
      faq: [
        {
          question: 'How much does social media management cost?',
          answer: 'Our social media management packages for small and medium businesses start at €350/month for one platform. The cost varies based on the number of channels managed and posting frequency. We offer a free, tailored quote within 24 hours.',
        },
        {
          question: 'How many posts per week do you publish?',
          answer: "Depending on the plan chosen, we publish 3 to 7 pieces of content per week per platform, including Stories and Reels optimized for the Instagram and Facebook algorithm.",
        },
        {
          question: 'Do you also handle comments and messages?',
          answer: 'Yes, community management is included in all our plans. We reply to comments and messages within a few hours, keeping a tone consistent with your brand and building authentic relationships with your followers.',
        },
        {
          question: 'Which social platforms do you work with?',
          answer: "We manage Instagram, Facebook, LinkedIn and TikTok. The choice of the most suitable platforms depends on your target customers, industry and business goals. We'll recommend the right mix during the analysis phase.",
        },
      ],
    },
    de: {
      name: 'Social Media Management',
      tagline: 'Wir bauen Communities auf, nicht nur Follower.',
      description: 'Wir betreuen Ihre Social-Media-Kanäle von A bis Z: monatliche Redaktionsstrategie, Erstellung visueller und textlicher Inhalte, Veröffentlichung und Community-Management.',
      longDescription: 'Social Media ist der direkteste Kontaktpunkt zwischen Ihrer Marke und Ihren Kunden. Posten allein reicht nicht aus: Es braucht eine präzise Strategie, hochwertige Inhalte und eine konstante Präsenz. Wir kümmern uns um alles, von der Redaktionsplanung bis zur Beantwortung von Kommentaren, damit Sie sich auf Ihr Geschäft konzentrieren können.',
      includes: [
        'Maßgeschneiderte monatliche Redaktionsstrategie',
        'Grafikdesign und Copywriting für Beiträge',
        'Veröffentlichung und automatisches Scheduling',
        'Community-Management (Antworten und Interaktionen)',
        'Performance-Analyse und monatlicher Report',
        'Verwaltung von Stories und Reels',
      ],
      process: [
        { title: 'Analyse', description: 'Wir untersuchen Ihre Marke, Ihre Mitbewerber und Ihre Zielgruppe, um die wirksamste Strategie zu ermitteln.' },
        { title: 'Strategie', description: 'Wir definieren Tonalität, monatlichen Redaktionsplan und messbare Ziele.' },
        { title: 'Produktion', description: 'Wir erstellen Grafiken, Texte und Videos, optimiert für jede Plattform.' },
        { title: 'Optimierung', description: 'Wir analysieren die Daten jeden Monat und passen die Strategie an die Ergebnisse an.' },
      ],
      keywords: [
        'Social Media Agentur Wien', 'Social Media Management Agentur Österreich', 'Social Media Marketing Agentur', 'Community Management Agentur',
        'Instagram Content Strategie Österreich', 'Social Media Betreuung KMU', 'Social-Media-Agentur Deutschland',
        'Content Erstellung für Unternehmen', 'Instagram Facebook Betreuung Agentur',
      ],
      faq: [
        {
          question: 'Was kostet die Betreuung von Social-Media-Kanälen?',
          answer: 'Unsere Social-Media-Management-Pakete für kleine und mittlere Unternehmen beginnen bei 350 €/Monat für eine Plattform. Die Kosten hängen von der Anzahl der betreuten Kanäle und der Veröffentlichungsfrequenz ab. Wir erstellen Ihnen innerhalb von 24 Stunden ein kostenloses, individuelles Angebot.',
        },
        {
          question: 'Wie viele Beiträge veröffentlichen Sie pro Woche?',
          answer: 'Je nach gewähltem Paket veröffentlichen wir 3 bis 7 Inhalte pro Woche und Plattform, einschließlich Stories und Reels, optimiert für den Instagram- und Facebook-Algorithmus.',
        },
        {
          question: 'Betreuen Sie auch Kommentare und Nachrichten?',
          answer: 'Ja, Community-Management ist in allen unseren Paketen enthalten. Wir beantworten Kommentare und Nachrichten innerhalb weniger Stunden, mit einem zu Ihrer Marke passenden Tonfall und dem Aufbau authentischer Beziehungen zu Ihren Followern.',
        },
        {
          question: 'Auf welchen Plattformen arbeiten Sie?',
          answer: 'Wir betreuen Instagram, Facebook, LinkedIn und TikTok. Die Wahl der geeignetsten Plattformen hängt von Ihrer Zielgruppe, Ihrer Branche und Ihren Geschäftszielen ab. Wir beraten Sie dazu gerne in der Analysephase.',
        },
      ],
    },
  },
  'advertising': {
    en: {
      name: 'Advertising',
      tagline: 'Every euro invested has to come back multiplied.',
      description: 'Paid campaigns on Meta, Google and TikTok with laser-focused targeting. Continuous optimization based on your business\'s real data.',
      longDescription: "Done well, digital advertising is the most measurable investment there is. We know exactly how many people see your ad, how many click and how many buy. We run campaigns on Meta, Google and TikTok with a data-driven approach: continuous testing, optimized budget and transparent reporting.",
      includes: [
        'Setup and configuration of Meta Ads campaigns',
        'Google Ads (Search, Display, Shopping, YouTube)',
        'TikTok Ads for younger audiences',
        'Creative production (banners, video, copy)',
        'A/B testing on audiences and formats',
        'Weekly report with clear KPIs and ROAS',
      ],
      process: [
        { title: 'Briefing', description: 'We define goals, budget, target audience and KPIs to reach.' },
        { title: 'Setup', description: 'We configure pixels, tags and custom audiences for precise tracking.' },
        { title: 'Launch', description: 'We publish campaigns with tested creatives and segmented audiences.' },
        { title: 'Optimization', description: 'We monitor daily and optimize to maximize ROAS.' },
      ],
      keywords: [
        'Meta Ads agency', 'Google Ads management agency', 'paid advertising agency Italy', 'PPC agency for small business',
        'Facebook Ads management', 'Google Ads for SMEs', 'digital advertising agency', 'performance marketing agency Italy',
      ],
      faq: [
        {
          question: "What's the minimum recommended budget for advertising campaigns?",
          answer: 'We recommend a minimum media budget of €500/month for Meta Ads and €600/month for Google Ads Search, plus our management fee. With smaller budgets, results take longer to optimize.',
        },
        {
          question: 'How long before I see the first results from campaigns?',
          answer: 'The first optimizations are visible within 2-4 weeks. Stable results and an optimized ROAS arrive after 2-3 months of continuous testing. Digital advertising needs data to learn: more time and budget mean better results.',
        },
        {
          question: 'What does campaign management include?',
          answer: 'It includes complete account setup, pixel and tag installation, creative production (images, video, copy), A/B testing on audiences and formats, weekly optimization and detailed KPI reports every week.',
        },
        {
          question: 'Do you work with companies in any industry?',
          answer: 'Yes, we run campaigns for small and medium businesses across every sector: retail, food service, real estate, fashion, crafts, professional services. Our team, based in Italy, works with clients across the country and internationally, remotely.',
        },
      ],
    },
    de: {
      name: 'Advertising',
      tagline: 'Jeder investierte Euro muss vervielfacht zurückkommen.',
      description: 'Bezahlte Kampagnen auf Meta, Google und TikTok mit präzisem Targeting. Kontinuierliche Optimierung auf Basis echter Geschäftsdaten.',
      longDescription: 'Gut gemachte digitale Werbung ist die messbarste Investition, die es gibt. Wir wissen genau, wie viele Menschen Ihre Anzeige sehen, wie viele klicken und wie viele kaufen. Wir betreuen Kampagnen auf Meta, Google und TikTok mit einem datengetriebenen Ansatz: kontinuierliche Tests, optimiertes Budget und transparente Reports.',
      includes: [
        'Einrichtung und Konfiguration von Meta-Ads-Kampagnen',
        'Google Ads (Search, Display, Shopping, YouTube)',
        'TikTok Ads für jüngere Zielgruppen',
        'Erstellung von Werbemitteln (Banner, Video, Copy)',
        'A/B-Tests zu Zielgruppen und Formaten',
        'Wöchentlicher Report mit klaren KPIs und ROAS',
      ],
      process: [
        { title: 'Briefing', description: 'Wir definieren Ziele, Budget, Zielgruppe und zu erreichende KPIs.' },
        { title: 'Setup', description: 'Wir konfigurieren Pixel, Tags und individuelle Zielgruppen für ein präzises Tracking.' },
        { title: 'Launch', description: 'Wir schalten die Kampagnen mit getesteten Werbemitteln und segmentierten Zielgruppen.' },
        { title: 'Optimierung', description: 'Wir überwachen täglich und optimieren, um den ROAS zu maximieren.' },
      ],
      keywords: [
        'Werbeagentur Wien', 'Meta Ads Agentur Österreich', 'Google Ads Agentur Österreich', 'Werbeagentur Online Marketing Österreich',
        'Facebook Ads Betreuung KMU', 'Google Ads für Unternehmen Deutschland', 'Performance Marketing Agentur Österreich',
        'Online Werbekampagnen Agentur', 'TikTok Ads Agentur',
      ],
      faq: [
        {
          question: 'Wie hoch sollte das Mindestbudget für Werbekampagnen sein?',
          answer: 'Wir empfehlen ein Mindest-Mediabudget von 500 €/Monat für Meta Ads und 600 €/Monat für Google Ads Search, zuzüglich unserer Betreuungsgebühr. Bei kleineren Budgets brauchen die Ergebnisse mehr Zeit zur Optimierung.',
        },
        {
          question: 'Wie lange dauert es, bis erste Ergebnisse sichtbar sind?',
          answer: 'Erste Optimierungen sind innerhalb von 2-4 Wochen sichtbar. Stabile Ergebnisse und ein optimierter ROAS stellen sich nach 2-3 Monaten kontinuierlicher Tests ein. Digitale Werbung braucht Daten zum Lernen: mehr Zeit und Budget bedeuten bessere Ergebnisse.',
        },
        {
          question: 'Was beinhaltet die Kampagnenbetreuung?',
          answer: 'Dazu gehören die vollständige Einrichtung der Konten, die Installation von Pixel und Tags, die Erstellung der Werbemittel (Bilder, Video, Copy), A/B-Tests zu Zielgruppen und Formaten, wöchentliche Optimierung und detaillierte KPI-Reports jede Woche.',
        },
        {
          question: 'Arbeiten Sie mit Unternehmen aus jeder Branche?',
          answer: 'Ja, wir betreuen Kampagnen für KMU aus allen Branchen: Einzelhandel, Gastronomie, Immobilien, Mode, Handwerk, Dienstleistungen. Wir betreuen Unternehmen in Österreich, Deutschland und internationale Kunden — remote und persönlich.',
        },
      ],
    },
  },
  'website': {
    en: {
      name: 'Website',
      tagline: 'Your website works for you, 24 hours a day.',
      description: 'We design and develop custom websites that turn visitors into customers. Fast, responsive, optimized for search engines.',
      longDescription: "A website isn't a static storefront: it's your best salesperson, always online. We design every website starting from business goals, not aesthetics. Speed, SEO, conversions: every technical choice has a precise purpose. From concept to launch, we handle everything.",
      includes: [
        'Custom UI/UX design (wireframes + mockups)',
        'Development on WordPress, Astro or React',
        'Complete on-page SEO optimization',
        'Google Analytics 4 and Search Console integration',
        'Responsive website for every device',
        'Hosting and maintenance included for the first year',
      ],
      process: [
        { title: 'Discovery', description: 'We analyze goals, competitors and target users to define the ideal structure.' },
        { title: 'Design', description: 'We design faithful wireframes and mockups before writing a single line of code.' },
        { title: 'Development', description: 'We build the site with the most suitable technologies, fast and secure.' },
        { title: 'Launch', description: 'We test every detail, optimize performance and publish online.' },
      ],
      keywords: [
        'custom website development agency', 'web design agency Italy', 'business website development',
        'WordPress development agency', 'Astro website development', 'website agency for SMEs',
        'professional web design', 'SEO-friendly website development',
      ],
      faq: [
        {
          question: 'How much does a professional website cost?',
          answer: 'A brochure website for small and medium businesses starts at €1,500-2,500. Sites with advanced features (blog, private area, CRM) range from €3,000 to €7,000. Cost depends on complexity. We offer free quotes within 24 hours.',
        },
        {
          question: 'How long does it take to build a website?',
          answer: 'On average 3-6 weeks from initial brief to launch, depending on complexity. Simple brochure sites can be ready in 2-3 weeks. We work with shared review rounds to keep to schedule.',
        },
        {
          question: 'Will the website be optimized for Google (SEO)?',
          answer: 'Yes, every website includes complete on-page SEO: title and meta description optimization, URL structure, loading speed (Core Web Vitals), JSON-LD structured data and integration with Google Search Console and Analytics 4.',
        },
        {
          question: 'Who manages the site after launch?',
          answer: 'The first year of hosting and routine maintenance is included. After that, we offer monthly support plans or on-demand updates. We can also train you to manage the content independently if you prefer.',
        },
      ],
    },
    de: {
      name: 'Website',
      tagline: 'Ihre Website arbeitet für Sie, 24 Stunden am Tag.',
      description: 'Wir konzipieren und entwickeln individuelle Websites, die Besucher in Kunden verwandeln. Schnell, responsiv, für Suchmaschinen optimiert.',
      longDescription: 'Eine Website ist kein statisches Schaufenster: Sie ist Ihr bester Vertriebsmitarbeiter, immer online. Wir gestalten jede Website ausgehend von den Geschäftszielen, nicht von der Optik. Geschwindigkeit, SEO, Conversions: Jede technische Entscheidung hat einen klaren Zweck. Vom Konzept bis zum Launch übernehmen wir alles.',
      includes: [
        'Individuelles UI/UX-Design (Wireframes + Mockups)',
        'Entwicklung mit WordPress, Astro oder React',
        'Vollständige On-Page-SEO-Optimierung',
        'Integration von Google Analytics 4 und der Search Console',
        'Responsive Website für jedes Endgerät',
        'Hosting und Wartung im ersten Jahr inklusive',
      ],
      process: [
        { title: 'Discovery', description: 'Wir analysieren Ziele, Mitbewerber und Zielgruppe, um die ideale Struktur zu definieren.' },
        { title: 'Design', description: 'Wir gestalten originalgetreue Wireframes und Mockups, bevor eine einzige Zeile Code geschrieben wird.' },
        { title: 'Entwicklung', description: 'Wir bauen die Website mit den passendsten Technologien, schnell und sicher.' },
        { title: 'Launch', description: 'Wir testen jedes Detail, optimieren die Performance und veröffentlichen die Website.' },
      ],
      keywords: [
        'Webagentur Wien', 'Website erstellen lassen Wien', 'Webagentur Österreich', 'Webdesign Agentur Österreich',
        'WordPress Agentur Österreich', 'Firmenwebsite erstellen Deutschland', 'professionelle Webentwicklung',
        'SEO Website Agentur Österreich', 'Astro Webentwicklung',
      ],
      faq: [
        {
          question: 'Was kostet eine professionelle Website?',
          answer: 'Eine Unternehmenswebsite für kleine und mittlere Unternehmen beginnt bei 1.500-2.500 €. Websites mit erweiterten Funktionen (Blog, geschützter Bereich, CRM) liegen zwischen 3.000 und 7.000 €. Die Kosten hängen von der Komplexität ab. Wir erstellen innerhalb von 24 Stunden ein kostenloses Angebot.',
        },
        {
          question: 'Wie lange dauert die Erstellung einer Website?',
          answer: 'Im Durchschnitt 3-6 Wochen vom ersten Briefing bis zur Veröffentlichung, je nach Komplexität. Einfache Unternehmenswebsites können in 2-3 Wochen fertig sein. Wir arbeiten mit gemeinsamen Feedbackrunden, um den Zeitplan einzuhalten.',
        },
        {
          question: 'Wird die Website für Google optimiert (SEO)?',
          answer: 'Ja, jede Website enthält eine vollständige On-Page-SEO: Optimierung von Titeln und Meta-Beschreibungen, URL-Struktur, Ladegeschwindigkeit (Core Web Vitals), strukturierte JSON-LD-Daten sowie die Anbindung an Google Search Console und Analytics 4.',
        },
        {
          question: 'Wer betreut die Website nach dem Launch?',
          answer: 'Das erste Jahr Hosting und laufende Wartung ist inbegriffen. Danach bieten wir monatliche Betreuungspakete oder Updates nach Bedarf an. Auf Wunsch schulen wir Sie auch, damit Sie die Inhalte selbstständig verwalten können.',
        },
      ],
    },
  },
  'ecommerce': {
    en: {
      name: 'E-Commerce',
      tagline: 'Online stores that actually sell.',
      description: 'From product catalog to checkout, we build high-performing e-commerce stores on Shopify or WooCommerce. Full setup with payments, shipping and order management.',
      longDescription: "Selling online is much more than uploading products to a platform. It takes a design that inspires trust, a smooth checkout that doesn't lose customers halfway through, and seamless integration with payments, shipping and inventory management. We are certified Shopify partners and build stores that convert.",
      includes: [
        'Full Shopify or WooCommerce setup',
        'Custom theme design optimized for conversions',
        'Payment gateway integration (Stripe, PayPal)',
        'Shipping, tax and invoicing configuration',
        'SEO-optimized product pages',
        'Training for independent store management',
      ],
      process: [
        { title: 'Planning', description: 'We define catalog structure, categories, payment methods and logistics.' },
        { title: 'Design', description: 'We design a custom theme that reflects the brand and maximizes conversions.' },
        { title: 'Development', description: 'We build and configure every technical aspect of the store.' },
        { title: 'Go Live', description: 'We test the full purchase flow, train your team and launch.' },
      ],
      keywords: [
        'Shopify agency Italy', 'WooCommerce development agency', 'e-commerce development agency',
        'online store development', 'e-commerce agency for SMEs', 'Shopify partner agency',
        'custom e-commerce design', 'online store setup Italy',
      ],
      faq: [
        {
          question: 'How much does it cost to build an e-commerce store?',
          answer: 'A complete online store on Shopify or WooCommerce starts at €2,500 for simple catalogs, up to €8,000+ for e-commerce sites with advanced features (configurators, subscriptions, marketplaces). Free quote within 24 hours.',
        },
        {
          question: 'Shopify or WooCommerce — which is better for my business?',
          answer: "Shopify is ideal if you want to launch quickly, with less technical complexity and simplified payments. WooCommerce on WordPress is preferable if you already have a WordPress site or need extensive customization. We'll recommend the right option after a free call.",
        },
        {
          question: 'Will the store be optimized to appear on Google Shopping?',
          answer: 'Yes, we configure the product feed for Google Shopping, optimize product pages for SEO (titles, descriptions, Product schema structured data) and connect Google Merchant Center.',
        },
        {
          question: 'Will I be able to manage the store on my own after launch?',
          answer: "Absolutely. We include a hands-on training session where we teach you to upload products, manage orders, set up discounts and read the analytics. We're then available for post-launch technical support.",
        },
      ],
    },
    de: {
      name: 'E-Commerce',
      tagline: 'Online-Shops, die wirklich verkaufen.',
      description: 'Vom Produktkatalog bis zum Checkout entwickeln wir leistungsstarke Online-Shops auf Shopify oder WooCommerce. Komplettes Setup mit Zahlungsabwicklung, Versand und Bestellverwaltung.',
      longDescription: 'Online verkaufen ist weit mehr, als Produkte auf eine Plattform hochzuladen. Es braucht ein Design, das Vertrauen schafft, einen reibungslosen Checkout, der keine Kunden auf halbem Weg verliert, und eine perfekte Anbindung an Zahlungsabwicklung, Versand und Lagerverwaltung. Wir sind zertifizierter Shopify-Partner und bauen Shops, die konvertieren.',
      includes: [
        'Vollständiges Setup von Shopify oder WooCommerce',
        'Individuelles Theme-Design, optimiert für Conversions',
        'Integration von Zahlungs-Gateways (Stripe, PayPal)',
        'Konfiguration von Versand, Steuern und Rechnungsstellung',
        'SEO-optimierte Produktseiten',
        'Schulung für die eigenständige Verwaltung des Shops',
      ],
      process: [
        { title: 'Planung', description: 'Wir definieren Katalogstruktur, Kategorien, Zahlungsmethoden und Logistik.' },
        { title: 'Design', description: 'Wir gestalten ein individuelles Theme, das die Marke widerspiegelt und Conversions maximiert.' },
        { title: 'Entwicklung', description: 'Wir bauen und konfigurieren jeden technischen Aspekt des Shops.' },
        { title: 'Go Live', description: 'Wir testen den kompletten Kaufprozess, schulen Ihr Team und starten den Shop.' },
      ],
      keywords: [
        'E-Commerce Agentur Wien', 'Shopify Agentur Österreich', 'WooCommerce Agentur Österreich', 'Online-Shop erstellen lassen Österreich',
        'E-Commerce Agentur Deutschland', 'Shopify Partner Agentur', 'Onlineshop Entwicklung KMU',
        'individueller Online-Shop', 'E-Commerce Website Agentur',
      ],
      faq: [
        {
          question: 'Was kostet die Erstellung eines Online-Shops?',
          answer: 'Ein vollständiger Online-Shop auf Shopify oder WooCommerce beginnt bei 2.500 € für einfache Kataloge und geht bis 8.000 €+ für Shops mit erweiterten Funktionen (Konfiguratoren, Abonnements, Marktplätze). Kostenloses Angebot innerhalb von 24 Stunden.',
        },
        {
          question: 'Shopify oder WooCommerce — was ist besser für mein Unternehmen?',
          answer: 'Shopify eignet sich, wenn Sie schnell starten möchten, mit geringerer technischer Komplexität und vereinfachten Zahlungen. WooCommerce auf WordPress ist vorzuziehen, wenn Sie bereits eine WordPress-Website haben oder umfangreiche Individualisierungen benötigen. Wir beraten Sie gerne nach einem kostenlosen Gespräch.',
        },
        {
          question: 'Wird der Shop für Google Shopping optimiert?',
          answer: 'Ja, wir konfigurieren den Produkt-Feed für Google Shopping, optimieren die Produktseiten für SEO (Titel, Beschreibungen, strukturierte Product-Schema-Daten) und binden das Google Merchant Center an.',
        },
        {
          question: 'Kann ich den Shop nach dem Launch selbst verwalten?',
          answer: 'Absolut. Wir bieten eine praktische Schulung, in der wir Ihnen zeigen, wie Sie Produkte hochladen, Bestellungen verwalten, Rabatte einrichten und die Statistiken lesen. Danach stehen wir für technischen Support nach dem Launch zur Verfügung.',
        },
      ],
    },
  },
  'photo-video': {
    en: {
      name: 'Photo & Video',
      tagline: 'Your brand deserves extraordinary content.',
      description: 'Professional photography and video production for every need: product shoots, corporate video, social media content and advertising campaigns.',
      longDescription: 'In a world where attention spans last three seconds, visual quality is everything. We produce photo and video content that stops the scroll: from product campaigns to brand films, from Instagram Reels to corporate videos. All in studio or on location, with professional equipment.',
      includes: [
        'Product, team and location photo shoots',
        'Corporate video and brand films',
        'Reels and vertical content for social media',
        'Editing, color grading and post-production',
        'Royalty-free music and sound design',
        'Files delivered optimized for every platform',
      ],
      process: [
        { title: 'Brief', description: 'We define mood, visual references, location and the list of shots needed.' },
        { title: 'Pre-production', description: 'We prepare storyboards, location scouting and everything needed for shoot day.' },
        { title: 'Production', description: 'We carry out the photo shoot or video filming with professional equipment.' },
        { title: 'Post-production', description: 'Editing, retouching, color grading and delivery of final files.' },
      ],
      keywords: [
        'corporate photography agency', 'video production agency Italy', 'product photography agency',
        'corporate video production', 'commercial photography agency', 'social media video production',
        'content creation studio', 'professional photographer for businesses',
      ],
      faq: [
        {
          question: 'How much does a corporate photo shoot cost?',
          answer: 'A professional photo shoot for businesses starts at €400 for a half-day in studio or on location. It includes editing and delivery of high-resolution files. Free, tailored quote for your project.',
        },
        {
          question: 'Do you produce video content for social media and Instagram Reels?',
          answer: 'Yes, we produce video content optimized for every format: vertical Reels for Instagram and TikTok, horizontal videos for YouTube and LinkedIn, animated stories. We deliver files ready to publish in all the formats you need.',
        },
        {
          question: 'Do you travel outside your base for shoots?',
          answer: 'Absolutely. Our team, based in Italy, works across the country and internationally for larger projects. Travel costs are quoted case by case.',
        },
        {
          question: 'How long does it take from the shoot to file delivery?',
          answer: 'Standard post-production takes 5-10 business days for photography and 2-4 weeks for video production. For urgent needs, we offer a fast-delivery service with reduced turnaround.',
        },
      ],
    },
    de: {
      name: 'Foto & Video',
      tagline: 'Ihre Marke verdient außergewöhnlichen Content.',
      description: 'Professionelle Foto- und Videoproduktion für jeden Bedarf: Produktshootings, Imagefilme, Social-Media-Content und Werbekampagnen.',
      longDescription: 'In einer Welt, in der Aufmerksamkeit drei Sekunden dauert, ist visuelle Qualität alles. Wir produzieren Foto- und Videoinhalte, die den Scroll stoppen: von der Produktkampagne bis zum Markenfilm, vom Instagram-Reel bis zum Imagefilm. Alles im Studio oder vor Ort, mit professioneller Ausrüstung.',
      includes: [
        'Fotoshootings für Produkte, Team und Location',
        'Imagefilme und Markenfilme',
        'Reels und vertikale Inhalte für Social Media',
        'Editing, Color Grading und Postproduktion',
        'Lizenzfreie Musik und Sounddesign',
        'Lieferung optimierter Dateien für jede Plattform',
      ],
      process: [
        { title: 'Brief', description: 'Wir definieren Mood, visuelle Referenzen, Location und die Liste der benötigten Aufnahmen.' },
        { title: 'Vorproduktion', description: 'Wir bereiten Storyboards, Location-Scouting und alles Nötige für den Drehtag vor.' },
        { title: 'Produktion', description: 'Wir realisieren das Fotoshooting oder die Videoaufnahmen mit professioneller Ausrüstung.' },
        { title: 'Postproduktion', description: 'Editing, Retusche, Color Grading und Lieferung der finalen Dateien.' },
      ],
      keywords: [
        'Fotograf für Unternehmen Wien', 'Videoproduktion Agentur Wien', 'Fotograf für Unternehmen Österreich', 'Produktfotografie Agentur',
        'Imagefilm Produktion Österreich', 'Unternehmensfotografie Agentur', 'Social Media Video Produktion',
        'Content Creation Studio Österreich', 'Werbefotograf Österreich',
      ],
      faq: [
        {
          question: 'Was kostet ein Firmenfotoshooting?',
          answer: 'Ein professionelles Fotoshooting für Unternehmen beginnt bei 400 € für einen halben Tag im Studio oder vor Ort. Inklusive Bearbeitung und Lieferung hochauflösender Dateien. Kostenloses, individuelles Angebot für Ihr Projekt.',
        },
        {
          question: 'Produzieren Sie auch Videos für Social Media und Instagram Reels?',
          answer: 'Ja, wir produzieren Videoinhalte, optimiert für jedes Format: vertikale Reels für Instagram und TikTok, horizontale Videos für YouTube und LinkedIn, animierte Stories. Wir liefern veröffentlichungsfertige Dateien in allen gewünschten Formaten.',
        },
        {
          question: 'Reisen Sie auch für Aufnahmen an?',
          answer: 'Absolut. Unser Team mit Sitz in Italien arbeitet für größere Projekte auch international, unter anderem in Österreich und Deutschland. Die Reisekosten werden von Fall zu Fall im Angebot ausgewiesen.',
        },
        {
          question: 'Wie lange dauert es von der Aufnahme bis zur Lieferung der Dateien?',
          answer: 'Die Standard-Postproduktion dauert 5-10 Werktage für Fotografie und 2-4 Wochen für Videoproduktion. Für dringende Anfragen bieten wir einen Fast-Delivery-Service mit verkürzten Lieferzeiten an.',
        },
      ],
    },
  },
  'visual-identity': {
    en: {
      name: 'Visual Identity',
      tagline: 'A recognizable brand is worth more than a thousand ads.',
      description: "We create consistent, memorable visual identities. From logo to a complete brand book, every element is designed to communicate your brand's values.",
      longDescription: 'Visual identity is the first language your brand speaks. Before people even read what you do, they see what you look like. We build solid visual identities that stay recognizable on any surface: digital, print, packaging. From naming to a complete brand manual.',
      includes: [
        'Logo design + variants (color, black & white, negative)',
        'Primary and secondary color palette',
        'Brand typography (font selection)',
        'Complete brand guidelines (PDF brand book)',
        'Social media and presentation templates',
        'Mockups on physical and digital materials',
      ],
      process: [
        { title: 'Discovery', description: "We explore your brand's values, competitors and desired positioning." },
        { title: 'Concept', description: 'We develop 2-3 different creative directions, each with a moodboard and rationale.' },
        { title: 'Development', description: 'We refine the chosen direction into the final version of every element.' },
        { title: 'Delivery', description: 'We deliver all source files and the brand book with usage guidelines.' },
      ],
      keywords: [
        'logo design agency Italy', 'brand identity agency', 'corporate visual identity design',
        'branding agency for SMEs', 'brand book design agency', 'professional logo designer',
        'graphic design agency Italy', 'brand design studio',
      ],
      faq: [
        {
          question: 'How much does a professional logo design cost?',
          answer: 'A professional logo design for small and medium businesses starts at €800, including color variants and source files in every format (AI, SVG, PNG, PDF). A complete visual identity package with brand book starts at €1,800. Free quote.',
        },
        {
          question: 'How many logo concepts do I get and how many revisions are included?',
          answer: 'We develop 2-3 distinct creative directions during the concept phase, each with a moodboard and rationale. Once you choose a direction, 3 rounds of revisions are included to reach the perfect result.',
        },
        {
          question: 'What do I receive at the end of the visual identity project?',
          answer: 'We deliver all editable source files (Illustrator, Figma), the logo in every format (SVG, PNG, PDF, JPG) and size, the PDF brand book with usage rules, color palette with HEX/CMYK/Pantone codes and typography.',
        },
        {
          question: 'Do you also design print materials (business cards, brochures)?',
          answer: "Yes, once the visual identity is created we can design any communication material: business cards, brochures, roll-ups, packaging, letterhead. Everything consistent with the brand manual we've just built.",
        },
      ],
    },
    de: {
      name: 'Visual Identity',
      tagline: 'Eine wiedererkennbare Marke ist mehr wert als tausend Anzeigen.',
      description: 'Wir gestalten konsistente, einprägsame visuelle Identitäten. Vom Logo bis zum kompletten Brandbook wird jedes Element so gestaltet, dass es die Werte Ihrer Marke vermittelt.',
      longDescription: 'Die visuelle Identität ist die erste Sprache, in der Ihre Marke spricht. Noch bevor Menschen lesen, was Sie tun, sehen sie, wie Sie sich präsentieren. Wir bauen starke visuelle Identitäten, die auf jeder Oberfläche wiedererkennbar bleiben: digital, im Druck, auf Verpackungen. Vom Naming bis zum kompletten Brand-Manual.',
      includes: [
        'Logodesign + Varianten (Farbe, Schwarz-Weiß, Negativ)',
        'Primäre und sekundäre Farbpalette',
        'Markentypografie (Font-Auswahl)',
        'Vollständige Brand Guidelines (Brandbook als PDF)',
        'Vorlagen für Social Media und Präsentationen',
        'Mockups für physische und digitale Materialien',
      ],
      process: [
        { title: 'Discovery', description: 'Wir untersuchen die Werte Ihrer Marke, Ihre Mitbewerber und die gewünschte Positionierung.' },
        { title: 'Konzept', description: 'Wir entwickeln 2-3 unterschiedliche kreative Richtungen, jeweils mit Moodboard und Begründung.' },
        { title: 'Entwicklung', description: 'Wir verfeinern die gewählte Richtung bis zur finalen Version jedes Elements.' },
        { title: 'Übergabe', description: 'Wir liefern alle Quelldateien sowie das Brandbook mit den Nutzungsregeln.' },
      ],
      keywords: [
        'Corporate Design Agentur Wien', 'Logo Design Agentur Wien', 'Brand Identity Agentur Österreich', 'Corporate Design Agentur',
        'Branding Agentur KMU', 'Brandbook erstellen lassen', 'professionelles Logo Design Österreich',
        'Grafikdesign Agentur Österreich', 'visuelle Markenidentität',
      ],
      faq: [
        {
          question: 'Was kostet das Design eines professionellen Logos?',
          answer: 'Das Design eines professionellen Logos für KMU beginnt bei 800 €, inklusive Farbvarianten und Quelldateien in allen Formaten (AI, SVG, PNG, PDF). Ein komplettes Visual-Identity-Paket mit Brandbook beginnt bei 1.800 €. Kostenloses Angebot.',
        },
        {
          question: 'Wie viele Logo-Vorschläge erhalte ich und wie viele Korrekturrunden sind enthalten?',
          answer: 'In der Konzeptphase entwickeln wir 2-3 unterschiedliche kreative Richtungen, jeweils mit Moodboard und Begründung. Sobald Sie sich für eine Richtung entschieden haben, sind 3 Korrekturrunden enthalten, um das perfekte Ergebnis zu erzielen.',
        },
        {
          question: 'Was erhalte ich am Ende des Visual-Identity-Projekts?',
          answer: 'Wir liefern alle editierbaren Quelldateien (Illustrator, Figma), das Logo in allen Formaten (SVG, PNG, PDF, JPG) und Größen, das Brandbook als PDF mit Nutzungsregeln, die Farbpalette mit HEX-/CMYK-/Pantone-Codes und die Typografien.',
        },
        {
          question: 'Gestalten Sie auch Druckmaterialien (Visitenkarten, Broschüren)?',
          answer: 'Ja, nach der Erstellung der visuellen Identität gestalten wir jedes gewünschte Kommunikationsmaterial: Visitenkarten, Broschüren, Roll-ups, Verpackungen, Briefpapier. Alles konsistent mit dem gerade erstellten Brand-Manual.',
        },
      ],
    },
  },
  'mvp-saas': {
    en: {
      name: 'MVP & SaaS',
      tagline: 'From prototype to custom business software, in weeks not years.',
      description: 'We turn your idea into a working digital product and develop custom business management software for companies: inventory, production, CRM, accounting. Custom web applications built with the most modern technologies.',
      longDescription: "Do you have an idea for a digital product, or need custom management software for your company? We work both with startups looking to validate a product and with SMEs whose processes are too specific for off-the-shelf software. We develop custom web applications — from internal management systems (inventory, production, CRM, invoicing) to SaaS products — following a lean approach: we build what's needed to start working with it for real, gather genuine feedback and iterate fast.",
      includes: [
        'Discovery and definition of the product or business software',
        'UX design and interactive prototype (Figma)',
        'Full-stack development (Next.js, Node.js, Supabase)',
        'Custom business software development: inventory, production, CRM, invoicing',
        'Authentication, database and APIs',
        'Deployment on scalable cloud infrastructure',
        'Post-launch support and iterative development',
      ],
      process: [
        { title: 'Ideation', description: 'We define the core of the product or system: what problems it solves, and for whom.' },
        { title: 'Design', description: 'We prototype the main user flow in Figma before writing any code.' },
        { title: 'Build', description: 'We develop core features with weekly sprints and frequent reviews.' },
        { title: 'Launch & Iterate', description: 'We launch, gather real feedback and keep building.' },
      ],
      keywords: [
        'custom software development agency', 'SaaS MVP development agency', 'business management software development',
        'custom software development Italy', 'software development agency for startups', 'bespoke web application development',
        'custom ERP development agency', 'product development agency', 'software house Italy', 'Next.js development agency',
      ],
      faq: [
        {
          question: 'Do you also develop business management software for companies, not just startups?',
          answer: 'Yes. Alongside MVPs for startups, we develop custom business software and web applications for SMEs: inventory management, production, CRM, invoicing and any process too specific for off-the-shelf software. We analyze your actual workflow and build the application around it.',
        },
        {
          question: 'How much does it cost to develop an MVP or custom business software?',
          answer: 'An MVP or essential system to validate a process starts at €5,000-8,000, up to €15,000+ for more complex platforms with multiple modules and integrations. Cost depends on the core features needed. We evaluate the project together, free of charge, first.',
        },
        {
          question: 'How long does it take to go live with the first product or system?',
          answer: 'With a lean methodology, the first working version is available in 6-12 weeks. We work in weekly sprints with frequent demos so you can see progress and give feedback at every stage.',
        },
        {
          question: 'What happens if I want to add features after launch?',
          answer: 'Our approach is designed to grow over time. After launch we gather real user feedback and keep developing the most requested features through iterative sprints. You can scale the product or system at your own pace.',
        },
        {
          question: 'Will the code belong to us or stay yours?',
          answer: 'All source code is 100% your property. At the end of the project you receive full access to every repository, including instructions for managing deployment and updates independently.',
        },
      ],
    },
    de: {
      name: 'MVP & SaaS',
      tagline: 'Vom Prototyp zur individuellen Business-Software, in Wochen statt Jahren.',
      description: 'Wir verwandeln Ihre Idee in ein funktionierendes digitales Produkt und entwickeln individuelle Business-Software für Unternehmen: Lager, Produktion, CRM, Buchhaltung. Maßgeschneiderte Webanwendungen mit den modernsten Technologien.',
      longDescription: 'Haben Sie eine Idee für ein digitales Produkt oder benötigen Sie individuelle Business-Software für Ihr Unternehmen? Wir arbeiten sowohl mit Startups, die ein Produkt validieren möchten, als auch mit KMU, deren Prozesse zu spezifisch für Standardsoftware sind. Wir entwickeln individuelle Webanwendungen — von internen Systemen (Lager, Produktion, CRM, Rechnungsstellung) bis zu SaaS-Produkten — nach einem Lean-Ansatz: Wir bauen, was nötig ist, um wirklich damit zu arbeiten, sammeln echtes Feedback und iterieren schnell.',
      includes: [
        'Discovery und Definition des Produkts oder der Business-Software',
        'UX-Design und interaktiver Prototyp (Figma)',
        'Full-Stack-Entwicklung (Next.js, Node.js, Supabase)',
        'Entwicklung individueller Business-Software: Lager, Produktion, CRM, Rechnungsstellung',
        'Authentifizierung, Datenbank und APIs',
        'Deployment auf skalierbarer Cloud-Infrastruktur',
        'Support nach dem Launch und iterative Weiterentwicklung',
      ],
      process: [
        { title: 'Ideenfindung', description: 'Wir definieren den Kern des Produkts oder Systems: welche Probleme es löst und für wen.' },
        { title: 'Design', description: 'Wir prototypisieren den wichtigsten Nutzerfluss in Figma, bevor Code geschrieben wird.' },
        { title: 'Build', description: 'Wir entwickeln die Kernfunktionen in wöchentlichen Sprints mit regelmäßigen Reviews.' },
        { title: 'Launch & Iterate', description: 'Wir veröffentlichen, sammeln echtes Feedback und entwickeln kontinuierlich weiter.' },
      ],
      keywords: [
        'individuelle Businesssoftware Wien', 'Softwareentwicklung Agentur Wien', 'individuelle Businesssoftware Österreich', 'SaaS MVP Entwicklung',
        'Softwareentwicklung für Startups', 'individuelle ERP Entwicklung Österreich', 'Business Software Entwicklung KMU',
        'Webanwendung entwickeln lassen', 'Softwareagentur Österreich', 'Next.js Entwicklung Agentur', 'Produktentwicklung digitale Produkte',
      ],
      faq: [
        {
          question: 'Entwickeln Sie auch Business-Software für Unternehmen, nicht nur für Startups?',
          answer: 'Ja. Neben MVPs für Startups entwickeln wir individuelle Business-Software und Webanwendungen für KMU: Lagerverwaltung, Produktion, CRM, Rechnungsstellung und jeden Prozess, der zu spezifisch für Standardsoftware ist. Wir analysieren Ihren tatsächlichen Arbeitsablauf und bauen die Anwendung entsprechend.',
        },
        {
          question: 'Was kostet die Entwicklung eines MVP oder einer individuellen Business-Software?',
          answer: 'Ein MVP oder ein grundlegendes System zur Validierung eines Prozesses beginnt bei 5.000-8.000 €, bis zu 15.000 €+ für komplexere Plattformen mit mehreren Modulen und Integrationen. Die Kosten hängen von den benötigten Kernfunktionen ab. Zunächst bewerten wir das Projekt gemeinsam, kostenlos.',
        },
        {
          question: 'Wie lange dauert es bis zum Go-live des ersten Produkts oder Systems?',
          answer: 'Mit der Lean-Methodik ist die erste funktionsfähige Version in 6-12 Wochen verfügbar. Wir arbeiten in wöchentlichen Sprints mit regelmäßigen Demos, damit Sie den Fortschritt sehen und in jeder Phase Feedback geben können.',
        },
        {
          question: 'Was passiert, wenn ich nach dem Launch Funktionen hinzufügen möchte?',
          answer: 'Unser Ansatz ist darauf ausgelegt, mit der Zeit zu wachsen. Nach dem Launch sammeln wir echtes Nutzerfeedback und entwickeln die am meisten gewünschten Funktionen in iterativen Sprints weiter. Sie können das Produkt oder System in Ihrem eigenen Tempo skalieren.',
        },
        {
          question: 'Gehört uns der Code, oder bleibt er bei Ihnen?',
          answer: 'Der gesamte Quellcode gehört zu 100 % Ihnen. Am Ende des Projekts erhalten Sie vollständigen Zugriff auf alle Repositories, einschließlich Anleitungen, um Deployment und Updates eigenständig zu verwalten.',
        },
      ],
    },
  },
  'app': {
    en: {
      name: 'App',
      tagline: "Your app, in your customers' pockets.",
      description: 'We develop iOS and Android mobile apps with React Native. One codebase, two platforms, a native experience.',
      longDescription: "An app isn't just a mobile version of your website: it's a dedicated space where your users actively choose to be. We design apps with native UX for iOS and Android, built with React Native to maximize quality and minimize development time. From the first screen to publication on the app stores.",
      includes: [
        'Native UX/UI design for iOS and Android',
        'Cross-platform React Native development',
        'Integration with existing APIs and backends',
        'Push notifications and offline functionality',
        'Testing on real devices (iOS + Android)',
        'Publication on the App Store and Google Play',
      ],
      process: [
        { title: 'Discovery', description: 'We define the essential features, user flows and technical platform.' },
        { title: 'Design', description: 'We design every screen following iOS Human Interface Guidelines and Material Design.' },
        { title: 'Development', description: 'We build in weekly sprints with testable builds on real devices.' },
        { title: 'Store', description: 'We handle publication on the App Store and Google Play, including the review process.' },
      ],
      keywords: [
        'mobile app development agency', 'React Native development agency', 'iOS and Android app development',
        'app development agency Italy', 'cross-platform app development', 'custom mobile app development',
        'app development for businesses', 'mobile developer agency',
      ],
      faq: [
        {
          question: 'How much does it cost to develop a mobile app?',
          answer: 'A mobile app with standard features starts at €8,000-12,000 for iOS and Android together with React Native. More complex apps with advanced integrations can exceed €20,000. We offer a free evaluation of your idea.',
        },
        {
          question: 'How long does it take to publish an app on the stores?',
          answer: 'Developing a complete app takes 3-5 months on average. Publication on the App Store and Google Play adds 1-2 weeks for the review process. We work in weekly sprints with testable builds on real devices.',
        },
        {
          question: 'Will the app work on both iPhone and Android?',
          answer: 'Yes, we develop with React Native, which generates a single codebase for both platforms, ensuring a quality native experience on both iOS and Android while reducing costs compared to separate native development.',
        },
        {
          question: 'What happens if I already have a website and want to add an app alongside it?',
          answer: 'We integrate the app with your existing website and management system via API. The app becomes an additional channel for your customers, with access to the same information as the site but with native features (push notifications, offline mode, etc.).',
        },
      ],
    },
    de: {
      name: 'App',
      tagline: 'Ihre App in der Tasche Ihrer Kunden.',
      description: 'Wir entwickeln iOS- und Android-Apps mit React Native. Eine Codebasis, zwei Plattformen, native Erfahrung.',
      longDescription: 'Eine App ist nicht nur eine mobile Version Ihrer Website: Sie ist ein eigener Raum, in dem sich Ihre Nutzer aktiv entscheiden zu sein. Wir gestalten Apps mit nativer UX für iOS und Android, entwickelt mit React Native, um Qualität zu maximieren und Entwicklungszeit zu minimieren. Vom ersten Screen bis zur Veröffentlichung in den Stores.',
      includes: [
        'Natives UX/UI-Design für iOS und Android',
        'Plattformübergreifende Entwicklung mit React Native',
        'Integration mit bestehenden APIs und Backends',
        'Push-Benachrichtigungen und Offline-Funktionen',
        'Tests auf echten Geräten (iOS + Android)',
        'Veröffentlichung im App Store und bei Google Play',
      ],
      process: [
        { title: 'Discovery', description: 'Wir definieren die wesentlichen Funktionen, Nutzerflüsse und die technische Plattform.' },
        { title: 'Design', description: 'Wir gestalten jeden Screen gemäß den iOS Human Interface Guidelines und Material Design.' },
        { title: 'Entwicklung', description: 'Wir entwickeln in wöchentlichen Sprints mit testbaren Builds auf echten Geräten.' },
        { title: 'Store', description: 'Wir übernehmen die Veröffentlichung im App Store und bei Google Play, inklusive Review-Prozess.' },
      ],
      keywords: [
        'App Entwicklung Wien', 'React Native Agentur Wien', 'App Entwicklung Österreich', 'iOS Android App Entwicklung',
        'App Entwicklung Agentur Deutschland', 'mobile App entwickeln lassen', 'plattformübergreifende App Entwicklung',
        'App Agentur für Unternehmen', 'Mobile Developer Agentur Österreich',
      ],
      faq: [
        {
          question: 'Was kostet die Entwicklung einer mobilen App?',
          answer: 'Eine mobile App mit Standardfunktionen beginnt bei 8.000-12.000 € für iOS und Android gemeinsam mit React Native. Komplexere Apps mit erweiterten Integrationen können 20.000 € übersteigen. Wir bieten eine kostenlose Bewertung Ihrer Idee an.',
        },
        {
          question: 'Wie lange dauert es, eine App in den Stores zu veröffentlichen?',
          answer: 'Die Entwicklung einer vollständigen App dauert im Durchschnitt 3-5 Monate. Die Veröffentlichung im App Store und bei Google Play fügt 1-2 Wochen für den Review-Prozess hinzu. Wir arbeiten in wöchentlichen Sprints mit testbaren Builds auf echten Geräten.',
        },
        {
          question: 'Funktioniert die App sowohl auf iPhone als auch auf Android?',
          answer: 'Ja, wir entwickeln mit React Native, das eine einzige Codebasis für beide Plattformen erzeugt und so eine hochwertige native Erfahrung auf iOS und Android gewährleistet — bei geringeren Kosten als bei getrennter nativer Entwicklung.',
        },
        {
          question: 'Was passiert, wenn ich bereits eine Website habe und eine App ergänzen möchte?',
          answer: 'Wir binden die App über API an Ihre bestehende Website und Ihr Verwaltungssystem an. Die App wird so zu einem zusätzlichen Kanal für Ihre Kunden, mit Zugriff auf dieselben Informationen wie die Website, aber mit nativen Funktionen (Push-Benachrichtigungen, Offline-Modus usw.).',
        },
      ],
    },
  },
  'integrazioni': {
    en: {
      name: 'Integrations & Automation',
      tagline: 'Your stack finally speaks one language.',
      description: 'We integrate any tool in your stack: CRM, ERP, email, e-commerce, accounting, HR. Direct APIs, Make, Zapier and n8n for the most effective and sustainable solution.',
      longDescription: "Every company accumulates dozens of tools over time that don't talk to each other: the CRM doesn't know what the e-commerce platform is doing, accounting doesn't talk to HR, emails go out by hand. We connect everything. We use direct APIs when maximum performance and reliability matter, Make or Zapier when speed is the priority, n8n when you need full control at zero cost. The result: synchronized data, a freer team, human errors eliminated.",
      includes: [
        'Direct APIs for maximum performance and reliability',
        'Make and Zapier for fast, no-code integrations',
        'Custom connectors when platforms require them',
        'Support for webhooks and real-time events',
        'CRM, ERP, email, accounting and HR integration',
        'Documentation and maintenance of automated workflows',
      ],
      process: [
        { title: 'Mapping', description: 'We analyze all the tools in your stack and existing workflows to identify bottlenecks and opportunities.' },
        { title: 'Design', description: 'We define the integration architecture, choosing the best technology for each connection.' },
        { title: 'Development', description: 'We implement the automated workflows with testing on every scenario, including error cases.' },
        { title: 'Monitoring', description: 'We set up alerting on critical workflows and provide dashboards to make sure everything works.' },
      ],
      keywords: [
        'business process automation agency', 'CRM ERP integration agency', 'Make Zapier integration agency',
        'workflow automation agency', 'API integration services', 'software integration agency Italy',
        'n8n automation agency', 'business automation consulting',
      ],
      faq: [
        {
          question: 'Which business tools can you integrate?',
          answer: 'We integrate practically any business software: CRM (HubSpot, Salesforce, Zoho), ERP (SAP, Odoo), e-commerce (Shopify, WooCommerce), accounting tools, email marketing (Mailchimp, Klaviyo), HR and much more.',
        },
        {
          question: 'How much does it cost to implement business automation?',
          answer: 'A simple automation (e.g. CRM-email sync) starts at €500-800 as a one-off cost. More complex workflows involving multiple systems range from €1,500 to €5,000+. After that, there\'s only the monthly cost of the tools used (Make, Zapier, etc.), often €30-100/month.',
        },
        {
          question: "Do I need a technician to manage the automations after you've built them?",
          answer: "No. The automations run autonomously 24/7. We provide clear documentation and a monitoring dashboard. We're available for future changes, but you can manage the simpler workflows yourself, even without technical knowledge.",
        },
        {
          question: 'On average, how much time does automation save a company?',
          answer: 'Our integrations save an average of 5-20 hours of manual work per week for SMEs with 5-20 employees. ROI is usually reached within 2-4 months of going live. Every project starts with a free analysis of the potential savings.',
        },
      ],
    },
    de: {
      name: 'Integrationen & Automatisierungen',
      tagline: 'Ihr Stack spricht endlich eine einzige Sprache.',
      description: 'Wir integrieren jedes Tool in Ihrem Stack: CRM, ERP, E-Mail, E-Commerce, Buchhaltung, HR. Direkte APIs, Make, Zapier und n8n für die effektivste und nachhaltigste Lösung.',
      longDescription: 'Jedes Unternehmen sammelt mit der Zeit Dutzende Tools an, die nicht miteinander kommunizieren: Das CRM weiß nicht, was der Online-Shop macht, die Buchhaltung spricht nicht mit der Personalabteilung, E-Mails werden manuell verschickt. Wir verbinden alles. Wir setzen direkte APIs ein, wenn maximale Performance und Zuverlässigkeit gefragt sind, Make oder Zapier, wenn Geschwindigkeit Priorität hat, und n8n, wenn volle Kontrolle bei null Kosten erforderlich ist. Das Ergebnis: synchronisierte Daten, ein entlastetes Team, keine menschlichen Fehler mehr.',
      includes: [
        'Direkte APIs für maximale Performance und Zuverlässigkeit',
        'Make und Zapier für schnelle No-Code-Integrationen',
        'Individuelle Connectoren, wenn die Plattformen es erfordern',
        'Unterstützung für Webhooks und Echtzeit-Events',
        'Integration von CRM, ERP, E-Mail, Buchhaltung und HR',
        'Dokumentation und Wartung der automatisierten Abläufe',
      ],
      process: [
        { title: 'Mapping', description: 'Wir analysieren alle Tools in Ihrem Stack und die bestehenden Arbeitsabläufe, um Engpässe und Chancen zu identifizieren.' },
        { title: 'Konzeption', description: 'Wir definieren die Architektur der Integrationen und wählen für jede Verbindung die passende Technologie.' },
        { title: 'Entwicklung', description: 'Wir implementieren die automatisierten Abläufe mit Tests für jedes Szenario, einschließlich Fehlerfälle.' },
        { title: 'Monitoring', description: 'Wir aktivieren Alerts für kritische Abläufe und stellen Dashboards bereit, damit Sie sicherstellen können, dass alles funktioniert.' },
      ],
      keywords: [
        'Prozessautomatisierung Agentur Wien', 'CRM ERP Integration Wien', 'Prozessautomatisierung Agentur Österreich', 'Make Zapier Agentur',
        'Workflow Automatisierung Agentur', 'API Integration Dienstleistung', 'Softwareintegration Agentur Österreich',
        'n8n Automatisierung Agentur', 'Business Automation Beratung',
      ],
      faq: [
        {
          question: 'Welche Unternehmenstools können Sie integrieren?',
          answer: 'Wir integrieren praktisch jede Unternehmenssoftware: CRM (HubSpot, Salesforce, Zoho), ERP (SAP, Odoo), E-Commerce (Shopify, WooCommerce), Buchhaltungstools, E-Mail-Marketing (Mailchimp, Klaviyo), HR und vieles mehr.',
        },
        {
          question: 'Was kostet die Umsetzung von Unternehmensautomatisierungen?',
          answer: 'Eine einfache Automatisierung (z. B. CRM-E-Mail-Synchronisierung) beginnt bei 500-800 € einmalig. Komplexere Abläufe mit mehreren beteiligten Systemen liegen zwischen 1.500 und 5.000 €+. Danach fallen nur noch die monatlichen Kosten für die genutzten Tools an (Make, Zapier usw.), oft 30-100 €/Monat.',
        },
        {
          question: 'Brauche ich einen Techniker, um die Automatisierungen nach der Erstellung zu verwalten?',
          answer: 'Nein. Die Automatisierungen laufen eigenständig rund um die Uhr. Wir stellen Ihnen eine klare Dokumentation und ein Monitoring-Dashboard zur Verfügung. Für künftige Änderungen stehen wir zur Verfügung, doch die einfacheren Abläufe können Sie auch ohne technische Kenntnisse selbst verwalten.',
        },
        {
          question: 'Wie viel Zeit spart ein Unternehmen im Durchschnitt durch Automatisierungen?',
          answer: 'Unsere Integrationen sparen KMU mit 5-20 Mitarbeitenden im Durchschnitt 5-20 Stunden manuelle Arbeit pro Woche. Der ROI wird in der Regel innerhalb von 2-4 Monaten nach dem Go-live erreicht. Jedes Projekt beginnt mit einer kostenlosen Analyse des Einsparpotenzials.',
        },
      ],
    },
  },
};
