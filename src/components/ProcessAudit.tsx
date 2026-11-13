import React from 'react'
import { PROCESS_AUDIT_POINTS } from '../data/content'
import {
  ArrowRight,
  ShieldAlert,
  Search,
} from 'lucide-react'

interface ProcessAuditProps {
  onDiscussClick: () => void
}

export const ProcessAudit: React.FC<ProcessAuditProps> = ({ onDiscussClick }) => {
  return (
    <section
      id="audit"
      className="py-20 md:py-28 relative scroll-mt-24"
      aria-labelledby="audit-title"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-blue-700/5 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container with premium consulting border */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0B1124] to-[#070B16] border border-cyan-500/25 p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle tech grid inside */}
          <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading & Advisory Proposition */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <Search className="w-3.5 h-3.5" />
                <span>Operational Discovery & Advisory</span>
              </div>

              <h2
                id="audit-title"
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
              >
                Not Sure What Your Business Needs?
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                You don&apos;t need to arrive with fully drafted technical specifications. Our engineers first understand your actual daily operations, uncover where manual work creates friction, and recommend the right technology approach.
              </p>

              {/* Consultation CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onDiscussClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.25)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Discuss Your Business Challenges</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-slate-400 mt-2.5">
                  Direct conversation with a systems architect · No sales pressure
                </p>
              </div>
            </div>

            {/* Right Column: 5 Diagnostic Focus Steps */}
            <div className="lg:col-span-7 space-y-3">
              {PROCESS_AUDIT_POINTS.map((pt) => (
                <div
                  key={pt.step}
                  className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition-all duration-200 flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {pt.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {pt.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Scope Guardrail Notice */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-start sm:items-center gap-3 text-xs text-slate-400 relative z-10">
            <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="leading-relaxed">
              <strong>Advisory Scope Note:</strong> Our process assessments focus exclusively on workflow efficiency, software architecture, and technology integration. We do not provide formal legal, financial, accounting, or statutory regulatory audits.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
