### Inopsio Marketing Homepage — UI/Content/Styles Report

This document catalogs the homepage structure, exact copy (titles, subtitles), CTAs (labels + links), and key styles/behaviors used across sections.

## Page Composition
- Order in `HomePage`:
  1) `Hero`
  2) `Features`
  3) `PlatformOverview`
  4) `IndustrySolutions`
  5) `Stats`
  6) `ResourcesTeaser`
  7) `CTA`
  8) `Footer`

## Global Styling & Providers

### Global CSS (Tailwind setup)
- Fonts: `'Geist Mono'`, `'Sansation'` (+ system fallbacks), antialiasing on.
- Base Colors:
  - Light: background `#edf1f5`, text `#1a1b2e`.
  - Dark: `.dark` toggles background `#0a0f1c`, light text.
- Utilities (selected): `.heading-*`, `.text-lead`, `.text-body`, `.btn-primary`, `.btn-secondary`, `.feature-card`, glass morphism helpers, section paddings, animation helpers.

### Theme & Language
- Theme: `ThemeProvider` persists `light`/`dark` via `localStorage` and toggles `html.dark`.
- Language: `LanguageProvider` persists language, defaults to browser language, updates `documentElement.lang`.

## Header (Fixed Navigation)
- Style: translucent rounded nav (`bg-white/90` dark `bg-gray-900/90`, `backdrop-blur-xl`, subtle shadow on scroll), bordered.
- Desktop Menus (dropdowns): Platforms, AI & Automation, Solutions, Resources, Company.
- Desktop Actions:
  - Button: label "Request Demo" → link `/demo` (primary style).
  - Icons: search, user.
- Mobile: slide-down grouped lists; bottom CTA "Request Demo" → `/demo`.

## Hero
- Title: "Unify, Automate, and Secure Your Business Operations — Seamlessly."
- Subtitle: "Make technology your competitive edge. Inopsio empowers enterprises with intelligent systems that connect data, teams, and security for sustainable growth."
- Buttons:
  - Primary: label "Request Demo" → `/demo` (gradient, large, icon pulse).
  - Secondary: label "Contact Sales" → `/contact` (white, bordered).
- Layout/Behavior: centered content; staged fade/slide-in for title, subtitle, buttons.

## Features — Key Capabilities at a Glance
- Section Title: "Features — Key Capabilities at a Glance"
- Section Subtitle: "A unified suite for security, automation, and modern enterprise operations."
- Grid: responsive 1 (mobile) / 2 (tablet) / 3 (desktop) columns.
- Feature Cards (icon + title + description + hover line):
  1) Title: "Enterprise Security"
     - Description: "24/7 protection for IT and OT—real-time monitoring, compliance automation, rapid response."
     - Hover reveal: "Reduce breach risk and audit time with automated controls."
  2) Title: "AI-Powered Automation"
     - Description: "ML-powered workflows accelerate processes and ensure health, security, and performance."
     - Hover reveal: "Automate triage, routing, and anomaly detection across domains."
  3) Title: "CRM & Customer 360"
     - Description: "Centralized view of leads, pipeline, and interactions—drive targeted engagement and growth."
     - Hover reveal: "Unify marketing, sales, and support signals in one place."
  4) Title: "ERP & Business Intelligence"
     - Description: "Finance, inventory, and supplier management with powerful reporting and analytics."
     - Hover reveal: "Close books faster with accurate, real-time data."
  5) Title: "Multi-Tenant Control"
     - Description: "Isolate clients, personalize experience, and scale with subdomain routing and theming."
     - Hover reveal: "Enforce data boundaries with per-tenant policies."
  6) Title: "Unified Data & Reporting"
     - Description: "Real-time dashboards, compliance metrics, and deep insights for better decisions."
     - Hover reveal: "Blend operational, security, and finance data instantly."
- Additional Feature Highlights (bullets):
  - Developer Experience — Fast onboarding, robust CI/CD, one-click deployments.
  - Cloud-Native Performance — Kubernetes orchestration and IaC for scale.
  - Workflow & Process Automation — Drag-and-drop design, task assignment, analytics.
  - Mobile Access — Cross-platform apps with offline support and secure push.
  - Compliance & Policy Management — Automated ISO, GDPR, and sector rules.
- CTAs in section:
  - Panel CTA: label "Explore All Features" → `/features`.
  - Bottom block: primary "Explore All Features" → `/features`; secondary "Schedule Demo" → `/demo`.
- Styles: glass-like wrapper, rounded/bordered cards with hover border + shadow, staggered reveal; hover section shows extra value line.

## Platform Overview — The Inopsio Advantage
- Title: "Platform Overview — The Inopsio Advantage"
- Subtitle: "Inopsio is a cloud-native, multi-tenant SaaS platform that unifies enterprise operations, security, and automation. Designed for scale and agility, it powers CRM, ERP, IT/OT security, and AI-driven intelligence — all in one seamless environment."
- Cards (3-col desktop):
  - "Security-Driven Architecture"
  - "AI Automation & Analytics"
  - "Unified Operations"
  - "Multi-Tenant & Scalable"
  - "Cloud-Native Engineering"
  - "Observability & Monitoring"
  - "Plug-and-Play Modules"
  - "Developer-Ready Foundation"
- CTAs:
  - Primary: "Explore Platform Modules" → `/modules`.
  - Secondary: "View Live Demo" → `/demo`.
- Styles: rounded glass container; cards with icon color accents and hover text color.

