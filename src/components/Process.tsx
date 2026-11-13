import React from 'react'
import { PROCESS_STEPS } from '../data/content'
import { Search, Compass, Wrench, Rocket, CheckCircle2, Clock } from 'lucide-react'

export const Process: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Search className="w-5 h-5 text-blue-600" />
      case 1:
        return <Compass className="w-5 h-5 text-cyan-600" />
      case 2:
        return <Wrench className="w-5 h-5 text-indigo-600" />
      case 3:
        return <Rocket className="w-5 h-5 text-emerald-600" />
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />
    }
  }

  return (
    <section
      id="process"
      className="py-20 md:py-28 bg-[#F8FAFC] text-slate-900 relative border-y border-slate-200"
      aria-labelledby="process-title"
    >
      {/* Subtle light grid pattern */}
      <div className="absolute inset-0 light-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Engineering Methodology</span>
          </div>
          <h2 id="process-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How We Work
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A transparent, four-phase delivery model that eliminates uncertainty, sets firm technical boundaries, and ensures you retain full ownership.
          </p>
        </div>

        {/* Desktop Horizontal Timeline (Visible on lg screens) */}
        <div className="hidden lg:block relative mb-12">
          {/* Horizontal connecting track line */}
          <div
            className="absolute top-10 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-blue-300 via-cyan-400 to-emerald-400 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="flex flex-col bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300"
              >
                {/* Node Step Marker */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border-2 border-blue-500/20 shadow-sm flex items-center justify-center font-bold text-slate-900">
                    {getStepIcon(idx)}
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-300">
                    {step.step}
                  </span>
                </div>

                {/* Step Title & Summary */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-grow">
                  {step.summary}
                </p>

                {/* Deliverables list */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Key Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Typical timeline tag */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Timeline: {step.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline (Visible below lg) */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-8">
          {/* Vertical spine line */}
          <div
            className="absolute top-4 bottom-4 left-3 sm:left-4 w-0.5 bg-gradient-to-b from-blue-400 via-cyan-400 to-emerald-400 -z-0"
            aria-hidden="true"
          />

          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
            >
              {/* Step indicator on vertical line */}
              <div className="absolute -left-[30px] sm:-left-[38px] top-6 w-8 h-8 rounded-full bg-white border-2 border-blue-500 shadow flex items-center justify-center text-xs font-bold text-blue-600">
                {step.step}
              </div>

              <div className="flex items-center gap-2 mb-2">
                {getStepIcon(idx)}
                <h3 className="text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {step.summary}
              </p>

              <div className="pt-3 border-t border-slate-100 mb-3">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">
                  Deliverables:
                </span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {step.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated duration: {step.timeline}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality commitment callout */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              No long-term platform lock-ins
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Workflows run in your own n8n or cloud instances. Dashboards connect to your data stores. Credentials are yours.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3.5 py-2 rounded-lg border border-blue-200 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Documented & Handed Over</span>
          </div>
        </div>
      </div>
    </section>
  )
}
