export type CookieConsentCategory = 'essential' | 'analytics' | 'functional' | 'marketing'

export interface CookieConsentCategories {
  essential: boolean
  analytics: boolean
  functional: boolean
  marketing: boolean
}

export interface CookieConsentPreferences {
  version: number
  timestamp: string
  categories: CookieConsentCategories
  consentId: string
}

export interface CookieInventoryItem {
  name: string
  provider: string
  purpose: string
  dataCollected: string
  duration: string
  category: CookieConsentCategory
  isEssential: boolean
}
