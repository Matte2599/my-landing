/**
 * UI strings — single source of truth for IT/EN translations.
 * Add new keys here; t() helper provides type-safe lookup with IT fallback.
 */

export type Locale = 'it' | 'en';
export const LOCALES: Locale[] = ['it', 'en'];
export const DEFAULT_LOCALE: Locale = 'it';

export type AvailabilityStatus = 'available' | 'limited' | 'closed';

export const AVAILABILITY: AvailabilityStatus = 'available';

export const SITE = {
  name: 'Matteo Feroldi',
  domain: 'feroldi.cloud',
  url: 'https://feroldi.cloud',
  email: 'matteo@feroldi.cloud',
  base: 'Milano · Italia',
  coordinates: '45.4642° N · 9.1900° E',
  city: 'MILANO · IT',
  build: 'v.06.15.2026',
  runtime: 'node · 22 LTS',
  timezone: 'Europe/Rome',
  social: {
    github: 'https://github.com/Matte2599',
  },
} as const;

export const ui = {
  it: {
    'site.title': 'Matteo Feroldi — Senior Full Stack Developer',
    'site.description':
      'Matteo Feroldi · Senior Full Stack Developer freelance. Architettura, web, devops, cloud.',
    'nav.index': 'index',
    'nav.about': 'about',
    'nav.stack': 'stack',
    'nav.services': 'services',
    'nav.work': 'work',
    'nav.contact': 'contact',
    'nav.toggle': 'Apri menu',
    'nav.status.available': 'Disponibile',
    'nav.status.limited': 'Slot limitati',
    'nav.status.closed': 'Non disponibile',

    'skip.toContent': 'Salta al contenuto',

    'hero.coord': 'Coord',
    'hero.status': 'Status',
    'hero.build': 'Build',
    'hero.status.available': 'Disponibile per nuovi progetti',
    'hero.role': 'Senior Full Stack Developer',
    'hero.intro':
      " · Dal 2022 mi occupo di sviluppo di architetture web, infrastrutture e servizi. Dal semplice sito vetrina alle piattaforme più complesse che comprendono l'integrazione di IA e modelli LLM.",
    'hero.cta.work': 'Vedi i lavori',
    'hero.cta.contact': 'Contattami',

    'about.title': 'Profilo',
    'about.file': 'about.md',
    'about.p1':
      'Progetto, <mark>realizzo, pubblico e mantengo</mark>. Ho iniziato nel settore IT nel 2015 realizzando script in Python e gestendo server Linux.',
    'about.p2':
      'Dal 2022 lavoro su siti web statici, webapp, database, gestionali, e-commerce, streaming, API e IA.',
    'about.p3':
      'Quello che porto a un progetto non è una tecnologia preferita, è la capacità di <mark>scegliere quella giusta</mark> e di farla funzionare in produzione senza problemi e vulnerabilità.',
    'about.stat.years.unit': 'anni',
    'about.stat.years.label': 'Esperienza da full stack',
    'about.stat.projects.label': 'Progetti',

    'skills.title': 'Stack tecnico',
    'skills.file': 'capabilities.json',

    'services.title': 'Cosa faccio',
    'services.file': 'services.ts',

    'projects.title': 'Lavori selezionati',
    'projects.file': '06 / projects',
    'projects.scrollHint': 'scroll to navigate',
    'projects.linkVisit': 'visit',
    'projects.linkGithub': 'github',
    'projects.linkNda': 'NDA',
    'projects.caseStudy': 'case-study',

    'contact.title': 'Lavoriamo insieme',
    'contact.file': 'contact.json',
    'contact.heading': 'Hai un progetto',
    'contact.headingAccent': 'complesso?',
    'contact.intro':
      'Scrivimi due righe. Architettura, scope, deadline. Rispondo in 24h con una proposta di intervento o un rifiuto se il progetto è fuori dalle mie competenze.',
    'contact.mailto.subject': '[feroldi.cloud] Nuovo progetto',
    'contact.mailto.body':
      "Ciao Matteo,\n\nti scrivo per un progetto:\n\n— Cosa: \n— Scope: \n— Deadline indicativa: \n— Budget: \n\nGrazie,\n",
    'contact.meta.base': 'Base',
    'contact.meta.baseValue': 'Milano · Italia · remote',
    'contact.meta.time': 'Ora locale',
    'contact.meta.slot': 'Slot',
    'contact.meta.slotValue': 'Disponibile a maggio per ancora 2 progetti',
    'contact.meta.rate': 'Tariffa',
    'contact.meta.rateValue': "40€ lordi all'ora",

    'footer.copyright': '© 2026 · Matteo Luigi Feroldi · P.IVA 14667380969',
    'footer.social.github': 'github',

    'lang.switch': 'EN',
    'lang.current': 'IT',

    '404.title': 'Pagina non trovata',
    '404.intro': 'La risorsa che cerchi non esiste o è stata spostata.',
    '404.cta': 'Torna alla home',

    'casestudy.year': 'Anno',
    'casestudy.status': 'Stato',
    'casestudy.stack': 'Stack',
    'casestudy.role': 'Ruolo',
    'casestudy.prev': 'Precedente',
    'casestudy.next': 'Successivo',
    'casestudy.allWork': 'Tutti i lavori',
  },
  en: {
    'site.title': 'Matteo Feroldi — Senior Full Stack Developer',
    'site.description':
      'Matteo Feroldi · Senior Full Stack Developer, freelance. Architecture, web, devops, cloud.',
    'nav.index': 'index',
    'nav.about': 'about',
    'nav.stack': 'stack',
    'nav.services': 'services',
    'nav.work': 'work',
    'nav.contact': 'contact',
    'nav.toggle': 'Open menu',
    'nav.status.available': 'Available',
    'nav.status.limited': 'Limited slots',
    'nav.status.closed': 'Not available',

    'skip.toContent': 'Skip to content',

    'hero.coord': 'Coord',
    'hero.status': 'Status',
    'hero.build': 'Build',
    'hero.status.available': 'Available for new projects',
    'hero.role': 'Senior Full Stack Developer',
    'hero.intro':
      ' · Since 2022 I have been developing web architectures, infrastructure and services. From the simple landing page to complex platforms with integrated AI and LLM models.',
    'hero.cta.work': 'See the projects',
    'hero.cta.contact': 'Contact me',

    'about.title': 'Profile',
    'about.file': 'about.md',
    'about.p1':
      'I design, <mark>build, ship and maintain</mark>. I started in IT in 2015, writing Python scripts and running Linux servers.',
    'about.p2':
      'Since 2022 I have been building static sites, web apps, databases, internal tools, e-commerce, streaming, APIs and AI.',
    'about.p3':
      "What I bring to a project isn't a favorite technology — it's the ability to <mark>pick the right one</mark> and make it run in production without issues or vulnerabilities.",
    'about.stat.years.unit': 'years',
    'about.stat.years.label': 'Full stack experience',
    'about.stat.projects.label': 'Projects',

    'skills.title': 'Tech stack',
    'skills.file': 'capabilities.json',

    'services.title': 'What I do',
    'services.file': 'services.ts',

    'projects.title': 'Selected work',
    'projects.file': '06 / projects',
    'projects.scrollHint': 'scroll to navigate',
    'projects.linkVisit': 'visit',
    'projects.linkGithub': 'github',
    'projects.linkNda': 'NDA',
    'projects.caseStudy': 'case-study',

    'contact.title': "Let's work together",
    'contact.file': 'contact.json',
    'contact.heading': 'Have a complex',
    'contact.headingAccent': 'project?',
    'contact.intro':
      'Drop me two lines. Architecture, scope, deadline. I reply within 24h with a proposal — or a refusal if the project is outside my expertise.',
    'contact.mailto.subject': '[feroldi.cloud] New project',
    'contact.mailto.body':
      "Hi Matteo,\n\nI'm reaching out about a project:\n\n— What: \n— Scope: \n— Indicative deadline: \n— Budget: \n\nThanks,\n",
    'contact.meta.base': 'Base',
    'contact.meta.baseValue': 'Milano · Italy · remote',
    'contact.meta.time': 'Local time',
    'contact.meta.slot': 'Slot',
    'contact.meta.slotValue': 'Available in May for 2 more projects',
    'contact.meta.rate': 'Rate',
    'contact.meta.rateValue': '€40 gross / hour',

    'footer.copyright': '© 2026 · Matteo Luigi Feroldi · VAT IT14667380969',
    'footer.social.github': 'github',

    'lang.switch': 'IT',
    'lang.current': 'EN',

    '404.title': 'Page not found',
    '404.intro': "The resource you're looking for doesn't exist or has moved.",
    '404.cta': 'Back to home',

    'casestudy.year': 'Year',
    'casestudy.status': 'Status',
    'casestudy.stack': 'Stack',
    'casestudy.role': 'Role',
    'casestudy.prev': 'Previous',
    'casestudy.next': 'Next',
    'casestudy.allWork': 'All work',
  },
} as const;

export type UIKey = keyof typeof ui.it;
