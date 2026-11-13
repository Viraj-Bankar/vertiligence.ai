import React, { useEffect, useRef } from 'react'
import { X, ShieldCheck, Mail, Lock } from 'lucide-react'

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus()
      }, 50)

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
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
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-xl bg-[#0B1020] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[85vh] overflow-y-auto">
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Close privacy notice"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-cyan-400 mb-2">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-wider">Privacy & Data Governance</span>
        </div>

        <h3 id="privacy-title" className="text-2xl font-bold text-white mb-4">
          Data Handling & Privacy Policy
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Vertiligence AI operates as an AI-enabled business systems and automation company. We respect client confidentiality and maintain strict, minimal, and transparent data practices.
          </p>

          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-3">
            <div className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Zero Tracking Cookies</strong>
                <span>We do not place tracking cookies, advertising pixels, or third-party behavioral trackers on your device.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Project Consultation Data</strong>
                <span>Information submitted via our consultation form (name, email, company, project description) is utilized strictly to evaluate your operational requirements and draft technical recommendations.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">No Unauthorized AI Training</strong>
                <span>We never use your company data, operational records, or proprietary workflows to train public AI foundation models.</span>
              </div>
            </div>
          </div>

          <p>
            If you ever wish to have your submitted contact information purged from our consultation inbox, contact us directly at{' '}
            <a href="mailto:work.vertiligenceai@gmail.com" className="text-cyan-400 underline focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400">
              work.vertiligenceai@gmail.com
            </a>
            .
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  )
}
