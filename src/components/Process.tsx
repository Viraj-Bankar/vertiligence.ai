import React from 'react'
import { PROCESS_STEPS } from '../data/content'
import { Stethoscope, Compass, Wrench, ShieldCheck, Rocket, CheckCircle2, Clock } from 'lucide-react'

export const Process: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Stethoscope className="w-5 h-5 text-blue-700" />
      case 1:
        return <Compass className="w-5 h-5 text-cyan-700" />
      case 2:
        return <Wrench className="w-5 h-5 text-indigo-700" />
      case 3:
        return <ShieldCheck className="w-5 h-5 text-emerald-700" />
      case 4:
        return <Rocket className="w-5 h-5 text-purple-700" />
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-700" />
    }
  }

  return (
    <section
      id="process"
      className="py-20 md:py-28 bg-[#F8FAFC] text-slate-900 relative border-y border-slate-200 scroll-mt-24"
      aria-labelledby="process-title"
    >
      {/* Subtle light grid pattern */}
      <div className="absolute inset-0 light-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Engineering & Delivery Lifecycle</span>
          </div>
          <h2 id="process-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How We Deliver
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            A disciplined, five-phase operating methodology from operational diagnosis to production validation and SLA-backed adoption.
          </p>
        </div>

        {/* Desktop Horizontal Timeline (Visible on lg screens) */}
        <div className="hidden lg:block relative mb-12">
          {/* Horizontal connecting track line */}
          <div
            className="absolute top-10 left-[6%] right-[6%] h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 via-emerald-400 to-purple-400 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="flex flex-col bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300"
              >
                {/* Node Step Marker */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border-2 border-blue-500/20 shadow-sm flex items-center justify-center font-bold text-slate-900">
                    {getStepIcon(idx)}
                  </div>
                  <span className="font-mono text-xl font-black text-slate-400">
                    {step.step}
                  </span>
                </div>

                {/* Step Title & Summary */}
                <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed mb-4 flex-grow">
                  {step.summary}
                </p>

                {/* Deliverables list */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-800 mb-2">
                    Key Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-800 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Typical timeline tag */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                  <span>Timeline: {step.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline (Visible below lg) */}
        <div className="lg:hidden relative pl-8 sm:pl-10 space-y-8">
          {/* Vertical spine line */}
          <div
            className="absolute top-4 bottom-4 left-4 sm:left-5 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 via-emerald-500 to-purple-500 -z-0"
            aria-hidden="true"
          />

          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm ml-2"
            >
              {/* Step indicator on vertical line */}
              <div className="absolute -left-[38px] sm:-left-[44px] top-6 w-8 h-8 rounded-full bg-white border-2 border-blue-600 shadow flex items-center justify-center text-xs font-bold text-blue-700">
                {step.step}
              </div>

              <div className="flex items-center gap-2 mb-2">
                {getStepIcon(idx)}
                <h3 className="text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
              </div>

              <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                {step.summary}
              </p>

              <div className="pt-3 border-t border-slate-100 mb-3">
                <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-2">
                  Key Deliverables:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-800">
                  {step.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                <Clock className="w-3.5 h-3.5 text-slate-600" />
                <span>Estimated duration: {step.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
