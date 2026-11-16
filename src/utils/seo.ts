/**
 * Technical SEO & Dynamic Meta Management Utility
 *
 * Updates document title, meta descriptions, canonical links, OpenGraph,
 * and Twitter Card metadata dynamically during Single Page Application (SPA) navigation.
 */

export interface RouteSeoConfig {
  title: string
  description: string
  canonicalUrl: string
}

export const BASE_PRODUCTION_URL = 'https://vertiligenceai.vercel.app'

export const ROUTE_SEO: Record<string, RouteSeoConfig> = {
  '/': {
    title: 'Vertiligence AI — Engineering Intelligent Business Ecosystems',
    description:
      'Vertiligence AI is a technology engineering and digital transformation company. Engineering Intelligent Business Ecosystems through custom software, workflow automation, and AI. Intelligence. Automation. Impact.',
    canonicalUrl: `${BASE_PRODUCTION_URL}/`,
  },
  '/privacy-policy': {
    title: 'Privacy Policy & Data Transparency — Vertiligence AI',
    description:
      'Review the Vertiligence AI Privacy Policy. Learn about our data practices, confidentiality principles, zero-tracking philosophy, and client rights.',
    canonicalUrl: `${BASE_PRODUCTION_URL}/privacy-policy`,
  },
  '/cookie-policy': {
    title: 'Cookie Policy & Storage Transparency — Vertiligence AI',
    description:
      'Review the Vertiligence AI Cookie Policy. Learn about our strictly essential storage practices, consent management, and zero third-party tracking.',
    canonicalUrl: `${BASE_PRODUCTION_URL}/cookie-policy`,
  },
}

/**
 * Updates document meta tags, canonical link, and OpenGraph headers
 * to match the current SPA route.
 */
export function updateRouteSeo(route: string): void {
  if (typeof document === 'undefined') return

  const normalizedRoute = route.toLowerCase()
  const config = ROUTE_SEO[normalizedRoute] || ROUTE_SEO['/']

  // 1. Update Title
  document.title = config.title

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]')
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.setAttribute('name', 'description')
    document.head.appendChild(metaDesc)
  }
  metaDesc.setAttribute('content', config.description)

  // 3. Update Canonical Tag
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }
  canonicalLink.setAttribute('href', config.canonicalUrl)

  // 4. Update OpenGraph Tags
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', config.title)

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', config.description)

  const ogUrl = document.querySelector('meta[property="og:url"]')
  if (ogUrl) ogUrl.setAttribute('content', config.canonicalUrl)

  // 5. Update Twitter Card Tags
  const twTitle = document.querySelector('meta[property="twitter:title"]')
  if (twTitle) twTitle.setAttribute('content', config.title)

  const twDesc = document.querySelector('meta[property="twitter:description"]')
  if (twDesc) twDesc.setAttribute('content', config.description)

  const twUrl = document.querySelector('meta[property="twitter:url"]')
  if (twUrl) twUrl.setAttribute('content', config.canonicalUrl)
}