## Industry Solutions — Powered by Inopsio
- Title: "Industry Solutions — Powered by Inopsio"
- Subtitle (italic): "Unlock measurable business value in every industry. Inopsio delivers unified IT, OT, security, and automation to drive resilience, efficiency, and competitive advantage."
- Grid: Bento layout with two 2-col spans (Gov & Manufacturing on md+).
- Tiles:
  - "Government & Public Sector" — outcomes: Simplify regulatory audits; Accelerate public service workflows; Enhance data resilience and privacy.
  - "Healthcare" — outcomes: Automate incident response; Protect sensitive records; Streamline audit readiness.
  - "Retail & eCommerce" — outcomes: Reduce fraud and chargebacks; Optimize customer engagement; Centralize omnichannel data.
  - "Financial Services" — outcomes: Reduce fraud & regulatory exposure; Accelerate digital onboarding; Real-time operations monitoring.
  - "Tech & SaaS Providers" — outcomes: Cut time-to-market for features; Ensure robust client separation; Continuous security monitoring.
  - "Manufacturing & OT" — outcomes: Minimize downtime with predictive insights; Secure every device and workflow; Boost productivity through automation.
- CTA: label "See Industry Success Stories" (button) → [link pending] (add when available).
- Styles: motion-in-view; gradient hover accents; bordered rounded tiles.

## Stats — Inopsio by the Numbers
- Title: "Inopsio by the Numbers"
- Subtitle: "Powered by modern architecture, intelligent automation, and enterprise-grade security. Every component of Inopsio is engineered for scale, speed, and resilience."
- Presentation:
  - ≥2XL: interactive horizontal cards; active card expands with gradient and full details.
  - <2XL: responsive grid of stat cards.
- Example Metrics (subset):
  - "12+" — Microservices in Production — "Modular architecture built for scalability and continuous iteration"
  - "6+" — Core Business Modules — "CRM, ERP, Email Automation, CyberOps, Workflow, and AI Services"
  - "100%" — Cloud-Native — "Fully containerized, Kubernetes-based, and Infrastructure-as-Code managed"
  - "24/7" — Monitoring & Observability — "Real-time metrics through Prometheus and Grafana integrations"
  - "99.99%" — Uptime Design Standard — "Multi-tenant, self-healing clusters designed for high availability"
  - "50+" — Security Controls Implemented — "Compliance with ISO 27001, SOC 2, and CNDP Law 09-08 baselines"
- Styles: per-card gradient overlays; bold metrics; framer-motion transitions.

## Resources — Insights That Matter
- Title: "Insights That Matter"
- Subtitle: "Discover expert perspectives, industry trends, and actionable strategies designed to help you secure, manage, and scale your digital operations."
- Cards (3-col grid):
  - Type: Blog — Title: "The Future of Enterprise Security: AI-Powered Threat Detection" — Status: Trending — Description: "Discover how AI is revolutionizing enterprise security with advanced threat detection capabilities." — Link: `/resources/blog/1`
  - Type: Blog — Title: "Zero Trust Architecture: Building Unbreachable Networks" — Description: "Learn the fundamentals of zero trust security and how to implement it in your organization." — Link: `/resources/blog/2`
  - Type: Whitepaper — Title: "Enterprise Security Compliance: A Complete Guide" — Status: New — Description: "Comprehensive guide to enterprise security compliance frameworks and best practices." — Link: `/resources/whitepaper/3`
- Styles: glass cards with image headers, tag pills for type/status, hover color on titles.

## CTA — Managed Security Meets Intelligent Operations
- Title: "Managed Security Meets Intelligent Operations"
- Subtitle: "Inopsio combines proactive cybersecurity, infrastructure management, and automation to keep your organization secure, visible, and always operational."
- Buttons:
  - Primary: label "Request a Demo" → `/demo`.
  - Secondary: label "Book Consultation" → `/managed-services`.
- Styles: large rounded, shadowed container with background image (`/images/cta-bg.png`), glass treatment.

## Footer
- System Status: label "All systems operational" → `https://uptime.inopsio.com`.
- Link Columns:
  - Platforms: CRM Platform, ERP Platform, Email Marketing, Workflow Automation, InoSec Core, InoSec Edge, InoSec One.
  - AI & Automation: AI Assistant, ML Platform, Intelligent Automation, Predictive Analytics.
  - Solutions: Healthcare, Financial Services, Manufacturing, Government, Education.
  - Resources: Blog, Documentation, Whitepapers, Case Studies, Webinars.
  - Company: About Us, Leadership, Careers, News & Press, Partners, Contact.
  - Legal: Privacy Policy, Terms of Service, Cookie Policy, GDPR Compliance.
- Compliance Badges: M-Law 09-08 (achieved), GDPR (achieved), ISO 27001 (achieved), SOC 2 Type II (in-progress), ISO 27701 (planned), ISO 22301 (planned).
- Social: Twitter, LinkedIn, GitHub, YouTube (icons; links placeholder `#`).
- Controls: `ThemeSwitcher`, `LanguageSelector`.
- Copyright:
  - "© {currentYear} Inopsio. All rights reserved. Built with enterprise-grade security and compliance."
- Styles: multilayer glass blocks, rounded, borders/shadows, responsive columns.

## Style System Summary
- Color usage: `primary` hue for emphasis (buttons, icons, hover borders), section gradients for Hero/Stats.
- Components: cards with rounded corners, subtle borders, hover shadows; icon blocks with colored backgrounds.
- Accessibility: focus rings on interactive elements; balanced text wrapping; dark mode support.


