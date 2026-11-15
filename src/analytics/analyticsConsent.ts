import { hasConsent, onConsentChange } from '../utils/cookieConsent'

/**
 * Checks whether a valid GA4 Measurement ID is configured in the environment.
 * Does not accept placeholders or blank strings.
 */
export function isAnalyticsConfigured(): boolean {
  const id = getMeasurementId()
  return Boolean(id && /^G-[A-Za-z0-9]+$/.test(id))
}

/**
 * Retrieves the configured GA4 Measurement ID from Vite environment variables.
 */
export function getMeasurementId(): string | null {
  if (typeof import.meta === 'undefined' || !import.meta.env) {
    return null
  }
  const raw = import.meta.env.VITE_GA4_MEASUREMENT_ID
  if (typeof raw !== 'string') return null
  const trimmed = raw.trim()
  return trimmed.length > 0 ? trimmed : null
}

/**
 * Checks whether the visitor has explicitly granted consent for the 'analytics' category.
 */
export function isAnalyticsConsentGranted(): boolean {
  return hasConsent('analytics')
}

/**
 * Subscribes to cookie consent changes and triggers appropriate callbacks
 * when analytics consent is granted or revoked.
 */
export function onAnalyticsConsentChange(
  onGranted: () => void,
  onRevoked: () => void
): () => void {
  return onConsentChange((prefs) => {
    if (prefs && prefs.categories.analytics) {
      onGranted()
    } else {
      onRevoked()
    }
  })
}
