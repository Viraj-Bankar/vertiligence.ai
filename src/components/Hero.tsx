import React from 'react'
import { HeroVisual } from './HeroVisual'
import { ArrowRight, MessageSquare, ShieldCheck, Cpu, Code2, LayoutDashboard } from 'lucide-react'

interface HeroProps {
  onExploreServices: () => void
  onDiscussProject: () => void
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onDiscussProject,
}) => {
  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden scroll-mt-24"
      aria-labelledby="hero-heading"
    >
      {/* Background gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-transparent rounded-full blur-[120px] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md shadow-lg shadow-cyan-500/10">
            <img src="/logo-emblem.png" alt="" className="w-4 h-4 rounded-full object-cover shrink-0 ring-1 ring-cyan-400" aria-hidden="true" />
            <span>BUSINESS SYSTEMS · WORKFLOW AUTOMATION · AI OPERATIONS</span>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            Less busywork.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              More intelligent business.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-9">
            We help growing organizations connect customer operations, internal workflows, and business intelligence through our Operations Hub software and expert systems integration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onExploreServices}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_30px_rgba(0,210,255,0.3)] hover:shadow-[0_0_35px_rgba(0,210,255,0.5)] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span>Explore Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onDiscussProject}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Discuss Your Operations</span>
            </button>
          </div>

          {/* Strategic Commitments */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-10 mt-10 border-t border-white/10 w-full text-left">
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <LayoutDashboard className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Vertiligence Operations Hub</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Cpu className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Tailored n8n Pipelines</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Code2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Direct Engineering Scoping</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Client Ownership</span>
            </div>
          </div>
        </div>

        {/* Abstract Architecture Visual */}
        <div className="mt-4">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
