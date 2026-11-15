import React, { useState } from 'react'
import { SERVICES } from '../data/content'
import type { ServiceId } from '../types'
import { trackServiceView, trackContactCtaClick } from '../analytics'
import {
  Layers,
  Globe,
  Workflow,
  Bot,
  Database,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

interface ServicesProps {
  onSelectService: (serviceId: ServiceId) => void
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [expandedId, setExpandedId] = useState<ServiceId | null>(null)

  const getServiceIcon = (id: ServiceId) => {
    switch (id) {
      case 'custom-software':
      case 'operations-hub':
        return <Layers className="w-6 h-6 text-cyan-400" />
      case 'web-development':
        return <Globe className="w-6 h-6 text-blue-400" />
      case 'automation':
        return <Workflow className="w-6 h-6 text-indigo-400" />
      case 'ai-assistants':
      case 'chatbots':
      case 'chatbot':
        return <Bot className="w-6 h-6 text-sky-400" />
      case 'system-integration':
      case 'implementation':
        return <Database className="w-6 h-6 text-emerald-400" />
      case 'analytics':
      case 'dashboard':
        return <BarChart3 className="w-6 h-6 text-purple-400" />
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />
    }
  }

  const getAccentStyles = (id: ServiceId) => {
    switch (id) {
      case 'custom-software':
      case 'operations-hub':
        return {
          border: 'border-cyan-500/30 hover:border-cyan-400/60',
          glow: 'group-hover:shadow-[0_0_35px_rgba(0,210,255,0.18)]',
          badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          btnBg: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-cyan-500/20',
          iconBg: 'bg-cyan-950/70 border-cyan-500/40',
        }
      case 'web-development':
        return {
          border: 'border-blue-500/30 hover:border-blue-400/60',
          glow: 'group-hover:shadow-[0_0_35px_rgba(59,130,246,0.18)]',
          badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
          btnBg: 'bg-blue-600/20 text-blue-200 border border-blue-500/40 hover:bg-blue-600 hover:text-white',
          iconBg: 'bg-blue-950/70 border-blue-500/40',
        }
      case 'automation':
        return {
          border: 'border-indigo-500/30 hover:border-indigo-400/60',
          glow: 'group-hover:shadow-[0_0_35px_rgba(99,102,241,0.18)]',
          badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
          btnBg: 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40 hover:bg-indigo-600 hover:text-white',
          iconBg: 'bg-indigo-950/70 border-indigo-500/40',
        }
      case 'ai-assistants':
      case 'chatbots':
        return {
          border: 'border-sky-500/30 hover:border-sky-400/60',
          glow: 'group-hover:shadow-[0_0_35px_rgba(56,189,248,0.18)]',
          badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
          btnBg: 'bg-sky-600/20 text-sky-200 border border-sky-500/40 hover:bg-sky-600 hover:text-white',
          iconBg: 'bg-sky-950/70 border-sky-500/40',
        }
      case 'system-integration':
      case 'implementation':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-400/60',
          glow: 'group-hover:shadow-[0_0_35px_rgba(16,185,129,0.18)]',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          btnBg: 'bg-emerald-600/20 text-emerald-200 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white',
          iconBg: 'bg-emerald-950/70 border-emerald-500/40',
        }
      case 'analytics':
      case 'dashboard':
        return {
          border: 'border-purple-500/30 hover:border-purple-400/60',
          glow: 'group-hover:shadow-[0_0_35px_rgba(168,85,247,0.18)]',
          badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
          btnBg: 'bg-purple-600/20 text-purple-200 border border-purple-500/40 hover:bg-purple-600 hover:text-white',
          iconBg: 'bg-purple-950/70 border-purple-500/40',
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
    <section
      id="services"
      className="py-20 md:py-28 relative scroll-mt-24"
      aria-labelledby="services-title"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-900/10 rounded-full blur-[140px] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Capabilities & Digital Solutions</span>
          </div>
          <h2
            id="services-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Technology That Moves Your Business Forward.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We engineer connected digital solutions through custom software, intelligent automation, AI and business intelligence — designed around actual business workflows to eliminate friction and drive measurable outcomes.
          </p>
        </div>

        {/* 6 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const styles = getAccentStyles(service.id)
            const isExpanded = expandedId === service.id

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

                  {/* Short Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Business Benefit Callout */}
                  <div className="mb-6 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/25 text-xs text-slate-200">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1 text-[11px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Business Benefit</span>
                    </div>
                    <p className="leading-relaxed text-slate-300">{service.benefit}</p>
                  </div>

                  {/* Key Capabilities List */}
                  <div className="pt-4 border-t border-white/10 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Key Capabilities:
                      </span>
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : service.id)}
                        className="text-xs font-mono text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer focus:outline-none"
                      >
                        <span>{isExpanded ? 'Show Less' : 'View All'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <ul className="space-y-2">
                      {(isExpanded ? service.capabilities : service.capabilities.slice(0, 3)).map(
                        (cap, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      trackServiceView({
                        service_id: service.id,
                        service_name: service.title,
                        source: 'card_click',
                      })
                      trackContactCtaClick({
                        cta_location: 'services',
                        cta_label: service.ctaText || 'Discuss This Service',
                        target_service: service.id,
                      })
                      onSelectService(service.id)
                    }}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${styles.btnBg}`}
                  >
                    <span>{service.ctaText || 'Discuss This Service'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Preselects this solution in consultation brief
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Consulting Banner Handshake */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/30 via-[#0B1120] to-cyan-950/30 border border-cyan-500/20 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left">
            <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider font-semibold mb-1">
              Multi-Service Coordination
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Need a multi-part solution or not sure where to start?
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              We frequently connect custom software with n8n automated pipelines and executive BI reporting into a single coordinated ecosystem.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectService('custom-software')}
            className="shrink-0 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-cyan-500/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 whitespace-nowrap"
          >
            Schedule Scoping Consultation →
          </button>
        </div>
      </div>
    </section>
  )
}
