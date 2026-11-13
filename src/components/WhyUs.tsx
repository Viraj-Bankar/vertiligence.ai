import React from 'react'
import { WHY_VERTILIGENCE } from '../data/content'
import {
  Target,
  MessageSquareCheck,
  Boxes,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react'

export const WhyUs: React.FC = () => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-5 h-5 text-cyan-400" />
      case 'MessageSquareCheck':
        return <MessageSquareCheck className="w-5 h-5 text-blue-400" />
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-indigo-400" />
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-emerald-400" />
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-sky-400" />
      default:
        return <Zap className="w-5 h-5 text-cyan-400" />
    }
  }

  return (
    <section id="why-us" className="py-20 md:py-28 relative" aria-labelledby="why-us-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Honest Principles</span>
          </div>
          <h2 id="why-us-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Why Work With Vertiligence AI
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We are an independent engineering studio focused on pragmatic results. No artificial complexity, no inflated claims, and no opaque intermediaries.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_VERTILIGENCE.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`rounded-2xl bg-[#090E1A]/80 border border-white/10 hover:border-cyan-500/40 p-7 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center mb-5">
                {getPillarIcon(pillar.icon)}
              </div>
              <h3 className="text-xl font-bold text-white mb-2.5">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}

          {/* Direct Commitment Card */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-950/60 to-cyan-950/40 border border-cyan-500/30 p-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-[11px] font-mono mb-4">
                <span>Direct Studio Access</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2.5">
                No Intermediaries
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                From initial discovery call to final deployment handover, you communicate directly with the engineer designing and building your systems.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-cyan-300">
              <span>Fast iterations</span>
              <span>100% Transparency</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
