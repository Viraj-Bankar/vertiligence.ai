import React, { useState } from 'react'
import { FAQ_ITEMS } from '../data/content'
import {
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Sparkles,
} from 'lucide-react'
import { trackContactCtaClick } from '../analytics'

interface FAQProps {
  onDiscussClick: () => void
}

export const FAQ: React.FC<FAQProps> = ({ onDiscussClick }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'services-overview': true, // Open the first question by default
  })
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = ['All', 'Services', 'Process & Pricing', 'Data & Ownership']

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {}
    FAQ_ITEMS.forEach((item) => {
      allOpen[item.id] = true
    })
    setOpenIds(allOpen)
  }

  const collapseAll = () => {
    setOpenIds({})
  }

  const filteredItems =
    activeCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory)

  return (
    <section
      id="faq"
      className="py-20 md:py-28 relative scroll-mt-24 border-t border-white/5"
      aria-labelledby="faq-title"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-900/10 via-cyan-900/10 to-transparent rounded-full blur-[140px] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers & Transparency</span>
          </div>

          <h2
            id="faq-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Concise, practical answers about our services, engineering methodology, ownership terms, and project engagements.
          </p>
        </div>

        {/* Filter Controls & Toggle All Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Expand/Collapse All Action */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              type="button"
              onClick={expandAll}
              className="hover:text-cyan-400 transition-colors cursor-pointer focus:outline-none focus-visible:underline"
            >
              Expand all
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={collapseAll}
              className="hover:text-cyan-400 transition-colors cursor-pointer focus:outline-none focus-visible:underline"
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredItems.map((item, index) => {
            const isOpen = !!openIds[item.id]
            const categoryBadgeStyles =
              item.category === 'Services'
                ? 'text-cyan-300 bg-cyan-950/60 border-cyan-500/30'
                : item.category === 'Process & Pricing'
                ? 'text-blue-300 bg-blue-950/60 border-blue-500/30'
                : 'text-emerald-300 bg-emerald-950/60 border-emerald-500/30'

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#090E1A]/95 border-cyan-500/35 shadow-lg shadow-cyan-500/5'
                    : 'bg-[#090E1A]/60 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Question Trigger Button */}
                <button
                  type="button"
                  id={`faq-question-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-4.5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-400 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-base font-semibold transition-colors ${
                        isOpen ? 'text-cyan-300' : 'text-white'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {item.category && (
                      <span
                        className={`hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${categoryBadgeStyles}`}
                      >
                        {item.category}
                      </span>
                    )}
                    <div
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${
                        isOpen
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 rotate-180'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Collapsible Answer Region */}
                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    className="px-5 sm:px-6 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Post-FAQ Scoping Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-[#090E1A] border border-cyan-500/25 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Have a specific architectural or technical constraint?</span>
            </h4>
            <p className="text-xs text-slate-400 max-w-xl">
              We discuss real workflow bottlenecks and provide honest feasibility recommendations before any commercial commitment.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              trackContactCtaClick({
                cta_location: 'faq',
                cta_label: 'Discuss Your Project',
              })
              onDiscussClick()
            }}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-cyan-500/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Discuss Your Project</span>
          </button>
        </div>
      </div>
    </section>
  )
}
