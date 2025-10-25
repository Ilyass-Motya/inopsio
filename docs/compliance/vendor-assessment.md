**Inopsio Vendor Risk Management & Third‑Party Assessment Framework**

### Purpose  
To define the evaluation process, controls, and oversight applied to any third‑party or external integration that has access to data, infrastructure, or production systems.  
It ensures supply‑chain accountability and continuous vendor compliance.

***

### 1. Overview  

- **Goal:** Mitigate third‑party risks and data exposure through standardized vendor selection, onboarding, and continuous monitoring.  
- **Scope:** All SaaS and infrastructure vendors (cloud, email, payments, AI APIs, monitoring, and DevOps tooling).  
- **Frameworks Referenced:** ISO 27001 A.15 & A.17, SOC 2 CC1.4 & CC9.2, GDPR Article 28, CNDP Law 09‑08.  

**Linked Docs:**  
- `/docs/compliance/data-governance.md`  
- `/docs/architecture/security-controls.md`  
- `/docs/compliance/iso27001-controls.md`

***

### 2. Vendor Classification  

| Tier | Definition | Examples | Risk Level |
|-------|-------------|-----------|-------------|
| Tier 1 | Core operational vendors | Cloud providers, payment processors | Critical |
| Tier 2 | Supporting services | CRM plugins, marketing automation | Moderate |
| Tier 3 | Limited data access tools | Dev utilities, analytics libs | Low |

Classification determines review frequency and evidence depth.

***

### 3. Assessment Process  

| Phase | Action | Responsible | Evidence |
|--------|----------|---------------|-------------|
| Pre‑Contract | Security Questionnaire + NDA Review | Procurement + SecOps | `/forms/vendor‑questionnaire.xlsx` |
| Due Diligence | Audit reports & certifications check | CISO office | ISO/SOC evidence |
| Onboarding | Access scoping & logging setup | DevOps | Terraform policies |
| Operational Monitor | Quarterly review of compliance | DPO | Risk register update |
| Offboarding | Access revocation + data deletion proof | Legal & Infra | Audit artifact |

***

### 4. Vendor Security Requirements  

**Mandatory:**  
- ISO 27001 or SOC 2 certification (or equivalent).  
- Data at rest & in transit encryption.  
- PII handling in line with GDPR & CNDP.  
- Vulnerability and patch management.  
- Signed DPA (Data Processing Agreement).  
- Incident report window ≤ 72 hours.  

Linked templates: `/docs/compliance/templates/dpa-template.md`

***

### 5. Vendor Monitoring & Metrics  

| Metric | Description | Source | Target |
|----------|--------------|---------|---------|
| Active vendor count | Vendors with data access | Vendor Registry | ≤ 25 |
| Audit review rate | Audited vendors per quarter | Compliance Reports | ≥ 85% |
| Vulnerability notifications | Avg time to address CVEs | Vendor portals | < 14 days |
| Access revocation SLA | Post‑termination timing | IAM audit | ≤ 24 hrs |

All metrics visualized in Grafana via `vendor‑risk‑dashboard`.

***

### 6. Vendor Registry Template  

| Vendor Name | Service Type | Data Processed | Certifications | Review Date | Score |
|---------------|---------------|----------------|-----------------|--------------|--------|
| OVH Cloud | Hosting Provider | Infrastructure Logs | ISO 27001 / SOC 2 | Q1 2025 | ✅ Pass |
| Cloudflare | DDoS Protection | Network Traffic | ISO 27701 | Q1 2025 | ✅ Pass |
| Stripe | Payments | Customer billing | PCI‑DSS Lvl 1 | Q4 2024 | ✅ Pass |
| SendGrid | Transactional Email | Opt‑in emails | SOC 2 Type I | Q2 2024 | 🕓 Pending |
| GPT API | AI Automation | Anonymized text | SOC 2 | Q3 2025 | Under Review |

Table stored in `/docs/compliance/vendor‑registry.csv`.

***

### 7. Risk Scoring Model  

- **Weighting factors:** Access scope (40%) + Data sensitivity (30%) + Compliance status (30%)  
- **Risk Tiers:**  
  - 0–3  → Low (Normal monitoring)  
  - 4–6  → Medium (Quarterly audit)  
  - 7–10 → High (Monthly review + exec report)  

Formula configured in `/scripts/vendor‑risk‑calculator.py`.

***

### 8. Incident Response with Vendors  

1. Vendor detects breach → notify Inopsio SOC within 72 hours.  
2. Internal SOC triages and classifies incident impact.  
3. Incident captured in `/docs/security/incident‑response.md`.  
4. Post‑incident report included in quarterly risk review.  

***

### 9. Termination & Data Deletion  

- Vendor must certify deletion of tenant data post‑contract.  
- Data erasure logs reviewed by Compliance Officer.  
- Certificate retained for minimum 7 years (per CNDP guidelines).  

Linked folder: `/compliance/audit‑artifacts/vendors/`

***

### 10. Continuous Improvement  

- Annual vendor training on security contracts.  
- Vendor portal audit tool integration planned (Q1 2026).  
- Automated notification system for expiring certifications.  

***

### 11. Governance and Responsibility  

| Role | Responsibility | Frequency |
|-------|----------------|------------|
| Procurement Lead | Initial vendor vetting | Each onboarding |
| Compliance Officer | Quarterly risk review | Quarterly |
| DevOps Team | Infrastructure integration security | Continuous |
| DPO | Data protection oversight | Monthly |
| Legal Counsel | Contract DPA validation | Annual |

***

### Linked Documents  

| Linked File | Description |
|--------------|-------------|
| `/docs/compliance/data-governance.md` | Data handling & privacy baselines |
| `/docs/compliance/iso27001-controls.md` | Mapped security control references |
| `/docs/security/incident-response.md` | Shared incident workflow |
| `/docs/governance/risk-register.md` | Risk tracking and vendor scores |

***

### Expert Recommendation  

The **Vendor Assessment Framework** serves as Inopsio’s supply‑chain security foundation. It guarantees compliance continuity across partners and vendors while providing auditable evidence for ISO 27001 and SOC 2.  