import React from 'react'
import { BUSINESS_CHALLENGES } from '../data/content'
import type { ServiceId } from '../types'
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

interface ChallengesProps {
  onSelectService: (serviceId: ServiceId) => void
}

export const Challenges: React.FC<ChallengesProps> = ({ onSelectService }) => {
  return (
    <section
      id="challenges"
      className="py-20 md:py-28 relative scroll-mt-24"
      aria-labelledby="challenges-title"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Problem & Solution Engineering</span>
          </div>

          <h2
            id="challenges-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Business Challenges. Engineered Solutions.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Modern organizations struggle with fragmented applications, repetitive manual operations, and delayed reporting. We replace operational friction with dependable, connected technology.
          </p>
        </div>

        {/* 6 Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BUSINESS_CHALLENGES.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl bg-[#090E1A]/90 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 group"
            >
              <div>
                {/* Number & Title */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <span className="font-mono text-xl font-black text-cyan-400">
                    {item.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    Challenge & Fix
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>

                {/* Challenge description */}
                <div className="mb-4 p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-slate-300 leading-relaxed">
                  <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1 text-[11px] uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>The Operational Problem</span>
                  </div>
                  <p>{item.challenge}</p>
                </div>

                {/* Engineered solution */}
                <div className="p-3.5 rounded-xl bg-cyan-950/25 border border-cyan-500/25 text-xs text-slate-200 leading-relaxed mb-6">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1 text-[11px] uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                    <span>Our Engineered Solution</span>
                  </div>
                  <p>{item.solution}</p>
                </div>
              </div>

              {/* Direct CTA */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onSelectService(item.serviceTarget)}
                  className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-cyan-500/15 hover:text-cyan-200 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>{item.ctaLabel}</span>
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

