import React from 'react'
import { Terminal, Shield, CheckCircle2, Globe, Cpu, LayoutDashboard } from 'lucide-react'
import { BrandLogo } from './BrandLogo'

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative scroll-mt-24" aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-5">
              <Globe className="w-3.5 h-3.5" />
              <span>Business Systems & Automation Company · India</span>
            </div>

            <h2 id="about-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Connecting business operations through software, automation & AI.
            </h2>

            <div className="space-y-4 text-base text-slate-300 leading-relaxed">
              <p>
                Vertiligence AI is an AI-enabled business systems and automation company based in India. We help growing organizations—initially digital agencies, IT services firms, and consultancies—connect customer operations, internal workflows, and business information through an integrated platform and expert implementation.
              </p>
              <p>
                Too much of the technology landscape is fragmented across disparate SaaS subscriptions, repetitive manual data handoffs, and brittle prototypes that fail in production. We reject technology novelty for its own sake.
              </p>
              <p>
                We believe in a product-led, service-supported approach. By uniting our flagship <strong>Vertiligence Operations Hub</strong> with hands-on systems integration, n8n automations, and operational BI dashboards, we eliminate administrative bottlenecks, improve delivery velocity, and give leadership dependable, real-time visibility.
              </p>
            </div>

            {/* Core Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">Transparent IP & Source Transfer</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ownership, licensing, and source-code handover terms are clearly defined in each project agreement.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">Secure by Design & Privacy</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tenant isolation, RBAC permissions, and customized data protection boundaries agreed per project.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">Interoperability First</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    We integrate with your existing tech stack rather than force disruptive replacement.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">Direct Engineering Scoping</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Communicate directly with system architects with clear milestones and SLAs.
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Engineering Statement (Task 4) */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900/50 border border-cyan-500/20 relative">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-2.5 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Founder Engineering Statement</span>
              </div>
              <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed italic border-l-2 border-cyan-400 pl-4 py-1">
                &ldquo;Technology should solve real operational problems rather than simply introduce more software. Every system we design—whether an automated data pipeline, an AI assistant, or a custom operations hub—is engineered with a single standard: eliminate manual friction, integrate with existing workflows, and deliver measurable business utility.&rdquo;
              </blockquote>
              <div className="mt-3 pl-4 text-xs font-mono text-slate-400">
                — Engineering Leadership, Vertiligence AI
              </div>
            </div>
          </div>

          {/* Right Column: Company Specifications */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#0C1222] to-[#080C17] border border-cyan-500/25 p-7 sm:p-8 shadow-2xl shadow-cyan-500/5">
              {/* Master Brand Lockup */}
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/25 mb-6 bg-black/60 p-4 shadow-inner flex items-center justify-center">
                <BrandLogo variant="full" />
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Company Architecture
                </span>
                <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded bg-white/5 border border-white/10 text-cyan-300">
                  Technical Specs
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <LayoutDashboard className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block">Flagship Software</span>
                    <span className="font-medium text-slate-200">
                      Vertiligence Operations Hub (Lead-to-Delivery Workspace)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Terminal className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block">Target Segment</span>
                    <span className="font-medium text-slate-200">
                      Digital Agencies, IT Services, Consultancies & Growing SMEs
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block">Integration Stack</span>
                    <span className="font-medium text-slate-200">
                      n8n, React 19, Python FastAPI, PostgreSQL, Power BI & REST/GraphQL
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Globe className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block">Headquarters</span>
                    <span className="font-medium text-slate-200">
                      India (Serving progressive teams globally)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block">Operating Model</span>
                    <span className="font-medium text-slate-200">
                      Product-led, service-supported technology company
                    </span>
                  </div>
                </div>
              </div>

              {/* Tagline callout */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <div className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
                  Intelligence. Automation. Impact.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
