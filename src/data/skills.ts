import type { Locale } from '../i18n/ui';

export interface SkillCluster {
  id: string;
  name: string;
  title: Record<Locale, string>;
  tags: string[];
}

export const skills: SkillCluster[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    title: {
      it: 'Interfacce reattive,\nperformanti, accessibili',
      en: 'Reactive interfaces,\nperformant, accessible',
    },
    tags: ['React', 'Vue', 'Svelte', 'Angular', 'three.js', 'TypeScript', 'HTML5', 'CSS'],
  },
  {
    id: 'backend',
    name: 'Backend',
    title: {
      it: 'API, microservizi,\nlogica di dominio',
      en: 'APIs, microservices,\ndomain logic',
    },
    tags: ['Node.js', 'Go', 'Python', 'Java · Spring Boot', 'PHP', 'C#', 'ASP.NET', 'C++', 'REST · gRPC'],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    title: {
      it: 'App native,\nPWA cross-platform',
      en: 'Native apps,\ncross-platform PWAs',
    },
    tags: ['Swift · iOS', 'Kotlin · Android', 'PWA'],
  },
  {
    id: 'data',
    name: 'Data & Streaming',
    title: {
      it: 'Persistenza, ricerca,\nflussi event-driven',
      en: 'Persistence, search,\nevent-driven streams',
    },
    tags: ['PostgreSQL', 'MySQL', 'Elasticsearch', 'Apache Kafka'],
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    title: {
      it: 'Container, orchestrazione,\npipeline di rilascio',
      en: 'Containers, orchestration,\nrelease pipelines',
    },
    tags: ['Docker', 'Kubernetes', 'CI / CD', 'IaC'],
  },
  {
    id: 'security',
    name: 'Security & Quality',
    title: {
      it: 'Hardening, audit,\nbuone abitudini',
      en: 'Hardening, audits,\ngood habits',
    },
    tags: ['Cyber Security', 'Pen testing', 'OWASP'],
  },
];
