**Inopsio Architecture Decision Record – Frontend Framework & Design System**

***

### 1. Purpose  
This ADR defines the major frontend architecture decisions for the Inopsio platform, including the technologies powering the marketing site, admin dashboard, and modular component library.  
It ensures consistent UX, scalability, and observability across tenant‑specific branded experiences.

**Linked Documents:**  
- `/docs/architecture/architecture.md`  
- `/docs/architecture/data-model.md`  
- `/docs/devops/ci-cd-pipelines.md`  
- `/docs/security/security-controls.md`

***

### 2. Frontend Architecture Goals  

- Deliver highly performant, component‑driven UI with multi‑tenancy support.  
- Ensure design consistency via a shared component library (Shadcn + Tailwind).  
- Enable server‑side rendering (SSR) for SEO‑friendly marketing layers.  
- Maintain optimized developer DX through modular Next.js and React Vite stacks.  
- Embed analytics, error tracking, and accessibility standards.  

***

### 3. Decision Summary  

| Decision ID | Topic | Status | Date | Owner |
|--------------|----------|---------|---------|---------|
| ADR‑FE‑001 | Framework Selection (Next.js + Vite) | Accepted | 2024‑11‑10 | CTO |
| ADR‑FE‑002 | UI Library (Tailwind + Shadcn/UI) | Approved | 2024‑11‑14 | Design Lead |
| ADR‑FE‑003 | State Management (Zustand + React Query) | Accepted | 2025‑01‑15 | Frontend Lead |
| ADR‑FE‑004 | Design System Tokenization (Figma → CSS Vars) | In use | 2025‑02‑02 | UI Architect |
| ADR‑FE‑005 | Multi‑tenant Theme Variants | Accepted | 2025‑03‑30 | Design System Team |
| ADR‑FE‑006 | SSG Marketing Site Hosting (on Vercel) | Accepted | 2025‑04‑22 | Marketing Lead |
| ADR‑FE‑007 | DX Toolchain (Vite + ESLint + Prettier + Husky) | Accepted | 2025‑05‑01 | Engineering Lead |
| ADR‑FE‑008 | Error Tracking (Sentry + Performance Insights) | Active | 2025‑06‑02 | DevOps Lead |

***

### 4. Frontend Repository Structure  

```
inopsio-frontend/
├── website/                  # Marketing site (Next.js + Tailwind)
│   ├── pages/
│   ├── components/
│   └── public/
├── dashboard/                # Admin console (React + Vite)
│   ├── src/
│   ├── components/
│   ├── hooks/
│   └── services/
└── shared-ui/                # Component library + design tokens
    ├── components/
    ├── styles/
    ├── utils/
    └── index.ts
```

***

### 5. Framework and Tooling Rationale  

| Component | Selected Technology | Justification |
|-------------|----------------------|----------------|
| Marketing Website | Next.js 14 + App Router | SEO‑optimized SSR + Edge deployment on Vercel |
| Admin Dashboard | React 18 + Vite | Fast HMR, module federation readiness |
| Styling System | Tailwind CSS + Shadcn/UI | Unified responsive tokens and design consistency |
| Component Lib | Radix UI under Shadcn | Accessibility‑first controls |
| Forms & Validation | React Hook Form + Zod | Lightweight, TS‑safe validation |
| State Management | Zustand (local) + React Query (fetched data) | Performance + predictability |
| Charts and Dashboards | Recharts / ECharts | Analytics visuals for tenant dashboards |
| Testing | Vitest + Playwright | Unit + E2E coverage for critical flows |

***

### 6. Multi‑Tenant UX Implementation  

| Layer | Mechanism | Outcome |
|--------|-------------|----------|
| Tenant Detection | Domain‑based middleware (`/tenant-id`) | Brand context resolution |
| Theme Token Routing | CSS variables via design tokens | Per‑tenant brand customization |
| Locale Management | i18n with next-intl | Regional UX adaption |
| API Binding | JWT Tenant payload + Gateway headers | Data context synchronization |

