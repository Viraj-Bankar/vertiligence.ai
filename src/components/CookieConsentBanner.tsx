import React, { useState, useEffect } from 'react'
import {
  getStoredConsent,
  acceptAllCookies,
  rejectOptionalCookies,
  onConsentChange,
} from '../utils/cookieConsent'
import { ShieldCheck, Cookie } from 'lucide-react'

interface CookieConsentBannerProps {
  onOpenPreferences: () => void
  onNavigateToPolicy?: (path: '/privacy-policy' | '/cookie-policy') => void
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPreferences,
  onNavigateToPolicy,
}) => {
  const [isVisible, setIsVisible] = useState(() => !getStoredConsent())

  useEffect(() => {
    // Subscribe to consent changes (e.g. withdrawal reopens banner, saving hides it)
    const unsubscribe = onConsentChange((prefs) => {
      setIsVisible(!prefs)
    })

    return () => unsubscribe()
  }, [])

  if (!isVisible) return null

  const handleAcceptAll = () => {
    acceptAllCookies()
    setIsVisible(false)
  }

  const handleRejectOptional = () => {
    rejectOptionalCookies()
    setIsVisible(false)
  }

  const handlePolicyClick = (
    e: React.MouseEvent,
    path: '/privacy-policy' | '/cookie-policy'
  ) => {
    e.preventDefault()
    if (onNavigateToPolicy) {
      onNavigateToPolicy(path)
    } else {
      window.location.hash = '#' + path
    }
  }

  return (
    <div
      role="region"
      aria-label="Cookie and data transparency banner"
      className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-50 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
    >
      <div className="rounded-2xl bg-[#090E1A]/95 backdrop-blur-xl border border-cyan-500/30 p-5 sm:p-6 shadow-2xl shadow-black/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left Text Block */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-300">
              <Cookie className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                Cookie & Data Transparency
              </span>
              <span className="text-slate-600">·</span>
              <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Tracking Pixels</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Vertiligence AI uses essential browser storage to remember your privacy choices and secure our systems. We do not sell visitor data or run advertising trackers. You can accept all cookies, reject optional categories, or customize your preferences.
            </p>

            <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-2 pt-1">
              <span>Learn more:</span>
              <a
                href="/cookie-policy"
                onClick={(e) => handlePolicyClick(e, '/cookie-policy')}
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              >
                Cookie Policy
              </a>
              <span className="text-slate-600">·</span>
              <a
                href="/privacy-policy"
                onClick={(e) => handlePolicyClick(e, '/privacy-policy')}
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Right Action Buttons: Reject Optional is equal in prominence */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleRejectOptional}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 text-center"
            >
              Reject Optional
            </button>

            <button
              type="button"
              onClick={onOpenPreferences}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400/50 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 text-center"
            >
              Customize
            </button>

            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-cyan-500/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 text-center"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
