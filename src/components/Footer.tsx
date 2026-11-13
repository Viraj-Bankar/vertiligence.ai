import React from 'react'
import { BrandLogo } from './BrandLogo'
import type { ServiceId } from '../types'
import { STUDIO_DETAILS } from '../data/content'
import { Mail, ArrowUp, Code2 } from 'lucide-react'

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
              href="#hero"
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
              An AI-enabled business systems and automation company helping growing organizations connect customer operations, internal workflows, and business intelligence.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${STUDIO_DETAILS.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-cyan-200 border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">{STUDIO_DETAILS.email}</span>
              </a>

              {/* Verified GitHub Repository */}
              <a
                href={STUDIO_DETAILS.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                title="Vertiligence AI on GitHub"
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px]">GitHub Repo</span>
              </a>
            </div>
          </div>

          {/* Col 2: Capabilities & Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Solutions & Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('custom-software')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Custom Business Software
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('web-development')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Web & Digital Experiences
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('automation')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Intelligent Workflow Automation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('ai-assistants')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  AI Assistants & Support
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('system-integration')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  API & System Integration
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('analytics')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Business Intelligence & Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Architecture & Journey
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#challenges"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#challenges')
                  }}
                  className="hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Business Challenges
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#services')
                  }}
                  className="hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Core Capabilities
                </a>
              </li>
              <li>
                <a
                  href="#ecosystem"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#ecosystem')
                  }}
                  className="hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Connected Ecosystem
                </a>
              </li>
              <li>
                <a
                  href="#audit"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#audit')
                  }}
                  className="hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Process Audit & Advisory
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#portfolio')
                  }}
                  className="hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Prototypes & Pipelines
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#industries')
                  }}
                  className="hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Industries We Serve
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#process')
                  }}
                  className="hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  How We Deliver
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#faq')
                  }}
                  className="hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Client FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick('#contact')
                  }}
                  className="hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  Consultation & Scoping
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Headquarters
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vertiligence AI is an independent business technology company based in India.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
