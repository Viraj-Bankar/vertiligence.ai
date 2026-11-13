import React from 'react'
import { WHY_VERTILIGENCE } from '../data/content'
import {
  Target,
  Boxes,
  Cpu,
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
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-blue-400" />
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-sky-400" />
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-cyan-300" />
      default:
        return <Zap className="w-5 h-5 text-cyan-400" />
    }
  }

  return (
    <section id="why-us" className="py-20 md:py-28 relative scroll-mt-24" aria-labelledby="why-us-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Core Principles & Differentiation</span>
          </div>
          <h2 id="why-us-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Why Partner With Vertiligence AI
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We are an AI-enabled business systems and automation company built on engineering discipline, direct collaboration, and measurable operational outcomes.
          </p>
        </div>

        {/* 6 Core Strategic Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_VERTILIGENCE.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl bg-[#090E1A]/80 border border-white/10 hover:border-cyan-500/40 p-7 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between"
            >
              <div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
