import React from 'react'
import { INDUSTRIES_SERVED } from '../data/content'
import type { ServiceId } from '../types'
import {
  Factory,
  ShoppingBag,
  GraduationCap,
  Truck,
  Briefcase,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

interface IndustriesProps {
  onSelectService: (serviceId: ServiceId) => void
}

export const Industries: React.FC<IndustriesProps> = ({ onSelectService }) => {
  const getIndustryIcon = (id: string) => {
    switch (id) {
      case 'manufacturing':
        return <Factory className="w-5 h-5 text-cyan-400" />
      case 'retail-ecommerce':
        return <ShoppingBag className="w-5 h-5 text-blue-400" />
      case 'education-training':
        return <GraduationCap className="w-5 h-5 text-indigo-400" />
      case 'logistics-distribution':
        return <Truck className="w-5 h-5 text-sky-400" />
      case 'professional-services':
        return <Briefcase className="w-5 h-5 text-emerald-400" />
      case 'startups-growing-businesses':
        return <Rocket className="w-5 h-5 text-purple-400" />
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />
    }
  }

  return (
    <section
      id="industries"
      className="py-20 md:py-28 relative scroll-mt-24"
      aria-labelledby="industries-title"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operational Utility Across Sectors</span>
          </div>

          <h2
            id="industries-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Industries We Serve
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Our engineering approach adapts to diverse operational workflows. Here are realistic examples of how we connect systems, automate handoffs, and engineer custom tools across key industry verticals.
          </p>
        </div>

        {/* 6 Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {INDUSTRIES_SERVED.map((ind) => (
            <div
              key={ind.id}
              className="flex flex-col justify-between rounded-2xl bg-[#090E1A]/90 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 p-7 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 group"
            >
              <div>
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {getIndustryIcon(ind.id)}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {ind.title}
                  </h3>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {ind.summary}
                </p>

                {/* Realistic Examples */}
                <div className="pt-4 border-t border-white/10 mb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                    Engineered Solutions:
                  </span>
                  <ul className="space-y-2">
                    {ind.examples.map((ex, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct CTA */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onSelectService(ind.targetService)}
                  className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-cyan-500/15 hover:text-cyan-200 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Explore Related Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

