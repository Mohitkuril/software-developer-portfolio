/**
 * Mohit Kuril — portfolio copy aligned with https://mohitkuril.xyz/ and the classic React site in /website.
 */
export const siteConfig = {
  handle: 'mohitkuril',
  displayName: 'Mohit Kuril',
  nameFirst: 'Mohit',
  nameLast: 'Kuril',
  repoLabel: 'PORTFOLIO',
  /** Mobile explorer — root folder row (caps, hyphenated style) */
  explorerMobileWorkspaceRoot: 'MOHITKURIL',
  /** Mobile explorer — single-line Copilot row under files */
  explorerCopilotAskLabel: "Ask Mohit's Copilot",
  portfolioShortTitle: "Mohit's Portfolio",
  branch: 'main',

  /** Activity bar → Source Control popover (decorative / portfolio chrome) */
  scmPanel: {
    commitsAhead: 1,
    modified: 3,
    added: 1,
    deleted: 0,
    viewGithubLabel: 'View on GitHub',
  } as const,

  roleLine: 'Frontend Developer · Hyderabad, India 🇮🇳',
  homeComment: '// hello world — welcome to my portfolio',
  heroTagline: 'Responsive interfaces, React-first, and product-minded delivery.',
  roleBadges: [
    { label: 'Frontend Developer', tone: 'teal' as const },
    { label: 'React.js', tone: 'pink' as const },
    { label: 'Next.js & TypeScript', tone: 'blue' as const },
    { label: 'Live site', tone: 'magenta' as const, href: 'https://mohitkuril.xyz/' },
  ],
  introSegments: [
    { text: "I'm a " },
    { text: 'Front-End Developer', highlight: true },
    { text: ' specializing in ' },
    { text: 'React.js', highlight: true },
    { text: ', building responsive, user-friendly web apps with ' },
    { text: 'Tailwind CSS', highlight: true },
    { text: ', ' },
    { text: 'Next.js', highlight: true },
    { text: ', and ' },
    { text: 'TypeScript', highlight: true },
    {
      text: '. Recent work spans Chat with PDF, a React dashboard, a text-to-image tool, and a weather app — focused on clean UX, performance, and maintainable code.',
    },
  ] as const,

  homeStats: [
    { value: '3+', label: 'YEARS' },
    { value: '10+', label: 'PROJECTS' },
    { value: '∞', label: 'CURIOSITY' },
    { value: '↑', label: 'ALWAYS LEARNING', wide: true as const },
  ],

  socialLinks: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/Mohitkuril', icon: 'github' as const },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mohit-kuril/',
      icon: 'linkedin' as const,
    },
    { id: 'email', label: 'Email', href: 'mailto:mohitkuril5@gmail.com', icon: 'email' as const },
    { id: 'twitter', label: 'X', href: 'https://mohitkuril.xyz/', icon: 'twitter' as const },
  ],

  /** Shown in explorer / menus (may truncate in UI) */
  resumeFileLabel: 'Mohit Kuril_Frontend Developer.pdf',
  /** File in /public — served at site root */
  resumeUrl: '/Mohit Kuril_Frontend Developer.pdf',
  /** Browser “Save as” default name (no spaces) */
  resumeDownloadFileName: 'Mohit_Kuril_Frontend_Developer.pdf',

  about: {
    htmlComment: '<!-- about.html - Mohit Kuril -->',
    subtitleComment: '// who I am · what I build · where I work',
    introParts: [
      { text: "Hi, I'm " },
      { text: 'Mohit Kuril', highlight: true },
      {
        text: ', a web application developer based in Hyderabad with experience shipping responsive, user-friendly interfaces. I work with ',
      },
      { text: 'React.js', highlight: true },
      { text: ', ' },
      { text: 'Redux', highlight: true },
      { text: ', ' },
      { text: 'JavaScript', highlight: true },
      { text: ', ' },
      { text: 'Tailwind CSS', highlight: true },
      { text: ', ' },
      { text: 'Next.js', highlight: true },
      { text: ', and ' },
      { text: 'TypeScript', highlight: true },
      {
        text: ' — from AI-assisted tools like Chat with PDF to dashboards, generators, and real-time experiences.',
      },
    ] as const,
    focusTitle: 'CURRENT FOCUS',
    focusItems: [
      { emoji: '⚛️', text: 'Micro frontends, modular React, and scalable UI architecture.' },
      { emoji: '🎯', text: 'Performance: lazy loading, code splitting, and measurable UX.' },
      { emoji: '🤝', text: 'Collaborating with design (Figma) and backend for cohesive products.' },
      { emoji: '🚀', text: 'Agile delivery, Git workflows, and CI/CD–friendly practices.' },
    ] as const,
    educationTitle: 'HIGHLIGHTS',
    education: [
      {
        school: 'Professional experience',
        detail: 'SignalX · KR Peteye LLP · Wipro — frontend & product delivery',
        years: '2021 — Present',
      },
      {
        school: 'Stack depth',
        detail: 'React, Next.js, Mantine UI, Redux, REST & AI APIs',
        years: 'Continuous',
      },
    ] as const,
  },

  projectsHeader: "// projects.js — shipped & demo'd work",
  projectsConst: 'const projects = [ ...production, ...experiments ]',
  projects: [
    {
      name: 'Chat With PDF',
      category: 'REACT · AI · PRODUCTIVITY',
      /** Radium accent: category line + hover top border */
      accent: '#ff4baf',
      emoji: '📄',
      description:
        'A production-style document assistant: upload PDFs, extract text with PDF.js, and chat with the content through a split workspace—viewer on one side, streaming answers on the other. Sessions persist in IndexedDB so returning users can pick up where they left off, with drag-and-drop uploads and clear loading states for large files.',
      highlights: [
        'Groq LLaMA 4 for low-latency Q&A over extracted text',
        'IndexedDB-backed sessions and resilient client-only flows',
        'Split UI: synchronized scroll, citations-style context, and modal previews',
      ] as const,
      liveUrl: 'https://talktomypdf.vercel.app/',
      githubUrl: 'https://github.com/Mohitkuril/chatwithpdf',
      tech: ['React', 'Tailwind CSS', 'Groq', 'IndexedDB'],
    },
    {
      name: 'React Dashboard',
      category: 'REACT · REDUX · DATA VIZ',
      accent: '#58a6ff',
      emoji: '📊',
      description:
        'A modular analytics workspace inspired by product dashboards: drag-and-drop task boards, burndown and Gantt-style charts, and theme-aware layouts driven by Redux. Built to feel like a real internal tool—dense but readable, with sensible defaults, keyboard-friendly controls, and reusable chart primitives.',
      highlights: [
        'Redux Toolkit patterns for predictable UI state',
        'Chart.js visualizations with responsive breakpoints',
        'Custom themes and layout persistence across reloads',
      ] as const,
      liveUrl: 'https://reactdashboardhub.vercel.app/',
      githubUrl: 'https://github.com/Mohitkuril/react-dashboard',
      tech: ['React', 'Redux', 'Tailwind CSS', 'Chart.js'],
    },
    {
      name: 'Text-to-Image Generator',
      category: 'VANILLA JS · APIs',
      accent: '#c4a7e7',
      emoji: '🖼️',
      description:
        'A vanilla JavaScript front end over the Hugging Face inference API: prompt box, history-friendly requests, modal image previews, and lightweight caching so repeat prompts feel instant. The UI stays intentionally simple—progressive enhancement, accessible buttons, and lazy-loaded assets to keep first paint fast on slower networks.',
      highlights: [
        'REST calls to Hugging Face with clear error surfaces',
        'Modal previews, keyboard dismiss, and optimistic UI touches',
        'Caching and lazy loading to reduce duplicate API work',
      ] as const,
      liveUrl: 'https://text2image-generation.netlify.app/',
      githubUrl: 'https://github.com/Mohitkuril/Text2ImageGeneration',
      tech: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      name: 'Weather App (ClimateToTrack)',
      category: 'SPA · WEATHER API',
      accent: '#2dd4bf',
      emoji: '🌤️',
      description:
        'A single-page weather experience focused on clarity: search by city, show temperature, humidity, wind, and conditions at a glance, and adapt layout cleanly from phone to desktop. OpenWeather (or similar) responses are normalized into a small view-model so the UI stays stable even when the API shape varies slightly by location.',
      highlights: [
        'City search with debounced requests and empty states',
        'Responsive cards and typography tuned for outdoor readability',
        'Minimal dependencies and fast iteration on vanilla HTML/CSS/JS',
      ] as const,
      liveUrl: 'https://climatetotrack.netlify.app/',
      githubUrl: 'https://github.com/Mohitkuril/Weather-App',
      tech: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      name: 'Peteye Web Application',
      category: 'REACT · PET TECH',
      accent: '#fb923c',
      emoji: '🐾',
      description:
        'Peteye is a React dashboard for pet owners and clinics: health timelines, monitoring widgets, and workflows that stay usable on small screens. Tailwind keeps spacing consistent, Redux centralizes cross-page data, and the experience is optimized for repeated daily use—clear hierarchy, obvious CTAs, and resilient forms.',
      highlights: [
        'React + Tailwind + Redux for scalable feature growth',
        'Role-style views for owners vs staff (where applicable)',
        'Production deployment with emphasis on performance and UX polish',
      ] as const,
      liveUrl: 'https://peteye.pet/',
      githubUrl: 'https://peteye.pet/',
      tech: ['React', 'Tailwind CSS', 'Redux', 'JavaScript'],
    },
  ] as const,

  skillsSubtitle: '{ "focus": "react_ecosystem", "ui": "tailwind_mantine" }',
  skillCategories: [
    {
      title: 'LANGUAGES',
      items: [
        { name: 'JavaScript', pct: 90, color: '#FFD700' },
        { name: 'TypeScript', pct: 82, color: '#1E90FF' },
        { name: 'HTML', pct: 92, color: '#FF8C00' },
        { name: 'CSS', pct: 90, color: '#00CED1' },
        { name: 'Python', pct: 78, color: '#FF00FF' },
        { name: 'AQL', pct: 72, color: '#32CD32' },
      ],
    },
    {
      title: 'FRAMEWORKS & LIBS',
      items: [
        { name: 'React', pct: 92, color: '#32CD32' },
        { name: 'Next.js', pct: 85, color: '#9932CC' },
        { name: 'Redux', pct: 80, color: '#FF1493' },
      ],
    },
    {
      title: 'UI & STYLING',
      items: [
        { name: 'Tailwind CSS', pct: 90, color: '#1E90FF' },
        { name: 'Mantine UI', pct: 78, color: '#00CED1' },
        { name: 'Bootstrap', pct: 72, color: '#9370DB' },
      ],
    },
    {
      title: 'BACKEND & APIS',
      items: [{ name: 'FastAPI', pct: 80, color: '#00CED1' }],
    },
    {
      title: 'DATABASE',
      items: [{ name: 'MongoDB', pct: 82, color: '#32CD32' }],
    },
    {
      title: 'FRONTEND',
      items: [{ name: 'Responsive design', pct: 92, color: '#FF00FF' }],
    },
    {
      title: 'TOOLING',
      items: [
        { name: 'Git / GitHub', pct: 88, color: '#9932CC' },
        { name: 'npm', pct: 85, color: '#FF8C00' },
        { name: 'Chart.js', pct: 70, color: '#FF1493' },
        { name: 'Linux', pct: 78, color: '#1E90FF' },
      ],
    },
  ] as const,
  alsoFamiliar: ['Micro frontends', 'Groq API', 'IndexedDB', 'PDF.js', 'Figma', 'Agile / Scrum'],

  experienceComment: '// experience.ts — professional journey',
  experienceInterface: 'interface Career extends Timeline {}',
  experience: [
    {
      period: 'May 2025 — Present',
      title: 'Front-End Developer',
      company: 'SignalX',
      description:
        'Building high-performance UIs with React, Next.js (SSR/SSG), and TypeScript for data-heavy product surfaces. I work inside a micro-frontend style architecture with Mantine UI, shared design tokens, and disciplined performance work—lazy routes, code splitting, and measurable improvements to interaction latency.',
      tags: ['React', 'Next.js', 'TypeScript', 'Mantine UI', 'Micro frontends'],
    },
    {
      period: 'Jan 2024 — Apr 2025',
      title: 'Front-End Developer',
      company: 'KR Peteye LLP',
      description:
        'Owned feature delivery across dashboards and marketing flows using React, Redux, JavaScript, and Tailwind—translating Figma into responsive layouts, tightening state boundaries in Redux, and shipping iteratively with Git-based reviews. Focused on readable components, predictable UX states, and handoff quality for backend integration.',
      tags: ['React', 'Redux', 'Tailwind CSS', 'JavaScript'],
    },
    {
      period: 'Dec 2021 — May 2023',
      title: 'Project Engineer',
      company: 'Wipro',
      description:
        'Delivered responsive web applications with HTML, CSS, JavaScript, Bootstrap, and React—emphasizing reusable components, cross-device layouts, and maintainable CSS architecture. Collaborated on sprint planning, defect triage, and incremental refactors so legacy screens stayed shippable while new experiences rolled out.',
      tags: ['React', 'Bootstrap', 'JavaScript', 'HTML/CSS'],
    },
  ] as const,

  contact: {
    headerComment: "/* contact.css — let's build something */",
    subComment: '// open to roles, collabs, and good conversations',
    findTitle: 'FIND ME ON',
    sendTitle: 'SEND A MESSAGE',
    channels: [
      {
        id: 'email',
        title: 'EMAIL',
        line: 'mohitkuril5@gmail.com',
        href: 'mailto:mohitkuril5@gmail.com',
        accent: 'green' as const,
      },
      {
        id: 'linkedin',
        title: 'LINKEDIN',
        line: 'linkedin.com/in/mohit-kuril',
        href: 'https://www.linkedin.com/in/mohit-kuril/',
        accent: 'blue' as const,
      },
      {
        id: 'github',
        title: 'GITHUB',
        line: 'github.com/Mohitkuril',
        href: 'https://github.com/Mohitkuril',
        accent: 'purple' as const,
      },
    ] as const,
    formspreeAction: '',
    formNote: '// Powered by Formspree (lands directly in my inbox) :p',
  },

  readme: {
    headline: 'Mohit Kuril',
    subline: 'Front-End Developer · Hyderabad, India · https://mohitkuril.xyz/',
    /** Outline-style badges (accent = border / label tint) */
    badgeStack: [
      { label: 'React', accent: 'blue' as const },
      { label: 'TypeScript', accent: 'blue' as const },
      { label: 'Next.js', accent: 'cyan' as const },
      { label: 'Tailwind', accent: 'teal' as const },
      { label: 'Redux', accent: 'violet' as const },
      { label: 'Mantine', accent: 'pink' as const },
    ] as const,
    /** Pill next to tech badges — downloads PDF from /public */
    showResumeButton: true as const,
    aboutTitle: '💜 About',
    aboutParagraphs: [
      "Hi — Mohit here! I'm a front-end developer who enjoys turning fuzzy product ideas into crisp, responsive interfaces: readable layouts, intentional motion, and components that stay maintainable as the codebase grows. I spend most of my time in **React** and **TypeScript**—shipping dashboards, AI-assisted tools, and marketing-quality pages—while staying close to performance (lazy loading, sensible bundle splits) and collaboration with design and backend in Agile squads. Outside tickets, I like polishing UX details: empty states, keyboard paths, and small refactors that make the next feature cheaper to build. Glad you stopped by—cheers!",
    ] as const,
    highlights: [
      { icon: '🔭', text: 'Building **high-performance UIs** at SignalX—Next.js, Mantine, and micro-frontend friendly delivery.' },
      { icon: '⚡', text: '**React**, **Redux**, Tailwind, REST integrations, and Vite-based workflows.' },
      { icon: '✨', text: 'Portfolio: **Chat with PDF**, dashboard, generators, weather, and Peteye—always learning, always shipping.' },
      { icon: '📬', text: 'Open to roles and collaborations—reach out via **Contact** or the links below.' },
    ] as const,
    stackTitle: 'Stack',
    stackGroups: [
      { title: 'Languages', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS'] as const },
      { title: 'Frontend', items: ['React', 'Next.js', 'Redux', 'Tailwind CSS', 'Mantine UI'] as const },
      { title: 'Design & delivery', items: ['Figma', 'Responsive UI', 'Agile / Scrum', 'Git reviews'] as const },
      { title: 'Tooling', items: ['Git', 'GitHub', 'npm', 'Vite', 'Vercel', 'Netlify'] as const },
    ] as const,
    connectTitle: 'Connect',
    connectLines: [
      { label: 'Email', value: 'mohitkuril5@gmail.com', href: 'mailto:mohitkuril5@gmail.com' },
      { label: 'GitHub', value: 'Mohitkuril', href: 'https://github.com/Mohitkuril' },
      { label: 'LinkedIn', value: 'mohit-kuril', href: 'https://www.linkedin.com/in/mohit-kuril/' },
      { label: 'Site', value: 'mohitkuril.xyz', href: 'https://mohitkuril.xyz/' },
    ] as const,
    footer: 'Made with 💜 by Mohit Kuril · 2026',
  },

  copilot: {
    panelTitle: "Mohit's AI Assistant",
    shortName: "Mohit's Copilot",
    explorerLine1: "Mohit's",
    explorerLine2: 'Copilot',
    greeting: "Hi! I'm Mohit's Copilot 👋",
    intro:
      'Ask about projects (Chat with PDF, dashboard, generators), stack, or experience — I point you to the right file in this workspace.',
    prompts: [
      'Tell me about Mohit',
      'What projects has Mohit shipped?',
      'Summarize work experience',
      "What's the tech stack?",
      'How do I contact Mohit?',
      'Where is the live portfolio?',
    ] as const,
    inputPlaceholder: 'Ask about projects, experience, skills…',
    msgsLeftLabel: '0 msgs left',
    footerDisclaimer: 'AI can make mistakes · Contact Mohit directly for important info',
  },
} as const

export type SiteConfig = typeof siteConfig
