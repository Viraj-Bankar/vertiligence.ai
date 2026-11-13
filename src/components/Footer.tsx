import React from 'react'
import { BrandLogo } from './BrandLogo'
import type { ServiceId } from '../types'
import { STUDIO_DETAILS } from '../data/content'
import { Mail, ArrowUp } from 'lucide-react'


interface FooterProps {
  onSelectService: (service: ServiceId) => void
  onOpenPrivacy: () => void
}

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC<FooterProps> = ({ onSelectService, onOpenPrivacy }) => {
  const scrollToTop = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLinkClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#05070B] border-t border-white/10 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
              aria-label="Vertiligence AI Homepage"
            >
              <BrandLogo size="md" />
            </a>

            <p className="text-slate-300 font-medium text-sm">
              {STUDIO_DETAILS.tagline}
            </p>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              We help businesses simplify repetitive operations, understand their data, and improve customer engagement through practical AI automation, business dashboards, and intelligent chatbots.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`mailto:${STUDIO_DETAILS.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-cyan-200 border border-white/10 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">{STUDIO_DETAILS.email}</span>
              </a>

              {/* LinkedIn Placeholder */}
              <a
                href={STUDIO_DETAILS.linkedinPlaceholder}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                title="Vertiligence AI on LinkedIn (Company URL placeholder)"
              >
                <svg className="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
                <span className="text-[11px]">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('automation')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  AI Workflow Automation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('dashboard')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  BI Dashboards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('chatbot')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  AI Chatbot Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('integrated')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Integrated Studio Scope
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Studio
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#process"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#process')
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  How We Work
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#portfolio')
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Portfolio Prototypes
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#why-us')
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Why Vertiligence AI
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#about')
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About Our Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Studio Location
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vertiligence AI is an independent technology studio based in India.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2 cursor-pointer"
              >
                Privacy Notice & Data Policy
              </button>
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              Zero tracking cookies. Direct engineering consultation.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {CURRENT_YEAR} Vertiligence AI. All rights reserved. Built with precision and practical engineering.
          </p>


          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
