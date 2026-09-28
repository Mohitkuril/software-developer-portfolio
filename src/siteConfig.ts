/**
 * Mohit Kuril — portfolio copy aligned with resume (Mohit_Kuril_Full_Stack_Software_Engineer_Resume.pdf)
 * and https://mohitkuril.xyz/
 */

/**
 * Dynamic experience calculation based on career start date (Wipro Ltd.: Dec 2021).
 */
export function calculateYearsOfExperience(startDateStr: string = '2021-12-01'): string {
  const start = new Date(startDateStr)
  const now = new Date()
  const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
  const years = Math.floor(totalMonths / 12)
  return `${years}+`
}

const expYears = calculateYearsOfExperience()

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

  roleLine: 'Software Engineer | Full Stack Developer · Hyderabad, India 🇮🇳',
  homeComment: '// hello world — welcome to my portfolio',
  heroTagline: 'Dynamic, responsive, and scalable web applications with React, Next.js, TypeScript, and FastAPI.',
  roleBadges: [
    { label: 'Software Engineer', tone: 'teal' as const },
    { label: 'Full Stack Developer', tone: 'pink' as const },
    { label: 'React.js & Next.js', tone: 'blue' as const },
    { label: 'Python & FastAPI', tone: 'orange' as const },
  ],
  introSegments: [
    { text: "I'm a " },
    { text: 'Software Engineer & Full Stack Developer', highlight: true },
    { text: ` with ${expYears} years of experience building dynamic, responsive, and scalable web applications. Strong frontend foundation in ` },
    { text: 'ReactJS', highlight: true },
    { text: ', ' },
    { text: 'Next.js', highlight: true },
    { text: ', ' },
    { text: 'TypeScript', highlight: true },
    { text: ', ' },
    { text: 'Redux', highlight: true },
    { text: ', ' },
    { text: 'Tailwind CSS', highlight: true },
    { text: ', and ' },
    { text: 'Micro Frontend Architecture', highlight: true },
    { text: ', with hands-on experience developing backend services using ' },
    { text: 'Python', highlight: true },
    { text: ' & ' },
    { text: 'FastAPI', highlight: true },
    { text: ' alongside PostgreSQL, MySQL, and MongoDB.' },
  ] as const,

  homeStats: [
    { value: expYears, label: 'YEARS EXP' },
    { value: '7+', label: 'PROJECTS' },
    { value: '15+', label: 'SKILLS & TECH' },
    { value: '↑', label: 'ALWAYS LEARNING', wide: true as const },
  ],

  socialLinks: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/Mohitkuril', icon: 'github' as const },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mohit-kuril-84884926b',
      icon: 'linkedin' as const,
    },
    { id: 'email', label: 'Email', href: 'mailto:mohitkuril5@gmail.com', icon: 'email' as const },
  ],

  /** Shown in explorer / menus (may truncate in UI) */
  resumeFileLabel: 'Mohit_Kuril_Full_Stack_Software_Engineer_Resume.pdf',
  /** File in /public — served at site root */
  resumeUrl: '/Mohit_Kuril_Full_Stack_Software_Engineer_Resume.pdf',
  /** Browser “Save as” default name (no spaces) */
  resumeDownloadFileName: 'Mohit_Kuril_Full_Stack_Software_Engineer_Resume.pdf',

  about: {
    htmlComment: '<!-- about.html - Mohit Kuril -->',
    subtitleComment: '// who I am · what I build · where I work',
    introParts: [
      { text: "Hi, I'm " },
      { text: 'Mohit Kuril', highlight: true },
      {
        text: `, a Software Engineer & Full Stack Developer based in Hyderabad, India with ${expYears} years of professional experience building dynamic, responsive, and scalable web applications. I specialize in `,
      },
      { text: 'ReactJS', highlight: true },
      { text: ', ' },
      { text: 'Next.js', highlight: true },
      { text: ', ' },
      { text: 'TypeScript', highlight: true },
      { text: ', ' },
      { text: 'Redux', highlight: true },
      { text: ', ' },
      { text: 'Tailwind CSS', highlight: true },
      { text: ', ' },
      { text: 'Mantine UI', highlight: true },
      { text: ', and ' },
      { text: 'Micro Frontend Architecture', highlight: true },
      {
        text: ', with active backend experience in ',
      },
      { text: 'Python', highlight: true },
      { text: ', ' },
      { text: 'FastAPI', highlight: true },
      { text: ', and databases including ' },
      { text: 'PostgreSQL, MySQL, and MongoDB', highlight: true },
      { text: '.' },
    ] as const,
    focusTitle: 'CURRENT FOCUS',
    focusItems: [
      { emoji: '⚛️', text: 'Micro Frontend architecture, modular React & Next.js UI development.' },
      { emoji: '⚡', text: 'Backend services & REST API development using Python and FastAPI.' },
      { emoji: '🗄️', text: 'Data application workflows with PostgreSQL, MySQL, and MongoDB.' },
      { emoji: '🎯', text: 'Performance optimization: lazy loading, code splitting, and measurable UX efficiency.' },
      { emoji: '🤝', text: 'Translating Figma designs into production-ready interfaces & Agile team collaboration.' },
    ] as const,
    educationTitle: 'EXPERIENCE & EDUCATION',
    education: [
      {
        school: 'Front-End Developer — SignalX',
        detail: 'ReactJS, Next.js, TypeScript, Mantine UI, Micro Frontends, Python & FastAPI, PostgreSQL, MongoDB, Git/CI/CD',
        years: 'May 2025 — Present',
      },
      {
        school: 'Front-End Developer — KR PETEYE LLP',
        detail: 'ReactJS, JavaScript, HTML/CSS, Tailwind CSS, Data Workflows, E-commerce, Figma conversion',
        years: 'Jan 2024 — Apr 2025',
      },
      {
        school: 'Project Engineer — Wipro Ltd.',
        detail: 'HTML, CSS, JavaScript, ReactJS, UI Component Architecture, Agile Ceremonies & Defect Triage',
        years: 'Dec 2021 — May 2023',
      },
      {
        school: 'B.Tech in Computer Science & Engineering',
        detail: 'Malla Reddy Institute of Technology and Science | Jul 2017 — Aug 2021 | Hyderabad, India',
        years: '2017 — 2021',
      },
      {
        school: 'Certifications',
        detail: 'ReactJS Certification (Aug 2023) & Web Developer Certification (Jun 2023) — Edyoda LMS',
        years: '2023',
      },
    ] as const,
  },

  projectsHeader: "// projects.js — shipped & demo'd work",
  projectsConst: 'const projects = [ ...production, ...experiments ]',
  projects: [
    {
      name: 'Integrate Leads – Recruitment Platform',
      category: 'REACT · PLATFORM · SAAS',
      accent: '#6366f1',
      emoji: '💼',
      description:
        'A modern recruitment platform connecting employers and job seekers across India and the United States. Built to streamline hiring workflows, the platform enables recruiters to post job requirements, broadcast emails, and manage candidate pipelines from a centralized dashboard. Designed with a focus on speed, automation, and scalability for high-volume and skill-based hiring.',
      highlights: [
        'Job posting system with custom screening questions',
        'Bulk email broadcasting to candidate database',
        'Centralized recruiter dashboard for hiring workflows',
        'Multi-country support (India & USA job markets)',
        'Cloud-based access with secure data handling',
      ] as const,
      liveUrl: 'https://integrateleads.com/',
      githubUrl: '#',
      tech: ['React', 'Tailwind CSS', 'JavaScript'],
    },
    {
      name: 'Rudransh & Co. – CA Firm Website',
      category: 'REACT · BUSINESS WEBSITE · SEO',
      accent: '#22c55e',
      emoji: '📈',
      description:
        'A professional business website built for a chartered accountant firm offering GST, ITR, TDS, and audit services. Designed to establish trust and generate leads, the site focuses on clear service presentation, strong call-to-actions, and mobile-first responsiveness. Built with a clean UI and structured content optimized for local SEO in Hyderabad.',
      highlights: [
        'Service-focused landing sections for GST, ITR, TDS & audits',
        'Lead generation with call, email, and consultation CTAs',
        'Responsive design optimized for mobile and local users',
        'SEO-friendly structure targeting Hyderabad-based services',
      ] as const,
      liveUrl: 'https://rudranshcompany.vercel.app/',
      githubUrl: 'https://github.com/Mohitkuril/Rudransh-website',
      tech: ['React', 'Tailwind CSS', 'JavaScript'],
    },
    {
      name: 'Chat With PDF',
      category: 'REACT · AI · PRODUCTIVITY',
      accent: '#ff4baf',
      emoji: '📄',
      description:
        'A production-style document assistant: upload PDFs, extract text with PDF.js, and chat with the content through a split workspace—viewer on one side, streaming answers on the other. Sessions persist in IndexedDB so returning users can pick up where they left off, with drag-and-drop uploads and clear loading states for large files.',
      highlights: [
        'Groq API (openai/gpt-oss-120b) for low-latency Q&A over extracted text',
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
      category: 'AI · APIs · FRONTEND',
      accent: '#c4a7e7',
      emoji: '🖼️',
      description:
        'A vanilla JavaScript front end over the Hugging Face inference API: prompt box, history-friendly requests, modal image previews, and lightweight caching so repeat prompts feel instant. Intentionally simple UI with progressive enhancement and accessible controls.',
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
      name: 'Weather App',
      category: 'SPA · WEATHER API',
      accent: '#2dd4bf',
      emoji: '🌤️',
      description:
        'A single-page weather experience focused on clarity: search by city, show temperature, humidity, wind, and conditions at a glance, and adapt layout cleanly from phone to desktop.',
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
        'Peteye is a React dashboard for pet owners and clinics: health timelines, monitoring widgets, and workflows optimized for repeated daily use.',
      highlights: [
        'React + Tailwind + Redux for scalable feature growth',
        'Role-style views for owners vs staff',
        'Production deployment with emphasis on performance and UX polish',
      ] as const,
      liveUrl: 'https://peteye.pet/',
      githubUrl: 'https://peteye.pet/',
      tech: ['React', 'Tailwind CSS', 'Redux', 'JavaScript'],
    },
  ] as const,

  skillsSubtitle: '{ "focus": "full_stack_web_dev", "ui": "react_next_tailwind_mantine", "backend": "python_fastapi_sql" }',
  skillCategories: [
    {
      title: 'FRONTEND',
      items: [
        { name: 'ReactJS', pct: 95, color: '#32CD32' },
        { name: 'Next.js', pct: 90, color: '#9932CC' },
        { name: 'TypeScript', pct: 88, color: '#1E90FF' },
        { name: 'JavaScript', pct: 92, color: '#FFD700' },
        { name: 'HTML5 & CSS3', pct: 95, color: '#FF8C00' },
        { name: 'Redux', pct: 85, color: '#FF1493' },
        { name: 'Tailwind CSS', pct: 92, color: '#1E90FF' },
        { name: 'Mantine UI', pct: 82, color: '#00CED1' },
        { name: 'Micro Frontend Architecture', pct: 88, color: '#FF00FF' },
        { name: 'Responsive Web Design', pct: 95, color: '#32CD32' },
      ],
    },
    {
      title: 'BACKEND & APIS',
      items: [
        { name: 'Python', pct: 80, color: '#FFD700' },
        { name: 'FastAPI', pct: 80, color: '#00CED1' },
        { name: 'REST APIs & Integration', pct: 90, color: '#1E90FF' },
      ],
    },
    {
      title: 'DATABASES',
      items: [
        { name: 'SQL', pct: 78, color: '#32CD32' },
        { name: 'PostgreSQL', pct: 78, color: '#1E90FF' },
        { name: 'MySQL', pct: 75, color: '#FF8C00' },
        { name: 'MongoDB', pct: 78, color: '#32CD32' },
      ],
    },
    {
      title: 'ENGINEERING & TOOLING',
      items: [
        { name: 'Git & GitHub', pct: 92, color: '#9932CC' },
        { name: 'CI/CD Workflows', pct: 82, color: '#FF00FF' },
        { name: 'Performance Optimization', pct: 88, color: '#00CED1' },
        { name: 'Lazy Loading & Code Splitting', pct: 85, color: '#FF1493' },
        { name: 'Agile / Scrum', pct: 88, color: '#FF8C00' },
        { name: 'Figma', pct: 85, color: '#1E90FF' },
      ],
    },
  ] as const,
  alsoFamiliar: ['Micro Frontend Architecture', 'Lazy Loading & Code Splitting', 'Groq API', 'IndexedDB', 'PDF.js', 'Figma', 'Agile / Scrum', 'Edyoda LMS Certifications'],

  experienceComment: '// experience.ts — professional journey',
  experienceInterface: 'interface Career extends Timeline {}',
  experience: [
    {
      period: 'May 2025 — Present',
      title: 'Front-End Developer',
      company: 'SignalX',
      location: 'Hyderabad, India',
      description:
        'Develop dynamic, responsive, and high-performance web interfaces using ReactJS, Next.js, TypeScript, JavaScript, HTML, and CSS. Implement Micro Frontend architecture to build modular applications and support independent development and deployment of modules. Build reusable UI components using Mantine UI. Integrate REST APIs and contribute to backend development using Python and FastAPI. Work with SQL and databases including PostgreSQL, MySQL, and MongoDB. Optimize performance through lazy loading and code splitting.',
      tags: ['ReactJS', 'Next.js', 'TypeScript', 'Mantine UI', 'Micro Frontends', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Git / CI/CD'],
    },
    {
      period: 'Jan 2024 — Apr 2025',
      title: 'Front-End Developer',
      company: 'KR PETEYE LLP',
      location: 'Hyderabad, India',
      description:
        'Engineered responsive web applications optimized for desktop and mobile devices using ReactJS, JavaScript, HTML, CSS, and Tailwind CSS. Built interactive and reusable UI components improving consistency and maintainability. Designed data management workflows and contributed to e-commerce platform development. Collaborated with designers using Figma to convert high-fidelity designs into pixel-accurate functional web interfaces.',
      tags: ['ReactJS', 'JavaScript', 'Tailwind CSS', 'Figma', 'REST APIs', 'E-commerce', 'Git'],
    },
    {
      period: 'Dec 2021 — May 2023',
      title: 'Project Engineer',
      company: 'Wipro Ltd.',
      location: 'Hyderabad, India',
      description:
        'Developed dynamic and responsive user interfaces using HTML, CSS, JavaScript, and ReactJS across web applications. Engineered modular and reusable UI components to streamline development and maintain design consistency. Collaborated with cross-functional teams, designers, and backend developers in Agile development practices including stand-ups, sprint planning, and retrospectives.',
      tags: ['ReactJS', 'JavaScript', 'HTML5', 'CSS3', 'Agile', 'Git'],
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
        line: 'linkedin.com/in/mohit-kuril-84884926b',
        href: 'https://www.linkedin.com/in/mohit-kuril-84884926b',
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
    web3FormsAccessKey: '8cb6341f-acc1-44c6-92c9-da901434f9ee',
    formNote: '// Powered by Web3Forms (lands directly in my inbox) :p',
  },

  readme: {
    headline: 'Mohit Kuril',
    subline: 'Software Engineer | Full Stack Developer · Hyderabad, India',
    /** Outline-style badges (accent = border / label tint) */
    badgeStack: [
      { label: 'React', accent: 'blue' as const },
      { label: 'Next.js', accent: 'cyan' as const },
      { label: 'TypeScript', accent: 'blue' as const },
      { label: 'Python', accent: 'yellow' as const },
      { label: 'FastAPI', accent: 'teal' as const },
      { label: 'Tailwind', accent: 'teal' as const },
      { label: 'Mantine', accent: 'pink' as const },
    ] as const,
    /** Pill next to tech badges — downloads PDF from /public */
    showResumeButton: true as const,
    aboutTitle: '💜 About',
    aboutParagraphs: [
      `Hi — Mohit here! I'm a Software Engineer & Full Stack Developer with ${expYears} years of experience building dynamic, responsive, and scalable web applications. Strong frontend foundation in ReactJS, Next.js, TypeScript, JavaScript, Redux, Tailwind CSS, Mantine UI, and Micro Frontend architecture, with hands-on experience integrating REST APIs and developing backend services using Python and FastAPI. Experienced with SQL, PostgreSQL, MySQL, and MongoDB, Git, CI/CD workflows, performance optimization, and translating Figma designs into production-ready interfaces. Focused on clean code, maintainable architecture, and responsive UX.`,
    ] as const,
    highlights: [
      { icon: '🔭', text: 'Building **scalable UIs & backend services** at SignalX using Next.js, TypeScript, Mantine UI, Micro Frontends, Python, & FastAPI.' },
      { icon: '⚡', text: 'Strong expertise in **ReactJS**, **Next.js**, **TypeScript**, **Redux**, Tailwind CSS, REST APIs, & SQL/MongoDB databases.' },
      { icon: '✨', text: 'Portfolio highlights: **Integrate Leads**, **Rudransh & Co.**, **Chat with PDF**, **React Dashboard**, **Text-to-Image**, & **Peteye**.' },
      { icon: '📬', text: 'Open to full-stack & frontend engineering roles—reach out via **Contact** or links below.' },
    ] as const,
    stackTitle: 'Stack',
    stackGroups: [
      { title: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3', 'SQL'] as const },
      { title: 'Frontend', items: ['ReactJS', 'Next.js', 'Redux', 'Tailwind CSS', 'Mantine UI', 'Micro Frontends'] as const },
      { title: 'Backend & Data', items: ['FastAPI', 'REST APIs', 'PostgreSQL', 'MySQL', 'MongoDB'] as const },
      { title: 'Tooling & Engineering', items: ['Git', 'GitHub', 'CI/CD Workflows', 'Performance Optimization', 'Figma', 'Agile / Scrum'] as const },
    ] as const,
    connectTitle: 'Connect',
    connectLines: [
      { label: 'Email', value: 'mohitkuril5@gmail.com', href: 'mailto:mohitkuril5@gmail.com' },
      { label: 'LinkedIn', value: 'mohit-kuril-84884926b', href: 'https://www.linkedin.com/in/mohit-kuril-84884926b' },
      { label: 'GitHub', value: 'Mohitkuril', href: 'https://github.com/Mohitkuril' },
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
      'Ask about full-stack projects, Python/FastAPI backend work, micro frontends, experience (SignalX, KR PETEYE, Wipro), or stack details.',
    prompts: [
      'Tell me about Mohit',
      'What is Mohit\'s experience?',
      'What projects has Mohit built?',
      "What is Mohit\'s tech stack?",
      'How do I contact Mohit?',
      'Where can I download the resume?',
    ] as const,
    signInStatusLines: [
      'Copilot is signing in…',
      'Pulling resume from the workspace…',
      'Extracting PDF text…',
      'Indexing résumé for Groq…',
      'Almost ready…',
    ] as const,
    inputPlaceholder: 'Ask about projects, experience, skills…',
    msgsLeftLabel: '0 msgs left',
    footerDisclaimer: 'AI can make mistakes · Contact Mohit directly for important info',
  },
} as const

export type SiteConfig = typeof siteConfig
