import React, { useState } from 'react'
import { PORTFOLIO_DEMOS } from '../data/content'
import type { PortfolioItem } from '../types'
import { PortfolioModal } from './PortfolioModal'
import {
  Workflow,
  Bot,
  BarChart3,
  Code2,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react'


export const Portfolio: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const getDemoIcon = (id: string) => {
    switch (id) {
      case 'leadflow':
        return <Workflow className="w-5 h-5 text-cyan-400" />
      case 'faqmate':
        return <Bot className="w-5 h-5 text-indigo-400" />
      case 'insightboard':
        return <BarChart3 className="w-5 h-5 text-blue-400" />
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />
    }
  }

  return (
    <section id="portfolio" className="py-20 md:py-28 relative" aria-labelledby="portfolio-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Info className="w-3.5 h-3.5" />
            <span>Technical Prototypes & Planned Demos</span>
          </div>
          <h2 id="portfolio-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Portfolio In Progress
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Transparent architectural blueprints and sandbox demonstrations engineered to showcase our automation logic, data modeling, and conversational design.
          </p>
          <div className="mt-3 inline-block text-xs font-mono text-cyan-400/90 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/10">
            Note: These cards represent active internal demonstrations, not fabricated client claims.
          </div>
        </div>

        {/* 3 Initial Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_DEMOS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl bg-[#090E1A]/90 border border-white/10 hover:border-cyan-500/40 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 group"
            >
              <div>
                {/* Header status badge & category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
                    {getDemoIcon(item.id)}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Demo in development</span>
                  </span>
                </div>

                {/* Title & Category */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-4">
                  {item.category}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-white/10 mb-6">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                    Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Inspect Architecture & Specs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Clean modular code</span>
                  </div>
                  <span className="font-mono text-slate-400">Sandbox slot ready</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Open Architecture Note */}
        <div className="mt-14 max-w-2xl mx-auto text-center p-5 rounded-2xl bg-slate-900/40 border border-white/5 text-xs text-slate-400">
          Want to discuss how one of these architectural pipelines could adapt to your company&apos;s custom data schemas?{' '}
          <a
            href="#contact"
            className="text-cyan-400 hover:underline font-semibold"
          >
            Schedule a scoping conversation →
          </a>
        </div>
      </div>

      {/* Portfolio Detail Modal */}
      <PortfolioModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  )
}
