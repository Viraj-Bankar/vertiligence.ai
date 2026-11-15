import type {
  CookieConsentCategory,
  CookieConsentCategories,
  CookieConsentPreferences,
  CookieInventoryItem,
} from '../types/privacy'

export const CONSENT_STORAGE_KEY = 'vertiligence_cookie_consent_v1'
export const CURRENT_POLICY_VERSION = 1
export const CONSENT_EXPIRY_DAYS = 180

export const DEFAULT_CATEGORIES: CookieConsentCategories = {
  essential: true,
  analytics: false,
  functional: false,
  marketing: false,
}

export const COOKIE_INVENTORY: CookieInventoryItem[] = [
  {
    name: 'vertiligence_cookie_consent_v1',
    provider: 'Vertiligence AI (First-party)',
    purpose: 'Stores the visitor’s cookie consent choices and category preferences across sessions.',
    dataCollected: 'Anonymous preferences object (version, timestamp, consent ID, category flags). Zero personal data.',
    duration: '180 days (stored in browser localStorage)',
    category: 'essential',
    isEssential: true,
  },
  {
    name: 'Google Fonts CDN (Typography)',
    provider: 'Google LLC',
    purpose: 'Delivers web fonts (Plus Jakarta Sans & JetBrains Mono) for proper site display.',
    dataCollected: 'HTTP connection headers (visitor IP address, User-Agent, referer) handled ephemerally by Google CDN. No cookies are stored.',
    duration: 'Session-only / browser font cache',
    category: 'essential',
    isEssential: true,
  },
  {
    name: 'Contact & Scoping State',
    provider: 'Vertiligence AI (First-party)',
    purpose: 'Temporarily maintains form inputs while drafting a technical project brief or discovery call request.',
    dataCollected: 'Name, business email, company name, and project description entered by the visitor.',
    duration: 'Transient in-memory React state (cleared when closing or reloading the tab)',
    category: 'essential',
    isEssential: true,
  },
  {
    name: 'Analytics & Performance (Optional)',
    provider: 'Vertiligence AI / Self-Hosted Telemetry (when configured)',
    purpose: 'Aggregated, cookieless metrics measuring page speed, section interaction, and visitor navigation flow.',
    dataCollected: 'De-identified page view timestamps, screen width, and referrer URL. Strictly disabled until explicit consent.',
    duration: 'Blocked by default; enabled only with opt-in consent',
    category: 'analytics',
    isEssential: false,
  },
  {
    name: 'Functional Preferences (Optional)',
    provider: 'Vertiligence AI (First-party)',
    purpose: 'Remembers active filter selections and UI view states across browser sessions.',
    dataCollected: 'Selected UI state identifiers. Blocked by default until consent.',
    duration: 'Blocked by default; enabled only with opt-in consent',
    category: 'functional',
    isEssential: false,
  },
  {
    name: 'Marketing & Ad Pixels (Optional)',
    provider: 'None active (Reserved Architecture)',
    purpose: 'Vertiligence AI does not deploy advertising pixels, retargeting tags, or behavioral trackers.',
    dataCollected: 'Zero advertising data collected. Category remains strictly disabled.',
    duration: 'Not deployed',
    category: 'marketing',
    isEssential: false,
  },
]

function generateConsentId(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
  } catch {
    // Fallback
  }
  return 'cid_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

export function getStoredConsent(): CookieConsentPreferences | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null
  }
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null

    const parsed: CookieConsentPreferences = JSON.parse(raw)
    if (!parsed || parsed.version !== CURRENT_POLICY_VERSION) {
      // Version mismatch — requires fresh consent prompt
      return null
    }

    // Check expiry (180 days)
    const consentDate = new Date(parsed.timestamp).getTime()
    const now = Date.now()
    const maxAgeMs = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    if (isNaN(consentDate) || now - consentDate > maxAgeMs) {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY)
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function saveConsent(
  categories: Partial<CookieConsentCategories>
): CookieConsentPreferences {
  const current = getStoredConsent()
  const consentId = current?.consentId || generateConsentId()

  const fullCategories: CookieConsentCategories = {
    essential: true, // Always true
    analytics: Boolean(categories.analytics),
    functional: Boolean(categories.functional),
    marketing: Boolean(categories.marketing),
  }

  const prefs: CookieConsentPreferences = {
    version: CURRENT_POLICY_VERSION,
    timestamp: new Date().toISOString(),
    categories: fullCategories,
    consentId,
  }

  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs))
    } catch {
      // Storage unavailable or quota exceeded
    }
  }

  dispatchConsentEvent(prefs)
  return prefs
}

export function acceptAllCookies(): CookieConsentPreferences {
  return saveConsent({
    essential: true,
    analytics: true,
    functional: true,
    marketing: true,
  })
}

export function rejectOptionalCookies(): CookieConsentPreferences {
  return saveConsent({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  })
}

export function withdrawConsent(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY)
    } catch {
      // Storage unavailable
    }
  }
  dispatchConsentEvent(null)
}

export function hasConsent(category: CookieConsentCategory): boolean {
  if (category === 'essential') return true
  const prefs = getStoredConsent()
  if (!prefs) return false
  return Boolean(prefs.categories[category])
}

const CONSENT_CHANGE_EVENT = 'vertiligence:consent_change'

function dispatchConsentEvent(prefs: CookieConsentPreferences | null) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, { detail: prefs })
  )
}

export function onConsentChange(
  callback: (prefs: CookieConsentPreferences | null) => void
): () => void {
  if (typeof window === 'undefined') return () => {}
  const handler = (event: Event) => {
    const custom = event as CustomEvent<CookieConsentPreferences | null>
    callback(custom.detail)
  }
  window.addEventListener(CONSENT_CHANGE_EVENT, handler)
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler)
}
