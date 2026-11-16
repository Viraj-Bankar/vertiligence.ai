import React, { useState } from 'react'
import {
  Layers,
  Workflow,
  BarChart3,
  Bot,
  Globe,
  Database,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react'

export const HeroVisual: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'apps' | 'automation' | 'intelligence'>('all')

  const nodes = [
    {
      id: 1,
      title: 'Custom Business Software',
      category: 'apps',
      role: 'Operations & Portals',
      description: 'Role-based management applications, CRM/ERP workflows, and administrative portals.',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40',
      activeIn: ['all', 'apps'],
    },
    {
      id: 2,
      title: 'Web & Digital Experiences',
      category: 'apps',
      role: 'Client Interfaces',
      description: 'Corporate platforms, customer onboarding hubs, and interactive self-service portals.',
      icon: <Globe className="w-4 h-4 text-blue-400" />,
      color: 'border-blue-500/40 text-blue-300 bg-blue-950/40',
      activeIn: ['all', 'apps'],
    },
    {
      id: 3,
      title: 'Intelligent Automation',
      category: 'automation',
      role: 'n8n Workflow Engine',
      description: 'Multi-step n8n pipelines, webhook triggers, and automated document processing.',
      icon: <Workflow className="w-4 h-4 text-indigo-400" />,
      color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40',
      activeIn: ['all', 'automation'],
    },
    {
      id: 4,
      title: 'AI Assistants & Support',
      category: 'intelligence',
      role: 'Domain-Grounded AI',
      description: '24/7 conversational customer triage, knowledge retrieval, and verified citations.',
      icon: <Bot className="w-4 h-4 text-sky-400" />,
      color: 'border-sky-500/40 text-sky-300 bg-sky-950/40',
      activeIn: ['all', 'intelligence'],
    },
    {
      id: 5,
      title: 'API & System Integration',
      category: 'automation',
      role: 'Bi-Directional Sync',
      description: 'Unified connectors linking databases, legacy tools, payment gateways, and SaaS apps.',
      icon: <Database className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40',
      activeIn: ['all', 'automation'],
    },
    {
      id: 6,
      title: 'Business Intelligence',
      category: 'intelligence',
      role: 'Executive KPI Analytics',
      description: 'Real-time telemetry, Power BI views, conversion velocity, and operational reporting.',
      icon: <BarChart3 className="w-4 h-4 text-purple-400" />,
      color: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
      activeIn: ['all', 'intelligence'],
    },
  ]

  const activeNodeData = selectedNode ? nodes.find((n) => n.id === selectedNode) : null

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Ambient background glow */}
      <div
        className="absolute -inset-4 bg-gradient-to-r from-cyan-500/15 via-blue-600/10 to-indigo-600/10 rounded-3xl blur-2xl -z-10 opacity-70 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main glass frame */}
      <div className="relative bg-[#090D18]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Subtle interior tech grid */}
        <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />

        {/* Header telemetry & interactive layer filter */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Intelligent Business Ecosystem Fabric
            </span>
          </div>

          {/* Layer Filter Tabs */}
          <div
            role="tablist"
            aria-label="Ecosystem layer filters"
            className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 text-xs w-full sm:w-auto overflow-x-auto"
          >
            {[
              { id: 'all', label: 'All Ecosystem' },
              { id: 'apps', label: 'Apps & Web' },
              { id: 'automation', label: 'Automation' },
              { id: 'intelligence', label: 'Intelligence' },
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={activeFilter === tab.id}
                onClick={() => {
                  setActiveFilter(tab.id as typeof activeFilter)
                  setSelectedNode(null)
                }}
                className={`px-2.5 py-1 rounded-md font-medium text-xs whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                  activeFilter === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Central Ecosystem Diagram Matrix */}
        <div className="relative z-10">
          {/* Central Orchestrator Banner */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-cyan-950/40 to-slate-900/60 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black/60 border border-cyan-400/50 flex items-center justify-center p-1.5 shrink-0 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
                <img src="/logo-emblem.webp" alt="" className="w-full h-full object-cover rounded-md" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ecosystem Orchestration Core</span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Synchronizing data, applications, automated pipelines, and decision intelligence.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bidirectional Data Flow</span>
            </div>
          </div>

          {/* 6 Connected Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {nodes.map((node) => {
              const isDimmed = !node.activeIn.includes(activeFilter)
              const isSelected = selectedNode === node.id

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNode(isSelected ? null : node.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isSelected
                      ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.2)] ring-1 ring-cyan-400/50'
                      : isDimmed
                      ? 'bg-slate-900/40 border-white/5 opacity-40 hover:opacity-75'
                      : 'bg-slate-900/80 border-white/10 hover:border-cyan-500/40 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      {node.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border border-white/10 text-slate-400 bg-white/5">
                      {node.role}
                    </span>
                  </div>

                  <h5 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                    {node.title}
                  </h5>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {node.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                    <span>{isSelected ? 'Viewing Component' : 'Inspect Role'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Node Detailed Inspector */}
          {activeNodeData && (
            <div className="mt-4 p-4 rounded-xl bg-[#0B1224] border border-cyan-500/40 animate-in fade-in duration-200 text-xs text-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">
                    {activeNodeData.title} · {activeNodeData.role}
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {activeNodeData.description} Connected directly to the centralized data fabric to eliminate manual data entry.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="self-end sm:self-auto px-3 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-white bg-white/5 border border-white/10"
              >
                Close View
              </button>
            </div>
          )}
        </div>

        {/* Bottom Technical Assurance Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Interoperable Architecture</span>
            <span className="text-slate-600">·</span>
            <span>REST/GraphQL, n8n, React 19 & Power BI</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">
            Zero vendor lock-in · Scalable foundations
          </span>
        </div>
      </div>
    </div>
  )
}
