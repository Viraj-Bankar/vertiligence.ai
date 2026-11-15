import {
  isAnalyticsConfigured,
  isAnalyticsConsentGranted,
  getMeasurementId,
  onAnalyticsConsentChange,
} from './analyticsConsent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const GTAG_SCRIPT_ID = 'ga4-gtag-script'
let isInitialized = false
let isScriptInjected = false
const pendingEventQueue: Array<{ name: string; params?: Record<string, unknown> }> = []

// Prevent duplicate page_view events within short timeframes (e.g. rapid router updates)
let lastTrackedPage: { path: string; timestamp: number } | null = null

/**
 * Forbidden keys that could accidentally introduce personal information into analytics.
 */
const FORBIDDEN_PII_KEYS = new Set([
  'name',
  'email',
  'phone',
  'telephone',
  'mobile',
  'company',
  'organization',
  'business_name',
  'description',
  'message',
  'brief',
  'project_description',
  'password',
  'text',
  'form_data',
  'address',
])

const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/
const PHONE_REGEX = /(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/

/**
 * Sanitizes parameters to guarantee zero Personally Identifiable Information (PII)
 * is dispatched to analytics collectors.
 */
export function sanitizeEventParams(
  params?: Record<string, unknown>
): Record<string, unknown> {
  if (!params) return {}

  const clean: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(params)) {
    const lowerKey = key.toLowerCase()

    // 1. Drop forbidden PII keys
    if (FORBIDDEN_PII_KEYS.has(lowerKey)) {
      continue
    }

    // 2. Validate types
    if (typeof value === 'string') {
      // Check for email or phone patterns in string values
      if (EMAIL_REGEX.test(value) || (value.length >= 10 && PHONE_REGEX.test(value))) {
        continue // Scrub potential PII in value
      }
      clean[key] = value.substring(0, 100) // Cap string length for clean reporting
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      clean[key] = value
    }
  }

  return clean
}

/**
 * Injects the gtag.js script tag dynamically.
 * ONLY called when both GA4 Measurement ID is configured and user consent is granted.
 */
function injectGtagScript(measurementId: string): void {
  if (typeof document === 'undefined' || document.getElementById(GTAG_SCRIPT_ID)) {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }

  // Configure Google Consent Mode v2 defaults (strictly granted only for analytics_storage)
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })

  // Disable default page_view auto-send so SPA navigation handles page views explicitly
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    send_page_view: false,
    anonymize_ip: true,
  })

  const script = document.createElement('script')
  script.id = GTAG_SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`

  script.onload = () => {
    isScriptInjected = true
    flushEventQueue()
  }

  script.onerror = () => {
    isScriptInjected = false
  }

  document.head.appendChild(script)
}

/**
 * Disables analytics by removing the script, clearing cookies, and updating consent to denied.
 */
function removeGtagScript(): void {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      })
    } catch {
      // Ignore
    }
  }

  if (typeof document !== 'undefined') {
    const existing = document.getElementById(GTAG_SCRIPT_ID)
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing)
    }

    // Clean up GA cookies (_ga, _ga_*) if present
    try {
      const cookies = document.cookie.split(';')
      for (const cookie of cookies) {
        const name = cookie.split('=')[0].trim()
        if (name === '_ga' || name.startsWith('_ga_')) {
          document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Domain=${window.location.hostname};`
          document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
        }
      }
    } catch {
      // Storage access blocked
    }
  }

  isScriptInjected = false
  pendingEventQueue.length = 0
}

function flushEventQueue(): void {
  if (!isScriptInjected || typeof window === 'undefined' || !window.gtag) return

  while (pendingEventQueue.length > 0) {
    const item = pendingEventQueue.shift()
    if (item) {
      window.gtag('event', item.name, item.params)
    }
  }
}

/**
 * Initializes the analytics subsystem and syncs with cookie consent.
 * Returns a teardown/cleanup function.
 */
export function initAnalytics(): () => void {
  if (isInitialized) return () => {}
  isInitialized = true

  const syncState = () => {
    const configured = isAnalyticsConfigured()
    const consentGranted = isAnalyticsConsentGranted()
    const measurementId = getMeasurementId()

    if (configured && consentGranted && measurementId) {
      if (!isScriptInjected && !document.getElementById(GTAG_SCRIPT_ID)) {
        injectGtagScript(measurementId)
      }
    } else {
      removeGtagScript()
    }
  }

  // Initial sync
  syncState()

  // Subscribe to consent transitions
  const unsubscribeConsent = onAnalyticsConsentChange(
    () => {
      syncState()
    },
    () => {
      removeGtagScript()
    }
  )

  return () => {
    unsubscribeConsent()
    isInitialized = false
  }
}

/**
 * Core event dispatcher. Validates consent and configuration before sending.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  // If not configured or consent not granted, quietly do nothing
  if (!isAnalyticsConfigured() || !isAnalyticsConsentGranted()) {
    return
  }

  const cleanParams = sanitizeEventParams(params)

  // Handle page_view duplicate suppression
  if (eventName === 'page_view') {
    const path = String(cleanParams.page_path || window.location.pathname)
    const now = Date.now()
    if (lastTrackedPage && lastTrackedPage.path === path && now - lastTrackedPage.timestamp < 350) {
      return // Ignore duplicate trigger within 350ms
    }
    lastTrackedPage = { path, timestamp: now }
  }

  if (isScriptInjected && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, cleanParams)
  } else {
    // Queue while script is loading
    pendingEventQueue.push({ name: eventName, params: cleanParams })
  }
}

/**
 * Testing helper: resets internal module state (used in automated test suites).
 */
export function _resetAnalyticsForTesting(): void {
  removeGtagScript()
  isInitialized = false
  isScriptInjected = false
  lastTrackedPage = null
  pendingEventQueue.length = 0
}
