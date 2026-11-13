import type { ServiceItem, ProcessStep, PortfolioItem } from '../types'


export const SERVICES: ServiceItem[] = [
  {
    id: 'automation',
    title: 'AI Workflow Automation',
    shortTitle: 'Workflow Automation',
    tag: 'n8n & Custom Integrations',
    description: 'Connect your tools and automate repetitive tasks using n8n, APIs, and reliable workflow design.',
    examples: [
      'Form-to-spreadsheet workflows',
      'Email notifications and follow-up reminders',
      'Data synchronization across business apps',
      'Scheduled reporting and health checks',
      'Custom API and webhook integrations',
    ],
    ctaText: 'Discuss Automation',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/40',
  },
  {
    id: 'dashboard',
    title: 'Business Intelligence Dashboards',
    shortTitle: 'BI & Analytics',
    tag: 'Data Visualization & Insights',
    description: 'Turn business data into understandable dashboards and actionable insights.',
    examples: [
      'Sales and revenue performance dashboards',
      'Inventory reporting and turnover tracking',
      'Executive KPI tracking and operational metrics',
      'Excel and CSV data cleaning and analysis',
      'Power BI or custom web-based dashboards',
    ],
    ctaText: 'Discuss a Dashboard',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-950/40',
  },
  {
    id: 'chatbot',
    title: 'AI Chatbot Development',
    shortTitle: 'Intelligent Chatbots',
    tag: 'Grounded Conversational AI',
    description: 'Build helpful AI assistants that answer approved questions, collect enquiries, and hand off complex requests to people.',
    examples: [
      'Website FAQ and conversational intake chatbots',
      'Automated lead collection and qualification',
      'Knowledge-base grounded question answering',
      'Customer support triage and assistance',
      'Seamless human escalation protocols',
    ],
    ctaText: 'Discuss a Chatbot',
    badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-950/40',
  },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    summary: 'Understand the business problem, existing tool stack, and repetitive operational bottlenecks.',
    deliverables: [
      'Workflow & tool audit',
      'Data source mapping',
      'Feasibility assessment',
    ],
    timeline: '1–3 business days',
  },
  {
    step: '02',
    title: 'Design',
    summary: 'Define the scope, architectural solution, data contracts, and realistic project milestones.',
    deliverables: [
      'Clear project specification',
      'Logic flowchart / dashboard mock',
      'Fixed cost & timeline quote',
    ],
    timeline: '2–4 business days',
  },
  {
    step: '03',
    title: 'Build',
    summary: 'Develop, connect, and thoroughly test the automation pipelines, dashboards, or AI assistants.',
    deliverables: [
      'Production-tested implementation',
      'Edge-case error handling',
      'Client staging walkthrough',
    ],
    timeline: '1–3 weeks typical',
  },
  {
    step: '04',
    title: 'Deploy',
    summary: 'Hand over full documentation, transfer credentials/ownership, and provide agreed support.',
    deliverables: [
      '100% credential & code transfer',
      'Video runbook & documentation',
      'Agreed post-launch support',
    ],
    timeline: 'Handover & warranty',
  },
]

export const PORTFOLIO_DEMOS: PortfolioItem[] = [
  {
    id: 'leadflow',
    title: 'LeadFlow',
    category: 'n8n Lead Management Automation',
    badge: 'Portfolio demo in development',
    description:
      'A multi-channel lead ingestion workflow that validates inbound form submissions, verifies company domains, enriches contact details, logs clean entries into a central spreadsheet, and dispatches instant alerts to team channels.',
    techStack: ['n8n', 'Webhooks', 'Google Sheets API', 'Slack / WhatsApp API', 'Validation Nodes'],
    pipeline: {
      input: 'Inbound Webhook from website contact form or ad campaigns',
      processing: 'Email syntax check, duplicate deduplication, and conditional routing',
      output: 'Normalized Google Sheet entry + instant prioritized team notification',
    },
    plannedFeatures: [
      'Configurable lead qualification score based on company size and budget',
      'Automatic fallback queuing in case destination spreadsheet API is rate-limited',
      'Pre-formatted follow-up notification templates for client sales teams',
    ],
  },
  {
    id: 'faqmate',
    title: 'FAQMate',
    category: 'AI FAQ & Customer Intake Chatbot',
    badge: 'Portfolio demo in development',
    description:
      'A specialized conversational assistant grounded strictly in verified business documentation. It answers high-frequency customer queries, captures qualified contact enquiries, and smoothly escalates unresolved requests to human team members.',
    techStack: ['React', 'TypeScript', 'LangChain', 'FastAPI', 'Retrieval-Augmented Generation'],
    pipeline: {
      input: 'Customer question submitted in website chat widget',
      processing: 'Document chunk retrieval + strict prompt guardrails against hallucination',
      output: 'Contextual, verified response or clean escalation ticket with chat transcript',
    },
    plannedFeatures: [
      'Strict knowledge boundary: declines to answer off-topic or unverified topics',
      'In-chat lead collection form triggered when customer asks about custom pricing',
      'Email / Discord alert generated when a conversation requires human escalation',
    ],
  },
  {
    id: 'insightboard',
    title: 'InsightBoard',
    category: 'Business Intelligence Dashboard',
    badge: 'Portfolio demo in development',
    description:
      'An executive data dashboard built to translate disparate Excel sheets and operational databases into visual, real-time KPI graphs, revenue trends, and inventory health alerts for decisive business leadership.',
    techStack: ['React', 'Recharts', 'PostgreSQL', 'CSV Parser', 'Power BI / Custom Web'],
    pipeline: {
      input: 'Weekly sales CSV exports or direct PostgreSQL read-replica connection',
      processing: 'Data sanitization, KPI metric aggregation, and trend calculations',
      output: 'Responsive executive dashboard with dynamic filtering and exportable summaries',
    },
    plannedFeatures: [
      'Revenue month-over-month trajectory with breakdown by product category',
      'Low-stock inventory alert threshold with lead-time estimation',
      'One-click PDF / CSV export for weekly stakeholder meetings',
    ],
  },
]

export const WHY_VERTILIGENCE = [
  {
    title: 'Designed Around Real Business Needs',
    description:
      'We do not push complex tools or AI models where a straightforward script or simple formula is faster, cheaper, and more reliable.',
    icon: 'Target',
  },
  {
    title: 'Clear Project Scope & Communication',
    description:
      'You collaborate directly with engineers who understand the technical details. No account manager telephone games or vague estimates.',
    icon: 'MessageSquareCheck',
  },
  {
    title: 'Practical Integrations',
    description:
      'We build around the tools your team already relies on daily—Google Workspace, Excel, Slack, Notion, CRMs, and relational databases.',
    icon: 'Boxes',
  },
  {
    title: 'Transparent Handover & Documentation',
    description:
      'You receive complete documentation, architecture diagrams, and full ownership of your credentials and code upon project completion.',
    icon: 'FileCheck',
  },
  {
    title: 'Focus on Measurable Outcomes',
    description:
      'We gauge our work by tangible business impact: hours of manual entry eliminated, turnaround times reduced, and clarity gained.',
    icon: 'TrendingUp',
  },
]

export const STUDIO_DETAILS = {
  brandName: 'Vertiligence AI',
  tagline: 'Intelligence. Automation. Impact.',
  positioning:
    'We help businesses simplify repetitive operations, understand their data, and improve customer engagement through practical AI automation, business dashboards, and intelligent chatbots.',
  email: 'work.vertiligenceai@gmail.com',
  location: 'India',
  studioType: 'Independent Technology Studio',
  linkedinPlaceholder: 'https://www.linkedin.com/company/vertiligenceai',
}
