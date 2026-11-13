import type {
  ServiceItem,
  ProcessStep,
  PortfolioItem,
  FAQItem,
  BusinessChallenge,
  EcosystemLayer,
  IndustrySolution,
} from '../types'

export const SERVICES: ServiceItem[] = [
  {
    id: 'custom-software',
    title: 'Custom Business Software Development',
    shortTitle: 'Custom Software',
    tag: 'Core Systems & Portals',
    description:
      'We design and engineer tailored software applications aligned strictly with your company’s unique operational requirements and workflows, avoiding rigid off-the-shelf constraints.',
    capabilities: [
      'Custom business applications & operations portals',
      'CRM & ERP-style business management solutions',
      'Employee, task, and project coordination systems',
      'Inventory, catalog, and order management pipelines',
      'Multi-stage approval & document management systems',
      'Secure administrative & role-based client portals',
    ],
    benefit: 'Software designed around actual business workflows rather than forcing your team into generic SaaS limits.',
    ctaText: 'Discuss Custom Software',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/40',
  },
  {
    id: 'web-development',
    title: 'Website & Digital Experience Development',
    shortTitle: 'Web & Digital Experiences',
    tag: 'Digital Presence & Portals',
    description:
      'Engineered digital experiences, high-performance corporate websites, and accessible client portals that present your company with authority and streamline customer interaction.',
    capabilities: [
      'High-performance corporate websites & digital showcases',
      'Conversion-engineered landing pages & campaign hubs',
      'Self-service customer & stakeholder portals',
      'Interactive booking, reservation & enquiry platforms',
      'Custom modern web applications (React 19 / TypeScript)',
      'Website modernization, architectural redesign & optimization',
    ],
    benefit: 'Professional digital experiences that elevate brand credibility, increase conversion velocity, and improve customer accessibility.',
    ctaText: 'Discuss Web Development',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-950/40',
  },
  {
    id: 'automation',
    title: 'Intelligent Workflow Automation',
    shortTitle: 'Workflow Automation',
    tag: 'n8n & Resilient Pipelines',
    description:
      'Eliminate repetitive manual tasks and connect disparate systems using n8n orchestration, reliable webhooks, and fault-tolerant automation pipelines.',
    capabilities: [
      'n8n orchestration & multi-step workflow pipelines',
      'Repetitive administrative & data entry elimination',
      'Automated email, Slack, and messaging dispatch queues',
      'Inbound document processing & extraction workflows',
      'Multi-department approval & escalation logic',
      'Automated scheduled reporting & webhook triggers',
    ],
    benefit: 'Reduces manual hours, eliminates copy-paste errors, and establishes predictable operational consistency across all departments.',
    ctaText: 'Discuss Workflow Automation',
    badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-950/40',
  },
  {
    id: 'ai-assistants',
    title: 'AI Assistants & Intelligent Support',
    shortTitle: 'AI Assistants',
    tag: 'Domain-Grounded AI',
    description:
      'Deploy conversational AI assistants anchored strictly in verified company knowledge bases, providing 24/7 intelligent support with deterministic human escalation.',
    capabilities: [
      'Website customer support & lead triage assistants',
      'Context-aware customer service & FAQs resolution',
      'Internal team knowledge assistants & operational runbooks',
      'Document question-answering with verified citations',
      'Multilingual customer enquiry handling & translation',
      'Deterministic qualification & seamless human escalation tickets',
    ],
    benefit: 'Makes business information and assistance instantaneously accessible around the clock while safeguarding data confidentiality.',
    ctaText: 'Discuss AI Assistants',
    badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-950/40',
  },
  {
    id: 'system-integration',
    title: 'API & System Integration',
    shortTitle: 'System Integration',
    tag: 'Connected Ecosystems',
    description:
      'Unite isolated applications, databases, and third-party SaaS services into a unified, synchronized business ecosystem with zero data silos.',
    capabilities: [
      'Third-party REST, GraphQL & SOAP API integration',
      'CRM, ERP, and accounting platform synchronization',
      'Relational and cloud database integration (PostgreSQL, SQL)',
      'Payment gateway, invoice, and billing connectivity',
      'Bi-directional automated data synchronization',
      'Legacy application wrappers & webhook event streaming',
    ],
    benefit: 'Connects disconnected software tools into coordinated, real-time workflows so data flows frictionlessly between systems.',
    ctaText: 'Discuss Integration',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/40',
  },
  {
    id: 'analytics',
    title: 'Business Intelligence & Analytics',
    shortTitle: 'BI & Analytics',
    tag: 'Operational BI & Metrics',
    description:
      'Transform operational databases, transaction logs, and spreadsheets into interactive BI dashboards and actionable intelligence for business leadership.',
    capabilities: [
      'Executive business intelligence dashboards & KPI tracking',
      'Power BI and custom interactive web analytics views',
      'Sales conversion velocity & revenue health monitoring',
      'Operational performance, bottleneck & SLA tracking',
      'Automated ETL data cleaning & transformation pipelines',
      'Scheduled leadership summaries & exportable PDF/CSV reports',
    ],
    benefit: 'Converts fragmented business data into dependable, real-time operational insights for rapid, confident decision-making.',
    ctaText: 'Discuss Analytics',
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

export const BUSINESS_CHALLENGES: BusinessChallenge[] = [
  {
    id: 'manual-operations',
    number: '01',
    title: 'Manual & Repetitive Operations',
    challenge:
      'Staff lose productive hours retyping information between systems, compiling weekly reports, and performing manual operational handoffs.',
    solution:
      'Resilient n8n automated pipelines and webhook triggers that handle data entry, document routing, and notifications instantly without error.',
    serviceTarget: 'automation',
    ctaLabel: 'Explore Workflow Automation',
  },
  {
    id: 'disconnected-apps',
    number: '02',
    title: 'Disconnected Business Applications',
    challenge:
      'Crucial operational data is locked across separate spreadsheets, CRMs, billing tools, and email inboxes, creating friction and duplicates.',
    solution:
      'Engineered API integrations and bidirectional synchronization that unify disconnected tools into a coordinated, real-time single source of truth.',
    serviceTarget: 'system-integration',
    ctaLabel: 'Explore System Integration',
  },
  {
    id: 'inefficient-communication',
    number: '03',
    title: 'Inefficient Customer Communication',
    challenge:
      'Prospective clients and customers wait hours for responses, inquiry details get lost, and support teams are overwhelmed by basic FAQs.',
    solution:
      'Domain-grounded AI assistants that qualify leads, resolve customer inquiries from verified documentation 24/7, and escalate complex cases.',
    serviceTarget: 'ai-assistants',
    ctaLabel: 'Explore AI Assistants',
  },
  {
    id: 'limited-visibility',
    number: '04',
    title: 'Limited Visibility into Performance',
    challenge:
      'Business leadership lacks real-time clarity on revenue velocity, delivery bottlenecks, and conversion health, relying on stale reports.',
    solution:
      'Live operational BI dashboards and automated metrics pipelines providing immediate, dependable decision intelligence for leadership.',
    serviceTarget: 'analytics',
    ctaLabel: 'Explore BI & Analytics',
  },
  {
    id: 'outdated-infrastructure',
    number: '05',
    title: 'Outdated Digital Infrastructure',
    challenge:
      'Legacy websites and brittle tooling fail to engage modern clients, load slowly, and cannot support new operational workflows.',
    solution:
      'Modern web platforms, high-performance customer portals, and resilient cloud architectures built on modern React and TypeScript.',
    serviceTarget: 'web-development',
    ctaLabel: 'Explore Web Development',
  },
  {
    id: 'scaling-software',
    number: '06',
    title: 'Scaling Operations Requiring Software',
    challenge:
      'Growing order volume, expanding teams, and complex workflows outgrow off-the-shelf SaaS apps and spreadsheet trackers.',
    solution:
      'Tailored custom business applications designed specifically around your operational processes, data rules, and staff roles.',
    serviceTarget: 'custom-software',
    ctaLabel: 'Explore Custom Software',
  },
]

export const ECOSYSTEM_LAYERS: EcosystemLayer[] = [
  {
    layerNumber: 1,
    title: 'Layer 1 — Digital Experiences',
    subtitle: 'Websites, portals and business interfaces',
    description:
      'The outward and operational touchpoint layer where clients, partners, and internal staff interact with your company.',
    components: [
      'High-Performance Corporate Websites',
      'Self-Service Customer & Stakeholder Portals',
      'Interactive Booking & Enquiry Platforms',
      'Responsive Administrative Web Applications',
    ],
  },
  {
    layerNumber: 2,
    title: 'Layer 2 — Business Applications',
    subtitle: 'Custom software, CRM-style systems and operational platforms',
    description:
      'The core operational engine managing company records, workflows, internal tasks, and business data.',
    components: [
      'Custom Business Applications',
      'Tailored CRM & ERP-Style Systems',
      'Task & Milestone Tracking Workspaces',
      'Inventory, Catalog & Order Processing',
    ],
  },
  {
    layerNumber: 3,
    title: 'Layer 3 — Integration & Automation',
    subtitle: 'APIs, webhooks and workflow automation',
    description:
      'The connective tissue eliminating manual handoffs and ensuring synchronized data exchange across all tools.',
    components: [
      'n8n Orchestration Pipelines',
      'Secure REST & GraphQL API Connectors',
      'Event-Driven Webhook Triggers',
      'Bidirectional Database Synchronization',
    ],
  },
  {
    layerNumber: 4,
    title: 'Layer 4 — Intelligence',
    subtitle: 'AI assistants, document intelligence and analytics',
    description:
      'Grounded intelligence extracting value from documentation, accelerating support, and clarifying business health.',
    components: [
      'Domain-Grounded Conversational AI',
      'Document Question-Answering with Citations',
      'Executive Power BI Dashboards',
      'Real-Time Operational Telemetry & KPI Alerts',
    ],
  },
  {
    layerNumber: 5,
    title: 'Layer 5 — Continuous Improvement',
    subtitle: 'Monitoring, optimization and technical support',
    description:
      'Continuous engineering oversight ensuring all systems stay secure, updated, and aligned with operational growth.',
    components: [
      'Proactive 24/7 Execution Health Monitoring',
      'Third-Party API & Token Maintenance',
      'Performance Optimization & Query Tuning',
      'SLA-Backed Technical Support Packages',
    ],
  },
]

export const PROCESS_AUDIT_POINTS = [
  {
    step: '01',
    title: 'Business Process Assessment',
    description:
      'We examine how your daily work flows, identifying manual data entry, disconnected spreadsheets, and repetitive administrative bottlenecks.',
  },
  {
    step: '02',
    title: 'Technology Gap Identification',
    description:
      'We audit your current software stack to pinpoint redundant tool subscriptions, siloed databases, and fragile integration points.',
  },
  {
    step: '03',
    title: 'Workflow & Friction Analysis',
    description:
      'We map how client inquiries, delivery tasks, and internal approvals travel across teams to isolate delays and preventable friction.',
  },
  {
    step: '04',
    title: 'Digital Transformation Roadmap',
    description:
      'We formulate a pragmatic, phased roadmap prioritizing quick automation wins followed by foundational custom software and BI reporting.',
  },
  {
    step: '05',
    title: 'Implementation Recommendations',
    description:
      'You receive clear architectural specifications, scope estimates, and technical guidance with zero pressure or lock-in.',
  },
]

export const INDUSTRIES_SERVED: IndustrySolution[] = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    summary:
      'Connecting factory floors, supplier coordination, and quality assurance logs into cohesive digital pipelines.',
    examples: [
      'Automated supplier delivery status webhook sync with internal purchase orders',
      'Shop-floor equipment maintenance logging and defect tracking web portal',
    ],
    targetService: 'custom-software',
  },
  {
    id: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    summary:
      'Harmonizing multi-channel sales, inventory counts, and instant customer service without manual re-entry.',
    examples: [
      'Bi-directional stock synchronization between online storefronts and warehouse records',
      'Grounded AI customer assistant answering shipping, policy, and order tracking FAQs',
    ],
    targetService: 'automation',
  },
  {
    id: 'education-training',
    title: 'Education & Training',
    summary:
      'Streamlining learner onboarding, document collection, and automated scheduling communications.',
    examples: [
      'Self-service student enrollment portal with automated verification checklist',
      'Automated batch notification workflows for schedules, assignments, and reminders',
    ],
    targetService: 'web-development',
  },
  {
    id: 'logistics-distribution',
    title: 'Logistics & Distribution',
    summary:
      'Synchronizing dispatch teams, warehouse handoffs, and transit milestone alerts across operations.',
    examples: [
      'Automated dispatch exception alerts triggered from telematics and carrier webhooks',
      'Executive KPI dashboard tracking delivery SLA compliance and fleet turnaround times',
    ],
    targetService: 'analytics',
  },
  {
    id: 'professional-services',
    title: 'Professional Services',
    summary:
      'Empowering consultancies, agencies, and firms with professional client onboarding and reporting.',
    examples: [
      'Dedicated client onboarding portal with stage progression and secure asset collection',
      'Automated project milestone notifications and integrated billing schedule handoffs',
    ],
    targetService: 'custom-software',
  },
  {
    id: 'startups-growing-businesses',
    title: 'Startups & Growing Businesses',
    summary:
      'Building scalable digital foundations that handle expanding operations without inflating headcount.',
    examples: [
      'Full-stack MVP web application development engineered for rapid scale and security',
      'Automated inbound lead triage and enrichment routing high-intent deals to founders',
    ],
    targetService: 'system-integration',
  },
]

export const STUDIO_DETAILS = {
  brandName: 'Vertiligence AI',
  tagline: 'Intelligence. Automation. Impact.',
  positioning: 'Engineering Intelligent Business Ecosystems.',
  missionStatement:
    'We engineer connected digital solutions through custom software, intelligent automation, AI and business intelligence — helping businesses simplify operations, connect systems and make smarter decisions.',
  targetMarket:
    'Growing organizations, digital agencies, modern businesses, and forward-looking enterprises.',
  email: 'work.vertiligenceai@gmail.com',
  location: 'India (Serving forward-thinking teams globally)',
  companyType: 'Technology Engineering & Digital Transformation',
  githubUrl: 'https://github.com/Viraj-Bankar/vertiligence.ai',
}
