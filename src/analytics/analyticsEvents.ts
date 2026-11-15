import { trackEvent } from './analytics'

export interface PageViewParams {
  page_name: string
  page_path: string
  page_title: string
}

export interface ServiceViewParams {
  service_id: string
  service_name: string
  source?: 'navigation' | 'card_click' | 'hero_cta' | 'challenge_link' | 'footer'
}

export interface PortfolioViewParams {
  project_id: string
  project_title: string
  architecture_stage?: string
}

export interface SolutionSelectedParams {
  layer_id: string
  layer_name: string
}

export interface ContactCtaClickParams {
  cta_location: 'navbar' | 'hero_primary' | 'hero_secondary' | 'services' | 'challenges' | 'process_audit' | 'faq' | 'footer'
  cta_label: string
  target_service?: string
}

export interface EnquiryFormStartParams {
  service_selected: string
}

export interface EnquirySubmitSuccessParams {
  service_selected: string
  engagement_tier?: string
  duration_seconds?: number
}

export interface DiscoveryCallClickParams {
  cta_location: 'contact_tab' | 'calendar_button' | 'email_slot_button'
  booking_method: 'calendar_link' | 'direct_email' | 'tab_select'
}

export interface EmailContactClickParams {
  location: 'hero' | 'contact_section' | 'footer' | 'policy_page' | 'fallback_dispatch'
  email_target: string
}

export interface WhatsAppContactClickParams {
  location: 'contact_section' | 'footer' | 'navbar'
}

export interface ContactEmailOpenedParams {
  service_selected: string
  location: 'fallback_dispatch' | 'discovery_call'
}

/**
 * 1. Tracks standard SPA pageview events.
 */
export function trackPageView(params: PageViewParams): void {
  trackEvent('page_view', {
    page_name: params.page_name,
    page_path: params.page_path,
    page_title: params.page_title,
  })
}

/**
 * 2. Tracks when a visitor views or focuses on a specific engineering service.
 */
export function trackServiceView(params: ServiceViewParams): void {
  trackEvent('service_view', {
    service_id: params.service_id,
    service_name: params.service_name,
    source: params.source || 'card_click',
  })
}

/**
 * 3. Tracks when a visitor inspects a portfolio project or its architecture pipeline.
 */
export function trackPortfolioView(params: PortfolioViewParams): void {
  trackEvent('portfolio_view', {
    project_id: params.project_id,
    project_title: params.project_title,
    architecture_stage: params.architecture_stage,
  })
}

/**
 * 4. Tracks when a visitor inspects an architecture layer in the Ecosystem diagram.
 */
export function trackSolutionSelected(params: SolutionSelectedParams): void {
  trackEvent('solution_selected', {
    layer_id: params.layer_id,
    layer_name: params.layer_name,
  })
}

/**
 * 5. Tracks call-to-action button clicks directing visitors toward consultation.
 */
export function trackContactCtaClick(params: ContactCtaClickParams): void {
  trackEvent('contact_cta_click', {
    cta_location: params.cta_location,
    cta_label: params.cta_label,
    target_service: params.target_service,
  })
}

/**
 * 6. Tracks the initial engagement moment when a visitor begins filling the enquiry form.
 */
export function trackEnquiryFormStart(params: EnquiryFormStartParams): void {
  trackEvent('enquiry_form_start', {
    service_selected: params.service_selected,
  })
}

/**
 * 7. Key Conversion Event: Tracks confirmed successful enquiry submission.
 * Triggered ONLY when the server endpoint returns a verified HTTP 200 receipt.
 */
export function trackEnquirySubmitSuccess(params: EnquirySubmitSuccessParams): void {
  trackEvent('enquiry_submit_success', {
    service_selected: params.service_selected,
    engagement_tier: params.engagement_tier || 'unspecified',
    duration_seconds: params.duration_seconds || 0,
  })
}

/**
 * 8. Tracks interaction with discovery call booking elements.
 */
export function trackDiscoveryCallClick(params: DiscoveryCallClickParams): void {
  trackEvent('discovery_call_click', {
    cta_location: params.cta_location,
    booking_method: params.booking_method,
  })
}

/**
 * 9. Tracks clicks on direct email addresses or copy-to-clipboard actions.
 */
export function trackEmailContactClick(params: EmailContactClickParams): void {
  trackEvent('email_contact_click', {
    location: params.location,
    email_target: params.email_target,
  })
}

/**
 * 10. Tracks WhatsApp contact clicks (only triggered if WhatsApp is configured).
 */
export function trackWhatsAppContactClick(params: WhatsAppContactClickParams): void {
  trackEvent('whatsapp_contact_click', {
    location: params.location,
  })
}

/**
 * Honest Fallback Event: Tracks when a visitor launches their email client.
 * Explicitly separated from `enquiry_submit_success` to avoid false conversion counts.
 */
export function trackContactEmailOpened(params: ContactEmailOpenedParams): void {
  trackEvent('contact_email_opened', {
    service_selected: params.service_selected,
    location: params.location,
  })
}
