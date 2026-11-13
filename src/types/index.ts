export type ServiceId =
  | 'operations-hub'
  | 'automation'
  | 'analytics'
  | 'chatbots'
  | 'implementation'
  | 'managed-support'
  | 'dashboard'
  | 'chatbot'
  | 'integrated'

export interface ServiceItem {
  id: ServiceId
  title: string
  shortTitle: string
  tag: string
  description: string
  examples: string[]
  ctaText: string
  badgeColor: string
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
