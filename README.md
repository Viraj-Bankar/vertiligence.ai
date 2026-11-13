# Vertiligence AI — Official Company Website

> **Intelligence. Automation. Impact.**  
> An AI-enabled business systems and automation company based in India.

We help growing organizations—initially digital agencies, IT services firms, and consultancies—connect customer operations, internal workflows, and business information through our modular **Vertiligence Operations Hub** platform and expert systems integration.

---

## 🚀 Live Demo & Development

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ / v24+ recommended)
- **npm**: v9.0.0 or later

### Installation
```bash
# Clone or navigate to the project directory
cd VertiligenceAI

# Install dependencies
npm install
```

### Local Development Server
```bash
npm run dev
```
The development server will launch at `http://localhost:5173/` with hot module replacement (HMR).

### Linting & Type Checking
```bash
# Run oxlint
npm run lint

# Run TypeScript typecheck and Vite build
npm run build
```

### Production Preview
```bash
npm run preview
```

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Framework** | [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) | Modern, ultra-fast client-side application |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict typing with `verbatimModuleSyntax` |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | High-performance CSS engine with modern theme tokens |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, accessible open-source iconography |
| **Linter** | [Oxlint](https://oxc.rs/) | Rust-powered high-speed linter for React & TypeScript |

---

## 📁 Project Structure

```
VertiligenceAI/
├── public/
│   ├── favicon.ico             # Studio favicon icon
│   ├── favicon.png             # Official 3D emblem browser icon
│   ├── logo-full.png           # Master brand lockup (Emblem + Typography + Tagline)
│   ├── logo-emblem.png         # Cropped 3D electric blue & node emblem
│   └── og-image.png            # OpenGraph 1200x630 social card
├── src/
│   ├── components/
│   │   ├── About.tsx           # Company narrative, specs & master brand lockup
│   │   ├── BrandLogo.tsx       # Official emblem & responsive typography
│   │   ├── Contact.tsx         # Validated consultation form & dispatch handshake
│   │   ├── Footer.tsx          # Dynamic copyright, links & privacy trigger
│   │   ├── Hero.tsx            # Headline, eyebrow, dual CTAs, guarantees
│   │   ├── HeroVisual.tsx      # Connected workflows, BI & RAG visualizer
│   │   ├── Navbar.tsx          # Sticky bar with accessible mobile menu & skip link
│   │   ├── Portfolio.tsx       # 4 Prototype cards (Operations Hub, LeadFlow, FAQMate, InsightBoard)
│   │   ├── PortfolioModal.tsx  # Architecture inspector modal with focus trapping
│   │   ├── PrivacyModal.tsx    # Zero-cookie data handling statement
│   │   ├── Process.tsx         # 5-stage engineering delivery methodology
│   │   ├── Services.tsx        # 6 strategic capabilities with preselection CTAs
│   │   └── WhyUs.tsx           # 6 core strategic principles
│   ├── data/
│   │   └── content.ts          # Structured services, process, and portfolio data
│   ├── types/
│   │   └── index.ts            # TypeScript definitions for forms, services, demos
│   ├── App.tsx                 # Main application layout and state coordinator
│   ├── index.css               # Tailwind v4 setup, reduced-motion, custom utilities
│   └── main.tsx                # React root mount point
├── index.html                  # SEO meta tags, Google Fonts & OpenGraph markup
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🌐 Website Sections Breakdown

1. **Navigation**:
   - Skip to main content accessibility link (`#main-content`).
   - Sticky bar with the official 3D glowing V mark, smooth scroll links to `#services`, `#process`, `#portfolio`, `#why-us`, `#about`, `#contact`, a prominent "Discuss Your Operations" CTA, and an accessible mobile drawer with keyboard controls (`Esc` to close).
2. **Hero Section**: 
   - Eyebrow: `BUSINESS SYSTEMS · WORKFLOW AUTOMATION · AI OPERATIONS`
   - Headline: *"Less busywork. More intelligent business."*
   - Supporting copy focused on connected business systems, the Operations Hub, and systems integration.
   - Dual CTAs: *"Explore Capabilities"* and *"Discuss Your Operations"*.
   - Strategic highlights: Vertiligence Operations Hub, Tailored n8n Pipelines, Direct Engineering Scoping, and 100% Client Ownership.
3. **Hero Telemetry Visualizer**:
   - Interactive 3-column architecture diagram showcasing raw data intake, the central Vertiligence engine, and deterministic operational outcomes.
   - Tabbed view switcher between Workflows, Insights, and Chatbots with WAI-ARIA tab semantics.
4. **Services Section (6 Strategic Capabilities)**:
   - **Vertiligence Operations Hub**: Modular business operations platform managing customer lifecycle from lead capture through client onboarding and task delivery.
   - **AI Workflow Automation**: Cross-system n8n automations, CRM synchronization, and resilient API pipelines.
   - **Operational BI & Dashboards**: Executive KPI visibility, pipeline velocity, team utilization, and exportable reports.
   - **Domain-Grounded AI Assistants**: Retrieval-augmented conversational assistants strictly grounded in verified documentation with human escalation tickets.
   - **Systems Integration & Scoped Rollout**: Diagnostic audits, legacy data cleanup and schema migration, custom API connectors, and runbooks.
   - **Managed Operations & SLA Support**: 24/7 pipeline health monitoring, error alerting, API update maintenance, and SLA-backed support.
5. **How We Deliver (5-Phase Engineering Methodology)**:
   - Phase 01: **Diagnose** (1–3 days: workflow audit, data schema mapping, feasibility).
   - Phase 02: **Design** (2–4 days: system architecture blueprint, logic flowcharts, fixed quote).
   - Phase 03: **Implement** (1–3 weeks: modular tenant build, API connectors, staging walkthrough).
   - Phase 04: **Validate** (3–5 days: edge-case test suite, retry drills, user acceptance sign-off).
   - Phase 05: **Adopt & Support** (100% credential/code transfer, video runbooks, warranty & SLA monitoring).
6. **Portfolio & Architecture Prototypes**:
   - **Vertiligence Operations Hub** (Flagship Platform Prototype: lead-to-delivery workspace, multi-tenant RBAC).
   - **LeadFlow** (Active Pipeline Prototype: multi-channel lead ingestion, validation, and CRM routing).
   - **FAQMate** (Active Conversational Prototype: grounded RAG assistant with strict anti-hallucination guardrails).
   - **InsightBoard** (Active Analytics Prototype: executive BI dashboard unifying disparate databases).
   - Interactive Architecture Inspector modal with focus management and Esc key handling.
7. **Why Partner With Vertiligence AI**:
   - 6 strategic pillars: Business outcomes before technology novelty, product-led with expert implementation, interoperability first, secure by design & responsible AI, 100% client ownership & transparent handover, and measurable operational ROI.
8. **About Section**:
   - Clear articulation of our position as an AI-enabled business systems and automation company based in India.
   - Showcase of master logo lockup and technical specifications.
9. **Contact Section**:
   - Direct consultation form with client-side validation (Name, Business Email, Company, Service Radio Group, Budget Tier, Description, Consent).
   - Accessible WAI-ARIA radio group with keyboard arrow navigation.
   - Optional automatic webhook transmission (`VITE_ENQUIRY_WEBHOOK_URL`).
   - Direct dispatch fallback with 1-click **"Launch in Email Client"** (`mailto:work.vertiligenceai@gmail.com`) and robust 1-click **"Copy Brief to Clipboard"**.
10. **Footer**:
    - Official brand emblem, tagline, full solutions quick-links, dynamic copyright year (`{new Date().getFullYear()}`), verified GitHub link, and Privacy Notice modal.

---

## 🚢 Deployment Instructions (Free Static Hosting)

The project generates a 100% static client bundle inside `dist/` that can be hosted on any major CDN or static hosting provider.

### Option A: Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `VertiligenceAI` repository.
4. Build command: `npm run build`, Output directory: `dist`.
5. Click **Deploy**.

### Option B: Netlify
1. Select **"Add new site" > "Import an existing project"** on [Netlify](https://www.netlify.com/).
2. Select your GitHub repository.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Click **Deploy site**.

### Option C: Cloudflare Pages
1. Go to **Cloudflare Dashboard** > **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
2. Select repository, preset: **Vite**, Build command: `npm run build`, Output directory: `dist`.
3. Click **Save and Deploy**.

---

## 🔑 Environment Variables (Optional)

```env
# Optional: Webhook URL to receive enquiry submissions directly in n8n, CRM, or backend API
VITE_ENQUIRY_WEBHOOK_URL="https://your-n8n-instance.com/webhook/vertiligence-inbound-lead"

# Optional: Public site URL for canonical SEO tags
VITE_SITE_URL="https://vertiligence.ai"
```

---

## ✅ Post-Implementation Audit Checklist

- [x] **Product-Led Alignment**: Vertiligence Operations Hub featured as flagship software alongside 5 specialized services.
- [x] **Positioning Consistency**: Replaced generic "AI agency/studio" copy with approved positioning as an AI-enabled business systems and automation company.
- [x] **Navigation & CTAs**: Fixed header scroll offsets (`scroll-mt-24`) across all sections, verified all anchor links and preselection CTAs.
- [x] **Mobile Responsiveness**: Zero horizontal overflow on 320px, 375px, and 1280px viewports; responsive 5-stage timeline with non-overflowing milestone nodes.
- [x] **Portfolio Integrity**: Added Operations Hub prototype, highlighted staging/blueprint status, and avoided fabricated claims or unverified metrics.
- [x] **Form Functionality**: Multi-tier budget options aligned with business model, accessible radio groups with arrow key navigation, webhook submission support with loading state, and reliable mailto/clipboard fallback.
- [x] **Placeholder URLs Eliminated**: Removed unverified placeholder social links, linked to official GitHub repo.
- [x] **Accessibility (WCAG 2.1 AA)**: High contrast throughout (fixed light timeline contrast), keyboard skip link, accessible dialog roles, and focus trapping in modals.
- [x] **Zero Build & Console Errors**: Clean production build with Vite 8 + React 19 + TypeScript, 0 oxlint warnings, 0 runtime console errors.
- [x] **Deduplicated Components**: Cleaned unused starter template assets and streamlined brand logo usage.