Example:  
```ts
const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || 'default';
```

Custom themes registered dynamically from Vault config (per tenant).

***

### 7. Design System and Figma Integration  

- Unified in **Figma Tokens plugin**, converted to CSS variables in `/shared-ui/styles/tokens.css`.  
- Component examples automatically generated via Storybook (`storybook-static/`).  
- Light/Dark modes and brand variants controlled with token switchers.  

Artifacts synced through CI → `/shared-ui/version.json`.

***

### 8. Performance Optimization  

| Optimization | Technique | Result |
|----------------|-------------|----------|
| Code Splitting | Next.js dynamic imports + React.lazy | Reduced JS bundle size |
| Image Delivery | Next Image component + CDN | > 40 % faster page load |
| Cache Strategy | Service Worker + Vercel Edge Caching | Reduced revalidation latency |
| Build Artifacts | Vite tree‑shaking + ESBuild | Lightweight bundle |
| Monitoring | Sentry + Lighthouse CI | Continuous performance audit |

Average Lighthouse score: 95+ consistently.

***

### 9. Security Practices  

| Layer | Control | Reference |
|--------|----------|----------|
| API Requests | JWT  Auth + CORS policies | Gateway Configuration |
| User Data | Client‑side Encryption (AES‑GCM) | `crypto-js` |
| XSS Protection | Auto escaping + CSP headers | Vercel configs |
| Dependencies | Trivy Scan per frontend build | Security Pipeline |
| Error Reporting | Sentry Alerts + Slack Integration | SOC response logs |

***

### 10. CI/CD and Testing Pipeline  

- **Pre‑commit** lint & format (Husky + ESLint + Prettier).  
- **Unit tests:** Vitest coverage target ≥ 85 %.  
- **E2E tests:** Playwright integration in staging.  
- **Static builds:** Next + Vite optimized for multi‑env (`dev/stage/prod`).  
- **Deployment:** Vercel + GitHub Actions workflow (`/frontend-deploy.yml`).  

Artifacts tracked under `/reports/builds/frontend/`.

***

### 11. Accessibility and Localization  

- WCAG 2.1 AA conformance.  
- Keyboard navigation tests automated in Cypress.  
- i18n framework localized for EN, FR, AR.  
- Regional meta schemas injected via Next SEO plugin.  

Localization config stored in `/frontend/shared/config/locales.ts`.

***

### 12. Observability and Error Tracking  

- **Sentry:** Error reporting and performance monitoring.  
- **OpenTelemetry:** Front‑to‑back trace sync (ID correlation with NestJS services).  
- **Grafana:** LCP and TTFB metrics on Operational dashboard.  
- **Synthetic Monitoring:** Uptime checks via Prometheus + Blackbox Exporter.  

Linked to: `/docs/architecture/monitoring.md`.

***

### 13. ADR Change Workflow  

| Step | Action | Responsible |
|-------|----------|--------------|
| 1 | Create proposal for frontend stack update | Frontend Lead |
| 2 | Validate impact on UX and DX | Design Ops Team |
| 3 | Security approval of framework integrations | CISO |
| 4 | Tag and archive version | CTO |
| 5 | Sync ADR index (`/docs/adr/index.md`) | Docs Manager |

***

### 14. Linked Documents  

| File | Purpose |
|-------|-----------|
| `/docs/architecture/architecture.md` | Full system structure overview |
| `/docs/architecture/monitoring.md` | Frontend error and APM integration |
| `/docs/devops/security-pipeline.md` | Static security validation |
| `/docs/security/policies.md` | Browser security governance |
| `/docs/compliance/iso27001-controls.md` | Audit traceability for front‑end decisions |

***

### Expert Recommendation  
This **Frontend ADR** consolidates technology and UX decisions into a versioned, reviewable record.  
It enforces architectural discipline, improves onboarding, and ensures long‑term compatibility between your frontend and backend ecosystems.
