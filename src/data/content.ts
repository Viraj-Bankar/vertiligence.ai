import type { ServiceItem, ProcessStep, PortfolioItem } from '../types'

export const SERVICES: ServiceItem[] = [
  {
    id: 'operations-hub',
    title: 'Vertiligence Operations Hub',
    shortTitle: 'Operations Hub',
    tag: 'Flagship Modular Software',
    description:
      'A unified business operations platform managing the complete customer lifecycle from lead capture through client onboarding, delivery tasks, and executive visibility.',
    examples: [
      'Multi-tenant workspace with role-based access control (RBAC)',
      'Lead & contact pipeline with automated stage progression',
      'Client onboarding checklists & document exchange links',
      'Delivery task tracking with milestone accountability',
      'Real-time operational dashboard & audit logging',
    ],
    ctaText: 'Explore Operations Hub',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/40',
  },
  {
    id: 'automation',
    title: 'AI Workflow Automation',
    shortTitle: 'Workflow Automation',
    tag: 'n8n & Resilient Pipelines',
    description:
      'Connect your disconnected business tools and eliminate repetitive manual handoffs using n8n, secure webhooks, and idempotent API workflows.',
    examples: [
      'Cross-system CRM, spreadsheet, and database synchronization',
      'Automated email notifications, follow-up queues & WhatsApp alerts',
      'Form-to-system data validation, sanitization & deduplication',
      'Idempotent error recovery, retry queues & dead-letter alerting',
      'Scheduled health checks & automated operational telemetry',
    ],
    ctaText: 'Discuss Automation',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-950/40',
  },
  {
    id: 'analytics',
    title: 'Operational BI & Dashboards',
    shortTitle: 'BI & Analytics',
    tag: 'Executive Visibility & KPIs',
    description:
      'Convert fragmented spreadsheets and operational databases into clear, real-time KPI dashboards for decisive business leadership.',
    examples: [
      'Lead-to-cash pipeline conversion & revenue velocity reports',
      'Team resource utilization & project delivery performance',
      'Inventory health, turnover alerts & order fulfillment metrics',
      'PostgreSQL, Power BI & custom React web analytics views',
      'Automated weekly executive summaries & PDF/CSV data exports',
    ],
    ctaText: 'Discuss Dashboards',
    badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-950/40',
  },
  {
    id: 'chatbots',
    title: 'Domain-Grounded AI Assistants',
    shortTitle: 'Grounded Assistants',
    tag: 'Grounded Conversational AI',
    description:
      'Deploy intelligent customer and team assistants strictly anchored in verified business documentation with deterministic human escalation protocols.',
    examples: [
      'Website customer enquiry intake & lead qualification',
      'Knowledge-base grounded question answering via RAG',
      'Strict anti-hallucination guardrails & verified citations',
      'Automated triage & seamless human escalation tickets',
      'Comprehensive interaction audit logs & privacy governance',
    ],
    ctaText: 'Discuss AI Assistants',
    badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-950/40',
  },
  {
    id: 'implementation',
    title: 'Systems Integration & Scoped Rollout',
    shortTitle: 'Systems Integration',
    tag: 'Hands-On Engineering',
    description:
      'End-to-end diagnostic audits, target workflow architecture, custom REST/GraphQL connectors, and legacy data migration delivered by senior engineers.',
    examples: [
      'Operational bottleneck diagnosis & tool stack audit',
      'Legacy spreadsheet & database cleanup and schema migration',
      'Custom API connectors bridging legacy and modern SaaS tools',
      'Role-based staff training, documentation & video runbooks',
      'Fixed-cost scoping with transparent milestone acceptance gates',
    ],
    ctaText: 'Discuss Implementation',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/40',
  },
  {
    id: 'managed-support',
    title: 'Managed Operations & SLA Support',
    shortTitle: 'Managed Support',
    tag: 'Proactive Maintenance',
    description:
      'Continuous pipeline monitoring, SLA-backed incident response, API deprecation maintenance, and ongoing workflow optimization.',
    examples: [
      '24/7 workflow execution health monitoring & alerting',
      'Third-party API update, token renewal & deprecation handling',
      'Database performance tuning, integrity checks & secure backups',
      'Quarterly workflow efficiency & cost reviews',
      'Contractual response time guarantees & dedicated engineer contact',
    ],
    ctaText: 'Discuss Managed Support',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-950/40',
  },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    phaseName: 'Phase 01',
    title: 'Diagnose',
    summary:
      'Deep operational audit of your existing tool stack, manual handoffs, data schemas, and costly workflow bottlenecks.',
    deliverables: [
      'Workflow & tool stack audit',
      'Data contract & schema mapping',
      'Technical feasibility assessment',
    ],
    timeline: '1–3 business days',
  },
  {
    step: '02',
    phaseName: 'Phase 02',
    title: 'Design',
    summary:
      'Define target architecture, data flows, integration contracts, security permissions, and fixed-cost milestone deliverables.',
    deliverables: [
      'System architecture blueprint',
      'Data flow & logic specifications',
      'Fixed-price quote & milestone scope',
    ],
    timeline: '2–4 business days',
  },
  {
    step: '03',
    phaseName: 'Phase 03',
    title: 'Implement',
    summary:
      'Modular engineering of workflows, platform tenant configuration, custom API connectors, and staging environment migration.',
    deliverables: [
      'Tenant workspace & pipeline build',
      'Production-tested API connectors',
      'Client staging environment walkthrough',
    ],
    timeline: '1–3 weeks typical',
  },
  {
    step: '04',
    phaseName: 'Phase 04',
    title: 'Validate',
    summary:
      'Rigorous edge-case testing, permission checks, failure handling drills, and user acceptance sign-off before production.',
    deliverables: [
      'Edge-case & security test suite',
      'Idempotency & retry verification',
      'User acceptance sign-off',
    ],
    timeline: '3–5 business days',
  },
  {
    step: '05',
    phaseName: 'Phase 05',
    title: 'Adopt & Support',
    summary:
      'Role-based user onboarding, video runbooks, 100% credential and code transfer, and ongoing SLA-backed support.',
    deliverables: [
      '100% credential & source ownership transfer',
      'Comprehensive video runbooks & architecture docs',
      'Agreed post-launch warranty & SLA monitoring',
    ],
    timeline: 'Handover & warranty',
  },
]

