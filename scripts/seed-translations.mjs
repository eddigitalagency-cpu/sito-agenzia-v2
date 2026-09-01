#!/usr/bin/env node
/**
 * Seed EN/DE translations into blog_posts and projects_db.
 *
 * Idempotent: only fills columns that are currently NULL (via COALESCE),
 * so it will never overwrite manual edits made later through the admin panel.
 *
 * Requires the _en/_de columns to already exist on blog_posts and projects_db
 * (added via a separate schema migration in src/lib/db.ts). Requires
 * DATABASE_URL to be set in the environment.
 *
 * Usage:
 *   DATABASE_URL=postgres://... node scripts/seed-translations.mjs
 */
import pkg from 'pg';
const { Pool } = pkg;

// ---------------------------------------------------------------------------
// Translations data (embedded so this script is fully self-contained and
// still works if the scratchpad JSON file that generated it is deleted).
// ---------------------------------------------------------------------------
const TRANSLATIONS = {
  "blogPosts": [
    {
      "slug": "intelligenza-artificiale-novita-e-trasparenza",
      "title_en": "Artificial Intelligence: News and Transparency",
      "title_de": "Künstliche Intelligenz: Neuigkeiten und Transparenz",
      "excerpt_en": "Discover the latest developments in artificial intelligence across Europe — from the AI Act's new transparency rules to falling token costs — and see how AI is reshaping the market.",
      "excerpt_de": "Erfahren Sie mehr über die neuesten Entwicklungen der Künstlichen Intelligenz in Europa – von den neuen Transparenzpflichten des AI Act bis zu sinkenden Token-Kosten – und wie KI den Markt verändert.",
      "content_en": "<h2>Introduction to Artificial Intelligence and What's New</h2>\n      <p>The most important developments in artificial intelligence today concern the entry into force of the new transparency obligations under the EU AI Act. This new regulation requires clear labelling of AI-generated content and chatbots, ensuring greater transparency for users. At the same time, the market is seeing a sharp drop in token costs, opening up new opportunities for companies looking to adopt artificial intelligence solutions.</p>\n      <h3>The AI Act and Transparency in Europe</h3>\n      <p>European transparency obligations for digital systems are now a reality. Chatbots and avatars must disclose their artificial nature to users, and strict penalties are in place for anyone who distributes unlabelled or misleading content. This shift is crucial for building trust between users and AI-based technologies.</p>\n      <h2>Market and Model Economics</h2>\n      <p>The cost of tokens for generative AI has fallen dramatically, allowing companies to focus on industrial sustainability and reduced computing costs. This trend is encouraging alliances between tech companies on security and vulnerability management, creating a more solid and reliable ecosystem for the development of artificial intelligence.</p>\n      <h3>Implications for Italian SMEs</h3>\n      <p>For Italian SMEs, these developments represent a unique opportunity to innovate and improve competitiveness. In Treviso, in the Veneto region, and across Italy, businesses can leverage artificial intelligence to optimise processes, improve the customer experience and cut costs. However, it is essential to be aware of transparency obligations and current regulations in order to avoid penalties and ensure the success of these initiatives.</p>\n      <blockquote>Transparency and sustainability are the pillars on which to build the future of artificial intelligence in Europe.</blockquote>\n      <h2>Conclusion and Future Outlook</h2>\n      <p>In conclusion, the developments in artificial intelligence across Europe are significant and represent an important step towards a more responsible and transparent use of this technology. Companies, particularly Italian SMEs, need to be ready to adapt to these changes and seize the opportunities offered by artificial intelligence to grow and innovate. With the right strategy and awareness, the future of AI in Italy and Europe can be brighter than ever.</p>",
      "content_de": "<h2>Einführung in die Künstliche Intelligenz und aktuelle Neuigkeiten</h2>\n      <p>Die wichtigsten aktuellen Entwicklungen im Bereich der Künstlichen Intelligenz betreffen das Inkrafttreten der neuen Transparenzpflichten des EU-KI-Gesetzes (AI Act). Diese neue Verordnung schreibt eine klare Kennzeichnung von KI-generierten Inhalten und Chatbots vor und sorgt so für mehr Transparenz für die Nutzer. Gleichzeitig sinken die Token-Kosten auf dem Markt deutlich, was Unternehmen neue Möglichkeiten eröffnet, KI-Lösungen einzuführen.</p>\n      <h3>Der AI Act und Transparenz in Europa</h3>\n      <p>Die europäischen Transparenzpflichten für digitale Systeme sind nun Realität. Chatbots und Avatare müssen ihren künstlichen Charakter gegenüber den Nutzern offenlegen, und es sind strenge Sanktionen für die Verbreitung von nicht gekennzeichneten oder irreführenden Inhalten vorgesehen. Dieser Wandel ist entscheidend, um Vertrauen zwischen Nutzern und KI-basierten Technologien aufzubauen.</p>\n      <h2>Markt und Modellökonomie</h2>\n      <p>Die Kosten für die Nutzung von Token für generative KI sind drastisch gesunken, sodass Unternehmen verstärkt auf industrielle Nachhaltigkeit und die Senkung der Rechenkosten setzen können. Dieses Szenario begünstigt Allianzen zwischen Technologieunternehmen im Bereich Sicherheit und Schwachstellenmanagement und schafft so ein solideres und zuverlässigeres Ökosystem für die Entwicklung Künstlicher Intelligenz.</p>\n      <h3>Auswirkungen für italienische KMU</h3>\n      <p>Für italienische KMU stellen diese Entwicklungen eine einzigartige Chance dar, zu innovieren und ihre Wettbewerbsfähigkeit zu verbessern. In Treviso, in der Region Venetien und in ganz Italien können Unternehmen Künstliche Intelligenz nutzen, um Prozesse zu optimieren, die Customer Experience zu verbessern und Kosten zu senken. Es ist jedoch unerlässlich, sich der Transparenzpflichten und geltenden Vorschriften bewusst zu sein, um Sanktionen zu vermeiden und den Erfolg dieser Initiativen sicherzustellen.</p>\n      <blockquote>Transparenz und Nachhaltigkeit sind die Grundpfeiler, auf denen die Zukunft der Künstlichen Intelligenz in Europa aufgebaut werden muss.</blockquote>\n      <h2>Fazit und Ausblick</h2>\n      <p>Zusammenfassend lässt sich sagen, dass die Entwicklungen im Bereich der Künstlichen Intelligenz in Europa bedeutend sind und einen wichtigen Schritt hin zu einem verantwortungsvolleren und transparenteren Umgang mit dieser Technologie darstellen. Unternehmen, insbesondere italienische KMU, müssen bereit sein, sich an diese Veränderungen anzupassen und die Chancen der Künstlichen Intelligenz für Wachstum und Innovation zu nutzen. Mit der richtigen Strategie und dem nötigen Bewusstsein kann die Zukunft der KI in Italien und Europa heller denn je sein.</p>",
      "keywords_en": "Artificial Intelligence, AI Act, Transparency, Token Economy, AI Market, Industrial Sustainability",
      "keywords_de": "Künstliche Intelligenz, AI Act, Transparenz, Token-Ökonomie, KI-Markt, Industrielle Nachhaltigkeit"
    },
    {
      "slug": "sito-web-2026-perche-e-necessario",
      "title_en": "Website 2026: Why Your Business Needs One",
      "title_de": "Website 2026: Warum sie unverzichtbar ist",
      "excerpt_en": "Discover why having a website is essential for small and medium-sized businesses in 2026. Gain visibility, build credibility and reach new customers with a professional website.",
      "excerpt_de": "Erfahren Sie, warum eine Website für kleine und mittlere Unternehmen im Jahr 2026 unverzichtbar ist. Gewinnen Sie mit einer professionellen Website mehr Sichtbarkeit, Glaubwürdigkeit und neue Kunden.",
      "content_en": "<h2>Introduction: The Role of the Website in 2026</h2><p>A website has become an indispensable tool for any kind of business, from small companies to large corporate groups. In Treviso, in the Veneto region, as everywhere else in Italy, small and medium-sized businesses need to keep up with the times and tap into the full potential of the web to remain competitive. In this article, we explore why having a website matters in 2026 and how it can help businesses achieve their goals.</p><h3>Visibility and Reaching New Customers</h3><p>One of the main advantages of having a website is the visibility it provides. With a website, businesses can reach a wider audience and boost their online presence. This means small and medium-sized businesses can reach new customers and increase their sales opportunities. In Vittorio Veneto, for example, a local business can use its website to promote its products or services and attract customers from across the region.</p><h2>The Benefits of a Website for Small and Medium-Sized Businesses</h2><p>The benefits of having a website are numerous and can have a significant impact on a business. Here are some of the main advantages:<ul><li>Increased visibility and credibility</li><li>Reaching new customers and boosting sales opportunities</li><li>Better communication with customers and improved support</li><li>Greater competitiveness and differentiation from competitors</li></ul></p><h3>How to Build an Effective Website</h3><p>To build an effective website, small and medium-sized businesses need to consider a few key factors. First, the website must be easy to navigate and provide a good user experience. It should also be optimised for search engines to increase visibility and traffic. In Treviso, businesses can rely on a digital marketing agency to create a customised, effective website.</p><h2>Conclusion: A Website as a Tool for Success</h2><p>In conclusion, having a website is essential for small and medium-sized businesses in 2026. It provides visibility, builds credibility and helps reach new customers. With the right tools and the right strategy, businesses can build an effective website and increase their chances of success. Don't hesitate to get in touch with a digital marketing agency to discover how a website can help your business achieve its goals.</p>",
      "content_de": "<h2>Einführung: Die Rolle der Website im Jahr 2026</h2><p>Eine Website ist heute für jede Art von Unternehmen unverzichtbar geworden, vom Kleinbetrieb bis zum großen Konzern. In Treviso, in der Region Venetien wie im ganzen übrigen Italien müssen kleine und mittlere Unternehmen mit der Zeit gehen und das Potenzial des Internets nutzen, um wettbewerbsfähig zu bleiben. In diesem Artikel erklären wir, warum eine Website im Jahr 2026 wichtig ist und wie sie Unternehmen dabei helfen kann, ihre Ziele zu erreichen.</p><h3>Sichtbarkeit und Gewinnung neuer Kunden</h3><p>Einer der größten Vorteile einer Website ist die Sichtbarkeit, die sie bietet. Mit einer Website können Unternehmen ein größeres Publikum erreichen und ihre Online-Präsenz stärken. Das bedeutet, dass kleine und mittlere Unternehmen neue Kunden gewinnen und ihre Verkaufschancen erhöhen können. In Vittorio Veneto beispielsweise kann ein lokales Unternehmen seine Website nutzen, um seine Produkte oder Dienstleistungen zu bewerben und Kunden aus der gesamten Region zu gewinnen.</p><h2>Die Vorteile einer Website für kleine und mittlere Unternehmen</h2><p>Die Vorteile einer Website sind vielfältig und können sich erheblich auf ein Unternehmen auswirken. Hier einige der wichtigsten Vorteile:<ul><li>Mehr Sichtbarkeit und Glaubwürdigkeit</li><li>Gewinnung neuer Kunden und höhere Verkaufschancen</li><li>Bessere Kommunikation mit Kunden und verbesserter Support</li><li>Mehr Wettbewerbsfähigkeit und Differenzierung gegenüber der Konkurrenz</li></ul></p><h3>Wie man eine wirkungsvolle Website erstellt</h3><p>Um eine wirkungsvolle Website zu erstellen, sollten kleine und mittlere Unternehmen einige zentrale Faktoren berücksichtigen. Zunächst muss die Website einfach zu navigieren sein und ein gutes Nutzererlebnis bieten. Zudem sollte sie für Suchmaschinen optimiert sein, um Sichtbarkeit und Traffic zu steigern. In Treviso können sich Unternehmen auf eine Digitalagentur verlassen, um eine maßgeschneiderte, wirkungsvolle Website zu erstellen.</p><h2>Fazit: Die Website als Erfolgsinstrument</h2><p>Zusammenfassend lässt sich sagen, dass eine Website für kleine und mittlere Unternehmen im Jahr 2026 unverzichtbar ist. Sie sorgt für Sichtbarkeit, stärkt die Glaubwürdigkeit und hilft, neue Kunden zu gewinnen. Mit den richtigen Werkzeugen und der richtigen Strategie können Unternehmen eine wirkungsvolle Website erstellen und ihre Erfolgschancen steigern. Zögern Sie nicht, eine Digitalagentur zu kontaktieren, um zu erfahren, wie eine Website Ihrem Unternehmen helfen kann, seine Ziele zu erreichen.</p>",
      "keywords_en": "website, small and medium-sized businesses, digital marketing, online visibility, business credibility",
      "keywords_de": "Website, kleine und mittlere Unternehmen, Digitales Marketing, Online-Sichtbarkeit, Unternehmensglaubwürdigkeit"
    },
    {
      "slug": "il-giappone-accelera-nell-ia",
      "title_en": "Japan Accelerates Its AI Push",
      "title_de": "Japan beschleunigt den Ausbau der KI",
      "excerpt_en": "Discover how Japan has recently accelerated the development of artificial intelligence, and what this means for Italian and global businesses.",
      "excerpt_de": "Erfahren Sie, wie Japan die Entwicklung Künstlicher Intelligenz zuletzt beschleunigt hat und welche Auswirkungen dies für italienische und globale Unternehmen hat.",
      "content_en": "<h2>Introduction: Japan's AI Acceleration</h2>\n      <p>Japan has recently accelerated the development of artificial intelligence, a fast-evolving field that is transforming the way we live and work. This surge in interest and investment in AI is the result of a national strategy aimed at driving technological innovation and keeping the country competitive in the global market.</p>\n      <h3>Key Areas of Focus for AI Development</h3>\n      <p>Japan's AI development is focused on manufacturing, healthcare, finance and transportation. These sectors are considered crucial to the country's economic future and are benefiting from significant investment in AI research and development.</p>\n      <h2>Implications for Italian Businesses</h2>\n      <p>Italian businesses, especially those with commercial ties to the Veneto region or Treviso, stand to benefit from Japan's AI acceleration. Partnerships with Japanese companies, or the adoption of AI technologies developed in Japan, can drive meaningful innovation and improve productivity and competitiveness.</p>\n      <h3>Practical Examples of AI Applications</h3>\n      <ul>\n         <li>Process automation</li>\n         <li>Data analysis</li>\n         <li>Customer service chatbot development</li>\n      </ul>\n      <blockquote>Japan is a striking example of how investing in AI development can drive innovation and boost national competitiveness.</blockquote>\n      <h2>Conclusion and Future Outlook</h2>\n      <p>The future of AI development in Japan looks promising, with opportunities for international collaboration and technological innovation. For Italian SMEs, it's essential to keep an eye on developments in this field and evaluate the growth opportunities offered by adopting AI technologies.</p>",
      "content_de": "<h2>Einführung: Japans KI-Offensive</h2>\n      <p>Japan hat die Entwicklung der Künstlichen Intelligenz zuletzt deutlich beschleunigt – ein sich ständig weiterentwickelnder Bereich, der die Art, wie wir leben und arbeiten, revolutioniert. Dieser Anstieg von Interesse und Investitionen in KI ist das Ergebnis einer nationalen Strategie, die technologische Innovation fördern und die Wettbewerbsfähigkeit des Landes auf dem Weltmarkt sichern soll.</p>\n      <h3>Schwerpunktbereiche der KI-Entwicklung</h3>\n      <p>Die KI-Entwicklung in Japan konzentriert sich auf die Fertigungsindustrie, das Gesundheitswesen, die Finanzbranche und den Transportsektor. Diese Bereiche gelten als entscheidend für die wirtschaftliche Zukunft des Landes und profitieren von erheblichen Investitionen in Forschung und Entwicklung im Bereich KI.</p>\n      <h2>Auswirkungen für italienische Unternehmen</h2>\n      <p>Italienische Unternehmen, insbesondere solche mit Geschäftsbeziehungen in die Region Venetien oder nach Treviso, können von Japans KI-Offensive profitieren. Partnerschaften mit japanischen Unternehmen oder die Einführung von in Japan entwickelten KI-Technologien können zu bedeutenden Innovationen sowie einer höheren Produktivität und Wettbewerbsfähigkeit führen.</p>\n      <h3>Praktische Beispiele für KI-Anwendungen</h3>\n      <ul>\n         <li>Prozessautomatisierung</li>\n         <li>Datenanalyse</li>\n         <li>Entwicklung von Chatbots für den Kundenservice</li>\n      </ul>\n      <blockquote>Japan ist ein anschauliches Beispiel dafür, wie Investitionen in die KI-Entwicklung Innovation vorantreiben und die nationale Wettbewerbsfähigkeit stärken können.</blockquote>\n      <h2>Fazit und Ausblick</h2>\n      <p>Die Zukunft der KI-Entwicklung in Japan sieht vielversprechend aus, mit Chancen für internationale Zusammenarbeit und technologische Innovation. Für italienische KMU ist es wichtig, die Entwicklungen in diesem Bereich zu verfolgen und die Wachstumschancen zu bewerten, die sich aus der Einführung von KI-Technologien ergeben.</p>",
      "keywords_en": "Artificial Intelligence, Japan, technological development, innovation, research and development",
      "keywords_de": "Künstliche Intelligenz, Japan, technologische Entwicklung, Innovation, Forschung und Entwicklung"
    },
    {
      "slug": "ia-consiglio-approva-nuovo-regolamento",
      "title_en": "AI: Council Approves New Regulation",
      "title_de": "KI: Rat verabschiedet neue Verordnung",
      "excerpt_en": "Find out how the EU's new artificial intelligence (AI) regulation simplifies the rules for businesses.",
      "excerpt_de": "Erfahren Sie, wie die neue EU-Verordnung zur Künstlichen Intelligenz (KI) die Vorschriften für Unternehmen vereinfacht.",
      "content_en": "<h2>Introduction to the New AI Regulation</h2><p>Today the Council gave its final green light to a new regulation aimed at streamlining and simplifying certain rules on artificial intelligence (AI). This decision marks an important step for technological innovation within the European Union and could have a significant impact on Italian businesses, especially those based in Treviso and the Veneto region.</p><h3>Objectives of the Regulation</h3><p>The new regulation aims to create a clear and consistent legal framework for the development and use of AI within the EU. This includes setting standards for security and data protection, as well as promoting transparency and accountability in the use of AI.</p><h2>Implications for Italian Businesses</h2><p>For Italian SMEs, the new regulation could offer fresh opportunities for growth and innovation. However, it's important to understand how to adapt to the new rules in order to avoid potential penalties or delays in the market. Businesses based in Vittorio Veneto and across the Veneto region should pay particular attention to these developments in order to remain competitive.</p><h3>Steps for Businesses to Take</h3><ul><li>Assess the impact of the regulation on business operations</li><li>Update security and data protection policies</li><li>Train staff on the responsible use of AI</li></ul><blockquote>The new AI regulation represents an opportunity for Italian businesses to innovate and grow, but it also requires a thorough understanding of the new rules and swift adaptability.</blockquote>",
      "content_de": "<h2>Einführung in die neue KI-Verordnung</h2><p>Heute hat der Rat einer neuen Verordnung endgültig zugestimmt, die darauf abzielt, bestimmte Vorschriften im Bereich der Künstlichen Intelligenz (KI) zu straffen und zu vereinfachen. Diese Entscheidung ist ein wichtiger Schritt für die technologische Innovation in der Europäischen Union und könnte erhebliche Auswirkungen auf italienische Unternehmen haben, insbesondere auf jene mit Sitz in Treviso und in der Region Venetien.</p><h3>Ziele der Verordnung</h3><p>Die neue Verordnung soll einen klaren und einheitlichen Rechtsrahmen für die Entwicklung und Nutzung von KI innerhalb der EU schaffen. Dazu gehören die Festlegung von Standards für Sicherheit und Datenschutz sowie die Förderung von Transparenz und Verantwortlichkeit beim Einsatz von KI.</p><h2>Auswirkungen für italienische Unternehmen</h2><p>Für italienische KMU könnte die neue Verordnung neue Chancen für Wachstum und Innovation bieten. Es ist jedoch wichtig zu verstehen, wie man sich an die neuen Vorschriften anpasst, um mögliche Sanktionen oder Verzögerungen am Markt zu vermeiden. Unternehmen mit Sitz in Vittorio Veneto und im übrigen Venetien sollten diesen Neuerungen besondere Aufmerksamkeit schenken, um wettbewerbsfähig zu bleiben.</p><h3>Notwendige Schritte für Unternehmen</h3><ul><li>Bewertung der Auswirkungen der Verordnung auf die Geschäftstätigkeit</li><li>Aktualisierung der Sicherheits- und Datenschutzrichtlinien</li><li>Schulung der Mitarbeiter zum verantwortungsvollen Umgang mit KI</li></ul><blockquote>Die neue KI-Verordnung bietet italienischen Unternehmen die Chance zu innovieren und zu wachsen, erfordert jedoch auch ein fundiertes Verständnis der neuen Vorschriften und eine schnelle Anpassungsfähigkeit.</blockquote>",
      "keywords_en": "artificial intelligence, EU regulation, AI, technological innovation, EU rules, Italian businesses",
      "keywords_de": "Künstliche Intelligenz, EU-Verordnung, KI, technologische Innovation, EU-Vorschriften, italienische Unternehmen"
    },
    {
      "slug": "fable-5-disponibile-dal-1-luglio",
      "title_en": "Fable 5 Available from July 1st",
      "title_de": "Fable 5 ab dem 1. Juli verfügbar",
      "excerpt_en": "Find out when and how Fable 5, the new AI technology, will become available. From July 1st, Fable 5 will be accessible to users worldwide on the Claude platform.",
      "excerpt_de": "Erfahren Sie, wann und wie Fable 5, die neue KI-Technologie, verfügbar sein wird. Ab dem 1. Juli ist Fable 5 weltweit auf der Claude-Plattform zugänglich.",
      "content_en": "<h2>Introduction to Fable 5</h2>\n      <p>Fable 5, the new AI technology developed by Anthropic, will be available starting tomorrow, Wednesday, July 1st. This technology marks an important step forward in the field of artificial intelligence and opens up new possibilities for users worldwide.</p>\n      <h2>History and Development of Fable 5</h2>\n      <p>Fable 5 was developed to offer a safer and more reliable solution for users. However, due to export restrictions imposed by the United States government, access to Fable 5 was suspended for all users. Now, with these restrictions lifted, Fable 5 will once again be available on the Claude platform.</p>\n      <h3>Access Details</h3>\n      <p>Fable 5 will be accessible to users worldwide on the Claude platform, including Claude.ai, Claude Code and Claude Cowork. For users on Pro, Max, Team and select Enterprise plans, Fable 5 usage will count towards up to 50% of weekly usage limits until July 7th.</p>\n      <h2>Implications and the Future of Fable 5</h2>\n      <p>The availability of Fable 5 represents an important step forward for the AI industry. However, it's also important to consider the security implications and future challenges in developing safer, more reliable AI technologies. Collaboration between industry and government will be essential to address these challenges and ensure the responsible development of artificial intelligence.</p>\n      <blockquote>AI technology like Fable 5 has the potential to transform many aspects of our lives, but it's essential that this happens responsibly and safely.</blockquote>\n      <h3>Plans for the Future</h3>\n      <p>Anthropic and its partners are working to develop a shared framework for assessing and addressing security challenges across the AI industry. This will include creating shared standards for evaluating the severity of threats and communicating risk levels to government and industry partners.</p>",
      "content_de": "<h2>Einführung in Fable 5</h2>\n      <p>Fable 5, die neue von Anthropic entwickelte KI-Technologie, wird ab morgen, Mittwoch, dem 1. Juli, verfügbar sein. Diese Technologie stellt einen wichtigen Fortschritt im Bereich der Künstlichen Intelligenz dar und eröffnet Nutzern weltweit neue Möglichkeiten.</p>\n      <h2>Entstehung und Entwicklung von Fable 5</h2>\n      <p>Fable 5 wurde entwickelt, um Nutzern eine sicherere und zuverlässigere Lösung zu bieten. Aufgrund von Exportbeschränkungen der US-Regierung war der Zugang zu Fable 5 jedoch für alle Nutzer ausgesetzt. Nach der Aufhebung dieser Beschränkungen wird Fable 5 nun wieder auf der Claude-Plattform verfügbar sein.</p>\n      <h3>Details zum Zugang</h3>\n      <p>Fable 5 wird weltweit auf der Claude-Plattform zugänglich sein, einschließlich Claude.ai, Claude Code und Claude Cowork. Für Nutzer mit Pro-, Max-, Team- und ausgewählten Enterprise-Plänen wird die Nutzung von Fable 5 bis zum 7. Juli auf bis zu 50 % der wöchentlichen Nutzungslimits angerechnet.</p>\n      <h2>Auswirkungen und Zukunft von Fable 5</h2>\n      <p>Die Verfügbarkeit von Fable 5 ist ein wichtiger Schritt für die KI-Branche. Dennoch gilt es auch, die sicherheitsrelevanten Auswirkungen und künftigen Herausforderungen bei der Entwicklung sichererer und zuverlässigerer KI-Technologien zu berücksichtigen. Die Zusammenarbeit zwischen Industrie und Regierung wird entscheidend sein, um diese Herausforderungen zu bewältigen und eine verantwortungsvolle Entwicklung der Künstlichen Intelligenz sicherzustellen.</p>\n      <blockquote>KI-Technologien wie Fable 5 haben das Potenzial, viele Bereiche unseres Lebens zu verändern – doch dies muss verantwortungsvoll und sicher geschehen.</blockquote>\n      <h3>Zukunftspläne</h3>\n      <p>Anthropic und seine Partner arbeiten an einem gemeinsamen Rahmenwerk zur Bewertung und Bewältigung von Sicherheitsherausforderungen in der KI-Branche. Dazu gehört die Entwicklung gemeinsamer Standards zur Einschätzung des Schweregrads von Bedrohungen sowie zur Kommunikation von Risikostufen an staatliche und industrielle Partner.</p>",
      "keywords_en": "Fable 5, Anthropic, Claude AI, artificial intelligence news, AI technology release",
      "keywords_de": "Fable 5, Anthropic, Claude KI, Neuigkeiten Künstliche Intelligenz, KI-Technologie"
    },
    {
      "slug": "ai-e-social-media-marketing",
      "title_en": "AI and Social Media Marketing",
      "title_de": "KI und Social-Media-Marketing",
      "excerpt_en": "Discover the latest on AI and social media marketing to strengthen your digital marketing strategy and boost your online visibility in the Veneto region and across Italy.",
      "excerpt_de": "Erfahren Sie mehr über die neuesten Entwicklungen bei KI und Social-Media-Marketing, um Ihre digitale Marketingstrategie zu verbessern und Ihre Online-Sichtbarkeit in der Region Venetien und in ganz Italien zu steigern.",
      "content_en": "<h2>Introduction to AI and Social Media Marketing</h2>\n      <p>The use of Artificial Intelligence (AI) in social media marketing is a growing trend, especially for Italian SMEs looking to strengthen their online presence and reach a wider audience. In Treviso and across the Veneto region, businesses are beginning to tap into the potential of AI to optimise their social media marketing campaigns.</p>\n      <h3>Benefits of AI in Social Media Marketing</h3>\n      <p>The benefits of using AI in social media marketing are numerous. First and foremost, AI can help <strong>analyse large volumes of data</strong> and provide valuable insight into customer behaviour and preferences. This makes it possible to create more personalised and targeted marketing campaigns, boosting their effectiveness.</p>\n      <h2>How to Use AI in Social Media Marketing</h2>\n      <p>There are several ways to use AI in social media marketing. For example, you can use <strong>automation tools</strong> to schedule and publish content, or <strong>data analytics platforms</strong> to monitor campaign performance. AI can also be used to <strong>create personalised content</strong> and engage with customers more effectively.</p>\n      <h3>Examples of AI Use in Social Media Marketing</h3>\n      <ul>\n         <li>Using chatbots to answer customer questions</li>\n         <li>Creating personalised content with the help of machine learning algorithms</li>\n         <li>Analysing social media data to identify trends and patterns</li>\n      </ul>\n      <h2>News and Trends in AI and Social Media Marketing</h2>\n      <p>News and trends in AI and social media marketing are constantly evolving. One of the most interesting trends is the use of <strong>artificial intelligence technologies</strong> to create more personalised and interactive customer service experiences. AI is also increasingly being used to <strong>create high-quality, personalised content</strong>, such as video and audio.</p>\n      <blockquote>The future of social media marketing will be defined by the growing use of AI and artificial intelligence technologies. Businesses that are able to harness the potential of AI will be the ones with the greatest chances of success.</blockquote>",
      "content_de": "<h2>Einführung in KI und Social-Media-Marketing</h2>\n      <p>Der Einsatz Künstlicher Intelligenz (KI) im Social-Media-Marketing ist ein stetig wachsender Trend, insbesondere für italienische KMU, die ihre Online-Präsenz stärken und ein größeres Publikum erreichen möchten. In Treviso und in der Region Venetien beginnen Unternehmen, das Potenzial der KI zu nutzen, um ihre Social-Media-Marketingkampagnen zu optimieren.</p>\n      <h3>Vorteile von KI im Social-Media-Marketing</h3>\n      <p>Die Vorteile des Einsatzes von KI im Social-Media-Marketing sind vielfältig. Vor allem kann KI dabei helfen, <strong>große Datenmengen zu analysieren</strong> und wertvolle Erkenntnisse über das Verhalten und die Vorlieben der Kunden zu gewinnen. Dies ermöglicht die Erstellung personalisierterer und gezielterer Marketingkampagnen und steigert so deren Wirksamkeit.</p>\n      <h2>Wie man KI im Social-Media-Marketing einsetzt</h2>\n      <p>Es gibt verschiedene Möglichkeiten, KI im Social-Media-Marketing einzusetzen. Zum Beispiel können <strong>Automatisierungstools</strong> zur Planung und Veröffentlichung von Inhalten genutzt werden, oder <strong>Datenanalyse-Plattformen</strong> zur Überwachung der Kampagnenleistung. KI kann außerdem eingesetzt werden, um <strong>personalisierte Inhalte zu erstellen</strong> und effektiver mit Kunden zu interagieren.</p>\n      <h3>Beispiele für den Einsatz von KI im Social-Media-Marketing</h3>\n      <ul>\n         <li>Einsatz von Chatbots zur Beantwortung von Kundenfragen</li>\n         <li>Erstellung personalisierter Inhalte mithilfe von Algorithmen des maschinellen Lernens</li>\n         <li>Analyse von Social-Media-Daten zur Erkennung von Trends und Mustern</li>\n      </ul>\n      <h2>Neuigkeiten und Trends bei KI und Social-Media-Marketing</h2>\n      <p>Neuigkeiten und Trends im Bereich KI und Social-Media-Marketing entwickeln sich stetig weiter. Einer der interessantesten Trends ist der Einsatz von <strong>Technologien der Künstlichen Intelligenz</strong>, um personalisiertere und interaktivere Kundenservice-Erlebnisse zu schaffen. Zudem wird KI zunehmend eingesetzt, um <strong>hochwertige, personalisierte Inhalte</strong> wie Video und Audio zu erstellen.</p>\n      <blockquote>Die Zukunft des Social-Media-Marketings wird von einem immer stärkeren Einsatz von KI und Technologien der Künstlichen Intelligenz geprägt sein. Unternehmen, die das Potenzial der KI zu nutzen wissen, werden die größten Erfolgschancen haben.</blockquote>",
      "keywords_en": "AI social media marketing, artificial intelligence marketing, social media strategy, AI content creation, digital marketing automation",
      "keywords_de": "KI Social-Media-Marketing, Künstliche Intelligenz Marketing, Social-Media-Strategie, KI-Content-Erstellung, Marketing-Automatisierung"
    }
  ],
  "projects": [
    {
      "slug": "agenzweb",
      "tagline_en": "Real Estate Management Platform",
      "tagline_de": "Immobilienverwaltungssoftware",
      "description_en": "The real estate market moves fast, and standing still means falling behind. We helped AgenzWeb build a mobile-first property management system to boost efficiency. Thanks to our solutions, AgenzWeb can now handle valuations, digital signatures and automations more efficiently than ever.",
      "description_de": "Der Immobilienmarkt bewegt sich schnell, und wer stillsteht, verliert den Anschluss. Wir haben AgenzWeb dabei geholfen, ein mobiles Immobilienverwaltungssystem aufzubauen, um die Effizienz zu steigern. Dank unserer Lösungen kann AgenzWeb nun Bewertungen, digitale Signaturen und Automatisierungen deutlich effizienter verwalten.",
      "what_en": [
        "Development of certified OMI-based property valuations",
        "Implementation of OTP digital signature",
        "Setup of smart automations for WhatsApp and email",
        "Development of an intelligent matching system between property listings and client requests",
        "Integration of AI-generated floor plans"
      ],
      "what_de": [
        "Entwicklung zertifizierter OMI-Immobilienbewertungen",
        "Implementierung der digitalen OTP-Signatur",
        "Einrichtung smarter Automatisierungen für WhatsApp und E-Mail",
        "Entwicklung eines intelligenten Matching-Systems zwischen Immobilienportfolio und Kundenanfragen",
        "Integration von KI-generierten Grundrissen"
      ],
      "results_en": [
        {
          "value": "+25%",
          "label": "Increase in new listings acquired"
        },
        {
          "value": "30 ore",
          "label": "Hours saved per week"
        },
        {
          "value": "+15%",
          "label": "Increase in customer satisfaction"
        }
      ],
      "results_de": [
        {
          "value": "+25%",
          "label": "Anstieg der Neuakquisitionen"
        },
        {
          "value": "30 ore",
          "label": "Eingesparte Stunden pro Woche"
        },
        {
          "value": "+15%",
          "label": "Anstieg der Kundenzufriedenheit"
        }
      ]
    },
    {
      "slug": "cdvi",
      "tagline_en": "Technology, told through imagery.",
      "tagline_de": "Technologie, erzählt in Bildern.",
      "description_en": "CDVI specialises in access control and security systems. We produced a series of corporate and product videos to communicate technical complexity in a clear, professional and engaging way. From concept to post-production, every frame was crafted to showcase the brand.",
      "description_de": "CDVI ist ein Unternehmen, das auf Zutrittskontroll- und Sicherheitssysteme spezialisiert ist. Wir haben eine Reihe von Unternehmens- und Produktvideos produziert, um technologische Komplexität klar, professionell und ansprechend zu vermitteln. Vom Konzept bis zur Postproduktion wurde jedes Bild darauf ausgerichtet, die Marke optimal in Szene zu setzen.",
      "what_en": [
        "Corporate brand video",
        "Product and system demo videos",
        "On-location and studio filming",
        "Post-production with motion graphics and subtitles",
        "Versions optimised for web, social media and trade fairs"
      ],
      "what_de": [
        "Unternehmensvideo",
        "Produkt- und Systemdemo-Videos",
        "Dreharbeiten vor Ort und im Studio",
        "Postproduktion mit Motion Graphics und Untertiteln",
        "Optimierte Versionen für Web, Social Media und Messen"
      ],
      "results_en": [
        {
          "value": "↑ 4×",
          "label": "Views across digital channels"
        },
        {
          "value": "3",
          "label": "Videos produced"
        },
        {
          "value": "+65%",
          "label": "Increase in social media engagement"
        }
      ],
      "results_de": [
        {
          "value": "↑ 4×",
          "label": "Aufrufe auf digitalen Kanälen"
        },
        {
          "value": "3",
          "label": "Produzierte Videos"
        },
        {
          "value": "+65%",
          "label": "Anstieg des Social-Media-Engagements"
        }
      ]
    },
    {
      "slug": "dinamica-immobiliare",
      "tagline_en": "Powering up your online presence",
      "tagline_de": "Ihre Online-Präsenz auf das nächste Level",
      "description_en": "We helped Dinamica Immobiliare build an effective online presence. We managed their social media channels, creating engaging content and boosting their visibility. Together, we reached new clients and strengthened their brand image.",
      "description_de": "Wir haben Dinamica Immobiliare dabei geholfen, eine wirkungsvolle Online-Präsenz aufzubauen. Wir haben ihre Social-Media-Kanäle betreut, ansprechende Inhalte erstellt und ihre Sichtbarkeit gesteigert. Gemeinsam konnten wir neue Kunden gewinnen und das Markenimage verbessern.",
      "what_en": [
        "Social media management",
        "Creation of advertising campaigns",
        "Development of lead generation campaigns",
        "Graphic design for print materials",
        "Online presence optimisation"
      ],
      "what_de": [
        "Social-Media-Betreuung",
        "Erstellung von Werbeanzeigen",
        "Entwicklung von Lead-Generierungs-Kampagnen",
        "Grafikdesign für Druckmaterialien",
        "Optimierung der Online-Präsenz"
      ],
      "results_en": [
        {
          "value": "+25%",
          "label": "Increase in social media followers"
        },
        {
          "value": "+15%",
          "label": "Increase in post interactions"
        },
        {
          "value": "+10%",
          "label": "Increase in website traffic"
        }
      ],
      "results_de": [
        {
          "value": "+25%",
          "label": "Anstieg der Social-Media-Follower"
        },
        {
          "value": "+15%",
          "label": "Anstieg der Interaktionen bei Beiträgen"
        },
        {
          "value": "+10%",
          "label": "Anstieg des Website-Traffics"
        }
      ]
    },
    {
      "slug": "disegno-italia",
      "tagline_en": "Italian design, all in one showcase.",
      "tagline_de": "Italienisches Design in einem einzigen Schaufenster.",
      "description_en": "Disegno Italia celebrates the very best of Italian design and craftsmanship. We designed a website that is a piece of design in its own right: minimalist, elegant, with fluid navigation that lets the products take centre stage. A digital showcase built to attract international clients and highlight every single piece.",
      "description_de": "Disegno Italia zelebriert das Beste des italienischen Designs und Handwerks. Wir haben eine Website gestaltet, die selbst ein Designobjekt ist: minimalistisch, elegant, mit einer flüssigen Navigation, die den Produkten Raum lässt. Ein digitales Schaufenster, konzipiert, um internationale Kunden zu gewinnen und jedes einzelne Stück optimal in Szene zu setzen.",
      "what_en": [
        "Editorial design with a strong visual identity",
        "Product catalogue with filters and advanced search",
        "Optimisation for an international audience",
        "Optional e-commerce integration",
        "Optimised performance for high-quality imagery"
      ],
      "what_de": [
        "Editoriales Design mit starker visueller Identität",
        "Produktkatalog mit Filtern und erweiterter Suche",
        "Optimierung für ein internationales Publikum",
        "E-Commerce-Integration auf Wunsch",
        "Optimierte Performance für hochwertige Bilder"
      ],
      "results_en": [
        {
          "value": "+150%",
          "label": "Increase in international traffic"
        },
        {
          "value": "0.8s",
          "label": "Average load time"
        },
        {
          "value": "+200%",
          "label": "Increase in products viewed per session"
        }
      ],
      "results_de": [
        {
          "value": "+150%",
          "label": "Anstieg des internationalen Traffics"
        },
        {
          "value": "0.8s",
          "label": "Durchschnittliche Ladezeit"
        },
        {
          "value": "+200%",
          "label": "Anstieg der pro Sitzung angesehenen Produkte"
        }
      ]
    },
    {
      "slug": "espansione-immobiliare",
      "tagline_en": "A social media presence built brick by brick.",
      "tagline_de": "Eine Social-Media-Präsenz, Stein für Stein aufgebaut.",
      "description_en": "Espansione Immobiliare is a real estate agency that trusted us to build and manage its social media presence. The property sector calls for a specific approach: content that builds trust, showcases properties the right way, and keeps the relationship alive with prospective buyers and sellers. We put together a tailored monthly content plan, curated content production and managed the channels on an ongoing basis.",
      "description_de": "Espansione Immobiliare ist eine Immobilienagentur, die uns mit dem Aufbau und der Betreuung ihrer Social-Media-Präsenz betraut hat. Die Immobilienbranche erfordert einen spezifischen Ansatz: Inhalte, die Vertrauen schaffen, Immobilien optimal präsentieren und die Beziehung zu potenziellen Käufern und Verkäufern lebendig halten. Wir haben einen maßgeschneiderten monatlichen Redaktionsplan erstellt, die Content-Produktion betreut und die Kanäle laufend verwaltet.",
      "what_en": [
        "Instagram and Facebook channel management",
        "Monthly content plan with real estate content",
        "Graphics and posts for listings and properties for sale",
        "Reels and short-form videos to boost organic visibility",
        "Management of incoming social media messages and enquiries",
        "Monthly report tracking key performance indicators"
      ],
      "what_de": [
        "Verwaltung der Instagram- und Facebook-Kanäle",
        "Monatlicher Redaktionsplan mit Immobilien-Content",
        "Grafiken und Beiträge für Angebote und zum Verkauf stehende Immobilien",
        "Reels und Kurzvideos zur Steigerung der organischen Sichtbarkeit",
        "Verwaltung eingehender Nachrichten und Anfragen über Social Media",
        "Monatlicher Bericht zur Entwicklung der wichtigsten Kennzahlen"
      ],
      "results_en": [
        {
          "value": "+180%",
          "label": "Organic reach growth in 6 months"
        },
        {
          "value": "×3",
          "label": "Increase in valuation requests via social media"
        },
        {
          "value": "4.8%",
          "label": "Average engagement rate"
        }
      ],
      "results_de": [
        {
          "value": "+180%",
          "label": "Organische Reichweite in 6 Monaten"
        },
        {
          "value": "×3",
          "label": "Bewertungsanfragen über Social Media"
        },
        {
          "value": "4.8%",
          "label": "Durchschnittliche Engagement-Rate"
        }
      ]
    },
    {
      "slug": "espressione-danza",
      "tagline_en": "A community that dances along with the brand.",
      "tagline_de": "Eine Community, die gemeinsam mit der Marke tanzt.",
      "description_en": "Espressione Danza is a dance school that wanted to bring its community closer together with a consistent, engaging social media plan. We managed their Instagram and Facebook channels with creative content, reels from recitals and classes, and warm, authentic communication that reflects the school's spirit.",
      "description_de": "Espressione Danza ist eine Tanzschule, die ihre Community mit einem stimmigen und ansprechenden Social-Media-Konzept enger verbinden wollte. Wir haben die Instagram- und Facebook-Kanäle mit kreativen Inhalten, Reels von Aufführungen und Unterrichtsstunden sowie einer warmen, authentischen Kommunikation betreut, die den Geist der Schule widerspiegelt.",
      "what_en": [
        "Tailored monthly content plan",
        "Graphic and video production for Instagram and Facebook",
        "Community management and comment responses",
        "September new-enrolment acquisition campaigns",
        "Monthly report with KPIs and insights"
      ],
      "what_de": [
        "Maßgeschneiderter monatlicher Redaktionsplan",
        "Grafik- und Videoproduktion für Instagram und Facebook",
        "Community-Management und Beantwortung von Kommentaren",
        "Kampagnen zur Neuanmeldung im September",
        "Monatlicher Bericht mit KPIs und Insights"
      ],
      "results_en": [
        {
          "value": "+320%",
          "label": "Follower growth in 6 months"
        },
        {
          "value": "+40%",
          "label": "Increase in new course enrolments"
        },
        {
          "value": "8%",
          "label": "Average engagement rate"
        }
      ],
      "results_de": [
        {
          "value": "+320%",
          "label": "Follower-Wachstum in 6 Monaten"
        },
        {
          "value": "+40%",
          "label": "Anstieg der Neuanmeldungen für Kurse"
        },
        {
          "value": "8%",
          "label": "Durchschnittliche Engagement-Rate"
        }
      ]
    },
    {
      "slug": "i-bamboi",
      "tagline_en": "Local tradition, in a modern guise.",
      "tagline_de": "Lokale Tradition im modernen Gewand.",
      "description_en": "I Bamboi is a local business deeply rooted in the Treviso area. We built a website that celebrates their history and values with a warm, authentic design. Simple navigation and carefully curated content immediately convey the quality and hospitality that define the brand.",
      "description_de": "I Bamboi ist ein lokales Unternehmen, das tief in der Region Treviso verwurzelt ist. Wir haben eine Website realisiert, die ihre Geschichte und Werte mit einem warmen, authentischen Design zelebriert. Die einfache Navigation und die sorgfältig kuratierten Inhalte vermitteln sofort die Qualität und Gastfreundschaft, die die Marke auszeichnen.",
      "what_en": [
        "Custom website with a warm, locally-rooted design",
        "Brand history and values section",
        "Photo gallery and contact section",
        "Local SEO optimisation for the Treviso area",
        "Perfectly optimised mobile version"
      ],
      "what_de": [
        "Maßgeschneiderte Website mit warmem, regional verwurzeltem Design",
        "Bereich für Markengeschichte und Werte",
        "Fotogalerie und Kontaktbereich",
        "Lokale SEO-Optimierung für die Region Treviso",
        "Perfekt optimierte mobile Version"
      ],
      "results_en": [
        {
          "value": "+170%",
          "label": "Increase in site visits"
        },
        {
          "value": "Top 5",
          "label": "Ranking for local Google searches"
        },
        {
          "value": "+95%",
          "label": "Increase in contact requests"
        }
      ],
      "results_de": [
        {
          "value": "+170%",
          "label": "Anstieg der Website-Besuche"
        },
        {
          "value": "Top 5",
          "label": "Platzierung bei lokalen Google-Suchen"
        },
        {
          "value": "+95%",
          "label": "Anstieg der Kontaktanfragen"
        }
      ]
    },
    {
      "slug": "italia-contract",
      "tagline_en": "Italian design for hotels, restaurants and luxury spaces.",
      "tagline_de": "Italienisches Design für Hotels, Restaurants und Luxusräume.",
      "description_en": "Italia Contract is a leading company in the contract furnishing and luxury furniture industry, specialising in solutions for hotels, restaurants and public spaces — the HoReCa world. They bring Made in Italy craftsmanship to the world, offering chairs, tables, stools, sofas and furnishing accessories with an unbeatable price-to-quality ratio. Their target audience is architects and international professionals seeking uniqueness, style and uncompromising quality. We designed a premium website that puts product imagery and brand strength front and centre, with navigation built to convert professionals and international buyers.",
      "description_de": "Italia Contract ist ein führendes Unternehmen im Bereich Contract-Möbel und Luxuseinrichtung, spezialisiert auf Lösungen für Hotels, Restaurants und öffentliche Räume — die HoReCa-Welt. Das Unternehmen bringt Made in Italy in die ganze Welt und bietet Stühle, Tische, Hocker, Sofas und Einrichtungsaccessoires mit einem unschlagbaren Preis-Leistungs-Verhältnis. Zielgruppe sind Architekten und internationale Fachleute, die Einzigartigkeit, Stil und kompromisslose Qualität suchen. Wir haben eine Premium-Website gestaltet, die Produktbilder und Markenstärke in den Mittelpunkt stellt, mit einer Navigation, die auf die Konvertierung von Fachleuten und internationalen Einkäufern ausgelegt ist.",
      "what_en": [
        "Clean, elegant premium design centred on product imagery",
        "\"Our Work\" portfolio showcasing completed HoReCa projects",
        "Browsable catalogue section, including iconic products like the Radik table",
        "International SEO structure for architects and contract industry professionals",
        "Optimisation for a global audience with a focus on Made in Italy",
        "Optimised performance for high-resolution photo galleries"
      ],
      "what_de": [
        "Klares, elegantes Premium-Design mit Fokus auf Produktbilder",
        "Portfolio „Unsere Arbeiten\" zur Präsentation realisierter HoReCa-Projekte",
        "Durchblätterbarer Katalogbereich, inklusive ikonischer Produkte wie dem Tisch Radik",
        "Internationale SEO-Struktur für Architekten und Fachleute der Contract-Branche",
        "Optimierung für ein globales Publikum mit Fokus auf Made in Italy",
        "Optimierte Performance für hochauflösende Fotogalerien"
      ],
      "results_en": [
        {
          "value": "+210%",
          "label": "Increase in enquiries from international professionals"
        },
        {
          "value": "Global",
          "label": "Presence across Europe, Asia and the Americas"
        },
        {
          "value": "↑ 3×",
          "label": "Increase in average time on site"
        }
      ],
      "results_de": [
        {
          "value": "+210%",
          "label": "Anstieg der Anfragen von internationalen Fachleuten"
        },
        {
          "value": "Global",
          "label": "Präsenz in Europa, Asien und Amerika"
        },
        {
          "value": "↑ 3×",
          "label": "Anstieg der durchschnittlichen Verweildauer"
        }
      ]
    },
    {
      "slug": "litchi-solutions",
      "tagline_en": "From anonymous to visible",
      "tagline_de": "Von unsichtbar zu sichtbar",
      "description_en": "Litchi Solutions S.r.l. needed a company profile to increase its visibility. We created the graphics, layout and page design to make it compelling. The result was a boost in corporate credibility.",
      "description_de": "Litchi Solutions S.r.l. benötigte ein Unternehmensprofil, um ihre Sichtbarkeit zu steigern. Wir haben Grafik, Layout und Satz gestaltet, um es überzeugend zu machen. Das Ergebnis war eine gestärkte Unternehmensglaubwürdigkeit.",
      "what_en": [
        "Design of the company profile graphics",
        "Layout development and page design",
        "Mobile device optimisation",
        "Collaboration with the Litchi team on content"
      ],
      "what_de": [
        "Gestaltung der Grafik für das Unternehmensprofil",
        "Layout-Entwicklung und Satzgestaltung",
        "Optimierung für mobile Endgeräte",
        "Zusammenarbeit mit dem Litchi-Team bei den Inhalten"
      ],
      "results_en": [
        {
          "value": "100%",
          "label": "Client satisfaction with the project"
        },
        {
          "value": "1 settimana",
          "label": "Project turnaround time"
        }
      ],
      "results_de": [
        {
          "value": "100%",
          "label": "Kundenzufriedenheit mit dem Projekt"
        },
        {
          "value": "1 settimana",
          "label": "Umsetzungszeit des Projekts"
        }
      ]
    },
    {
      "slug": "solo-mattia",
      "tagline_en": "The tradition of great taste, in a dream location.",
      "tagline_de": "Traditioneller Genuss an einem Traumort.",
      "description_en": "Ristorante Pizzeria Solo Mattia sits in a striking location in Cison di Valmarino (TV), surrounded by the nature of Valle di San Daniele, near the Bosco delle Penne Mozze. Run by Marta and Mattia — a young couple trained at the hospitality school of Vittorio Veneto — the restaurant combines traditional cooking, pizzas baked in a rotating wood-fired oven, and a wine cellar curated by Marta in her role as sommelier. We built a website that tells this story with warmth and authenticity, making bookings easy and highlighting the venue's versatility for private events.",
      "description_de": "Das Ristorante Pizzeria Solo Mattia liegt an einem malerischen Ort in Cison di Valmarino (TV), umgeben von der Natur des Valle di San Daniele, nahe dem Bosco delle Penne Mozze. Geführt von Marta und Mattia — einem jungen Paar, ausgebildet an der Hotelfachschule von Vittorio Veneto — verbindet das Lokal traditionelle Küche, im rotierenden Holzofen gebackene Pizzen und einen von Marta als Sommelière kuratierten Weinkeller. Wir haben eine Website realisiert, die diese Geschichte mit Wärme und Authentizität erzählt, Reservierungen erleichtert und die Vielseitigkeit des Lokals für private Veranstaltungen hervorhebt.",
      "what_en": [
        "Custom website with a warm, welcoming design",
        "Restaurant menu section with seasonal dishes and homemade pasta",
        "Pizzeria section featuring dough types and wood-fired cooking",
        "Wine cellar and local wine selection curated by the sommelier",
        "Events page for ceremonies, christenings, communions, graduations and birthdays",
        "Booking integration via phone, email and WhatsApp",
        "Accessibility section: allergies, vegetarian options, family services",
        "Local SEO for restaurant searches in Cison di Valmarino and Treviso"
      ],
      "what_de": [
        "Maßgeschneiderte Website mit warmem, familiärem Design",
        "Menübereich mit saisonalen Gerichten und hausgemachter Pasta",
        "Pizzeria-Bereich mit Teigarten und Holzofenbacken",
        "Weinkeller und regionale Weinauswahl, kuratiert von der Sommelière",
        "Veranstaltungsseite für Feiern, Taufen, Kommunionen, Abschlussfeiern und Geburtstage",
        "Reservierungsintegration per Telefon, E-Mail und WhatsApp",
        "Bereich Barrierefreiheit: Unverträglichkeiten, vegetarische Optionen, Familienservice",
        "Lokales SEO für Restaurantsuchen in Cison di Valmarino und Treviso"
      ],
      "results_en": [
        {
          "value": "+240%",
          "label": "Increase in online bookings"
        },
        {
          "value": "Top 3",
          "label": "Google ranking for \"restaurant Cison di Valmarino\""
        },
        {
          "value": "+180%",
          "label": "Increase in private event enquiries"
        }
      ],
      "results_de": [
        {
          "value": "+240%",
          "label": "Anstieg der Online-Reservierungen"
        },
        {
          "value": "Top 3",
          "label": "Google-Platzierung für „Restaurant Cison di Valmarino\""
        },
        {
          "value": "+180%",
          "label": "Anstieg der Anfragen für private Veranstaltungen"
        }
      ]
    },
    {
      "slug": "upbeat-tattoo",
      "tagline_en": "Art on skin, told through social media.",
      "tagline_de": "Kunst auf der Haut, erzählt in den sozialen Medien.",
      "description_en": "UpBeat Tattoo is a tattoo studio with a bold visual identity and a team of talented artists. We built their social media presence from the ground up, creating a cohesive, eye-catching feed that showcases the artists' work. The result: a loyal community and a full waiting list.",
      "description_de": "UpBeat Tattoo ist ein Tattoo-Studio mit einer starken visuellen Identität und einem Team talentierter Künstler. Wir haben ihre Social-Media-Präsenz von Grund auf aufgebaut und einen stimmigen, auffälligen Feed geschaffen, der die Arbeiten der Künstler in den Mittelpunkt stellt. Das Ergebnis: eine treue Community und eine volle Warteliste.",
      "what_en": [
        "Social media strategy built from scratch on Instagram and Facebook",
        "Photo and video content production of the artists' work",
        "Monthly content plan featuring the artists' stories",
        "Direct management of messages and bookings via DM",
        "Local client acquisition campaigns"
      ],
      "what_de": [
        "Von Grund auf entwickelte Social-Media-Strategie für Instagram und Facebook",
        "Foto- und Videoproduktion der Arbeiten",
        "Monatlicher Redaktionsplan mit Storytelling zu den Künstlern",
        "Direkte Verwaltung von Nachrichten und Terminvereinbarungen per DM",
        "Kampagnen zur Gewinnung lokaler Kunden"
      ],
      "results_en": [
        {
          "value": "+850%",
          "label": "Follower growth in 12 months"
        },
        {
          "value": "Lista piena",
          "label": "Bookings full 2 months in advance"
        },
        {
          "value": "12%",
          "label": "Average engagement rate"
        }
      ],
      "results_de": [
        {
          "value": "+850%",
          "label": "Follower-Wachstum in 12 Monaten"
        },
        {
          "value": "Lista piena",
          "label": "Termine 2 Monate im Voraus ausgebucht"
        },
        {
          "value": "12%",
          "label": "Durchschnittliche Engagement-Rate"
        }
      ]
    },
    {
      "slug": "zenia",
      "tagline_en": "A website that reflects the elegance of the brand.",
      "tagline_de": "Eine Website, die die Eleganz der Marke widerspiegelt.",
      "description_en": "Zenia is a brand that embodies refinement and style. We designed and built a website that translates these values into every detail: clean layout, carefully chosen typography, striking imagery. The result is a digital presence that communicates quality before the visitor even reads a word.",
      "description_de": "Zenia ist eine Marke, die Raffinesse und Stil verkörpert. Wir haben eine Website entworfen und entwickelt, die diese Werte in jedem Detail widerspiegelt: klares Layout, sorgfältig gewählte Typografie, eindrucksvolle Bilder. Das Ergebnis ist eine digitale Präsenz, die Qualität vermittelt, noch bevor der Besucher ein einziges Wort liest.",
      "what_en": [
        "Custom UX/UI design tailored to the brand",
        "Custom, responsive and fast website development",
        "On-page SEO optimisation for search engines",
        "Contact form and map integration",
        "Product/service photo shoot"
      ],
      "what_de": [
        "Individuelles UX/UI-Design, abgestimmt auf die Marke",
        "Entwicklung einer individuellen, responsiven und schnellen Website",
        "On-Page-SEO-Optimierung für Suchmaschinen",
        "Integration von Kontaktformular und Karte",
        "Fotoshooting der Produkte/Dienstleistungen"
      ],
      "results_en": [
        {
          "value": "↑ 3×",
          "label": "Increase in organic traffic"
        },
        {
          "value": "< 1s",
          "label": "Load time"
        },
        {
          "value": "100%",
          "label": "Mobile responsive"
        }
      ],
      "results_de": [
        {
          "value": "↑ 3×",
          "label": "Anstieg des organischen Traffics"
        },
        {
          "value": "< 1s",
          "label": "Ladezeit"
        },
        {
          "value": "100%",
          "label": "Mobil responsiv"
        }
      ]
    }
  ]
};

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL non configurata. Imposta la variabile d'ambiente e riprova.");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30_000,
  });

  let updatedPosts = 0, skippedPosts = 0;
  let updatedProjects = 0, skippedProjects = 0;

  try {
    // ---- Blog posts ---------------------------------------------------------
    for (const p of TRANSLATIONS.blogPosts) {
      const res = await pool.query(
        `UPDATE blog_posts SET
           title_en    = COALESCE(title_en, $1),
           title_de    = COALESCE(title_de, $2),
           excerpt_en  = COALESCE(excerpt_en, $3),
           excerpt_de  = COALESCE(excerpt_de, $4),
           content_en  = COALESCE(content_en, $5),
           content_de  = COALESCE(content_de, $6),
           keywords_en = COALESCE(keywords_en, $7),
           keywords_de = COALESCE(keywords_de, $8)
         WHERE slug = $9`,
        [
          p.title_en, p.title_de,
          p.excerpt_en, p.excerpt_de,
          p.content_en, p.content_de,
          p.keywords_en, p.keywords_de,
          p.slug,
        ]
      );
      if (res.rowCount && res.rowCount > 0) {
        updatedPosts++;
        console.log(`[blog_posts] updated: ${p.slug}`);
      } else {
        skippedPosts++;
        console.warn(`[blog_posts] skipped (slug not found in DB): ${p.slug}`);
      }
    }

    // ---- Projects -------------------------------------------------------------
    for (const proj of TRANSLATIONS.projects) {
      const res = await pool.query(
        `UPDATE projects_db SET
           tagline_en     = COALESCE(tagline_en, $1),
           tagline_de     = COALESCE(tagline_de, $2),
           description_en = COALESCE(description_en, $3),
           description_de = COALESCE(description_de, $4),
           what_en        = COALESCE(what_en, $5::text[]),
           what_de        = COALESCE(what_de, $6::text[]),
           results_en     = COALESCE(results_en, $7::jsonb),
           results_de     = COALESCE(results_de, $8::jsonb)
         WHERE slug = $9`,
        [
          proj.tagline_en, proj.tagline_de,
          proj.description_en, proj.description_de,
          proj.what_en, proj.what_de,
          JSON.stringify(proj.results_en), JSON.stringify(proj.results_de),
          proj.slug,
        ]
      );
      if (res.rowCount && res.rowCount > 0) {
        updatedProjects++;
        console.log(`[projects_db] updated: ${proj.slug}`);
      } else {
        skippedProjects++;
        console.warn(`[projects_db] skipped (slug not found in DB): ${proj.slug}`);
      }
    }

    console.log('---');
    console.log(`Blog posts: ${updatedPosts} updated, ${skippedPosts} skipped`);
    console.log(`Projects:   ${updatedProjects} updated, ${skippedProjects} skipped`);
    console.log('Done.');
  } catch (err) {
    console.error('Seed error:', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
