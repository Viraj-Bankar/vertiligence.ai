import React, { useState, useEffect, useRef } from 'react'
import type { CookieConsentCategories } from '../types/privacy'
import {
  getStoredConsent,
  saveConsent,
  acceptAllCookies,
  rejectOptionalCookies,
  withdrawConsent,
  CURRENT_POLICY_VERSION,
} from '../utils/cookieConsent'
import { isAnalyticsConfigured } from '../analytics/analyticsConsent'
import {
  X,
  ShieldCheck,
  Lock,
  BarChart3,
  Sliders,
  Target,
  RotateCcw,
  Check,
} from 'lucide-react'

interface CookiePreferencesModalProps {
  isOpen: boolean
  onClose: () => void
}

const CookiePreferencesDialog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const [categories, setCategories] = useState<CookieConsentCategories>(() => {
    const existing = getStoredConsent()
    return (
      existing?.categories ?? {
        essential: true,
        analytics: false,
        functional: false,
        marketing: false,
      }
    )
  })

  const [consentId, setConsentId] = useState<string | null>(() => {
    return getStoredConsent()?.consentId ?? null
  })

  const [timestamp, setTimestamp] = useState<string | null>(() => {
    return getStoredConsent()?.timestamp ?? null
  })

  const [savedNotice, setSavedNotice] = useState(false)

  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement

    const timer = setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 50)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      if (
        previousActiveElement.current &&
        typeof previousActiveElement.current.focus === 'function'
      ) {
        previousActiveElement.current.focus()
      }
    }
  }, [onClose])

  const handleToggle = (key: keyof CookieConsentCategories) => {
    if (key === 'essential') return // Locked
    setCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const triggerSaveNotice = () => {
    setSavedNotice(true)
    setTimeout(() => {
      setSavedNotice(false)
      onClose()
    }, 800)
  }

  const handleSavePreferences = () => {
    const saved = saveConsent(categories)
    setConsentId(saved.consentId)
    setTimestamp(saved.timestamp)
    triggerSaveNotice()
  }

  const handleAcceptAll = () => {
    const saved = acceptAllCookies()
    setCategories(saved.categories)
    setConsentId(saved.consentId)
    setTimestamp(saved.timestamp)
    triggerSaveNotice()
  }

  const handleRejectAll = () => {
    const saved = rejectOptionalCookies()
    setCategories(saved.categories)
    setConsentId(saved.consentId)
    setTimestamp(saved.timestamp)
    triggerSaveNotice()
  }

  const handleWithdraw = () => {
    withdrawConsent()
    setCategories({
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    })
    setConsentId(null)
    setTimestamp(null)
    triggerSaveNotice()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preferences-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#090E1A] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Close preferences"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 text-cyan-400 mb-2">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-wider font-semibold">
            Privacy & Cookie Preferences
          </span>
        </div>

        <h3 id="preferences-title" className="text-2xl font-bold text-white mb-2">
          Manage Your Consent Settings
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          Choose which categories of cookies and local storage technologies you permit Vertiligence AI to use. You can change these choices or withdraw your consent at any time.
        </p>

        {/* Categories Stack */}
        <div className="space-y-4 mb-6">
          {/* 1. Essential */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white">
                      Strictly Essential Technologies
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Necessary for core website security, network routing, and remembering your privacy choices. These cannot be disabled.
                  </p>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    Includes: <code>vertiligence_cookie_consent_v1</code> (180 days), Google Fonts CDN (session typography), contact form state.
                  </div>
                </div>
              </div>

              {/* Locked switch */}
              <div className="shrink-0 pt-1">
                <div
                  className="w-11 h-6 bg-emerald-600 rounded-full flex items-center p-1 cursor-not-allowed opacity-80"
                  aria-disabled="true"
                  title="Essential technologies are always active"
                >
                  <div className="w-4 h-4 rounded-full bg-white ml-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Analytics */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white">
                      Analytics & Performance (GA4)
                    </h4>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isAnalyticsConfigured()
                          ? 'bg-white/5 text-slate-400 border-white/10'
                          : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {isAnalyticsConfigured() ? 'Optional' : 'Not Configured'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Allows aggregate measurement of visits, referral sources, and feature engagement via Google Analytics 4. Anonymized IP; zero form briefs or PII transmitted.
                  </p>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    {isAnalyticsConfigured() ? (
                      <span className="text-cyan-400/90 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>Provider: Google Analytics 4 (GA4). Blocked unless explicitly enabled.</span>
                      </span>
                    ) : (
                      <span className="text-amber-400/90 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>Status: Inactive on this deployment (No GA4 Measurement ID configured).</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="shrink-0 pt-1">
                <button
                  type="button"
                  role="switch"
                  aria-checked={categories.analytics}
                  aria-label="Toggle analytics cookies"
                  onClick={() => handleToggle('analytics')}
                  className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    categories.analytics ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      categories.analytics ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Functional */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white">
                      Functional Preferences
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Enables enhanced functionality, such as remembering your selected prototype view or collapsed/expanded component states across visits.
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="shrink-0 pt-1">
                <button
                  type="button"
                  role="switch"
                  aria-checked={categories.functional}
                  aria-label="Toggle functional preferences"
                  onClick={() => handleToggle('functional')}
                  className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    categories.functional ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      categories.functional ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 4. Marketing */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white">
                      Marketing & Communications
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Used to track advertising effectiveness or deliver targeted campaigns. Vertiligence AI currently runs zero advertising pixels or third-party behavioral trackers.
                  </p>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    Current status: No ad pixels installed.
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="shrink-0 pt-1">
                <button
                  type="button"
                  role="switch"
                  aria-checked={categories.marketing}
                  aria-label="Toggle marketing cookies"
                  onClick={() => handleToggle('marketing')}
                  className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    categories.marketing ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      categories.marketing ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Details Box */}
        {consentId && (
          <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span>Consent ID: </span>
              <span className="text-cyan-300">{consentId}</span>
            </div>
            <div>
              <span>Updated: </span>
              <span className="text-slate-300">
                {timestamp ? new Date(timestamp).toLocaleDateString() : 'Active session'}
              </span>
              <span> · Policy v{CURRENT_POLICY_VERSION}.0</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div>
            {consentId && (
              <button
                type="button"
                onClick={handleWithdraw}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Withdraw All Consent</span>
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              type="button"
              onClick={handleRejectAll}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 text-center"
            >
              Reject Optional
            </button>

            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 text-center"
            >
              Accept All
            </button>

            <button
              type="button"
              onClick={handleSavePreferences}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-cyan-500/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 inline-flex items-center justify-center gap-1.5 text-center"
            >
              {savedNotice ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Preferences Saved!</span>
                </>
              ) : (
                <span>Save Preferences</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null
  return <CookiePreferencesDialog onClose={onClose} />
}
