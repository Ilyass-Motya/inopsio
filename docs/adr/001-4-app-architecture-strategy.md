# ADR-001: 4-App Architecture Strategy

***

### Metadata

```yaml
id: ADR-001
domain: frontend
title: 4-App Architecture Strategy
owner: CTO
status: accepted
version: 1.1.0
tags: [frontend, architecture, multitenancy, monorepo]
last_reviewed: 2025-10-24
```

***

## 1. Status  
**Accepted** (Active as of October 2025)

***

## 2. Context  

The Inopsio platform serves several user profiles and business cases requiring tailored applications:  

| App | Primary Audience | Purpose |
|------|------------------|----------|
| Marketing Website | Public + Partners | Lead generation + SEO |
| Admin Dashboard | Internal Staff | System administration |
| Platform Dashboard | B2B Customers | CRM, ERP, Email automation |
| InoSec Platform | Enterprise Tenants | Security monitoring + threat management |
| Mobile App | Field Agents / Executives | Cross‑platform access |

#### Requirements
- Independent scalability per app.  
- Isolated deployment pipelines.  
- Diverse UI framework support per context.  
- Consistent design system and shared dependencies.  

***

## 3. Decision  

Adopt a **4‑App Architecture model** with dedicated frontend applications under a shared monorepo.  

| Application | Framework + Stack | Domain | Primary Role |
|---------------|-------------------|----------|----------------|
| **Marketing** | Next.js 14 + Tailwind + Shadcn/UI | inopsio.com | Public site, CMS, blog |
| **Admin Dashboard** | React (Vite) + Tailwind | admin.inopsio.com | Admin portal + supervision |
| **Platform Dashboard** | Next.js 14 + Tailwind | app.inopsio.com | CRM + ERP modules |
| **InoSec Platform** | Next.js multi‑tenant | {tenant}.inosec.com | Security center |
| **Mobile App** | React Native (Expo) | Mobile stores | Offline‑capable client |

#### Repository Layout
```
/frontend/apps/
 ├── marketing/
 ├── admin-dashboard/
 ├── platform/
 ├── inosec/
 └── mobile/
```

***

## 4. Consequences  

### Positive Outcomes  
- ✅ Optimized UX per target audience.  
- ✅ Independent CI/CD pipelines for faster delivery.  
- ✅ Technology freedom for teams.  
- ✅ Scalability based on usage load.  
- ✅ Improved fault isolation (per‑domain failure containment).  

### Negative Outcomes + Mitigations  

| Issue | Mitigation Strategy |
|--------|----------------------|
| Code duplication | Central shared packages under `@inopsio/*` |
| Operational complexity | Automated workspace scripts and deployment orchestration |
| Testing overhead | Unified test suite + shared fixtures |
| Dependency management | Monorepo workspace enforcement (via pnpm) |
| Documentation drift | Dedicated doc folder per app + index summary |

***

## 5. Alternatives Evaluated  

| Alternative | Pros | Cons | Reason Rejected |
|---------------|-------|-------|----------------|
| Single Monolithic App | Simpler deployment | Poor performance / scalability | Unfit for multi‑tenant use cases |
| Micro‑frontend Architecture | High autonomy | Complex setup + runtime degradation | Too costly vs. benefit |
| Hybrid Monolith | Moderate balance | Still tight coupling and limited scalability | Insufficient flexibility |

***

## 6. Implementation Phases  

| Phase | Activity | Deliverables |
|---------|-------------|--------------|
| 1 | Monorepo foundation setup | `package.json` matrix, `pnpm`, shared packages |
| 2 | App skeleton development | Marketing, Admin, and Platform dashboards |
| 3 | Advanced modules integration | InoSec Platform + Mobile app |
| 4 | Performance + CI/CD | Deployment automation and monitoring dashboards |

***

## 7. Success Criteria  
- ✅ All apps deployed and functional.  
- ✅ Cross‑app shared packages operational.  
- ✅ CI/CD stages independently operable.  
- ✅ Performance benchmarks: < 3 s TTFB / 99.9 % uptime.  
- ✅ UX consistency verified via design tokens.  

***

## 8. Compliance and Audit Mapping  

| Standard | Control | Evidence |
|------------|----------|-----------|
| ISO 27001 | A.14 – System Design + Acceptance Testing | CI/CD test reports |
| SOC 2 | CC6 – System Changes Tracked | Git history and ADR record |
| CNDP (Morocco) | App Segmentation Policies | Multi‑tenant architecture review |

All evidence stored under `/docs/compliance/audit-artifacts/releases/`.

***

## 9. Related ADRs  
- [ADR‑002: Shared Package Architecture](./002-shared-package-architecture.md)  
- [ADR‑003: Micro‑Frontend Bridge Layer](./003-micro-frontend-bridge-layer.md)  
- [ADR‑004: Technology Stack Alignment](./004-technology-stack-alignment.md)

***

## 10. Review Schedule  
| Reviewer | Frequency | Next Review |
|------------|-------------|--------------|
| CTO / Frontend Architect | Annual | Q4 2026 |

Review records stored in: `/reports/governance/adr-review.log`

***

### Expert Recommendation  
This updated ADR ensures **4‑App Architecture** remains the single source of truth for frontend strategic decisions.  
It’s now aligned with ADR index governance and compliance automation, making it traceable across security reviews and ISO audits.

***