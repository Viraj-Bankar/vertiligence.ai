export type ServiceId =
  | 'custom-software'
  | 'web-development'
  | 'automation'
  | 'ai-assistants'
  | 'system-integration'
  | 'analytics'
  | 'consulting'
  // Backwards compatibility aliases
  | 'operations-hub'
  | 'chatbots'
  | 'chatbot'
  | 'implementation'
  | 'managed-support'
  | 'dashboard'
  | 'integrated'

export interface ServiceItem {
  id: ServiceId
  title: string
  shortTitle: string
  tag: string
  description: string
  capabilities: string[]
  benefit: string
  examples?: string[]
  ctaText?: string
  badgeColor?: string
}

export interface BusinessChallenge {
  id: string
  number: string
  title: string
  challenge: string
  solution: string
  serviceTarget: ServiceId
  ctaLabel: string
}

export interface EcosystemLayer {
  layerNumber: number
  title: string
  subtitle: string
  description: string
  components: string[]
}

export interface IndustrySolution {
  id: string
  title: string
  summary: string
  examples: string[]
  targetService: ServiceId
}

export interface ProcessStep {
  step: string
  title: string
  phaseName: string
  summary: string
  deliverables: string[]
  timeline: string
}

export interface ArchitectureNode {
  step: string
  name: string
  role: string
  componentType: 'trigger' | 'validation' | 'orchestration' | 'storage' | 'notification' | 'action'
  status: 'implemented' | 'conceptual'
  description: string
}

export interface PortfolioItem {
  id: string
  title: string
  category: string
  badge: string
  description: string
  techStack: string[]
  pipeline: {
    input: string
    processing: string
    output: string
  }
  diagramNodes?: ArchitectureNode[]
  plannedFeatures: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: 'Services' | 'Process & Pricing' | 'Data & Ownership'
}

export interface EnquiryFormData {
  name: string
  email: string
  company: string
  service: ServiceId
  budget: string
  description: string
  consent: boolean
}

export interface FormErrors {
  name?: string
  email?: string
  company?: string
  service?: string
  budget?: string
  description?: string
  consent?: string
}
