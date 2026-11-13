import type { ServiceItem, ProcessStep, PortfolioItem, FAQItem } from '../types'

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
      'Milestone-based project agreement',
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
      'Role-based user onboarding, video runbooks, agreed credential/code handover, and ongoing SLA-backed support.',
    deliverables: [
      'Agreed credential & code handover per contract',
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
    diagramNodes: [
      {
        step: '01',
        name: 'Enquiry Intake',
        role: 'Ingestion Layer',
        componentType: 'trigger',
        status: 'implemented',
        description: 'Multi-channel webhooks and enquiry form capture normalized into standard lead payloads.',
      },
      {
        step: '02',
        name: 'Tenant RBAC & Validation',
        role: 'Security Gateway',
        componentType: 'validation',
        status: 'implemented',
        description: 'Tenant isolation boundary checking role permissions, domain validity, and data integrity.',
      },
      {
        step: '03',
        name: 'Lead-to-Delivery Engine',
        role: 'Core Orchestrator',
        componentType: 'orchestration',
        status: 'implemented',
        description: 'Automated stage advancement rules routing qualified prospects directly into client workspaces.',
      },
      {
        step: '04',
        name: 'Task & Document Workflows',
        role: 'Execution Modules',
        componentType: 'storage',
        status: 'conceptual',
        description: 'Interactive onboarding checklists, document exchange links, and milestone task tracking.',
      },
      {
        step: '05',
        name: 'Executive Telemetry & Reporting',
        role: 'Visibility Layer',
        componentType: 'notification',
        status: 'conceptual',
        description: 'Real-time pipeline velocity, project health indicators, and operational audit trail exports.',
      },
    ],
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
    diagramNodes: [
      {
        step: '01',
        name: 'Form / Webhook',
        role: 'Inbound Trigger',
        componentType: 'trigger',
        status: 'implemented',
        description: 'Captures incoming lead payloads from website contact forms, ad endpoints, or landing pages.',
      },
      {
        step: '02',
        name: 'Validation & Deduplication',
        role: 'Sanitization Node',
        componentType: 'validation',
        status: 'implemented',
        description: 'Verifies email RFC syntax, validates corporate domains, and blocks duplicate entries.',
      },
      {
        step: '03',
        name: 'Automation Workflow',
        role: 'n8n Engine',
        componentType: 'orchestration',
        status: 'implemented',
        description: 'Conditional routing logic classifying leads based on budget tiers, industry, and priority.',
      },
      {
        step: '04',
        name: 'Database / Spreadsheet',
        role: 'Persistent Storage',
        componentType: 'storage',
        status: 'implemented',
        description: 'Stores clean, structured records into PostgreSQL or central team Google Sheets.',
      },
      {
        step: '05',
        name: 'Email Notification',
        role: 'Alert Dispatch',
        componentType: 'notification',
        status: 'implemented',
        description: 'Dispatches instant formatted briefing emails and Slack/WhatsApp notifications to team members.',
      },
      {
        step: '06',
        name: 'Lead Follow-up',
        role: 'Execution Action',
        componentType: 'action',
        status: 'conceptual',
        description: 'Automated follow-up scheduling triggers and calendar invitation dispatch to prospects.',
      },
    ],
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
    diagramNodes: [
      {
        step: '01',
        name: 'User Query',
        role: 'Conversational Input',
        componentType: 'trigger',
        status: 'implemented',
        description: 'Receives user inquiries through website chat widgets, customer portals, or support inboxes.',
      },
      {
        step: '02',
        name: 'Knowledge Retrieval',
        role: 'RAG Search Engine',
        componentType: 'orchestration',
        status: 'implemented',
        description: 'Performs semantic similarity search over verified company documentation using pgvector chunks.',
      },
      {
        step: '03',
        name: 'AI Response Generation',
        role: 'Bounded LLM Prompting',
        componentType: 'action',
        status: 'implemented',
        description: 'Drafts accurate, contextual answers strictly restricted to retrieved source documents with citations.',
      },
      {
        step: '04',
        name: 'Confidence & Fallback Check',
        role: 'Guardrail Engine',
        componentType: 'validation',
        status: 'implemented',
        description: 'Evaluates answer confidence; declines off-topic questions or unverified assumptions deterministically.',
      },
      {
        step: '05',
        name: 'Human Escalation',
        role: 'Handoff Protocol',
        componentType: 'notification',
        status: 'conceptual',
        description: 'Packages chat transcripts into prioritized support tickets and notifies human team engineers.',
      },
    ],
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
    diagramNodes: [
      {
        step: '01',
        name: 'Business Dataset',
        role: 'Raw Data Source',
        componentType: 'trigger',
        status: 'implemented',
        description: 'Ingests periodic CSV exports, SQL database replicas, or accounting exports.',
      },
      {
        step: '02',
        name: 'Data Cleaning',
        role: 'Normalization Layer',
        componentType: 'validation',
        status: 'implemented',
        description: 'Strips anomalies, handles missing fields, sanitizes timestamps, and aligns fiscal calendars.',
      },
      {
        step: '03',
        name: 'Transformation',
        role: 'ETL Pipeline',
        componentType: 'orchestration',
        status: 'implemented',
        description: 'Aggregates metrics, calculates conversion ratios, and computes rolling averages.',
      },
      {
        step: '04',
        name: 'Analytics Engine',
        role: 'Computation Core',
        componentType: 'storage',
        status: 'implemented',
        description: 'Models pipeline velocity, team workload balance, and inventory turnover thresholds.',
      },
      {
        step: '05',
        name: 'KPI Dashboard',
        role: 'Visual Presentation',
        componentType: 'action',
        status: 'implemented',
        description: 'Interactive charting with dynamic date filters, breakdown categories, and threshold alerts.',
      },
      {
        step: '06',
        name: 'Business Insights',
        role: 'Decision Output',
        componentType: 'notification',
        status: 'conceptual',
        description: 'One-click executive PDF exports and automated weekly KPI digests for leadership meetings.',
      },
    ],
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
    title: 'Clear Deliverables & Transparent Handover',
    description:
      'You receive complete documentation, architecture runbooks, and defined ownership of credentials and agreed code deliverables as outlined in your project agreement.',
    icon: 'FileCheck',
  },
  {
    title: 'Focus on Measurable Operational Improvement',
    description:
      'We measure success by tangible operational outcomes: manual hours saved, pipeline cycle times compressed, error rates eliminated, and reporting clarity gained.',
    icon: 'TrendingUp',
  },
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'services-overview',
    category: 'Services',
    question: 'What services does Vertiligence AI provide?',
    answer:
      'Vertiligence AI is a technology engineering and digital transformation company. We engineer intelligent business ecosystems combining modular operations software (Vertiligence Operations Hub), AI workflow automation (n8n & API pipelines), operational BI dashboards, domain-grounded conversational assistants, systems integration, and ongoing managed technical support.',
  },
  {
    id: 'custom-software',
    category: 'Services',
    question: 'Can you develop custom software for our business?',
    answer:
      'Yes. While we leverage proven modular patterns—such as our Operations Hub architecture—to accelerate time-to-value, we design and build bespoke automated workflows, custom API connectors, database schemas, and tailored executive web applications engineered to solve your specific operational bottlenecks.',
  },
  {
    id: 'existing-apps-integration',
    category: 'Services',
    question: 'Can you integrate our existing business applications?',
    answer:
      'Yes. We operate with an interoperability-first engineering philosophy. We integrate the tools your team already relies on daily—such as Google Workspace, Slack, PostgreSQL, existing CRMs, ERPs, accounting software, and internal databases—eliminating manual copy-paste handoffs rather than forcing disruptive system replacements.',
  },
  {
    id: 'chatbots-and-automation',
    category: 'Services',
    question: 'Do you provide AI chatbot and workflow automation solutions?',
    answer:
      'Yes. We build resilient multi-step automation pipelines using n8n, secure webhooks, and modern APIs, alongside domain-grounded conversational AI assistants. Our chatbots operate with strict retrieval-augmented generation (RAG) boundaries over verified documentation and include deterministic protocols to escalate complex queries to human staff.',
  },
  {
    id: 'engagement-process',
    category: 'Process & Pricing',
    question: 'How does your project engagement process work?',
    answer:
      'We follow a structured five-phase engineering lifecycle: (1) Diagnose — workflow audit and schema mapping; (2) Design — system architecture blueprint and fixed milestone scope; (3) Implement — modular build and staging migration; (4) Validate — rigorous edge-case, retry, and security testing; and (5) Adopt & Support — role-based onboarding and agreed operational support.',
  },
  {
    id: 'project-cost',
    category: 'Process & Pricing',
    question: 'How much does a typical project cost?',
    answer:
      'Project pricing depends strictly on technical scope, integration complexity, and system scale. We offer indicative starter options for single-workflow automations up to custom multi-system rollouts. Transparent, milestone-based quotes with clear deliverables are provided following our initial technical discovery conversation.',
  },
  {
    id: 'implementation-timeline',
    category: 'Process & Pricing',
    question: 'How long does implementation take?',
    answer:
      'Timelines vary according to project scope. Focused automation pipelines or operational dashboards are typically deployed in 1 to 3 weeks, while comprehensive multi-system integrations or custom platform builds generally span 3 to 6 weeks under agreed milestone schedules.',
  },
  {
    id: 'ip-ownership',
    category: 'Data & Ownership',
    question: 'Who owns the developed software and source code?',
    answer:
      'Ownership terms, licensing arrangements, credential handovers, and source-code transfers are explicitly defined in the mutual project agreement. Upon successful milestone completion and agreed project acceptance, clients receive administrative control and agreed deliverables without proprietary vendor lock-in.',
  },
  {
    id: 'data-privacy',
    category: 'Data & Ownership',
    question: 'How do you handle business data and privacy?',
    answer:
      'Data handling, confidentiality boundaries, and security requirements are discussed, tailored, and agreed upon for each project engagement. We enforce strict data access protocols, tenant-isolated data models, secure credential handling, and a strict policy against unauthorized training of external AI models on client data.',
  },
  {
    id: 'maintenance-support',
    category: 'Process & Pricing',
    question: 'Do you provide maintenance and technical support?',
    answer:
      'Yes. We offer continuous managed operations support packages covering proactive 24/7 pipeline health monitoring, error alerting, third-party API update and token maintenance, periodic health audits, and agreed SLA response commitments to ensure business systems remain dependable.',
  },
  {
    id: 'start-small-expand',
    category: 'Process & Pricing',
    question: 'Can we start with a small project and expand later?',
    answer:
      'Yes. Many of our client relationships start with a focused, high-impact project—such as automating inbound lead processing or consolidating a weekly data reporting bottleneck—before expanding into broader workflow integrations, custom dashboards, or Operations Hub deployments.',
  },
  {
    id: 'startups-and-smbs',
    category: 'Services',
    question: 'Do you work with startups and small businesses?',
    answer:
      'Yes. We frequently partner with growing professional services firms, digital agencies, IT consultancies, and modern startups that need to eliminate repetitive administrative overhead, improve response velocity, and build scalable systems without inflating headcount.',
  },
]

export const STUDIO_DETAILS = {
  brandName: 'Vertiligence AI',
  tagline: 'Intelligence. Automation. Impact.',
  positioning: 'Engineering Intelligent Business Ecosystems.',
  missionStatement:
    'We help growing organizations connect customer operations, internal workflows, and business intelligence through modular software and expert systems integration.',
  targetMarket:
    'Digital agencies, IT services firms, consultancies, and growing modern businesses.',
  email: 'work.vertiligenceai@gmail.com',
  location: 'India (Serving forward-thinking teams globally)',
  companyType: 'Technology Engineering & Digital Transformation',
  githubUrl: 'https://github.com/Viraj-Bankar/vertiligence.ai',
}
