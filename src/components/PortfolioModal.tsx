import React, { useEffect, useRef } from 'react'
import type { PortfolioItem, ArchitectureNode } from '../types'
import {
  X,
  CheckCircle,
  ExternalLink,
  Code2,
  Layers,
  AlertCircle,
  Database,
  Workflow,
  ShieldCheck,
  Send,
  BarChart3,
  FileCheck,
  Zap,
} from 'lucide-react'

interface PortfolioModalProps {
  item: PortfolioItem | null
  onClose: () => void
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (item) {
      previousActiveElement.current = document.activeElement as HTMLElement
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus()
      }, 50)

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'

      return () => {
        clearTimeout(timer)
        window.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
        if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
          previousActiveElement.current.focus()
        }
      }
    }
  }, [item, onClose])

  if (!item) return null

  const getNodeIcon = (type: ArchitectureNode['componentType']) => {
    switch (type) {
      case 'trigger':
        return <Zap className="w-3.5 h-3.5 text-cyan-400" />
      case 'validation':
        return <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
      case 'orchestration':
        return <Workflow className="w-3.5 h-3.5 text-indigo-400" />
      case 'storage':
        return <Database className="w-3.5 h-3.5 text-purple-400" />
      case 'notification':
        return <Send className="w-3.5 h-3.5 text-sky-400" />
      case 'action':
        return <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
      default:
        return <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-[#090D1A] border border-cyan-500/30 rounded-2xl shadow-2xl p-5 sm:p-8 z-10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
        <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {item.title}
        </h3>
        <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-5">
          {item.category}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {item.description}
        </p>

        {/* Visual Architecture Diagram Section */}
        {item.diagramNodes && item.diagramNodes.length > 0 && (
          <div className="bg-[#050811] border border-cyan-500/20 rounded-2xl p-4 sm:p-6 mb-7 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Visual Architecture Pipeline
                </h4>
              </div>

              {/* Status Legend */}
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Implemented in Prototype</span>
                </div>
                <div className="flex items-center gap-1.5 text-sky-300">
                  <span className="w-2 h-2 rounded-full bg-sky-400/80" />
                  <span>Target Architecture</span>
                </div>
              </div>
            </div>

            {/* Desktop / Tablet Flow Track */}
            <div className="space-y-3">
              {item.diagramNodes.map((node, index) => {
                const isImplemented = node.status === 'implemented'
                const isLast = index === item.diagramNodes!.length - 1

                return (
                  <div key={node.step} className="relative">
                    <div
                      className={`p-3.5 rounded-xl border transition-all ${
                        isImplemented
                          ? 'bg-[#0B1124] border-emerald-500/30 shadow-sm'
                          : 'bg-[#080D1A] border-white/10'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            {getNodeIcon(node.componentType)}
                          </div>
                          <span className="font-mono text-xs text-slate-400 font-semibold">
                            {node.step}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {node.name}
                          </span>
                          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
                            · {node.role}
                          </span>
                        </div>

                        <span
                          className={`self-start sm:self-auto text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${
                            isImplemented
                              ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30'
                              : 'bg-sky-950/70 text-sky-300 border-sky-500/30'
                          }`}
                        >
                          {isImplemented ? '✓ Active in Sandbox' : '○ Target Specification'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed pl-8">
                        {node.description}
                      </p>
                    </div>

                    {!isLast && (
                      <div className="flex justify-center my-1 text-cyan-400/60" aria-hidden="true">
                        <span className="text-xs font-mono">↓</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Pipeline Architecture Input/Process/Output Summary */}
        <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 sm:p-5 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
            <Workflow className="w-4 h-4 text-cyan-400" />
            <span>Execution Summary</span>
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
              <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">3. Output Delivery</span>
              <span className="text-slate-200">{item.pipeline.output}</span>
            </div>
          </div>
        </div>

        {/* Planned Features */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Key Architecture Capabilities:
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
            This blueprint reflects our active engineering sandbox builds. Custom connectors, tailored database schemas, and staging environment walkthroughs are available during project scoping conversations.
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            ) : (
              <span className="text-xs text-slate-400 font-mono">
                Source: Internal sandbox build
              </span>
            )}

            {item.liveUrl ? (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-xs font-medium text-cyan-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Sandbox Demo</span>
              </a>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  )
}
