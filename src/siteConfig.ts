/**
 * Personalize your portfolio — names, colors, and copy match the reference IDE layout.
 */
export const siteConfig = {
  /** Breadcrumb + palette prefix */
  handle: 'your-handle',
  displayName: 'Your Name',
  /** Split hero title */
  nameFirst: 'Your',
  nameLast: 'Name',
  repoLabel: 'PORTFOLIO',
  portfolioShortTitle: "Your Name's Portfolio",
  branch: 'main',
  themeStatusName: 'Portfolio Dark',

  roleLine: 'Frontend Developer @ YourCompany · Earth 🌍',
  homeComment: '// hello world !! Welcome to my portfolio',
  heroTagline: 'Building polished web experiences 🚀',
  /** Pill badges under hero */
  roleBadges: [
    { label: 'Frontend Developer', tone: 'teal' as const },
    { label: 'UI Engineer', tone: 'pink' as const },
    { label: 'Design Systems', tone: 'blue' as const },
    { label: '@your-github', tone: 'magenta' as const, href: 'https://github.com/your-handle' },
  ],
  /** Home intro — optional `highlight` for cyan accent */
  introSegments: [
    { text: 'I work on ' },
    { text: 'component-driven', highlight: true },
    { text: ' UIs with ' },
    { text: 'React', highlight: true },
    { text: ' and ' },
    { text: 'TypeScript', highlight: true },
    { text: ', focusing on ' },
    { text: 'performance', highlight: true },
    { text: ' and ' },
    { text: 'accessibility', highlight: true },
    { text: ' from prototype to production.' },
  ] as const,

  homeStats: [
    { value: '3+', label: 'YEARS' },
    { value: '10+', label: 'PROJECTS' },
    { value: '∞', label: 'CURIOSITY' },
    { value: '↑', label: 'ALWAYS LEARNING', wide: true as const },
  ],

  socialLinks: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/your-handle', icon: 'github' as const },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle', icon: 'linkedin' as const },
    { id: 'email', label: 'Email', href: 'mailto:you@example.com', icon: 'email' as const },
    { id: 'twitter', label: 'X', href: 'https://x.com/your-handle', icon: 'twitter' as const },
  ],

  resumeFileLabel: 'Your_Name_Resume.pdf',
  resumeUrl: '/resume.pdf',

  about: {
    htmlComment: '<!-- about.html - Your Name -->',
    subtitleComment: '// who I am . what I do . where I build',
    introParts: [
      { text: 'I ship interfaces where ' },
      { text: 'design', highlight: true },
      { text: ', ' },
      { text: 'engineering', highlight: true },
      { text: ', and ' },
      { text: 'DX', highlight: true },
      { text: ' meet — from tokens to production bundles.' },
    ] as const,
    focusTitle: 'CURRENT FOCUS',
    focusItems: [
      { emoji: '✈️', text: 'Design systems & scalable UI architecture.' },
      { emoji: '🤖', text: 'Human-in-the-loop tooling for product teams.' },
      { emoji: '💡', text: 'Teaching patterns that survive refactors.' },
      { emoji: '🧩', text: 'Bridging Figma specs and resilient components.' },
    ] as const,
    educationTitle: 'EDUCATION',
    education: [
      {
        school: 'Your University',
        detail: 'B.S. Computer Science · GPA 3.8',
        years: '2018 — 2022',
      },
      {
        school: 'Your High School',
        detail: 'Science · 92%',
        years: '2016 — 2018',
      },
    ] as const,
  },

  projectsHeader: "// projects.js : things I've built & shipped",
  projectsConst: 'const projects = [ ...shipped, ...building ]',
  projects: [
    {
      name: 'Design system hub',
      category: 'FRONTEND • DESIGN SYSTEMS • PRODUCT',
      emoji: '🎨',
      description: 'Tokens, primitives, and Storybook docs adopted by three squads.',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      tech: ['React', 'TypeScript', 'Storybook', 'Vite'],
    },
    {
      name: 'Realtime ops dashboard',
      category: 'FULL STACK • DATA • INTERNAL TOOLS',
      emoji: '📊',
      description: 'WebSocket-backed dashboard with optimistic UI and role-aware layouts.',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      tech: ['Next.js', 'TanStack Query', 'Node', 'Postgres'],
    },
    {
      name: 'Marketing site relaunch',
      category: 'WEB • CONTENT • SEO',
      emoji: '🚀',
      description: 'MDX-driven pages, static generation, and incremental adoption path.',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      tech: ['Next.js', 'MDX', 'Tailwind', 'Vercel'],
    },
    {
      name: 'Accessibility audit kit',
      category: 'OSS • A11Y • CI',
      emoji: '♿',
      description: 'Playwright checks and eslint rules bundled for CI pipelines.',
      liveUrl: '',
      githubUrl: 'https://github.com',
      tech: ['Playwright', 'ESLint', 'TypeScript'],
    },
  ] as const,

  skillsSubtitle: '{ "status": "always_learning", "passion": "immeasurable" }',
  skillCategories: [
    {
      title: 'LANGUAGES',
      items: [
        { name: 'TypeScript', pct: 94, color: '#569cd6' },
        { name: 'JavaScript', pct: 88, color: '#ce9178' },
        { name: 'HTML', pct: 90, color: '#e37933' },
        { name: 'CSS', pct: 92, color: '#519aba' },
      ],
    },
    {
      title: 'FRAMEWORKS',
      items: [
        { name: 'React', pct: 92, color: '#4ec9b0' },
        { name: 'Next.js', pct: 85, color: '#f0f0f0' },
        { name: 'Vite', pct: 88, color: '#646cff' },
      ],
    },
    {
      title: 'STYLING & UI',
      items: [
        { name: 'Tailwind CSS', pct: 90, color: '#38bdf8' },
        { name: 'CSS Modules', pct: 86, color: '#c586c0' },
        { name: 'Framer Motion', pct: 72, color: '#ff79c6' },
      ],
    },
    {
      title: 'TESTING & TOOLING',
      items: [
        { name: 'Vitest', pct: 82, color: '#fbc02d' },
        { name: 'Playwright', pct: 78, color: '#4ade80' },
        { name: 'ESLint / Prettier', pct: 95, color: '#7c4dff' },
      ],
    },
  ] as const,
  alsoFamiliar: ['GraphQL', 'Zustand', 'TanStack Query', 'Docker', 'Figma', 'Webpack'],

  experienceComment: '// experience.ts - professional journey',
  experienceInterface: 'interface Career extends Timeline {}',
  experience: [
    {
      period: '2024 — Present',
      title: 'Senior Frontend Engineer',
      company: 'Example Labs',
      description: 'Owns web platform architecture, design tokens, and performance budgets.',
      tags: ['React', 'TypeScript', 'Next.js'],
    },
    {
      period: '2021 — 2024',
      title: 'Frontend Developer',
      company: 'Previous Co',
      description: 'Shipped customer dashboards and internal admin tools with strong a11y.',
      tags: ['React', 'Redux', 'Jest'],
    },
  ] as const,

  contact: {
    headerComment: "/* contact.css - let's build something */",
    subComment: '// open to work, collabs & good conversations',
    findTitle: 'FIND ME ON',
    sendTitle: 'SEND A MESSAGE',
    channels: [
      { id: 'email', title: 'EMAIL', line: 'you@example.com', href: 'mailto:you@example.com', accent: 'green' as const },
      { id: 'linkedin', title: 'LINKEDIN', line: '/in/your-handle', href: 'https://www.linkedin.com/in/your-handle', accent: 'blue' as const },
      { id: 'github', title: 'GITHUB', line: '@your-handle', href: 'https://github.com/your-handle', accent: 'purple' as const },
    ] as const,
    /** Set your Formspree form URL, e.g. https://formspree.io/f/xyz */
    formspreeAction: '',
    formNote: '// Powered by Formspree (lands directly in my inbox) :p',
  },

  readme: {
    headline: 'Your Name',
    subline: 'Frontend Developer @ YourCompany · Remote 🌐',
    badgeStack: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Vite'],
    aboutTitle: '💜 About',
    aboutColumns: [
      'I build interfaces that feel fast, intentional, and maintainable. I enjoy pairing with design to translate systems into code.',
      'I care about accessibility, bundle size, and clear documentation so teams can move confidently.',
    ] as const,
    highlights: [
      { icon: '🚀', text: 'Shipping scalable UI architecture and reusable primitives.' },
      { icon: '🔐', text: 'Performance, security headers, and resilient data fetching.' },
      { icon: '⚡', text: 'DX: linting, testing, and CI that keep main green.' },
    ] as const,
    stackTitle: 'Stack',
    stackGroups: [
      { title: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] as const },
      { title: 'Frontend', items: ['React', 'Next.js', 'Vite', 'Tailwind'] as const },
      { title: 'Tooling', items: ['Git', 'pnpm', 'Vitest', 'Playwright'] as const },
    ] as const,
    connectTitle: 'Connect',
    connectLines: [
      { label: 'Email', value: 'you@example.com', href: 'mailto:you@example.com' },
      { label: 'GitHub', value: '@your-handle', href: 'https://github.com/your-handle' },
      { label: 'LinkedIn', value: '/in/your-handle', href: 'https://www.linkedin.com/in/your-handle' },
    ] as const,
    footer: 'Made with 🤍 by Your Name · 2026',
  },

  copilot: {
    panelTitle: "Your Name's AI Assistant",
    shortName: "Your Name's Copilot",
    /** Sidebar widget — two lines like the reference */
    explorerLine1: "Your Name's",
    explorerLine2: 'Copilot',
    greeting: "Hi! I'm Your Name's Copilot 👋",
    intro:
      'Ask me anything about projects, skills, experience, or achievements. I keep answers short and point you to the right file.',
    prompts: [
      'Tell me about you?',
      'What projects have you built?',
      'Tell me about your work experience',
      "What's your tech stack?",
      'How can I contact you?',
      'How can I support you?',
    ] as const,
    inputPlaceholder: 'Ask about projects, experience, skills…',
    msgsLeftLabel: '0 msgs left',
    footerDisclaimer: 'AI can make mistakes · Contact me directly for important info',
  },
} as const

export type SiteConfig = typeof siteConfig
