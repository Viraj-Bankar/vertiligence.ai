export type ServiceId = 'automation' | 'dashboard' | 'chatbot' | 'integrated'

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
  summary: string
  deliverables: string[]
  timeline: string
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
  plannedFeatures: string[]
  githubUrl?: string
  liveUrl?: string
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
