import type { Locale } from '../i18n/ui';

export interface Service {
  id: string;
  num: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const services: Service[] = [
  {
    id: 'webapp',
    num: 'S — 01',
    title: {
      it: 'Web App & Piattaforme',
      en: 'Web Apps & Platforms',
    },
    description: {
      it: 'Applicazioni web full-stack, dal CRUD enterprise al dashboard real-time. Architettura scalabile, manutenibile, documentata.',
      en: 'Full-stack web applications, from enterprise CRUD to real-time dashboards. Scalable, maintainable, documented architecture.',
    },
  },
  {
    id: 'api',
    num: 'S — 02',
    title: {
      it: 'API & Backend distribuiti',
      en: 'APIs & distributed backends',
    },
    description: {
      it: 'REST e gRPC, microservizi, code di messaggi, integrazione di sistemi legacy. Spring Boot, Node, Go, Python — scelti per il contesto.',
      en: 'REST and gRPC, microservices, message queues, legacy system integration. Spring Boot, Node, Go, Python — picked for the context.',
    },
  },
  {
    id: 'devops',
    num: 'S — 03',
    title: {
      it: 'DevOps & Cloud Infrastructure',
      en: 'DevOps & Cloud Infrastructure',
    },
    description: {
      it: 'Containerizzazione, Kubernetes, pipeline CI/CD, infrastrutture cloud. Dal Dockerfile al cluster in produzione.',
      en: 'Containerization, Kubernetes, CI/CD pipelines, cloud infrastructure. From the Dockerfile to the production cluster.',
    },
  },
  {
    id: '3d',
    num: 'S — 04',
    title: {
      it: 'Esperienze 3D & WebGL',
      en: '3D experiences & WebGL',
    },
    description: {
      it: 'Siti, configuratori e prodotti web con three.js. Scene interattive, shader custom, performance su mobile.',
      en: 'Websites, configurators and web products with three.js. Interactive scenes, custom shaders, mobile performance.',
    },
  },
  {
    id: 'consulting',
    num: 'S — 05',
    title: {
      it: 'Consulenza tecnica & Audit',
      en: 'Technical consulting & Audit',
    },
    description: {
      it: 'Code review, security audit, ottimizzazione performance, scelta dello stack. Una settimana, un mese, o un retainer continuativo.',
      en: 'Code review, security audit, performance optimization, stack selection. A week, a month, or a continuous retainer.',
    },
  },
];
