export {
  isAnalyticsConfigured,
  isAnalyticsConsentGranted,
  getMeasurementId,
  onAnalyticsConsentChange,
} from './analyticsConsent'

export {
  initAnalytics,
  trackEvent,
  sanitizeEventParams,
  _resetAnalyticsForTesting,
} from './analytics'

export {
  trackPageView,
  trackServiceView,
  trackPortfolioView,
  trackSolutionSelected,
  trackContactCtaClick,
  trackEnquiryFormStart,
  trackEnquirySubmitSuccess,
  trackDiscoveryCallClick,
  trackEmailContactClick,
  trackWhatsAppContactClick,
  trackContactEmailOpened,
} from './analyticsEvents'

export type {
  PageViewParams,
  ServiceViewParams,
  PortfolioViewParams,
  SolutionSelectedParams,
  ContactCtaClickParams,
  EnquiryFormStartParams,
  EnquirySubmitSuccessParams,
  DiscoveryCallClickParams,
  EmailContactClickParams,
  WhatsAppContactClickParams,
  ContactEmailOpenedParams,
} from './analyticsEvents'
