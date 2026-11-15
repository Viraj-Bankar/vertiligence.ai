import React, { useState } from 'react'
import { ECOSYSTEM_LAYERS } from '../data/content'
import { trackSolutionSelected } from '../analytics'
import {
  Layers,
  Globe,
  Workflow,
  Cpu,
  ShieldCheck,
  ArrowDown,
  Sparkles,
  Info,
} from 'lucide-react'

export const EcosystemArchitecture: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  const getLayerIcon = (layerNum: number) => {
    switch (layerNum) {
      case 1:
        return <Globe className="w-5 h-5 text-cyan-400" />
      case 2:
        return <Layers className="w-5 h-5 text-blue-400" />
      case 3:
        return <Workflow className="w-5 h-5 text-indigo-400" />
      case 4:
        return <Cpu className="w-5 h-5 text-sky-400" />
      case 5:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />
    }
  }

  const getLayerAccent = (layerNum: number) => {
    switch (layerNum) {
      case 1:
        return 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300'
      case 2:
        return 'border-blue-500/30 bg-blue-950/20 text-blue-300'
      case 3:
        return 'border-indigo-500/30 bg-indigo-950/20 text-indigo-300'
      case 4:
        return 'border-sky-500/30 bg-sky-950/20 text-sky-300'
      case 5:
        return 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
      default:
        return 'border-white/20 bg-white/5 text-slate-300'
    }
  }

  return (
    <section
      id="ecosystem"
      className="py-20 md:py-28 relative scroll-mt-24"
      aria-labelledby="ecosystem-title"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Integrated Architecture Framework</span>
          </div>

          <h2
            id="ecosystem-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Connected Technology. Smarter Operations.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Rather than accumulating disconnected SaaS subscriptions, we engineer five coordinated layers that communicate seamlessly—ensuring data moves without manual friction from customer touchpoints to leadership reporting.
          </p>
        </div>

        {/* 5-Layer Connected Stack */}
        <div className="space-y-4 relative">
          {ECOSYSTEM_LAYERS.map((layer, index) => {
            const isLast = index === ECOSYSTEM_LAYERS.length - 1
            const isSelected = activeLayer === layer.layerNumber
            const accent = getLayerAccent(layer.layerNumber)

            return (
              <div key={layer.layerNumber} className="relative">
                {/* Layer Card */}
                <div
                  onClick={() => {
                    const next = isSelected ? null : layer.layerNumber
                    setActiveLayer(next)
                    if (next !== null) {
                      trackSolutionSelected({
                        layer_id: String(layer.layerNumber),
                        layer_name: layer.title,
                      })
                    }
                  }}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B1224] border-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.15)] ring-1 ring-cyan-400/50'
                      : 'bg-[#090E1A]/90 hover:bg-[#0C1428] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Indicator & Titles */}
                    <div className="flex items-start sm:items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${accent}`}
                      >
                        {getLayerIcon(layer.layerNumber)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                            0{layer.layerNumber}
                          </span>
                          <span className="text-slate-600">·</span>
                          <span className="text-xs font-mono text-slate-400">
                            {layer.subtitle}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          {layer.title}
                        </h3>
                      </div>
                    </div>

                    {/* Right: Component Tags */}
                    <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
                      {layer.components.map((comp, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 bg-white/5 border border-white/10"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Descriptive Paragraph */}
                  <div className="mt-3 pt-3 border-t border-white/5 text-xs text-slate-300 leading-relaxed flex items-center justify-between">
                    <p>{layer.description}</p>
                    <span className="text-[11px] font-mono text-cyan-400 shrink-0 ml-4 hidden sm:inline">
                      {isSelected ? 'Click to collapse' : 'Click to inspect flow'}
                    </span>
                  </div>
                </div>

                {/* Connecting directional downward indicator */}
                {!isLast && (
                  <div className="flex justify-center -my-1 py-1 relative z-10 pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-white/15 flex items-center justify-center text-slate-400 shadow-sm">
                      <ArrowDown className="w-3 h-3 text-cyan-400" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Architecture Note Callout */}
        <div className="mt-10 p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3 text-xs text-slate-400 max-w-3xl mx-auto">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <p>
            Each layer operates with dedicated APIs and security boundaries. Solutions can be deployed progressively—starting with automation or custom portals—without requiring a disruptive all-at-once overhaul.
          </p>
        </div>
      </div>
    </section>
  )
}

