import React, { useState } from 'react'
import {
  Workflow,
  BarChart3,
  Bot,
  Layers,
  Database,
  CheckCircle2,
  Zap,
} from 'lucide-react'

export const HeroVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflows' | 'insights' | 'chatbots'>('workflows')

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
      {/* Ambient background glow */}
      <div
        className="absolute -inset-4 bg-gradient-to-r from-cyan-500/15 via-blue-600/15 to-indigo-600/10 rounded-3xl blur-2xl -z-10 opacity-70 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main glass frame */}
      <div className="relative bg-[#090D18]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Subtle interior grid */}
        <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />

        {/* Header telemetry bar */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Vertiligence Architecture Pipeline
            </span>
          </div>

          {/* Interactive view selector tabs */}
          <div
            role="tablist"
            aria-label="Architecture visualization modes"
            className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 text-xs"
          >
            <button
              id="tab-workflows"
              role="tab"
              aria-selected={activeTab === 'workflows'}
              aria-controls="visual-panel"
              type="button"
              onClick={() => setActiveTab('workflows')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                activeTab === 'workflows'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Workflows
            </button>
            <button
              id="tab-insights"
              role="tab"
              aria-selected={activeTab === 'insights'}
              aria-controls="visual-panel"
              type="button"
              onClick={() => setActiveTab('insights')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                activeTab === 'insights'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Insights
            </button>
            <button
              id="tab-chatbots"
              role="tab"
              aria-selected={activeTab === 'chatbots'}
              aria-controls="visual-panel"
              type="button"
              onClick={() => setActiveTab('chatbots')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                activeTab === 'chatbots'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Chatbots
            </button>
          </div>
        </div>

        {/* Interactive Dynamic Graphic Node System */}
        <div
          id="visual-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="relative z-10"
        >
          {/* SVG Pipeline Connection Overlay */}
          <div className="hidden sm:block absolute inset-0 pointer-events-none -z-0">
            <svg className="w-full h-full" viewBox="0 0 600 240" fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flow-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Connecting bezier paths */}
              <path
                d="M 180 60 C 240 60, 260 120, 310 120"
                stroke="url(#flow-gradient-1)"
                strokeWidth="2"
                className="animate-signal"
              />
              <path
                d="M 180 180 C 240 180, 260 120, 310 120"
                stroke="url(#flow-gradient-1)"
                strokeWidth="2"
                className="animate-signal"
              />
              <path
                d="M 390 120 C 440 120, 460 60, 500 60"
                stroke="url(#flow-gradient-1)"
                strokeWidth="2"
                className="animate-signal"
              />
              <path
                d="M 390 120 C 440 120, 460 180, 500 180"
                stroke="url(#flow-gradient-1)"
                strokeWidth="2"
                className="animate-signal"
              />
            </svg>
          </div>

          {/* 3-Column Visual Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Column 1: Inbound Triggers / Data Inputs */}
            <div className="flex flex-col gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-md group">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    {activeTab === 'workflows' && 'Webhook & Form Intake'}
                    {activeTab === 'insights' && 'Excel, CSV & SQL Sources'}
                    {activeTab === 'chatbots' && 'Customer Inquiries & FAQs'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Raw payload captured</span>
                  <span className="font-mono text-cyan-400 text-[10px]">Real-time</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    {activeTab === 'workflows' && 'API Integration Nodes'}
                    {activeTab === 'insights' && 'Data Cleaning Pipeline'}
                    {activeTab === 'chatbots' && 'Knowledge Base Grounding'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Standardized Schema</span>
                  <span className="font-mono text-emerald-400 text-[10px]">100% Verified</span>
                </div>
              </div>
            </div>

            {/* Column 2: Central Orchestrator Engine */}
            <div className="relative py-2 sm:py-0">
              <div className="relative p-5 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(0,210,255,0.2)] text-center">
                {/* Glowing status bead */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950 uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                  <span>Operations Engine</span>
                </div>

                <div className="w-14 h-14 mx-auto rounded-xl overflow-hidden border border-cyan-400/40 shadow-[0_0_20px_rgba(0,210,255,0.35)] mb-3 mt-1 bg-black">
                  <img
                    src="/logo-emblem.png"
                    alt="Vertiligence AI Core Engine"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="text-sm font-bold text-white mb-1">
                  Vertiligence AI
                </h4>

                <p className="text-[11px] text-slate-300 leading-snug mb-3">
                  {activeTab === 'workflows' && 'n8n workflow logic, routing rules & error guards'}
                  {activeTab === 'insights' && 'Automated metric aggregation & KPI calculations'}
                  {activeTab === 'chatbots' && 'Contextual response generator with human escalation'}
                </p>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Deterministic execution</span>
                </div>
              </div>
            </div>

            {/* Column 3: Impact Outcomes */}
            <div className="flex flex-col gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Workflow className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    {activeTab === 'workflows' && 'Automated Sync & Alerts'}
                    {activeTab === 'insights' && 'Executive KPI Visuals'}
                    {activeTab === 'chatbots' && 'Instant Verified Answers'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Manual delay avoided</span>
                  <span className="font-mono text-cyan-400 text-[10px]">Zero Latency</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    {activeTab === 'workflows' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : activeTab === 'insights' ? (
                      <BarChart3 className="w-3.5 h-3.5" />
                    ) : (
                      <Bot className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    {activeTab === 'workflows' && 'Clean Audit Trail'}
                    {activeTab === 'insights' && 'Actionable Decision View'}
                    {activeTab === 'chatbots' && 'Human Escalation Ready'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Operations simplified</span>
                  <span className="font-mono text-emerald-400 text-[10px]">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer telemetry note */}
        <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="text-cyan-400">●</span>
            <span>Production-grade n8n, Operations Hub & BI Dashboards</span>
            <span className="text-slate-600">|</span>
            <span>Zero speculative wrappers</span>
          </div>
          <div className="font-mono text-[10px] text-slate-400">
            Engineered for reliability
          </div>
        </div>
      </div>
    </div>
  )
}
