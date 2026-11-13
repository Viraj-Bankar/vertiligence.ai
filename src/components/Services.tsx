import React from 'react'
import { SERVICES } from '../data/content'
import type { ServiceId } from '../types'

import {
  Workflow,
  BarChart3,
  Bot,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

interface ServicesProps {
  onSelectService: (serviceId: ServiceId) => void
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getServiceIcon = (id: ServiceId) => {
    switch (id) {
      case 'automation':
        return <Workflow className="w-6 h-6 text-cyan-400" />
      case 'dashboard':
        return <BarChart3 className="w-6 h-6 text-blue-400" />
      case 'chatbot':
        return <Bot className="w-6 h-6 text-indigo-400" />
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />
    }
  }

  const getCardAccentStyles = (id: ServiceId) => {
    switch (id) {
      case 'automation':
        return {
          border: 'border-cyan-500/20 hover:border-cyan-400/50',
          glow: 'group-hover:shadow-[0_0_40px_rgba(0,210,255,0.18)]',
          badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          btnBg: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950',
          iconBg: 'bg-cyan-950/70 border-cyan-500/30',
        }
      case 'dashboard':
        return {
          border: 'border-blue-500/20 hover:border-blue-400/50',
          glow: 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.18)]',
          badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
          btnBg: 'bg-blue-500/15 text-blue-300 border border-blue-500/30 hover:bg-blue-600 hover:text-white',
          iconBg: 'bg-blue-950/70 border-blue-500/30',
        }
      case 'chatbot':
        return {
          border: 'border-indigo-500/20 hover:border-indigo-400/50',
          glow: 'group-hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]',
          badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
          btnBg: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white',
          iconBg: 'bg-indigo-950/70 border-indigo-500/30',
        }
      default:
        return {
          border: 'border-white/10 hover:border-white/30',
          glow: '',
          badgeBg: 'bg-white/10 text-slate-300 border-white/20',
          btnBg: 'bg-white/10 text-white',
          iconBg: 'bg-slate-900 border-white/20',
        }
    }
  }

  return (
    <section id="services" className="py-20 md:py-28 relative" aria-labelledby="services-title">
      {/* Background ambient light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-900/10 rounded-full blur-[140px] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Specialized Capabilities</span>
          </div>
          <h2 id="services-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Practical AI & Data Services
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Focused engineering solutions designed to eliminate repetitive administrative burden, clarify numbers, and modernize user touchpoints.
          </p>
        </div>

        {/* 3 Distinct Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const styles = getCardAccentStyles(service.id)
            return (
              <div
                key={service.id}
                className={`group relative flex flex-col justify-between rounded-2xl bg-[#090E1A]/90 backdrop-blur-md border ${styles.border} p-7 sm:p-8 transition-all duration-300 ${styles.glow} hover:-translate-y-1`}
              >
                <div>
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl ${styles.iconBg} border flex items-center justify-center shadow-inner`}
                    >
                      {getServiceIcon(service.id)}
                    </div>
                    <span
                      className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${styles.badgeBg}`}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet examples list */}
                  <div className="pt-5 border-t border-white/10 mb-8">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3.5">
                      Common Applications:
                    </div>
                    <ul className="space-y-2.5">
                      {service.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${styles.btnBg}`}
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Preselects this service in our project enquiry form
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Integration notice */}
        <div className="mt-14 p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white">Need an integrated, multi-part solution?</h4>
            <p className="text-xs text-slate-400">
              We frequently connect workflow automation directly into custom BI dashboards and AI inquiry triage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectService('integrated')}
            className="shrink-0 px-4 py-2 rounded-lg text-xs font-semibold text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors cursor-pointer"
          >
            Discuss Custom Scope →
          </button>
        </div>
      </div>
    </section>
  )
}
