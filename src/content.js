const GH = 'https://github.com/hammadiqbal6';

export default {
  site: {
    name: 'Hammad Iqbal',
    badge: 'Full-Stack',
    status: 'Senior Software Engineer · open to freelance & full-time work',
    headline: ['Full-stack developer building', 'web platforms, mobile apps and AI tools.'],
    intro:
      'I build products end to end, from Next.js, React and Vue front ends to Nest.js, Node and Laravel APIs, PostgreSQL and MongoDB data layers and React Native apps. I have been doing it since 2019, for healthcare, creator-economy, e-commerce and logistics products.',
    primaryCta: 'View my work',
    github: GH,
    other: { label: 'CRM portfolio', url: 'https://hammadiqbal6.github.io/crm-portfolio/' },
    facts: [
      { label: 'Building software since', value: '2019' },
      { label: 'Currently', value: 'Senior SE, Rolustech' },
      { label: 'Education', value: 'BS CS, FAST-NUCES' },
      { label: 'Based in', value: 'Pakistan' },
    ],
  },
  nav: [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ],
  about: {
    title: 'Product-minded engineer across the whole stack.',
    paragraphs: [
      "I'm a senior software engineer at Rolustech. I work on client products across the stack: responsive UIs, microservices, GraphQL and REST APIs, payment flows, deployments and the tooling that keeps a team shipping.",
      'Before that I spent four years at Dijital Brains building an e-commerce platform from the landing page to the admin panel, and leading its deployments and code reviews. Lately I also build AI-assisted developer tools: merge-request analysis, automated QA agents and Model Context Protocol (MCP) servers.',
    ],
    points: [
      'TypeScript-first: Next.js, Nest.js, React, Prisma',
      'Comfortable in PHP and Laravel, Vue and Angular too',
      'Payments, messaging and media integrations',
      'Code reviews, staging/production releases, CI',
    ],
  },
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'Rolustech',
      period: 'May 2023 – Present',
      summary: 'Full-stack work across several client products, plus CRM engineering (see the CRM portfolio).',
      points: [
        'Resilience Labs (mental-health care platform): senior full-stack engineer. Built responsive UI and several microservices for patient and practitioner data, with feature flags to toggle services and databases.',
        'Cohere (a platform for creators to sell and deliver services): maintained the React codebase, added features and pushed code quality and best practices.',
        'Customer portal, React Native app and cargo-tracking platform for a parcel-forwarding e-commerce client (Next.js, NestJS, Prisma).',
        'Internal AI tooling: a merge-request analysis tool, a Redmine-driven QA test agent and MCP servers.',
      ],
      stack: ['Next.js', 'Nest.js', 'Prisma', 'GraphQL', 'TypeScript', 'PostgreSQL', 'React', 'React Native'],
    },
    {
      role: 'Full-Stack Developer',
      company: 'Dijital Brains',
      period: 'Jul 2019 – May 2023',
      summary: 'Core developer on an e-commerce platform for water filtration systems.',
      points: [
        'Built the landing page, customer portal and admin panel. The storefront and portal ran on Vue.js and Laravel; the admin panel on Angular and GraphQL.',
        'Integrated Stripe, Firebase, Telnyx, Wistia and Google Cloud Platform.',
        'Led deployments across staging and production and ran code reviews for the team.',
      ],
      stack: ['Vue.js', 'Laravel', 'Angular', 'GraphQL', 'Stripe', 'Firebase', 'GCP'],
    },
    {
      role: 'BS Computer Science',
      company: 'FAST-NUCES Faisalabad',
      period: '2019',
      points: ['Final-year project and early Android/Java apps (inventory and shopping apps).'],
      stack: ['Java', 'Android'],
    },
  ],
  projectsEyebrow: 'Selected work',
  projectsTitle: 'Case studies',
  projectsNote:
    'Client and company work is described without private code or client names. Numbers come only from git history, my employment record, or project meetings and email; anything unconfirmed is left out.',
  // Case-study shape: role, problem, built (card bullets), architecture (modal), impact, stack.
  // impact: array of { value, label, source: 'VERIFIED' | 'STATED' } or null. Null renders nothing.
  // VERIFIED = counted from git history. STATED = from resume, project meetings, email or owner confirmation.
  projects: [
    {
      title: 'Mental-health care platform',
      context: 'Resilience Labs · via Rolustech',
      category: 'Web platforms',
      role: 'Senior full-stack engineer',
      problem:
        'A care platform connecting patients and practitioners needed responsive patient and practitioner flows, and a backend whose services and databases could be switched on and off without risky redeploys.',
      built: [
        'Responsive UI for patient and practitioner flows',
        'Many microservices for patient and practitioner data',
        'Feature flags to switch services and databases on and off',
        'Delivered a dashboard that pulls variables from the EMR (electronic medical record)',
        'Validated the fix for a staging 502 traced to a recently added flag',
      ],
      architecture: [
        'Next.js front end talking to a GraphQL API',
        'Nest.js microservices with Prisma over PostgreSQL',
      ],
      impact: null, // TODO owner: add metric (owner: no microservice count or duration to be shown)
      stack: ['Next.js', 'Nest.js', 'Prisma', 'GraphQL', 'TypeScript', 'PostgreSQL'],
    },
    {
      title: 'Creator services marketplace',
      context: 'Cohere · via Rolustech',
      category: 'Web platforms',
      role: 'Senior software engineer, React front end',
      problem:
        'A large, long-lived React front end that lets creators sell and deliver services needed steady feature delivery without the codebase degrading.',
      built: [
        'Contributed to service pages, the creator dashboard and messaging',
        'Contributed to lead magnets, account pages and email campaigns and sequences',
        'Contributed to sending-domain verification',
      ],
      architecture: [
        'React + Vite single-page app on Material UI',
        'Stripe for payments, Twilio Conversations for messaging, Sentry for error monitoring',
      ],
      impact: [
        { value: '~1,760', label: 'non-merge commits contributed', source: 'VERIFIED' },
        { value: '~22 mo', label: 'Jun 2024 – Apr 2026', source: 'VERIFIED' },
        { value: '460+', label: 'tickets contributed to', source: 'VERIFIED' },
        { value: '~64k', label: 'lines contributed to a ~490k-line React codebase', source: 'VERIFIED' },
      ],
      stack: ['React', 'Vite', 'Material UI', 'Stripe', 'Twilio Conversations', 'Sentry'],
    },
    {
      title: 'Water-filtration e-commerce platform',
      context: 'Dijital Brains',
      category: 'Web platforms',
      role: 'Full-stack developer, deployment lead',
      problem:
        'A company selling water filtration systems needed its whole online business built: a landing page, a customer portal and an internal admin panel, wired to payments, messaging and media services.',
      built: [
        'Vue.js + Laravel storefront and customer portal',
        'Angular + GraphQL admin panel',
        'Led staging and production deployments and code reviews',
      ],
      architecture: [
        'Laravel back end serving the Vue.js storefront and customer portal',
        'Separate Angular admin panel over a GraphQL API',
        'Integrations: Stripe, Firebase, Telnyx, Wistia and Google Cloud Platform',
      ],
      impact: [
        { value: '~4 yrs', label: 'core developer, Jul 2019 – May 2023', source: 'STATED' },
        { value: '3', label: 'apps: landing page, customer portal, admin panel', source: 'STATED' },
        { value: '5', label: 'third-party integrations', source: 'STATED' },
      ],
      stack: ['Vue.js', 'Laravel', 'Angular', 'GraphQL', 'Stripe', 'Firebase'],
    },
    {
      title: 'Parcel-forwarding customer portal',
      context: 'E-commerce / logistics client · via Rolustech',
      category: 'Web platforms',
      role: 'Primary contributor, senior software engineer',
      problem: 'Shop-and-ship customers needed one place to order, get quotes, pay and track parcels on top of a SuiteCRM back office, and the production CRM was slowing down under heavy queries for warehouse teams in two regions.',
      built: [
        'Order wizards, checkout and payment guard rails',
        'Diagnosed database CPU spikes from queries over ~1.6M-row tables and fixed them with indexing work',
        'Fixed rewards math so CRM, portal and Stripe totals agree',
        'Caught and fixed a critical bug where rewards were burned when checkout opened instead of after payment',
        'Search that tells a pasted product link from a keyword',
        'Session auth, Redis caching and address maps',
      ],
      architecture: [
        'Next.js + TypeScript portal: 47 page routes, 80 API route handlers, 168 React components',
        'Backed by a SuiteCRM 8 API; NextAuth sessions, Redis caching, Leaflet maps',
        'GitLab CI, Husky pre-commit/pre-push and lint-staged (ESLint, Prettier)',
      ],
      impact: [
        { value: '~4 min → <3 s', label: 'slowest production query before; none over 3 s in logs after', source: 'STATED' },
        { value: '~90–95%', label: 'database CPU peaks, stabilized', source: 'STATED' },
        { value: '9.8 GB', label: 'unused database table backed up and removed', source: 'STATED' },
        { value: '249 / 504', label: 'non-merge commits (49%), Nov 2025 – Oct 2026', source: 'VERIFIED' },
        { value: '~47%', label: 'of the current ~75k-line JS/TS codebase', source: 'VERIFIED' },
        { value: '227', label: 'merge requests merged into the repo (of 254)', source: 'VERIFIED' },
        { value: '28 → 300', label: 'rewards applied to a 328 total, now reduced correctly', source: 'STATED' },
        { value: '17 + 19', label: 'staged QA cases run on rewards tickets', source: 'STATED' },
      ], // TODO owner: add customer/order volume if it can be shared
      stack: ['Next.js', 'TypeScript', 'NextAuth', 'Redis', 'Leaflet', 'Tailwind CSS'],
    },
    {
      title: 'Customer mobile app',
      context: 'E-commerce / logistics client · via Rolustech',
      category: 'Mobile',
      role: 'Lead developer (first commit and 85% of commits)',
      problem:
        'The same shop-and-ship customers needed the portal on their phones: sign-in, addresses, rewards, shipments, invoices and payments, ready for store release.',
      built: [
        'OTP-first sign-in with password fallback, tested against an SMS sandbox',
        'Secure token storage with Keychain',
        'Account deletion and store release-readiness work; staging build delivered for testing',
      ],
      architecture: [
        'Bare React Native 0.76 app in TypeScript with 58 screen components',
        'React Navigation, TanStack Query for server state, Zustand for client state',
        'GitLab CI and fastlane lanes; release-readiness report shows security and permissions passed',
      ],
      impact: [
        { value: '58', label: 'screen components', source: 'VERIFIED' },
        { value: '~7 wks', label: '44 of 52 commits (85%), Aug – Sep 2026', source: 'VERIFIED' },
        { value: '92%', label: 'of the current JS/TS code', source: 'VERIFIED' },
        { value: '8 / 8', label: 'merge requests merged', source: 'VERIFIED' },
      ], // TODO owner: confirm store release status; do not claim published (readiness report still blocked on store-console/legal items)
      stack: ['React Native 0.76', 'TypeScript', 'React Navigation', 'TanStack Query', 'Zustand'],
    },
    {
      title: 'Air-cargo tracking platform',
      context: 'Logistics client · via Rolustech',
      category: 'Web platforms',
      role: 'Sole author, design and build',
      problem: 'Public air-waybill lookup across airlines, plus account flows and admin tooling, without ever exposing carrier credentials or air-waybill numbers to the browser.',
      built: [
        'Integrated an airline’s production tracking and subscribe APIs, with a multi-carrier fallback',
        'Carrier timeline mapping, account flows and admin tooling',
        'Deployed to staging on PM2 behind an Apache reverse proxy',
      ],
      architecture: [
        'pnpm monorepo with 5 workspaces: NestJS API, Next.js web, shared contracts, ESLint and tsconfig packages',
        'Official airline API providers server-side; MongoDB TTL tracking cache; 7 Prisma models',
        'Machine-to-machine JWT auth for partner (CRM and portal) access; Docker Compose; GitHub Actions and GitLab CI',
      ],
      impact: [
        { value: '31 / 31', label: 'commits, 100% of 10.5k JS/TS lines', source: 'VERIFIED' },
        { value: '2', label: 'official airline API integrations', source: 'VERIFIED' },
        { value: '~8 wks', label: 'Aug – Sep 2026, with 12 spec test files', source: 'VERIFIED' },
      ], // TODO owner: add shipments tracked per day/month
      stack: ['Next.js', 'shadcn/ui', 'NestJS (Fastify)', 'Prisma', 'MongoDB', 'Docker'],
    },
    {
      title: 'Customer rewards portal',
      context: 'Building-materials client · via Rolustech',
      category: 'Web platforms',
      role: 'Senior software engineer',
      problem: 'Customers and staff needed to manage rewards in one portal, each seeing a view suited to their role.',
      built: [
        'Role-based customer and staff views',
        'Google Places address autocomplete',
        'Axios 401 interceptor, pagination and token fixes',
      ],
      architecture: ['React + Vite with React Router', 'Google Maps/Places API and DataTables', 'Iterated through client change requests'],
      impact: [
        { value: '22 / 43', label: 'non-merge commits (51%), Sep – Dec 2025', source: 'VERIFIED' },
        { value: '23%', label: 'of the current JS/TS code', source: 'VERIFIED' },
      ], // TODO owner: add member/customer count
      stack: ['React', 'Vite', 'React Router', 'Google Maps API', 'DataTables'],
    },
    {
      title: 'Time-log reporting dashboard',
      context: 'Internal tool · Rolustech',
      category: 'AI & dev tools',
      role: 'Sole author',
      problem: 'Time entries lived in two systems, Redmine and Teamwork, so reporting meant stitching exports together by hand.',
      built: [
        'One filterable report per user across Redmine and Teamwork',
        'CORS-safe proxy API routes',
        'Delivered and marked complete',
      ],
      architecture: ['Next.js 16 app with server-side proxy routes to both APIs', 'Zustand state, Recharts visualisations'],
      impact: [
        { value: '2 → 1', label: 'time-tracking platforms unified into one report', source: 'VERIFIED' },
        { value: '~5 h/week', label: 'manual reporting time saved', source: 'STATED' },
        { value: '7.3k', label: 'JS/TS lines, 100% sole author', source: 'VERIFIED' },
      ], // TODO owner: add team size using it
      stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Zustand'],
    },
    {
      title: 'AI merge-request analyst',
      context: 'Internal tool',
      category: 'AI & dev tools',
      role: 'Designer and builder',
      problem: 'Reviewing large merge requests for architecture risk is slow, and code cannot be sent to external AI services.',
      built: [
        'Automated reviews posted on merge-request open/update webhooks',
        'Background jobs with real-time status polling',
        'Branch-level knowledge graph',
      ],
      architecture: [
        '3 apps (api, web, worker) and 5 packages (analyzers, connectors, docs engine, LLM, shared)',
        'Python FastAPI service connected to a local LLM through Ollama, so code stays on the machine',
        'Companion spec for a Bitbucket PR documentation agent that writes reports to Google Docs',
      ],
      impact: [
        { value: '~30–50 s', label: 'per live review, webhook to posted review', source: 'STATED' },
        { value: '~10.6k', label: 'lines of code, sole author', source: 'VERIFIED' },
      ], // TODO owner: add number of MRs reviewed team-wide
      stack: ['Python', 'FastAPI', 'Ollama', 'GitLab API', 'Docker'],
    },
    {
      title: 'Redmine-driven QA test agent',
      context: 'Internal tool',
      category: 'AI & dev tools',
      role: 'Designer and builder (built with AI-assisted development)',
      problem: 'Manual QA of Redmine tasks on staging was repetitive, but letting an agent click around staging needed strong safety rails.',
      built: [
        'Reads Redmine tasks and plans test cases',
        'Drives a browser on staging and writes a PDF report with screenshots',
        'Caught a critical bug where rewards were committed before payment success',
      ],
      architecture: ['Python + Playwright agent backed by LLMs', 'Per-project knowledge packs and memory', 'Action allow-list with approvals for risky clicks'],
      impact: [
        { value: '84', label: 'commits in ~10 days, with 35 test files', source: 'VERIFIED' },
        { value: '7', label: 'recorded staging runs across 2 Redmine tasks', source: 'VERIFIED' },
        { value: '48 h', label: 'scheduler run tested stable', source: 'STATED' },
      ], // TODO owner: add manual QA time saved
      stack: ['Python', 'Playwright', 'LLMs', 'Redmine API'],
    },
    {
      title: 'Agent skills marketplace (contributor)',
      context: 'Internal · Rolustech',
      category: 'AI & dev tools',
      role: 'Contributor',
      problem: 'The team needed reusable, installable agent workflows instead of everyone re-writing prompts.',
      built: ['GitHub stacked pull-request skill', 'Bug-hypothesis diary skill', 'Contributions to a curated skills and subagents catalogue'],
      architecture: ['Markdown skills distributed through a Node CLI for Cursor'],
      impact: null, // TODO owner: add metric (number of skills contributed; git shows 10 non-merge commits, confirm before use)
      stack: ['Markdown', 'Node CLI', 'Cursor'],
    },
    {
      title: 'Fabricator ordering system',
      context: 'Manufacturing client · via Rolustech',
      category: 'Web platforms',
      role: 'Senior software engineer, primary engineer after handover',
      problem: 'A legacy .NET ordering suite still had to ship client tasks safely across its admin, mobile web and PDF services.',
      built: [
        'Delivered client tasks across the ordering suite and its PDF service',
        'About 5.6k lines of C# and 3.9k lines of WebForms markup added',
        'Took over as primary engineer after a knowledge transfer',
      ],
      architecture: ['.NET Framework WebForms with Entity Framework'],
      impact: [
        { value: '17', label: 'client tasks referenced in my commits', source: 'VERIFIED' },
        { value: '66', label: 'commits over 36 active days, Jan – Jul 2026', source: 'VERIFIED' },
        { value: '20', label: 'commits to the PDF service', source: 'VERIFIED' },
      ],
      stack: ['.NET Framework', 'WebForms', 'Entity Framework', 'Playwright'],
    },
    {
      title: 'Visa Agency CRM',
      category: 'Open source',
      role: 'Sole developer',
      problem: 'Visa agencies juggle leads, onboarding, questionnaires, applications and invoices across spreadsheets and email.',
      built: ['Lead approval workflow and secure-token onboarding', 'Role-based access control and questionnaires', 'Visa applications and PDF invoices'],
      architecture: [
        'Laravel 12 API with MySQL and Redis; Next.js 16 + TypeScript front end',
        'Docker Compose stack: app, frontend, nginx, db, redis and mailhog',
      ],
      impact: [
        { value: '15', label: 'Eloquent data models', source: 'VERIFIED' },
        { value: '21', label: 'database migrations', source: 'VERIFIED' },
        { value: '18', label: 'API controllers', source: 'VERIFIED' },
      ],
      stack: ['Laravel 12', 'Next.js 16', 'TypeScript', 'MySQL', 'Redis', 'Docker'],
      repo: `${GH}/fullstack-crm`,
    },
  ],
  skills: [
    { group: 'Languages', items: ['TypeScript', 'JavaScript', 'PHP', 'Python', 'SQL'] },
    { group: 'Front end', items: ['React', 'Next.js', 'Vue.js', 'Angular', 'Redux', 'Tailwind CSS', 'Material UI'] },
    { group: 'Back end', items: ['Node.js', 'Nest.js', 'Express', 'Laravel', 'GraphQL', 'REST', 'FastAPI'] },
    { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'Redis', 'Firebase'] },
    { group: 'Mobile', items: ['React Native'] },
    { group: 'Delivery & tooling', items: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'Docker', 'PM2', 'IIS', 'Jest', 'Playwright', 'Redmine', 'JIRA'] },
  ],
  contact: {
    title: "Let's build something.",
    text: "Have a product to build or a codebase to improve? Reach me through GitHub. Open-source work and source code live there.",
  },
};