export const PORTFOLIO_DEMOS: PortfolioItem[] = [
  {
    id: 'operations-hub',
    title: 'Vertiligence Operations Hub',
    category: 'Modular Business Operations Platform',
    badge: 'Flagship Platform Prototype',
    description:
      'An integrated lead-to-delivery operations platform engineered for digital agencies, IT consultancies, and professional services firms. Unifies inbound lead capture, client onboarding checklists, project task tracking, and executive visibility into a single tenant-isolated system.',
    techStack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    pipeline: {
      input: 'Multi-channel enquiry capture (forms, email, API webhooks)',
      processing: 'Tenant-isolated RBAC, automated onboarding triggers, task routing, and audit logging',
      output: 'Unified executive dashboard, real-time milestone tracking, and stakeholder reporting',
    },
    plannedFeatures: [
      'Multi-tenant organization workspaces with strict role-based access control (RBAC)',
      'Client onboarding checklists with automated document collection and stage progression',
      'Delivery task tracking with milestone owners, due dates, and status telemetry',
      'Executive KPI dashboard tracking pipeline conversion, project velocity, and resource utilization',
    ],
  },
  {
    id: 'leadflow',
    title: 'LeadFlow',
    category: 'n8n Lead Management Automation',
    badge: 'Active Pipeline Prototype',
    description:
      'A multi-channel lead ingestion workflow that validates inbound form submissions, verifies company domains, enriches contact details, logs clean entries into a central database, and dispatches prioritized alerts to team channels.',
    techStack: ['n8n', 'Webhooks', 'Google Sheets API', 'Slack API', 'Validation Nodes'],
    pipeline: {
      input: 'Inbound Webhook from website contact form or ad campaigns',
      processing: 'Email syntax check, duplicate deduplication, and conditional routing',
      output: 'Normalized database entry + instant prioritized team notification',
    },
    plannedFeatures: [
      'Configurable lead qualification score based on company size and budget tier',
      'Automatic fallback queuing in case destination API is rate-limited or unavailable',
      'Pre-formatted follow-up notification templates for client sales teams',
    ],
  },
  {
    id: 'faqmate',
    title: 'FAQMate',
    category: 'Domain-Grounded AI Intake Assistant',
    badge: 'Active Conversational Prototype',
    description:
      'A specialized conversational assistant grounded strictly in verified business documentation. It answers high-frequency customer queries, captures qualified contact enquiries, and smoothly escalates unresolved requests to human team members.',
    techStack: ['React', 'TypeScript', 'LangChain', 'FastAPI', 'Retrieval-Augmented Generation'],
    pipeline: {
      input: 'Customer question submitted in website chat widget or support portal',
      processing: 'Document chunk retrieval + strict prompt guardrails against hallucination',
      output: 'Contextual, verified response with source citations or escalation ticket with full transcript',
    },
    plannedFeatures: [
      'Strict knowledge boundary: declines to answer off-topic or unverified questions',
      'In-chat lead collection form triggered when customer asks about custom pricing or enterprise scope',
      'Email / Discord alert generated instantly when a conversation requires human escalation',
    ],
  },
  {
    id: 'insightboard',
    title: 'InsightBoard',
    category: 'Operational BI Analytics Dashboard',
    badge: 'Active Analytics Prototype',
    description:
      'An executive data dashboard built to translate disparate spreadsheets and operational databases into visual, real-time KPI graphs, team utilization, pipeline conversion, and project health alerts for decisive business leadership.',
    techStack: ['React', 'Recharts', 'PostgreSQL', 'CSV Parser', 'Power BI / Custom Web'],
    pipeline: {
      input: 'Periodic data CSV exports or direct PostgreSQL read-replica connection',
      processing: 'Data sanitization, KPI metric aggregation, utilization calculation, and trend modeling',
      output: 'Responsive executive dashboard with dynamic filtering and exportable summaries',
    },
    plannedFeatures: [
      'Pipeline conversion & revenue velocity with breakdown by service offering',
      'Team capacity & delivery health alerts with lead-time estimation',
      'One-click PDF / CSV export for weekly stakeholder meetings',
    ],
  },
]

