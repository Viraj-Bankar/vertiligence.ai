import React from 'react'
import { BrandLogo } from '../components/BrandLogo'
import { STUDIO_DETAILS } from '../data/content'
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowLeft,
  FileText,
  AlertCircle,
  Server,
  EyeOff,
  UserCheck,
  Layers,
  Sparkles,
} from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

interface PrivacyPolicyProps {
  onBackToHome: () => void
  onOpenCookieSettings: () => void
  onNavigateToCookiePolicy: () => void
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  onBackToHome,
  onOpenCookieSettings,
  onNavigateToCookiePolicy,
}) => {
  const lastUpdated = 'November 15, 2026'

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col w-full selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-[#07090E]/90 backdrop-blur-md border-b border-white/10 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md py-1 px-2"
              aria-label="Back to Homepage"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={onBackToHome}
              className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
              aria-label="Vertiligence AI Logo"
            >
              <BrandLogo size="sm" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={onNavigateToCookiePolicy}
              className="text-slate-300 hover:text-cyan-300 transition-colors underline underline-offset-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              Cookie Policy
            </button>
            <button
              type="button"
              onClick={onOpenCookieSettings}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 min-w-0">
        {/* Breadcrumb & Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
            <span>Governance</span>
            <span className="text-slate-600">/</span>
            <span>Data Transparency</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Privacy Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Privacy Policy & Data Transparency
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-b border-white/10 pb-6">
            <div>
              <span>Company: </span>
              <span className="text-slate-200">Vertiligence AI</span>
            </div>
            <span>•</span>
            <div>
              <span>Positioning: </span>
              <span className="text-cyan-300">Engineering Intelligent Business Ecosystems</span>
            </div>
            <span>•</span>
            <div>
              <span>Last Updated: </span>
              <span className="text-slate-200">{lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Executive Transparency Card */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-[#090E1A] to-[#0D1528] border border-cyan-500/30 shadow-xl shadow-cyan-950/10">
          <div className="flex items-center gap-2 text-cyan-400 mb-3">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-wide uppercase font-mono text-xs">
              Executive Privacy Commitments
            </h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Vertiligence AI operates as a technology engineering and digital transformation consultancy. Our public website is designed strictly for exploratory inquiries and technical scoping discussions. We hold a clear engineering stance on personal data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-start gap-2.5">
              <EyeOff className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-0.5">Zero Data Selling</strong>
                <span className="text-slate-400">We never monetize, sell, trade, or rent visitor or client data.</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-0.5">No Public AI Training</strong>
                <span className="text-slate-400">Client briefs and workflows are never used to train public foundation models.</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-0.5">Zero Ad Pixels</strong>
                <span className="text-slate-400">No cross-site tracking pixels, retargeting cookies, or behavioral trackers.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Breakdown */}
        <div className="space-y-12 text-sm text-slate-300 leading-relaxed">
          {/* 1. Introduction */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <FileText className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">1. Scope of This Policy</h2>
            </div>
            <p>
              This Privacy Policy explains how <strong>Vertiligence AI</strong> (“we”, “us”, or “our”) collects, processes, and protects information gathered through our public marketing website (<code>vertiligenceai.com</code> and related domains).
            </p>
            <p>
              This website serves to introduce our technology capabilities, showcase architectural prototypes, and allow business leaders to request project consultations. It is <strong>not</strong> an authenticated multi-tenant SaaS dashboard, customer portal, or transactional billing platform.
            </p>
          </section>

          {/* 2. Information Collected */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <UserCheck className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
            </div>
            <p>
              We collect information exclusively when you voluntarily provide it through our technical scoping forms, discovery call requests, or direct correspondence:
            </p>
            <div className="rounded-xl bg-[#090E1A] border border-white/10 p-5 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                Project Consultation Data Points
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
                <li><strong>Full Name:</strong> To address you professionally during communication.</li>
                <li><strong>Business Email Address:</strong> To deliver feasibility assessments, proposals, and project correspondence.</li>
                <li><strong>Company or Organization Name:</strong> To understand your industry domain and business model context.</li>
                <li><strong>Target Service or Engagement Scope:</strong> The selected engineering domain (e.g., Custom Business Software, Intelligent Workflow Automation, API Integration).</li>
                <li><strong>Estimated Project Budget or Engagement Tier:</strong> To determine engineering resource allocation and timeline feasibility.</li>
                <li><strong>Project Brief / Operational Pain Points:</strong> Technical requirements, existing software stack, or workflow bottlenecks submitted voluntarily.</li>
                <li><strong>Direct Email Correspondence:</strong> Information you include when contacting us directly at <code>{STUDIO_DETAILS.email}</code>.</li>
              </ul>
            </div>
            <p className="text-xs text-slate-400">
              We do not ask for or store payment card details, national identity numbers, passwords, or sensitive personal categories on this public website.
            </p>
          </section>

          {/* 3. Purpose of Processing */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Layers className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">3. How We Use Submitted Information</h2>
            </div>
            <p>
              Information collected through our consultation forms is used strictly for legitimate business scoping purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Technical Feasibility Evaluation:</strong> Reviewing architectural feasibility, tech stack compatibility, and integration requirements.</li>
              <li><strong>Scoping Response:</strong> Preparing indicative estimates, project milestones, and scheduling introductory engineering discovery calls.</li>
              <li><strong>Contract Preparation:</strong> Drafting non-disclosure agreements (NDAs) and formal statements of work (SOW) once engagement terms are agreed upon.</li>
              <li><strong>Security & Abuse Prevention:</strong> Detecting spam submissions, malicious form flooding, or unauthorized probing of our web infrastructure.</li>
            </ul>
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-blue-200">
              <strong>Notice on Automated Marketing:</strong> Submitting a project brief does not subscribe you to recurring marketing blasts, automated outbound sales calls, or third-party newsletter lists. All communication is bespoke and engineering-led.
            </div>
          </section>

          {/* 4. Third-Party Service Providers */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Server className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">4. Third-Party Infrastructure & Service Providers</h2>
            </div>
            <p>
              We utilize trusted, enterprise-grade cloud providers to host and secure this website:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-[#090E1A] border border-white/10 space-y-1.5">
                <span className="font-mono text-cyan-400 font-semibold text-[11px] uppercase">Web Hosting & CDN</span>
                <h4 className="text-white font-bold">Cloud Infrastructure</h4>
                <p className="text-slate-400 leading-relaxed">
                  Serves pre-rendered static assets and manages HTTPS/TLS certificates. Standard edge request headers (IP, user agent) are processed ephemerally for security.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090E1A] border border-white/10 space-y-1.5">
                <span className="font-mono text-cyan-400 font-semibold text-[11px] uppercase">Font Delivery</span>
                <h4 className="text-white font-bold">Google Fonts CDN</h4>
                <p className="text-slate-400 leading-relaxed">
                  Delivers Plus Jakarta Sans and JetBrains Mono typography files. Requests are cached locally by your browser; zero cookies are created or read.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090E1A] border border-white/10 space-y-1.5">
                <span className="font-mono text-cyan-400 font-semibold text-[11px] uppercase">Project Routing</span>
                <h4 className="text-white font-bold">Enquiry Processing Webhook</h4>
                <p className="text-slate-400 leading-relaxed">
                  When you submit the contact form, your inquiry is securely dispatched via HTTPS TLS 1.3 to our engineering review queue for evaluation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090E1A] border border-white/10 space-y-1.5">
                <span className="font-mono text-cyan-400 font-semibold text-[11px] uppercase">Measurement (Opt-in)</span>
                <h4 className="text-white font-bold">Google Analytics 4 (Google LLC)</h4>
                <p className="text-slate-400 leading-relaxed">
                  When explicitly accepted, measures aggregate visit metrics and referral channels. Transmits anonymized IP and non-personal event parameters; zero form fields, briefs, or PII are ever collected. Blocked by default.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090E1A] border border-white/10 space-y-1.5">
                <span className="font-mono text-cyan-400 font-semibold text-[11px] uppercase">Code Repository</span>
                <h4 className="text-white font-bold">GitHub</h4>
                <p className="text-slate-400 leading-relaxed">
                  Links to our verified public GitHub repository navigate externally to GitHub, which operates under its own privacy policy.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Retention & Deletion */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Lock className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">5. Data Retention & Deletion Requests</h2>
            </div>
            <p>
              We adhere to strict data minimization principles:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Inquiries Not Progressing:</strong> Inquiries that do not convert to active engineering engagements are archived or purged within twelve (12) months.</li>
              <li><strong>Active Engagements:</strong> Data associated with signed contracts, invoices, and architectural deliverables is retained per statutory accounting and contractual warranty obligations.</li>
              <li><strong>Right to Deletion:</strong> You may at any time request immediate deletion of your submitted contact details and correspondence by emailing <code>{STUDIO_DETAILS.email}</code> with the subject <em>“Data Deletion Request”</em>. We will process and confirm deletion within thirty (30) calendar days.</li>
            </ul>
          </section>

          {/* 6. Technical Security */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">6. Security Practices</h2>
            </div>
            <p>
              We implement comprehensive physical, organizational, and technical safeguards:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Encryption in Transit:</strong> 100% of data transmitted to and from this website is encrypted using Transport Layer Security (TLS 1.3).</li>
              <li><strong>Role-Based Access:</strong> Only authorized engineering leads have access to the inbound project evaluation inbox.</li>
              <li><strong>No Third-Party Scripts:</strong> We do not load third-party ad networks, telemetry trackers, or external tag managers that could execute arbitrary code in your browser.</li>
            </ul>
          </section>

          {/* 7. Contractual Compliance Disclaimer */}
          <section className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <h3 className="text-sm font-bold text-amber-200">
                Notice Regarding Client Engagements & Compliance Frameworks
              </h3>
            </div>
            <p className="leading-relaxed">
              Vertiligence AI works with enterprise and growth-stage clients globally. We explicitly recognize that specific regulatory frameworks (such as the EU/UK General Data Protection Regulation (GDPR), the Indian Digital Personal Data Protection Act (DPDP Act 2023), California Consumer Privacy Act (CCPA), or HIPAA) impose distinct legal obligations depending on client jurisdiction and architecture.
            </p>
            <p className="leading-relaxed">
              <strong>Contractual Customization:</strong> For client engineering projects, specific data processing agreements (DPAs), source code ownership schedules, service level agreements (SLAs), and security boundaries are defined individually in mutual written contracts prior to implementation.
            </p>
          </section>

          {/* 8. Items Requiring Business-Owner Confirmation */}
          <section className="p-5 rounded-xl bg-slate-900 border border-cyan-500/20 text-xs space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
              Transparency Disclosure: Operating Status & Formal Business Details
            </h3>
            <p className="text-slate-300 leading-relaxed">
              To maintain absolute transparency with visitors and prospective clients:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400">
              <li><strong>Jurisdiction:</strong> Vertiligence AI is an independent technology engineering entity operating out of India.</li>
              <li><strong>Formal Registration & Physical Address:</strong> Specific statutory registration numbers (CIN / GSTIN) and formal registered legal entity address will be provided in formal commercial agreements and master services agreements (MSAs) upon business engagement.</li>
              <li><strong>Contact Lead:</strong> All inquiries, legal notices, and privacy requests are managed directly through our engineering office at <code>{STUDIO_DETAILS.email}</code>.</li>
            </ul>
          </section>

          {/* 9. Contact */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-cyan-400">
              <Mail className="w-4 h-4" />
              <h2 className="text-lg font-bold text-white">7. Contact Our Engineering Governance Team</h2>
            </div>
            <p>
              If you have questions regarding this Privacy Policy, your submitted project details, or data governance practices, please reach out directly:
            </p>
            <div className="p-4 rounded-xl bg-[#090E1A] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-bold text-sm">Vertiligence AI Engineering Desk</p>
                <p className="text-xs text-slate-400">Data Governance & Client Confidentiality</p>
                <a
                  href={`mailto:${STUDIO_DETAILS.email}`}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline mt-1 inline-block"
                >
                  {STUDIO_DETAILS.email}
                </a>
              </div>
              <button
                type="button"
                onClick={onOpenCookieSettings}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                Review Cookie Settings
              </button>
            </div>
          </section>
        </div>

        {/* Footer Back Button */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Vertiligence AI Homepage</span>
          </button>

          <p className="text-xs text-slate-400 font-mono">
            © {CURRENT_YEAR} Vertiligence AI. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  )
}
