export const profile = {
  name: 'Kurt Angelo B. Mejorada',
  shortName: 'Kurt Mejorada',
  role: 'Full-Stack Developer',
  email: 'kurtangelobenavides.mejorada@gmail.com',
  github: 'https://github.com/Ceyju',
  githubHandle: 'Ceyju',
  summary:
    'Full-stack developer specializing in backend architecture, SQL optimization, and healthcare information systems. I build production-grade systems that reduce operational overhead, enforce compliance, and make critical data more reliable.',
  specialties: ['Backend architecture', 'Database Management', 'SQL optimization', 'API Integration', 'Workflow Automation'],
  education: {
    school: 'Bicol University',
    degree: 'BS Computer Science',
    period: 'Aug 2020 — Jul 2024',
  },
  certifications: [
    'Generative AI — LinkedIn Learning',
    'Introduction to Image Generation — Google Cloud',
    'Introduction to Generative AI — Google Cloud',
  ],
};

export const experience = [
  {
    role: 'Computer Maintenance Technologist I',
    organization: 'Jose R. Reyes Memorial Medical Center',
    team: 'Integrated Management Information System Section',
    period: 'Feb 2026 — Jun 2026',
    code: 'JRRMMC.26',
    highlights: [
      'Designed and deployed a secure Patient Safety Incident Reporting System with multi-patient cases and audit-ready analytics.',
      'Built a kiosk-integrated Hospital Client Experience Survey with centralized, real-time reporting.',
      'Engineered a Hospital Information System spanning clinical reports, image annotation, orders, and role-based dashboards.',
      'Hardened and deployed internal systems with rate limiting and access controls under real hospital load.',
    ],
  },
  {
    role: 'Information System Analyst III',
    organization: 'Department of Health',
    team: 'Knowledge Management & Information Technology Services',
    period: 'Mar 2025 — Dec 2025',
    code: 'DOH.25',
    highlights: [
      'Architected backend services and optimized complex SQL for iHOMIS+ and PIDSR across multiple regions.',
      'Restructured EMR reporting with PDF/Excel generation, RBAC, and validation for DOH compliance.',
      'Built encounter-aware patient search and supported database administration and disaster recovery.',
      'Led training, SOP documentation, and regional support for sustainable system adoption.',
    ],
  },
  {
    role: 'System Developer Intern',
    organization: 'Bicol University',
    team: 'Information and Communications Technology Office',
    period: 'Jun 2023 — Aug 2023',
    code: 'BU.23',
    highlights: [
      'Developed a university inventory system integrated with existing institutional databases.',
      'Conducted UX research and feature analysis for the iBU app, producing adopted recommendations.',
    ],
  },
];

export const featuredRepositories = [
  'megiddo',
  'pet-ehealth-tracker',
  'tracking-project',
  'ytdl',
];

export const projects = [
  {
    id: 'megiddo',
    title: 'Megiddo',
    eyebrow: 'Anime & Media Streaming Platform',
    summary: 'A full-stack media platform built for fast discovery and resilient adaptive playback at scale.',
    highlights: ['HLS adaptive streaming', 'Multi-API aggregation', 'Proxy-based playback', 'ISR caching'],
    technologies: ['TypeScript', 'Next.js', 'React'],
    repoUrl: 'https://github.com/Ceyju/megiddo',
    demoUrl: 'https://megiddo-gamma.vercel.app',
    status: 'live',
    media: '/Megiddo_thumbnail.png',
  },
  {
    id: 'pet-ehealth-tracker',
    title: 'JoyCare',
    eyebrow: 'Pet eHealth Card',
    summary: 'A production health-record system for vaccination and medical history with portable QR access.',
    highlights: ['QR health cards', 'PDF exports', 'Realtime database', 'Secure authentication'],
    technologies: ['TypeScript', 'Next.js', 'Supabase'],
    repoUrl: 'https://github.com/Ceyju/pet-ehealth-tracker',
    demoUrl: 'https://joycare-delta.vercel.app',
    status: 'live',
    media: '/JoyCare_thumbnail.png',
  },
  {
    id: 'tracking-project',
    title: 'Dispatch Network',
    eyebrow: 'Delivery Dispatch & Tracking',
    summary: 'A real-time field operations platform for dispatch, GPS tracking, proof-of-delivery, and customer visibility.',
    highlights: ['Live rider GPS', 'Offer/accept workflow', 'Proof-of-delivery', 'Audit-ready reporting'],
    technologies: ['Laravel', 'React', 'SQL Server', 'Leaflet'],
    repoUrl: 'https://github.com/Ceyju/tracking-project',
    demoUrl: null,
    status: 'work in progress - v2',
    media: null,
  },
  {
    id: 'ytdl',
    title: 'YTDL',
    eyebrow: 'Media Utility',
    summary: 'A compact Python-powered media downloader with browser controls and selectable output quality.',
    highlights: ['Format selection', 'Python service', 'Browser client', 'Docker-ready'],
    technologies: ['Python', 'JavaScript', 'HTML'],
    repoUrl: 'https://github.com/Ceyju/ytdl',
    demoUrl: null,
    status: 'down',
    media: null,
  },
  {
    id: 'collaborative-llms',
    title: 'Collaborative LLMs',
    eyebrow: 'Math Reasoning System',
    summary: 'A multi-agent reasoning environment where local language models collaborate on mathematical problems.',
    highlights: ['Multi-agent orchestration', 'Local Ollama models', 'Containerized runtime', 'Streamlit interface'],
    technologies: ['Python', 'Docker', 'LangChain'],
    repoUrl: null,
    demoUrl: null,
    status: 'unlinked',
    media: null,
  },
  {
    id: 'synomika',
    title: 'Synomika',
    eyebrow: 'English–Filipino Translator',
    summary: 'A collaborative neural machine translation system for bidirectional English–Filipino translation.',
    highlights: ['Neural translation', 'Bidirectional output', 'Cross-functional delivery', 'Web interface'],
    technologies: ['Python', 'JavaScript', 'HTML'],
    repoUrl: null,
    demoUrl: null,
    status: 'unlinked',
    media: null,
  },
];

export const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'C', 'C++', 'C#', 'HTML', 'CSS'],
  frameworks: ['React', 'Next.js', 'Vue.js', 'Laravel', 'CodeIgniter'],
  infrastructure: ['SQL', 'Supabase', 'Docker', 'Vercel'],
  practices: ['REST APIs', 'RBAC', 'Rate limiting', 'HLS streaming', 'Server-side Authorization'],
};

export const fallbackGitHub = {
  profile: { login: 'Ceyju', public_repos: 8, html_url: 'https://github.com/Ceyju' },
  languages: [
    { name: 'TypeScript', bytes: 695754 },
    { name: 'PHP', bytes: 177670 },
    { name: 'JavaScript', bytes: 131845 },
    { name: 'Python', bytes: 4254 },
    { name: 'CSS', bytes: 15429 },
  ],
  commits: [],
  pushes: [],
};
