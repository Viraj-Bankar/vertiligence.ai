# Vertiligence AI — Official Agency Website

> **Intelligence. Automation. Impact.**  
> An independent AI automation and business intelligence studio based in India.

We help businesses simplify repetitive operations, understand their data, and improve customer engagement through practical AI automation, business dashboards, and intelligent chatbots.

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
│   │   ├── About.tsx           # Independent studio narrative & specs
│   │   ├── BrandLogo.tsx       # Official emblem & responsive typography
│   │   ├── Contact.tsx         # Validated enquiry form & direct dispatch
│   │   ├── Footer.tsx          # Dynamic copyright, links & privacy trigger
│   │   ├── Hero.tsx            # Headline, eyebrow, dual CTAs, guarantees
│   │   ├── HeroVisual.tsx      # Connected workflows, BI & RAG visualizer
│   │   ├── Navbar.tsx          # Sticky bar with accessible mobile menu
│   │   ├── Portfolio.tsx       # Prototype cards (LeadFlow, FAQMate, InsightBoard)
│   │   ├── PortfolioModal.tsx  # Architecture inspector modal
│   │   ├── PrivacyModal.tsx    # Zero-cookie data handling statement
│   │   ├── Process.tsx         # 4-stage delivery timeline (light-neutral surface)
│   │   ├── Services.tsx        # 3 distinct service cards with preselection CTAs
│   │   └── WhyUs.tsx           # 5 pragmatic studio pillars
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

1. **Navigation**: Sticky bar with the official 3D glowing V mark, smooth scroll links to `#services`, `#process`, `#portfolio`, `#why-us`, `#about`, `#contact`, a prominent "Discuss Your Project" CTA, and an accessible mobile drawer with keyboard controls (`Esc` to close).
2. **Hero Section**: 
   - Eyebrow: `AI AUTOMATION · BUSINESS INTELLIGENCE`
   - Headline: *"Less busywork. More intelligent business."*
   - Supporting copy focused on workflows, dashboards, and chatbots.
   - Dual CTAs: *"Explore Our Services"* and *"Discuss Your Project"*.
   - Original abstract interactive pipeline visual displaying real-time data flows across Workflows, Insights, and Chatbots.
3. **Services Section**:
   - **AI Workflow Automation**: n8n, APIs, form-to-sheet workflows, email notifications, data sync.
   - **Business Intelligence Dashboards**: Sales, inventory, KPI tracking, CSV/Excel ingestion, Power BI and custom web dashboards.
   - **AI Chatbot Development**: Grounded FAQ assistants, lead collection, support triage, seamless human escalation.
   - *Preselection*: Clicking any service CTA auto-scrolls to the contact section and preselects that service in the enquiry form.
4. **How We Work (Process)**: 
   - Pristine light-neutral surface (`bg-[#F8FAFC]`) creating sophisticated visual contrast.
   - 4 clear milestones: **Discover**, **Design**, **Build**, **Deploy**.
   - Responsive horizontal timeline on desktop and vertical timeline on mobile.
5. **Portfolio Prototypes**:
   - Initial demonstrations: **LeadFlow** (n8n lead automation), **FAQMate** (grounded intake bot), **InsightBoard** (BI dashboard).
   - "Demo in development" status badges.
   - "Inspect Architecture & Specs" modal detailing inbound triggers, processing logic, and output deliverables.
6. **Why Vertiligence AI**:
   - 5 core principles: Real business needs, clear scope & direct communication, practical integrations, transparent handover, and measurable outcomes.
7. **About Section**:
   - Honest, professional overview of the studio's pragmatic engineering stance based in India.
   - Showcase of the official master logo lockup and technical specifications.
8. **Contact Section**:
   - Direct consultation form with client-side validation (Name, Business Email, Company, Service, Budget, Description, Consent).
   - **Zero False Claims**: Does not claim an email was sent over the wire unless a verified backend is connected.
   - Provides 1-click **"Launch in Email Client"** (`mailto:work.vertiligenceai@gmail.com`) with a formatted project brief, plus 1-click **"Copy Brief to Clipboard"**.
9. **Footer**:
   - Official brand emblem, tagline, service quick-links, dynamic copyright year (`{new Date().getFullYear()}`), and Privacy Notice modal.

---

## 🚢 Deployment Instructions (Free Static Hosting)

The project generates a 100% static client bundle inside `dist/` that can be hosted for free on any major CDN or static hosting provider.

### Option A: Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `VertiligenceAI` repository.
4. Vercel automatically detects Vite:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Option B: Netlify
1. Log in to [Netlify](https://www.netlify.com/) and select **"Add new site" > "Import an existing project"**.
2. Select your GitHub repository.
3. Configure build settings:
   - **Base directory**: Leave blank (root)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy site**.

### Option C: Cloudflare Pages
1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git**.
3. Select the repository and choose the **Vite** preset:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**.

### Option D: GitHub Pages
1. In `vite.config.ts`, set `base: './'`.
2. Run `npm run build`.
3. Deploy the contents of the `dist/` folder to the `gh-pages` branch or via a GitHub Actions workflow.

---

## 🔑 Environment Variables (Optional Integrations)

For the initial release, the website requires **no paid APIs and no mandatory environment variables**.

To connect the enquiry form to a live backend webhook (e.g., an n8n webhook, Formspree, Resend, or AWS Lambda) in the future, create a `.env` file in the root directory:

```env
# Optional: Webhook URL to receive enquiry submissions directly in n8n or CRM
VITE_ENQUIRY_WEBHOOK_URL="https://your-n8n-instance.com/webhook/vertiligence-inbound-lead"

# Optional: Public site URL for canonical SEO tags
VITE_SITE_URL="https://vertiligence.ai"
```

> **Security Note**: Never place secret API keys or private database credentials in client-side Vite environment variables (variables prefixed with `VITE_` are exposed to the browser bundle).

---

## ✅ Quality & Responsive Interaction Checklist

- [x] **Desktop Viewport (1280px+)**: Multi-column layouts, sticky blurred navbar, horizontal process timeline, hero telemetry pipeline visualizer.
- [x] **Tablet Viewport (768px – 1024px)**: Responsive 2-column service and portfolio grids, comfortable padding, intact hierarchy.
- [x] **Mobile Viewport (375px – 430px)**:
  - Working mobile navigation drawer with hamburger toggle (`aria-expanded`, Esc key listener).
  - Vertical process timeline with connecting milestone spine.
  - Zero horizontal overflow (`overflow-x: hidden`).
  - Minimum 44px tap targets for mobile usability.
- [x] **Service Preselection**: Clicking "Discuss Automation", "Discuss a Dashboard", or "Discuss a Chatbot" scrolls to `#contact` and preselects the corresponding option.
- [x] **Form Validation**:
  - Name: Required (min 2 chars).
  - Email: Valid regex pattern.
  - Description: Required (min 15 chars).
  - Consent checkbox: Enforced before submission.
  - Keyboard accessible error alerts (`aria-invalid`, `role="alert"`).
- [x] **Privacy & Transparency**:
  - Direct email fallback to `work.vertiligenceai@gmail.com`.
  - Zero fabricated client logos, fake awards, or hallucinated claims.
  - Comprehensive privacy modal with zero-tracking disclosure.
- [x] **Accessibility**:
  - High-contrast text exceeding WCAG AA standards.
  - Focus rings on interactive controls (`focus-visible:ring-cyan-400`).
  - Respects `prefers-reduced-motion` media query.
- [x] **Brand Assets**: Official 3D emblem integrated into favicon, navbar, hero visual, and About section.
#   v e r t i l i g e n c e . a i  
 