export const WHY_VERTILIGENCE = [
  {
    title: 'Business Outcomes Before Technology Novelty',
    description:
      'We do not push complex tools, speculative models, or custom code where a simple formula, robust script, or standard workflow is faster, cheaper, and more dependable.',
    icon: 'Target',
  },
  {
    title: 'Product-Led with Expert Implementation',
    description:
      'We combine our modular Vertiligence Operations Hub software with hands-on systems integration so your business systems fit your exact operational workflows from day one.',
    icon: 'Boxes',
  },
  {
    title: 'Interoperability Over Forced Replacement',
    description:
      'We connect the tools your team already relies on daily—Google Workspace, Slack, PostgreSQL, CRMs, and accounting systems—eliminating error-prone manual handoffs.',
    icon: 'Cpu',
  },
  {
    title: 'Secure by Design & Responsible AI',
    description:
      'Tenant-isolated data models, strict retrieval boundaries, human approval for high-impact actions, and full audit logs. Zero unauthorized data scraping or model training.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Full Client Ownership & Transparent Handover',
    description:
      'You receive complete documentation, architecture runbooks, and full ownership of your credentials and code. No vendor lock-in and no opaque intermediaries.',
    icon: 'FileCheck',
  },
  {
    title: 'Focus on Measurable Operational Improvement',
    description:
      'We measure success by tangible operational outcomes: manual hours saved, pipeline cycle times compressed, error rates eliminated, and reporting clarity gained.',
    icon: 'TrendingUp',
  },
]

export const STUDIO_DETAILS = {
  brandName: 'Vertiligence AI',
  tagline: 'Intelligence. Automation. Impact.',
  positioning:
    'Vertiligence AI is an AI-enabled business systems and automation company that helps growing organizations connect customer operations, internal workflows, and business information through an integrated platform and expert implementation.',
  targetMarket:
    'Digital agencies, IT services firms, consultancies, and growing modern businesses.',
  email: 'work.vertiligenceai@gmail.com',
  location: 'India (Serving forward-thinking teams globally)',
  companyType: 'AI-Enabled Business Systems & Automation',
  githubUrl: 'https://github.com/Viraj-Bankar/vertiligence.ai',
}

