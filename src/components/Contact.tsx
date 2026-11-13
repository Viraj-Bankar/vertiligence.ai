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
  Loader2,
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [webhookSuccess, setWebhookSuccess] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch {
        // Fallback below
      }
    }
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      textArea.style.top = '-9999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    } catch {
      return false
    }
  }

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

  const getServiceLabel = (id: ServiceId) => {
    switch (id) {
      case 'operations-hub':
        return 'Vertiligence Operations Hub (Lead-to-Delivery Platform)'
      case 'automation':
        return 'AI Workflow Automation (n8n & APIs)'
      case 'analytics':
      case 'dashboard':
        return 'Operational BI & Executive Dashboards'
      case 'chatbots':
      case 'chatbot':
        return 'Domain-Grounded AI Assistants & Chatbots'
      case 'implementation':
        return 'Systems Integration & Scoped Implementation'
      case 'managed-support':
        return 'Managed Operations & SLA Support'
      case 'integrated':
        return 'Integrated Multi-Part Solution'
      default:
        return 'Business Systems Consultation'
    }
  }

  const generateEmailBody = () => {
    return `Hello Vertiligence AI Team,

I would like to discuss a project with your company.

--- PROJECT BRIEF ---
Name: ${formData.name}
Business Email: ${formData.email}
Company / Business: ${formData.company || 'Not specified'}
Service Required: ${getServiceLabel(selectedService)}
Budget / Engagement Tier: ${formData.budget || 'To be determined after discovery call'}

Project & Workflow Description:
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    const webhookUrl = import.meta.env.VITE_ENQUIRY_WEBHOOK_URL
    if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.trim().length > 0) {
      setIsSubmitting(true)
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            service: selectedService,
            serviceName: getServiceLabel(selectedService),
            timestamp: new Date().toISOString(),
            source: 'vertiligence.ai-contact-form',
          }),
        })
        if (response.ok) {
          setWebhookSuccess(true)
        } else {
          setWebhookSuccess(false)
        }
      } catch {
        setWebhookSuccess(false)
      } finally {
        setIsSubmitting(false)
        setSubmitted(true)
      }
    } else {
      setSubmitted(true)
    }
  }

  const handleCopyBrief = async () => {
    const success = await copyToClipboard(generateEmailBody())
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const handleCopyEmail = async () => {
    const success = await copyToClipboard('work.vertiligenceai@gmail.com')
    if (success) {
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 3000)
    }
  }

  const serviceOptions: Array<{ id: ServiceId; label: string; sub: string }> = [
    { id: 'operations-hub', label: 'Operations Hub', sub: 'Lead-to-Delivery Platform' },
    { id: 'automation', label: 'Workflow Automation', sub: 'n8n & Resilient APIs' },
    { id: 'analytics', label: 'BI & Analytics', sub: 'Executive Dashboards' },
    { id: 'chatbots', label: 'AI Assistants', sub: 'Grounded Conversational AI' },
    { id: 'implementation', label: 'Systems Integration', sub: 'Diagnostic Scoping & Rollout' },
    { id: 'managed-support', label: 'Managed Support', sub: 'Proactive SLA Maintenance' },
  ]

  const handleServiceKeyDown = (
    e: React.KeyboardEvent,
    currentIndex: number
  ) => {
    let nextIndex = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (currentIndex + 1) % serviceOptions.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (currentIndex - 1 + serviceOptions.length) % serviceOptions.length
    }
    if (nextIndex !== -1) {
      const nextId = serviceOptions[nextIndex].id
      onServiceChange(nextId)
      const nextEl = document.getElementById(`service-radio-${nextId}`)
      nextEl?.focus()
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 relative scroll-mt-24" aria-labelledby="contact-title">
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
            Tell us what takes too much time, creates unnecessary manual work, or makes business reporting difficult. We&apos;ll discuss a practical, measurable solution.
          </p>

          {/* Direct Email Badge */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-cyan-300">work.vertiligenceai@gmail.com</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="ml-2 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
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

              {/* Row 2: Company Name (Optional) and Budget Tier (Aligned with Business Model) */}
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
                    placeholder="Acme Systems Ltd."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400 text-white text-sm placeholder-slate-500 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Engagement Scope / Budget Tier <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400 text-white text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-slate-400">
                      Select approximate tier (optional)
                    </option>
                    <option value="Starter SaaS (₹1,500–₹2,500 / $20–$35 mo)" className="bg-slate-900 text-white">
                      Starter SaaS (₹1,500–₹2,500 / $20–$35 mo) — Core CRM, tasks & onboarding
                    </option>
                    <option value="Growth SaaS (₹5,000–₹9,000 / $75–$150 mo)" className="bg-slate-900 text-white">
                      Growth SaaS (₹5,000–₹9,000 / $75–$150 mo) — Automation & integration allowance
                    </option>
                    <option value="Scoped Implementation (₹25,000–₹1,50,000+ / $500–$2,500+)" className="bg-slate-900 text-white">
                      Scoped Implementation (₹25,000–₹1,50,000+ / $500–$2,500+) — Fixed milestone project
                    </option>
                    <option value="Managed Operations & SLA (₹5,000–₹25,000+ / $150–$500+ mo)" className="bg-slate-900 text-white">
                      Managed Operations & SLA (₹5,000–₹25,000+ / $150–$500+ mo) — Continuous monitoring
                    </option>
                    <option value="Custom Enterprise / Discovery Call" className="bg-slate-900 text-white">
                      Custom Enterprise Scope (To be determined after discovery call)
                    </option>
                  </select>
                </div>
              </div>

              {/* Service Required Radio Group */}
              <div>
                <span
                  id="service-group-label"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5"
                >
                  Primary Solution Required <span className="text-cyan-400">*</span>
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby="service-group-label"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
                >
                  {serviceOptions.map((srv, index) => {
                    const isSelected = selectedService === srv.id
                    return (
                      <button
                        key={srv.id}
                        id={`service-radio-${srv.id}`}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={isSelected ? 0 : -1}
                        onClick={() => onServiceChange(srv.id)}
                        onKeyDown={(e) => handleServiceKeyDown(e, index)}
                        className={`flex flex-col text-left p-3 rounded-xl border text-xs transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
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
                  Project & Operational Description <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={() => handleBlur('description')}
                  placeholder="Explain what operational tasks take too much time, where data gets stuck, which tools you currently use, or what you want your systems to do..."
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
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-slate-950 cursor-pointer"
                  />
                  <span className="text-xs text-slate-300 leading-normal">
                    I consent to Vertiligence AI processing these details solely to review our project requirements and respond with a technical recommendation. We do not sell data or send unsolicited spam.
                  </span>
                </label>
                {errors.consent && (
                  <p id="consent-error" role="alert" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 ml-7">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.3)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Prepare & Submit Project Brief</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-400 mt-2.5">
                  Prepares a structured dispatch brief with email client and clipboard options. Zero third-party behavioral trackers.
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
                  <h3 className="text-xl font-bold text-white">
                    {webhookSuccess ? 'Enquiry Successfully Received!' : 'Project Brief Formatted & Ready'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {webhookSuccess
                      ? 'Our engineering team has received your brief and will respond within 1 business day.'
                      : 'Ready for direct dispatch to work.vertiligenceai@gmail.com'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300 leading-relaxed">
                <p className="font-semibold text-cyan-300 mb-1">
                  Direct Dispatch Handshake:
                </p>
                <p>
                  Because Vertiligence AI adheres to a transparent, privacy-first posture without intrusive external advertising trackers, your project brief has been compiled into the standard studio format below. You can launch your email client directly or copy the brief:
                </p>
              </div>

              {/* Formatted Brief Preview */}
              <div className="rounded-xl bg-slate-900 border border-white/10 p-5 font-mono text-xs text-slate-300 space-y-2 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto select-all">
                {generateEmailBody()}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={getMailtoUrl()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch in Email Client</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Brief Copied to Clipboard!' : 'Copy Brief to Clipboard'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setWebhookSuccess(null)
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
