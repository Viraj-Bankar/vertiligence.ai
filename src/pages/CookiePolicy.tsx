import React from 'react'
import { BrandLogo } from '../components/BrandLogo'
import { COOKIE_INVENTORY } from '../utils/cookieConsent'
import { STUDIO_DETAILS } from '../data/content'
import {
  Cookie,
  ShieldCheck,
  Lock,
  ArrowLeft,
  Sliders,
  RotateCcw,
  ExternalLink,
  Layers,
  Database,
  BarChart3,
  Target,
  FileCheck,
} from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

interface CookiePolicyProps {
  onBackToHome: () => void
  onOpenCookieSettings: () => void
  onNavigateToPrivacyPolicy: () => void
}

export const CookiePolicy: React.FC<CookiePolicyProps> = ({
  onBackToHome,
  onOpenCookieSettings,
  onNavigateToPrivacyPolicy,
}) => {
  const lastUpdated = 'November 15, 2026'

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col w-full selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-[#07090E]/90 backdrop-blur-md border-b border-white/10 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md py-1 px-2"
              aria-label="Back to Homepage"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={onBackToHome}
              className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
              aria-label="Vertiligence AI Logo"
            >
              <BrandLogo size="sm" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={onNavigateToPrivacyPolicy}
              className="text-slate-300 hover:text-cyan-300 transition-colors underline underline-offset-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenCookieSettings}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-sm shadow-cyan-500/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 inline-flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Manage Preferences</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 min-w-0">
        {/* Header Breadcrumb */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
            <span>Governance</span>
            <span className="text-slate-600">/</span>
            <span>Data Transparency</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Cookie Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Cookie Policy & Storage Transparency
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-b border-white/10 pb-6">
            <div>
              <span>Company: </span>
              <span className="text-slate-200">Vertiligence AI</span>
            </div>
            <span>•</span>
            <div>
              <span>Positioning: </span>
              <span className="text-cyan-300">Engineering Intelligent Business Ecosystems</span>
            </div>
            <span>•</span>
            <div>
              <span>Last Updated: </span>
              <span className="text-slate-200">{lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Quick Summary Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-[#090E1A] to-[#0D1528] border border-cyan-500/30 shadow-xl shadow-cyan-950/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-400">
                <Cookie className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white tracking-wide uppercase font-mono text-xs">
                  Storage Philosophy: Minimal & Transparent
                </h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Vertiligence AI does not place third-party advertising cookies, retargeting pixels, or behavioral tracking scripts on your browser. We only use essential local storage to remember your privacy choices and transient memory while drafting project briefs.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenCookieSettings}
              className="shrink-0 px-5 py-3 rounded-xl bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 hover:text-white font-semibold text-xs transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-black/40 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Open Cookie Settings</span>
            </button>
          </div>
        </div>

        {/* Body Sections */}
        <div className="space-y-12 text-sm text-slate-300 leading-relaxed">
          {/* Section 1: What Are Cookies & Local Storage */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Database className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">1. What Are Cookies and Local Storage?</h2>
            </div>
            <p>
              Cookies are small text files placed on your computer or mobile device when you visit a website. Local storage (such as HTML5 <code>localStorage</code> and <code>sessionStorage</code>) is a modern web standard that allows web applications to store key-value data directly in your browser without transmitting it back and forth to a web server with every single HTTP request.
            </p>
            <p>
              On <strong>Vertiligence AI</strong>, we deliberately avoid legacy third-party cookies that follow you across the internet. Instead, we use minimal, first-party <code>localStorage</code> strictly to remember your consent state so you are not prompted on every page refresh.
            </p>
          </section>

          {/* Section 2: Complete Cookie Inventory */}
          <section className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-cyan-400">
                <FileCheck className="w-4 h-4" />
                <h2 className="text-lg font-bold text-white">2. Complete Storage & Technology Inventory</h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Audited & Verified: November 2026
              </span>
            </div>

            <p className="text-xs text-slate-400">
              The table below details every client-side storage technology, session memory item, and external content resource active or architecturally reserved on this website.
            </p>

            {/* Inventory Table Container */}
            <div className="rounded-xl border border-white/10 overflow-hidden bg-[#090E1A] w-full max-w-full">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead className="bg-slate-900/90 text-slate-300 font-mono uppercase tracking-wider text-[11px] border-b border-white/10">
                    <tr>
                      <th className="p-3.5">Technology / Key</th>
                      <th className="p-3.5">Provider</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Duration</th>
                      <th className="p-3.5">Purpose & Data Collected</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {COOKIE_INVENTORY.map((item) => (
                      <tr key={item.name} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3.5 font-mono text-cyan-300 font-semibold align-top whitespace-nowrap">
                          {item.name}
                          {item.isEssential && (
                            <span className="block mt-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded w-max">
                              Essential
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-300 font-medium align-top whitespace-nowrap">
                          {item.provider}
                        </td>
                        <td className="p-3.5 capitalize align-top whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                              item.category === 'essential'
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/20'
                                : item.category === 'analytics'
                                ? 'bg-blue-950/80 text-blue-300 border border-blue-500/20'
                                : item.category === 'functional'
                                ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/20'
                                : 'bg-purple-950/80 text-purple-300 border border-purple-500/20'
                            }`}
                          >
                            {item.category}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-400 align-top whitespace-nowrap font-mono text-[11px]">
                          {item.duration}
                        </td>
                        <td className="p-3.5 text-slate-300 align-top space-y-1">
                          <p>{item.purpose}</p>
                          <p className="text-[11px] text-slate-400 font-mono">
                            Collected: {item.dataCollected}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 3: Categories Breakdown */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <Layers className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">3. Consent Categories Explained</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Essential */}
              <div className="p-5 rounded-xl bg-[#090E1A] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Lock className="w-4 h-4" />
                  <h3 className="font-bold text-white text-sm">Strictly Essential</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  These technologies are required for core website security, responsive rendering, and recording your consent preferences. Under applicable international privacy frameworks (including GDPR Article 5(3) exemptions and standard web standards), essential functional storage does not require prior consent because the website cannot operate correctly without it.
                </p>
              </div>

              {/* Analytics */}
              <div className="p-5 rounded-xl bg-[#090E1A] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-blue-400">
                  <BarChart3 className="w-4 h-4" />
                  <h3 className="font-bold text-white text-sm">Analytics & Performance</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Measures aggregated load times, screen size distributions, and anonymous visit counts to optimize layout performance and diagnose technical bugs. This category is strictly disabled until you explicitly opt in.
                </p>
              </div>

              {/* Functional */}
              <div className="p-5 rounded-xl bg-[#090E1A] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Sliders className="w-4 h-4" />
                  <h3 className="font-bold text-white text-sm">Functional Preferences</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enables memory of user interface customizations, such as collapsed or expanded project architecture views across sessions. Optional and disabled by default.
                </p>
              </div>

              {/* Marketing */}
              <div className="p-5 rounded-xl bg-[#090E1A] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <Target className="w-4 h-4" />
                  <h3 className="font-bold text-white text-sm">Marketing & Ad Pixels</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Reserved architecture for advertising conversion pixels or retargeting networks. Vertiligence AI currently runs zero advertising pixels or retargeting trackers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: How to Manage or Withdraw Consent */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <Sliders className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">4. Managing and Withdrawing Your Consent</h2>
            </div>
            <p>
              You have full control over your privacy settings at all times. You can change your selections or withdraw consent completely in two ways:
            </p>

            <div className="p-5 rounded-xl bg-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-sm">Interactive Cookie Preferences Center</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Adjust individual category toggles or click “Withdraw All Consent” to reset all saved preferences immediately.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenCookieSettings}
                className="shrink-0 px-4 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-semibold transition-colors cursor-pointer"
              >
                Launch Cookie Preferences Modal
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-white text-sm">Direct Browser Controls</h3>
              <p className="text-xs text-slate-300">
                You can also configure your browser to block or delete cookies and local storage items entirely. Consult the official support documentation for your browser:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-[#090E1A] hover:bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-between transition-colors"
                >
                  <span>Google Chrome</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-[#090E1A] hover:bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-between transition-colors"
                >
                  <span>Mozilla Firefox</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-[#090E1A] hover:bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-between transition-colors"
                >
                  <span>Apple Safari</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-[#090E1A] hover:bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-between transition-colors"
                >
                  <span>Microsoft Edge</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </section>

          {/* Section 5: Versioning and Updates */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-cyan-400">
              <RotateCcw className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">5. Policy Versioning & Automatic Re-Prompting</h2>
            </div>
            <p>
              Our cookie consent mechanism utilizes active policy versioning (currently <strong>Policy Version 1.0</strong>). If Vertiligence AI introduces any new technologies, analytical tools, or updates this policy, the version number will be incremented. When that happens, your previous consent will be gracefully cleared, and you will be presented with a fresh prompt outlining the new changes.
            </p>
            <p>
              Saved consent automatically expires after <strong>180 days</strong>, ensuring you are periodically reminded of your privacy preferences.
            </p>
          </section>

          {/* Contact Section */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">6. Questions & Data Governance Contact</h2>
            </div>
            <p>
              If you have any questions about our use of local storage or privacy practices, reach out to our engineering office at:
            </p>
            <div className="p-4 rounded-xl bg-[#090E1A] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-bold text-sm">Vertiligence AI</p>
                <p className="text-xs text-slate-400">Engineering Privacy & Data Transparency</p>
                <a
                  href={`mailto:${STUDIO_DETAILS.email}`}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline mt-1 inline-block"
                >
                  {STUDIO_DETAILS.email}
                </a>
              </div>

              <button
                type="button"
                onClick={onNavigateToPrivacyPolicy}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                View Full Privacy Policy
              </button>
            </div>
          </section>
        </div>

        {/* Footer Back Button */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Vertiligence AI Homepage</span>
          </button>

          <p className="text-xs text-slate-400 font-mono">
            © {CURRENT_YEAR} Vertiligence AI. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  )
}
