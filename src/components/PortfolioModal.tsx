import React, { useEffect } from 'react'
import type { PortfolioItem } from '../types'
import { X, CheckCircle, ExternalLink, Code2, Layers, AlertCircle } from 'lucide-react'


interface PortfolioModalProps {
  item: PortfolioItem | null
  onClose: () => void
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (item) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0B1020] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{item.badge}</span>
        </div>

        {/* Title & Category */}
        <h3 id="modal-title" className="text-2xl font-bold text-white mb-1">
          {item.title}
        </h3>
        <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-5">
          {item.category}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {item.description}
        </p>

        {/* Pipeline Architecture breakdown */}
        <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4 sm:p-5 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Technical Pipeline Design</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">1. Inbound Trigger</span>
              <span className="text-slate-200">{item.pipeline.input}</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">2. Processing & Rules</span>
              <span className="text-slate-200">{item.pipeline.processing}</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">3. Automated Delivery</span>
              <span className="text-slate-200">{item.pipeline.output}</span>
            </div>
          </div>
        </div>

        {/* Planned Features */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Planned Prototype Features:
          </h4>
          <ul className="space-y-2">
            {item.plannedFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Technology Stack:
          </h4>
          <div className="flex flex-wrap gap-2">
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Honest Disclosure / Status Notice */}
        <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-start gap-3 text-xs text-slate-300 mb-6">
          <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p>
            This prototype is currently undergoing development in the studio sandbox. Clean repository references and interactive sandboxes will be linked here as milestones are tagged.
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            {item.githubUrl ? (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            ) : (
              <span className="text-xs text-slate-400 font-mono">
                Source: Staging build
              </span>
            )}

            {item.liveUrl ? (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-xs font-medium text-cyan-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Sandbox Demo</span>
              </a>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  )
}
