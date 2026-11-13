import React from 'react'
import { PROCESS_STEPS } from '../data/content'
import { Stethoscope, Compass, Wrench, ShieldCheck, Rocket, CheckCircle2, Clock } from 'lucide-react'

export const Process: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Stethoscope className="w-5 h-5 text-blue-400" />
      case 1:
        return <Compass className="w-5 h-5 text-cyan-400" />
      case 2:
        return <Wrench className="w-5 h-5 text-indigo-400" />
      case 3:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />
      case 4:
        return <Rocket className="w-5 h-5 text-purple-400" />
      default:
        return <CheckCircle2 className="w-5 h-5 text-cyan-400" />
    }
  }

  return (
    <section
      id="process"
      className="py-20 md:py-28 bg-gradient-to-b from-[#07090E] via-[#090E1A] to-[#07090E] text-slate-100 relative border-y border-white/10 scroll-mt-24"
      aria-labelledby="process-title"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Engineering & Delivery Lifecycle</span>
          </div>
          <h2 id="process-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            How We Deliver
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            A disciplined, five-phase operating methodology from operational diagnosis to production validation and SLA-backed adoption.
          </p>
        </div>

        {/* Desktop Horizontal Timeline (Visible on lg screens) */}
        <div className="hidden lg:block relative mb-12">
          {/* Horizontal connecting track line */}
          <div
            className="absolute top-10 left-[6%] right-[6%] h-0.5 bg-gradient-to-r from-blue-500/40 via-cyan-400/50 via-emerald-400/40 to-purple-500/40 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="flex flex-col bg-[#0B1120]/90 backdrop-blur-sm rounded-2xl p-5 border border-white/10 shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-400/40 hover:bg-[#0E172C] transition-all duration-300"
              >
                {/* Node Step Marker */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 shadow-sm flex items-center justify-center font-bold">
                    {getStepIcon(idx)}
                  </div>
                  <span className="font-mono text-xl font-bold text-slate-400">
                    {step.step}
                  </span>
                </div>

                {/* Step Title & Summary */}
                <h3 className="text-lg font-bold text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 flex-grow">
                  {step.summary}
                </p>

                {/* Deliverables list */}
                <div className="pt-3 border-t border-white/10">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Key Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-300 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Typical timeline tag */}
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-medium text-cyan-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
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
            className="absolute top-4 bottom-4 left-4 sm:left-5 w-0.5 bg-gradient-to-b from-blue-500/50 via-cyan-400/50 via-emerald-400/50 to-purple-500/50 -z-0"
            aria-hidden="true"
          />

          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-[#0B1120]/90 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg ml-2"
            >
              {/* Step indicator on vertical line */}
              <div className="absolute -left-[38px] sm:-left-[44px] top-6 w-8 h-8 rounded-full bg-[#090E1A] border-2 border-cyan-400 shadow-md flex items-center justify-center text-xs font-bold text-cyan-300">
                {step.step}
              </div>

              <div className="flex items-center gap-2 mb-2">
                {getStepIcon(idx)}
                <h3 className="text-lg font-bold text-white">
                  {step.title}
                </h3>
              </div>

              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                {step.summary}
              </p>

              <div className="pt-3 border-t border-white/10 mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Key Deliverables:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {step.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-medium">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Estimated duration: {step.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
