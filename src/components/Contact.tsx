import React, { useState } from 'react'
import type { ServiceId, EnquiryFormData, FormErrors } from '../types'
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react'

interface ContactProps {
  selectedService: ServiceId
  onServiceChange: (service: ServiceId) => void
}

export const Contact: React.FC<ContactProps> = ({
  selectedService,
  onServiceChange,
}) => {
  const [formData, setFormData] = useState<Omit<EnquiryFormData, 'service'>>({
    name: '',
    email: '',
    company: '',
    budget: '',
    description: '',
    consent: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)


  const validateField = (field: keyof EnquiryFormData, value: unknown): string | undefined => {
    switch (field) {
      case 'name':
        if (!value || typeof value !== 'string' || value.trim().length === 0) {
          return 'Please provide your full name.'
        }
        if (value.trim().length < 2) {
          return 'Name should be at least 2 characters.'
        }
        return undefined

      case 'email':
        if (!value || typeof value !== 'string' || value.trim().length === 0) {
          return 'Please provide your business email.'
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please provide a valid email address (e.g. name@company.com).'
        }
        return undefined

      case 'description':
        if (!value || typeof value !== 'string' || value.trim().length === 0) {
          return 'Please describe what takes too much time or what you want to automate.'
        }
        if (value.trim().length < 15) {
          return 'Please provide a bit more detail (at least 15 characters).'
        }
        return undefined

      case 'consent':
        if (!value) {
          return 'Please confirm consent so we can review your inquiry.'
        }
        return undefined

      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    const nameErr = validateField('name', formData.name)
    const emailErr = validateField('email', formData.email)
    const descErr = validateField('description', formData.description)
    const consentErr = validateField('consent', formData.consent)

    if (nameErr) newErrors.name = nameErr
    if (emailErr) newErrors.email = emailErr
    if (descErr) newErrors.description = descErr
    if (consentErr) newErrors.consent = consentErr

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field])
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (touched[name]) {
      const error = validateField(
        name as keyof EnquiryFormData,
        type === 'checkbox' ? checked : value
      )
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Touch all fields
    setTouched({
      name: true,
      email: true,
      company: true,
      service: true,
      budget: true,
      description: true,
      consent: true,
    })

    if (!validateForm()) {
      const firstError = document.querySelector('[aria-invalid="true"]')
      if (firstError) {
        ;(firstError as HTMLElement).focus()
      }
      return
    }

    // Set submitted state for clean email client / brief dispatch
    setSubmitted(true)
  }

  const getServiceLabel = (id: ServiceId) => {
    switch (id) {
      case 'automation':
        return 'AI Workflow Automation (n8n & APIs)'
      case 'dashboard':
        return 'Business Intelligence Dashboards'
      case 'chatbot':
        return 'AI Chatbot Development'
      case 'integrated':
        return 'Integrated Multi-Part Solution'
    }
  }

  const generateEmailBody = () => {
    return `Hello Vertiligence AI Team,

I would like to discuss a project with your studio.

--- PROJECT BRIEF ---
Name: ${formData.name}
Business Email: ${formData.email}
Company / Business: ${formData.company || 'Not specified'}
Service Required: ${getServiceLabel(selectedService)}
Budget Range: ${formData.budget || 'To be discussed'}

Project Description:
${formData.description}
----------------------

Looking forward to your practical recommendations.

Best regards,
${formData.name}`
  }

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Project Enquiry: ${getServiceLabel(selectedService)} - ${formData.company || formData.name}`
    )
    const body = encodeURIComponent(generateEmailBody())
    return `mailto:work.vertiligenceai@gmail.com?subject=${subject}&body=${body}`
  }


  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(generateEmailBody())
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback
    }
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('work.vertiligenceai@gmail.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 3000)
    } catch {
      // Fallback
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 relative" aria-labelledby="contact-title">
      {/* Background glow */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Project Consultation</span>
          </div>

          <h2 id="contact-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Let&apos;s solve a business problem.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Tell us what takes too much time, creates unnecessary manual work, or makes business reporting difficult. We&apos;ll discuss a practical solution.
          </p>

          {/* Direct Email Badge */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-cyan-300">work.vertiligenceai@gmail.com</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="ml-2 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] text-white transition-colors cursor-pointer"
              title="Copy email address"
            >
              {emailCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl bg-[#090E1A]/95 backdrop-blur-xl border border-white/10 p-6 sm:p-10 shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    placeholder="e.g. Alex Morgan"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                      errors.name ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/10 focus:border-cyan-400'
                    } text-white text-sm placeholder-slate-500 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400`}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Business Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="alex@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                      errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/10 focus:border-cyan-400'
                    } text-white text-sm placeholder-slate-500 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400`}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Company Name (Optional) and Budget (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Company or Business Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Operations Ltd."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400 text-white text-sm placeholder-slate-500 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Estimated Budget Range <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400 text-white text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-slate-400">
                      Select approximate budget (optional)
                    </option>
                    <option value="Under $500 / ₹40,000" className="bg-slate-900 text-white">
                      Under $500 / ₹40,000 (Small automation / single workflow)
                    </option>
                    <option value="$500 – $1,500 / ₹40,000 – ₹1,20,000" className="bg-slate-900 text-white">
                      $500 – $1,500 / ₹40k – ₹1.2L (Standard pipeline or dashboard)
                    </option>
                    <option value="$1,500 – $3,500 / ₹1,20,000 – ₹3,00,000" className="bg-slate-900 text-white">
                      $1,500 – $3,500 / ₹1.2L – ₹3L (Custom multi-step or chatbot)
                    </option>
                    <option value="$3,500+ / Custom Scope" className="bg-slate-900 text-white">
                      $3,500+ / Custom Scope (Full studio integration)
                    </option>
                    <option value="To be determined after discussion" className="bg-slate-900 text-white">
                      To be determined after discovery call
                    </option>
                  </select>
                </div>
              </div>

              {/* Service Required Radio Pills */}
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
                  Service Required <span className="text-cyan-400">*</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    { id: 'automation', label: 'Workflow Automation', sub: 'n8n & APIs' },
                    { id: 'dashboard', label: 'BI Dashboard', sub: 'Power BI & Web' },
                    { id: 'chatbot', label: 'AI Chatbot', sub: 'Grounded Assistant' },
                    { id: 'integrated', label: 'Integrated Scope', sub: 'Multi-part solution' },
                  ].map((srv) => {
                    const isSelected = selectedService === srv.id
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => onServiceChange(srv.id as ServiceId)}
                        className={`flex flex-col text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,210,255,0.15)]'
                            : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/25'
                        }`}
                      >
                        <span className="font-semibold text-white">{srv.label}</span>
                        <span className="text-[11px] text-slate-400 mt-0.5">{srv.sub}</span>
                      </button>
                    )
                  })}

                </div>
              </div>

              {/* Project Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                >
                  Project Description <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={() => handleBlur('description')}
                  placeholder="Explain what takes too much time, where data gets stuck, which tools you currently use, or what you want your chatbot/dashboard to do..."
                  aria-invalid={!!errors.description}
                  aria-describedby={errors.description ? 'description-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                    errors.description
                      ? 'border-rose-500/80 focus:border-rose-500'
                      : 'border-white/10 focus:border-cyan-400'
                  } text-white text-sm placeholder-slate-500 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400`}
                />
                {errors.description && (
                  <p id="description-error" role="alert" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.description}</span>
                  </p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    onBlur={() => handleBlur('consent')}
                    aria-invalid={!!errors.consent}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-slate-950 cursor-pointer"
                  />
                  <span className="text-xs text-slate-300 leading-normal">
                    I consent to Vertiligence AI processing these details solely to review our project requirements and respond with a technical recommendation. We do not sell data or send unsolicited spam.
                  </span>
                </label>
                {errors.consent && (
                  <p role="alert" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 ml-7">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.3)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Send className="w-4 h-4" />
                  <span>Prepare & Submit Project Brief</span>
                </button>
                <p className="text-xs text-slate-400 mt-2.5">
                  Prepares a structured dispatch brief with email client and clipboard options. No third-party ad tracking.
                </p>
              </div>
            </form>
          ) : (
            /* Submission Result / Email Dispatch State */
            <div className="space-y-6 text-left animate-in fade-in duration-300">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Project Brief Formatted</h3>
                  <p className="text-xs text-slate-400">
                    Ready for direct dispatch to <span className="font-mono text-cyan-300">work.vertiligenceai@gmail.com</span>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300 leading-relaxed">
                <p className="font-semibold text-cyan-300 mb-1">
                  Direct Dispatch Handshake:
                </p>
                <p>
                  Because Vertiligence AI adheres to a transparent, privacy-first posture without intrusive external trackers, your project brief has been compiled into the standard studio format below. Choose your preferred dispatch option:
                </p>
              </div>

              {/* Formatted Brief Preview */}
              <div className="rounded-xl bg-slate-900 border border-white/10 p-5 font-mono text-xs text-slate-300 space-y-2 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {generateEmailBody()}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={getMailtoUrl()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch in Email Client</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Brief Copied to Clipboard!' : 'Copy Brief to Clipboard'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>We typically review technical scopes and respond within 1 business day.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
