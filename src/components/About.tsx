import React from 'react'
import { Terminal, Shield, CheckCircle2, Globe, Cpu } from 'lucide-react'


export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative" aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Studio Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-5">
              <Globe className="w-3.5 h-3.5" />
              <span>Independent Studio · India</span>
            </div>

            <h2 id="about-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              An independent studio focused on practical technology.
            </h2>

            <div className="space-y-4 text-base text-slate-300 leading-relaxed">
              <p>
                Vertiligence AI is an independent technology studio based in India. We help modern businesses simplify repetitive operations, make sense of complex data, and enhance customer interactions through practical AI automation, business intelligence dashboards, and intelligent chatbots.
              </p>
              <p>
                Too much of the current conversation around AI revolves around speculative hype, bloated agency packages, or fragile prototypes that break when exposed to real-world edge cases. We take a different approach.
              </p>
              <p>
                We view AI and automation as practical engineering disciplines. Whether that means orchestrating a multi-step n8n pipeline that saves your team 15 hours every week, consolidating siloed spreadsheets into a crystal-clear Power BI dashboard, or deploying a domain-grounded assistant that triages inbound leads—we focus strictly on reliable, measurable solutions.
              </p>
            </div>

            {/* Core Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Full Client Ownership</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    You hold all credentials, source files, and workflow configurations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Privacy & Control</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    No third-party data scraping or unauthorized training on your business assets.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Pragmatic Tool Selection</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    We select tools that fit your existing workflow, not the other way around.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Direct Communication</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Clear project milestones, transparent timelines, and honest technical guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Card & Technical Specs */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#0C1222] to-[#080C17] border border-cyan-500/25 p-7 sm:p-8 shadow-2xl shadow-cyan-500/5">
              {/* Official Studio Brand Mark */}
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/25 mb-6 bg-black/60 p-2 shadow-inner group">
                <img
                  src="/logo-full.png"
                  alt="Vertiligence AI — Intelligence. Automation. Impact."
                  className="w-full h-auto rounded-lg object-contain group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                  Official Studio Mark
                </div>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Technical Architecture
                </span>
                <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded bg-white/5 border border-white/10 text-cyan-300">
                  Studio Specs
                </span>
              </div>


              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block">Core Focus</span>
                    <span className="font-medium text-slate-200">
                      AI Workflow Automation, BI Dashboards & AI Chatbots
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Globe className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block">Base Location</span>
                    <span className="font-medium text-slate-200">
                      India (Serving forward-thinking teams globally)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block">Execution Tooling</span>
                    <span className="font-medium text-slate-200">
                      n8n, React, Python, REST/GraphQL APIs, SQL & Power BI
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block">Engagement Model</span>
                    <span className="font-medium text-slate-200">
                      Milestone-based project scoping with full documentation
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
