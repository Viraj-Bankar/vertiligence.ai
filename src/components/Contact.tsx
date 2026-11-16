import React, { useState, useRef } from 'react'
import type { ServiceId, EnquiryFormData, FormErrors } from '../types'
import { STUDIO_DETAILS } from '../data/content'
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
  Calendar,
  Clock,
  PhoneCall,
  FileText,
  MessageCircle,
} from 'lucide-react'
import {
  trackEnquiryFormStart,
  trackEnquirySubmitSuccess,
  trackDiscoveryCallClick,
  trackEmailContactClick,
  trackWhatsAppContactClick,
  trackContactEmailOpened,
} from '../analytics'

function getSystemTime(): number {
  return Date.now()
}

interface ContactProps {
  selectedService: ServiceId
  onServiceChange: (service: ServiceId) => void
}

export const Contact: React.FC<ContactProps> = ({
  selectedService,
  onServiceChange,
}) => {
  const [activeTab, setActiveTab] = useState<'project' | 'discovery'>('project')
  const [formData, setFormData] = useState<Omit<EnquiryFormData, 'service'>>({
    name: '',
    email: '',
    company: '',
    budget: '',
    description: '',
    consent: false,
  })

  // Anti-spam & timing refs
  const [honeypot, setHoneypot] = useState('')
  const formStartedRef = useRef(false)
  const formStartTimeRef = useRef<number | null>(null)

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'confirmed' | 'failed'>('idle')
  const [confirmedEnquiryId, setConfirmedEnquiryId] = useState<string | null>(null)
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null)
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

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true
      formStartTimeRef.current = getSystemTime()
      trackEnquiryFormStart({
        service_selected: selectedService,
      })
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
    handleFormStart()
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
      case 'custom-software':
      case 'operations-hub':
        return 'Custom Business Software Development'
      case 'web-development':
        return 'Website & Digital Experience Development'
      case 'automation':
        return 'Intelligent Workflow Automation (n8n & Webhooks)'
      case 'ai-assistants':
      case 'chatbots':
      case 'chatbot':
        return 'AI Assistants & Intelligent Support'
      case 'system-integration':
      case 'implementation':
        return 'API & System Integration'
      case 'analytics':
      case 'dashboard':
        return 'Business Intelligence & Analytics'
      case 'consulting':
        return 'Business Process Audit & Technology Consulting'
      case 'managed-support':
        return 'Managed Operations & SLA Support'
      case 'integrated':
        return 'Integrated Multi-Part Solution'
      default:
        return 'Business Technology Consultation'
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
    return `mailto:${STUDIO_DETAILS.email}?subject=${subject}&body=${body}`
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

    setIsSubmitting(true)

    const endpoint =
      import.meta.env.VITE_ENQUIRY_API_ENDPOINT ||
      import.meta.env.VITE_ENQUIRY_WEBHOOK_URL ||
      '/api/enquiry'

    const startTime = formStartTimeRef.current || getSystemTime()

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: selectedService,
          serviceName: getServiceLabel(selectedService),
          website: honeypot, // Honeypot anti-spam field
          _time: startTime,
          timestamp: new Date().toISOString(),
          source: 'vertiligence.ai-contact-form',
        }),
      })

      const data = await response.json().catch(() => null)

      if (response.ok && data?.success) {
        const id = data.enquiryId || 'ENQ-' + getSystemTime().toString(36).toUpperCase()
        setConfirmedEnquiryId(id)
        setSubmissionStatus('confirmed')
        setSubmitted(true)

        const elapsedSeconds = Math.max(
          1,
          Math.round((getSystemTime() - startTime) / 1000)
        )

        // Key Conversion Event: Triggered ONLY upon confirmed server receipt with zero PII
        trackEnquirySubmitSuccess({
          service_selected: selectedService,
          engagement_tier: formData.budget || 'unspecified',
          duration_seconds: elapsedSeconds,
        })
      } else {
        setServerErrorMessage(
          data?.error || 'Unable to confirm automated delivery to the review queue.'
        )
        setSubmissionStatus('failed')
        setSubmitted(true)
      }
    } catch {
      setServerErrorMessage(
        'Automated dispatch service unavailable. Please use the direct email fallback.'
      )
      setSubmissionStatus('failed')
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyBrief = async () => {
    const success = await copyToClipboard(generateEmailBody())
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
      trackEmailContactClick({
        location: 'fallback_dispatch',
        email_target: STUDIO_DETAILS.email,
      })
    }
  }

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(STUDIO_DETAILS.email)
    if (success) {
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 3000)
      trackEmailContactClick({
        location: 'contact_section',
        email_target: STUDIO_DETAILS.email,
      })
    }
  }

  const handleTabChange = (tab: 'project' | 'discovery') => {
    setActiveTab(tab)
    if (tab === 'discovery') {
      trackDiscoveryCallClick({
        cta_location: 'contact_tab',
        booking_method: 'tab_select',
      })
    }
  }

  const serviceOptions: Array<{ id: ServiceId; label: string; sub: string }> = [
    { id: 'custom-software', label: 'Custom Software', sub: 'Business apps & internal portals' },
    { id: 'web-development', label: 'Web Development', sub: 'Corporate platforms & client UX' },
    { id: 'automation', label: 'Workflow Automation', sub: 'n8n pipelines & webhook sync' },
    { id: 'ai-assistants', label: 'AI Assistants', sub: 'Domain-grounded 24/7 support' },
    { id: 'system-integration', label: 'System Integration', sub: 'API connectors & database sync' },
    { id: 'analytics', label: 'BI & Analytics', sub: 'Real-time KPI dashboards' },
    { id: 'consulting', label: 'Process Audit', sub: 'Operational discovery & roadmap' },
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
      handleFormStart()
      const nextEl = document.getElementById(`service-radio-${nextId}`)
      nextEl?.focus()
    }
  }

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER

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

          {/* Direct Contact Channels */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-cyan-300">{STUDIO_DETAILS.email}</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="ml-2 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                title="Copy email address"
              >
                {emailCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {whatsappNumber && (
              <a
                href={`https://wa.me/${encodeURIComponent(whatsappNumber.replace(/[^0-9]/g, ''))}?text=${encodeURIComponent(
                  'Hello Vertiligence AI Team, I would like to enquire about your engineering services.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppContactClick({ location: 'contact_section' })}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Desk</span>
              </a>
            )}
          </div>
        </div>

        {/* Option Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <button
            type="button"
            onClick={() => handleTabChange('project')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
              activeTab === 'project'
                ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,210,255,0.15)] ring-1 ring-cyan-400/50'
                : 'bg-[#090E1A]/80 border-white/10 text-slate-300 hover:border-white/25 hover:bg-[#090E1A]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === 'project'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300'
                  : 'bg-white/5 border border-white/10 text-slate-400'
              }`}
            >
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold mb-0.5">
                Option A
              </div>
              <div className="font-bold text-white text-sm sm:text-base">
                Discuss Your Project
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                Structured technical enquiry & scoping form for direct recommendations.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('discovery')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
              activeTab === 'discovery'
                ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,210,255,0.15)] ring-1 ring-cyan-400/50'
                : 'bg-[#090E1A]/80 border-white/10 text-slate-300 hover:border-white/25 hover:bg-[#090E1A]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === 'discovery'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300'
                  : 'bg-white/5 border border-white/10 text-slate-400'
              }`}
            >
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold mb-0.5">
                Option B
              </div>
              <div className="font-bold text-white text-sm sm:text-base">
                Book a Discovery Call
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                20-minute focused scoping discussion with an engineering architect.
              </p>
            </div>
          </button>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl bg-[#090E1A]/95 backdrop-blur-xl border border-white/10 p-6 sm:p-10 shadow-2xl">
          {activeTab === 'project' ? (
            !submitted ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Anti-spam honeypot field (hidden from legitimate visitors) */}
                <div className="sr-only" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="form-website-field">Leave this field blank</label>
                  <input
                    id="form-website-field"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Information Required Guidance Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300">
                  <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>What Information We Need:</span>
                  </div>
                  <p className="leading-relaxed text-slate-300">
                    To prepare an accurate technical assessment, please share:
                    (1) Your contact details, (2) The primary solution required, and (3) A brief description of what takes too much time or what workflow you want to automate.
                  </p>
                </div>

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
                      onFocus={handleFormStart}
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
                      onFocus={handleFormStart}
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

                {/* Row 2: Company Name (Optional) and Budget Tier */}
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
                      onFocus={handleFormStart}
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
                      onFocus={handleFormStart}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400 text-white text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
                    >
                      <option value="" className="bg-slate-900 text-slate-400">
                        Select approximate budget range (optional)
                      </option>
                      <option value="₹50,000 – ₹1,50,000 / $600 – $1,800" className="bg-slate-900 text-white">
                        ₹50,000 – ₹1,50,000 ($600 – $1,800) — Targeted workflow automation or specific module
                      </option>
                      <option value="₹1,50,000 – ₹3,50,000 / $1,800 – $4,200" className="bg-slate-900 text-white">
                        ₹1,50,000 – ₹3,50,000 ($1,800 – $4,200) — Custom web portal or multi-system integration
                      </option>
                      <option value="₹3,50,000 – ₹7,50,000+ / $4,200 – $9,000+" className="bg-slate-900 text-white">
                        ₹3,50,000 – ₹7,50,000+ ($4,200 – $9,000+) — End-to-end business software ecosystem
                      </option>
                      <option value="Enterprise / Custom Multi-Phase Scope" className="bg-slate-900 text-white">
                        Enterprise Scope (To be scoped across milestones)
                      </option>
                      <option value="Not sure yet (Explore during discovery)" className="bg-slate-900 text-white">
                        Not sure yet (Explore during discovery call)
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
                          onClick={() => {
                            onServiceChange(srv.id)
                            handleFormStart()
                          }}
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
                    onFocus={handleFormStart}
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
                      onFocus={handleFormStart}
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
                        <span>Confirming Receipt...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Brief</span>
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-400 mt-2.5">
                    Transmits directly to our engineering review queue. Verified server receipt confirmed instantly.
                  </p>
                </div>
              </form>
            ) : submissionStatus === 'confirmed' ? (
              /* Verified Server Confirmation State (Confirmed Receipt) */
              <div className="space-y-6 text-left animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        Enquiry Sent Successfully
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Our engineering team has received your project brief into our direct review queue.
                    </p>
                  </div>
                </div>

                {/* Confirmation Receipt Box */}
                <div className="rounded-xl bg-slate-900/90 border border-cyan-500/30 p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono pb-3 border-b border-white/10">
                    <div>
                      <span className="text-slate-400">Reference ID: </span>
                      <span className="text-cyan-300 font-bold">{confirmedEnquiryId}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Response SLA: </span>
                      <span className="text-emerald-400 font-semibold">Within 1 Business Day</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Primary Solution:</span>
                      <span className="text-white font-medium">{getServiceLabel(selectedService)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Engagement Tier:</span>
                      <span className="text-white font-medium">{formData.budget || 'To be scoped during discovery'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 space-y-1.5">
                  <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Next Steps in Our Engagement Process:</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    1. An engineering lead reviews your operational bottlenecks and architecture requirements.<br />
                    2. We formulate an initial technical feasibility outline with recommended milestone phases.<br />
                    3. We reach out directly to <strong>{formData.email}</strong> to schedule an introductory discovery conversation.
                  </p>
                </div>

                {/* Reset button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setSubmissionStatus('idle')
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        budget: '',
                        description: '',
                        consent: false,
                      })
                      setConfirmedEnquiryId(null)
                      formStartedRef.current = false
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
                  >
                    Submit Another Project Scope
                  </button>

                  <a
                    href={`mailto:${STUDIO_DETAILS.email}`}
                    onClick={() =>
                      trackEmailContactClick({
                        location: 'contact_section',
                        email_target: STUDIO_DETAILS.email,
                      })
                    }
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline font-mono"
                  >
                    Questions? Email {STUDIO_DETAILS.email}
                  </a>
                </div>
              </div>
            ) : (
              /* Honest Fallback State: Server queue failed or offline */
              <div className="space-y-6 text-left animate-in fade-in duration-300">
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-amber-200">
                      Automated Server Delivery Failed
                    </h4>
                    <p className="text-amber-300/90 leading-relaxed">
                      {serverErrorMessage ||
                        'We could not verify automated delivery through the server endpoint. Your brief is safely preserved below so you do not lose any details.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300 leading-relaxed">
                  <p className="font-semibold text-cyan-300 mb-1">
                    Manual Email Alternative (Not Yet Sent):
                  </p>
                  <p>
                    Because automated server delivery was not completed, your enquiry has not yet been received. Please use this manual alternative to launch your email client or copy the brief below to send it directly to <span className="font-mono text-cyan-300">{STUDIO_DETAILS.email}</span>. (This manual action is not confirmed as submitted until you send the email).
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
                    onClick={() =>
                      trackContactEmailOpened({
                        service_selected: selectedService,
                        location: 'fallback_dispatch',
                      })
                    }
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
                      setSubmissionStatus('idle')
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Submitting Again</span>
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Option B: Discovery Call View */
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      20-Minute Discovery Call
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Direct architectural consultation with our engineering team. Zero sales pressure.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Scoping</span>
                </div>
              </div>

              {/* Discovery Call Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                    <span className="text-xs font-bold font-mono">01</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    Operational Friction Audit
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Identify where manual data re-entry, disconnected spreadsheets, or delayed reporting waste time.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                    <span className="text-xs font-bold font-mono">02</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    Architecture & Tech Fit
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Evaluate whether n8n workflow automation, custom APIs, BI dashboards, or Operations Hub fits best.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <span className="text-xs font-bold font-mono">03</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    Indicative Scope & Budget
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Receive transparent timeline estimates, milestone phases, and technical guidance.
                  </p>
                </div>
              </div>

              {/* Call Format Specs */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Duration: <strong>20 Minutes</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                  <span>Format: <strong>Google Meet / Video Call</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Commitment: <strong>Free Scoping Session</strong></span>
                </div>
              </div>

              {/* Booking CTA or Configured Calendar URL */}
              {import.meta.env.VITE_CALENDAR_BOOKING_URL ? (
                <div className="pt-2 text-center sm:text-left">
                  <a
                    href={import.meta.env.VITE_CALENDAR_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackDiscoveryCallClick({
                        cta_location: 'calendar_button',
                        booking_method: 'calendar_link',
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.3)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Open Live Booking Calendar</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                /* High-fidelity Direct Request Slot */
                <div className="rounded-xl bg-slate-900 border border-cyan-500/30 p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Direct Booking Request Channel</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                          Active
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Self-serve automated calendar slots are allocated for scheduled production sprints. Request a dedicated discovery slot below, and our engineering team will respond with a Google Meet calendar invitation within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <a
                      href={`mailto:${STUDIO_DETAILS.email}?subject=${encodeURIComponent(
                        'Discovery Call Request — Vertiligence AI'
                      )}&body=${encodeURIComponent(
                        'Hello Vertiligence AI Engineering Team,\n\nI would like to schedule a 20-minute technical discovery call.\n\nName: \nCompany / Organization: \nPreferred Day(s) and Time Window (with timezone): \nPrimary Topic or Operational Challenge: \n\nThank you!'
                      )}`}
                      onClick={() =>
                        trackDiscoveryCallClick({
                          cta_location: 'email_slot_button',
                          booking_method: 'direct_email',
                        })
                      }
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Request Discovery Slot via Email</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/10 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      {emailCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{emailCopied ? 'Email Copied!' : `Copy ${STUDIO_DETAILS.email}`}</span>
                    </button>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 pt-1">
                    * Production calendar integration (e.g. Cal.com / Calendly) connects automatically when <code>VITE_CALENDAR_BOOKING_URL</code> is configured.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
