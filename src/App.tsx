import { useState, useEffect, lazy, Suspense } from 'react'
import type { ServiceId } from './types'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Challenges } from './components/Challenges'
import { Services } from './components/Services'
import { EcosystemArchitecture } from './components/EcosystemArchitecture'
import { ProcessAudit } from './components/ProcessAudit'
import { Portfolio } from './components/Portfolio'
import { Industries } from './components/Industries'
import { Process } from './components/Process'
import { WhyUs } from './components/WhyUs'
import { About } from './components/About'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CookieConsentBanner } from './components/CookieConsentBanner'
import { initAnalytics, trackPageView } from './analytics'
import { updateRouteSeo } from './utils/seo'

// Lazy-loaded components and dedicated policy routes to optimize initial bundle size
const PrivacyPolicy = lazy(() =>
  import('./pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy }))
)
const CookiePolicy = lazy(() =>
  import('./pages/CookiePolicy').then((m) => ({ default: m.CookiePolicy }))
)
const PrivacyModal = lazy(() =>
  import('./components/PrivacyModal').then((m) => ({ default: m.PrivacyModal }))
)
const CookiePreferencesModal = lazy(() =>
  import('./components/CookiePreferencesModal').then((m) => ({
    default: m.CookiePreferencesModal,
  }))
)

function PageRouteLoading() {
  return (
    <div className="min-h-screen bg-[#07090E] flex flex-col items-center justify-center text-slate-400">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-3" />
      <span className="font-mono text-xs uppercase tracking-wider text-cyan-400/80">
        Loading...
      </span>
    </div>
  )
}

function resolveCurrentRoute(): string {
  if (typeof window === 'undefined') return '/'
  const pathname = window.location.pathname.toLowerCase()
  const hash = window.location.hash.toLowerCase()

  if (
    pathname === '/privacy-policy' ||
    hash === '#/privacy-policy' ||
    hash === '#privacy-policy'
  ) {
    return '/privacy-policy'
  }
  if (
    pathname === '/cookie-policy' ||
    hash === '#/cookie-policy' ||
    hash === '#cookie-policy'
  ) {
    return '/cookie-policy'
  }
  return '/'
}

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(resolveCurrentRoute)
  const [selectedService, setSelectedService] = useState<ServiceId>('custom-software')
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false)
  const [cookiePreferencesOpen, setCookiePreferencesOpen] = useState(false)

  // Initialize analytics subsystem synced with cookie consent
  useEffect(() => {
    const cleanup = initAnalytics()
    return () => cleanup()
  }, [])

  // Track SPA pageview transitions and update document SEO metadata
  useEffect(() => {
    updateRouteSeo(currentRoute)

    const pageName =
      currentRoute === '/'
        ? 'Home'
        : currentRoute === '/privacy-policy'
        ? 'Privacy Policy'
        : 'Cookie Policy'

    trackPageView({
      page_name: pageName,
      page_path: currentRoute,
      page_title: document.title,
    })
  }, [currentRoute])

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(resolveCurrentRoute())
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  const navigateTo = (path: string) => {
    try {
      window.history.pushState(null, '', path)
    } catch {
      window.location.hash = path
    }
    setCurrentRoute(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToContact = (serviceId?: ServiceId) => {
    if (currentRoute !== '/') {
      navigateTo('/')
      // Allow DOM to mount before scrolling
      setTimeout(() => {
        if (serviceId) setSelectedService(serviceId)
        const contactElement = document.getElementById('contact')
        contactElement?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return
    }

    if (serviceId) {
      setSelectedService(serviceId)
    }
    const contactElement = document.getElementById('contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToServices = () => {
    if (currentRoute !== '/') {
      navigateTo('/')
      setTimeout(() => {
        const servicesElement = document.getElementById('services')
        servicesElement?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return
    }

    const servicesElement = document.getElementById('services')
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 1. Dedicated Privacy Policy Route
  if (currentRoute === '/privacy-policy') {
    return (
      <Suspense fallback={<PageRouteLoading />}>
        <PrivacyPolicy
          onBackToHome={() => navigateTo('/')}
          onOpenCookieSettings={() => setCookiePreferencesOpen(true)}
          onNavigateToCookiePolicy={() => navigateTo('/cookie-policy')}
        />

        <CookieConsentBanner
          onOpenPreferences={() => setCookiePreferencesOpen(true)}
          onNavigateToPolicy={(path) => navigateTo(path)}
        />

        {cookiePreferencesOpen && (
          <Suspense fallback={null}>
            <CookiePreferencesModal
              isOpen={cookiePreferencesOpen}
              onClose={() => setCookiePreferencesOpen(false)}
            />
          </Suspense>
        )}
      </Suspense>
    )
  }

  // 2. Dedicated Cookie Policy Route
  if (currentRoute === '/cookie-policy') {
    return (
      <Suspense fallback={<PageRouteLoading />}>
        <CookiePolicy
          onBackToHome={() => navigateTo('/')}
          onOpenCookieSettings={() => setCookiePreferencesOpen(true)}
          onNavigateToPrivacyPolicy={() => navigateTo('/privacy-policy')}
        />

        <CookieConsentBanner
          onOpenPreferences={() => setCookiePreferencesOpen(true)}
          onNavigateToPolicy={(path) => navigateTo(path)}
        />

        {cookiePreferencesOpen && (
          <Suspense fallback={null}>
            <CookiePreferencesModal
              isOpen={cookiePreferencesOpen}
              onClose={() => setCookiePreferencesOpen(false)}
            />
          </Suspense>
        )}
      </Suspense>
    )
  }

  // 3. Homepage (11-section company website)
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sticky Top Navigation */}
      <Navbar onDiscussClick={() => scrollToContact()} />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onExploreServices={scrollToServices}
          onDiscussProject={() => scrollToContact()}
        />

        {/* 2. Business Challenges Section */}
        <Challenges onSelectService={scrollToContact} />

        {/* 3. Core Services Section */}
        <Services onSelectService={scrollToContact} />

        {/* 4. Integrated Business Ecosystem Architecture */}
        <EcosystemArchitecture />

        {/* 5. Business Process Audit & Consulting */}
        <ProcessAudit onDiscussClick={() => scrollToContact('consulting')} />

        {/* 6. Featured Portfolio & Architecture Pipelines */}
        <Portfolio />

        {/* 7. Industries We Serve */}
        <Industries onSelectService={scrollToContact} />

        {/* 8. Our Working Process / Delivery Lifecycle */}
        <Process />

        {/* 9. Why Vertiligence AI & About */}
        <WhyUs />
        <About />

        {/* 10. Client FAQ Accordion */}
        <FAQ onDiscussClick={() => scrollToContact()} />

        {/* 11. Contact Section (Option A & Option B) */}
        <Contact
          selectedService={selectedService}
          onServiceChange={setSelectedService}
        />
      </main>

      {/* Section 12: Footer */}
      <Footer
        onSelectService={scrollToContact}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onNavigateToPrivacy={() => navigateTo('/privacy-policy')}
        onNavigateToCookiePolicy={() => navigateTo('/cookie-policy')}
        onOpenCookieSettings={() => setCookiePreferencesOpen(true)}
      />

      {/* Quick Summary Privacy Modal (retained for inline quick view) */}
      {privacyModalOpen && (
        <Suspense fallback={null}>
          <PrivacyModal
            isOpen={privacyModalOpen}
            onClose={() => setPrivacyModalOpen(false)}
          />
        </Suspense>
      )}

      {/* Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPreferences={() => setCookiePreferencesOpen(true)}
        onNavigateToPolicy={(path) => navigateTo(path)}
      />

      {/* Interactive Cookie Preferences Modal */}
      {cookiePreferencesOpen && (
        <Suspense fallback={null}>
          <CookiePreferencesModal
            isOpen={cookiePreferencesOpen}
            onClose={() => setCookiePreferencesOpen(false)}
          />
        </Suspense>
      )}
    </div>
  )
}

export default App
