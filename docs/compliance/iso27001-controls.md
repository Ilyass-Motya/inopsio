**Inopsio ISO/IEC 27001:2022 Control Mapping & Implementation Evidence**

### Purpose  
To document how Inopsio meets each ISO 27001 Annex A control through technical, organizational, and procedural measures.  
This provides a unified compliance reference for auditors, clients, and internal governance.

***

### 1. Overview  

- **Standard Reference:** ISO/IEC 27001:2022 & ISO/IEC 27002:2022 Guidelines  
- **Scope:** Entire Inopsio SaaS ecosystem, including AI, multi-tenant services, infrastructure, and user data handling.  
- **Objectives Covered:** Information security management (ISM), risk treatment, data privacy, and operational resilience.  
- **Linked Documents:**  
  - `/docs/architecture/security-controls.md`  
  - `/docs/compliance/data-governance.md`  
  - `/docs/operational/runbook.md`  
  - `/docs/security/incident-response.md`  
  - `/docs/governance/security-review-schedule.md`

***

### 2. Control Domains Summary  

| Domain | Objective | Implementation Reference |
|---------|-------------|---------------------------|
| A.5 | Organizational Controls | Governance, Policy, Risk Assessment Framework |
| A.6 | People Controls | Onboarding, MFA, Access Reviews |
| A.7 | Physical Controls | Data Center Access, Lockdown Zones |
| A.8 | Technological Controls | Encryption, Zero Trust, IaC Security |

***

### 3. Control Implementation Matrix (Annex A‑Highlights)  

| ISO Control | Description | Inopsio Implementation | Evidence/Tool | Owner |
|---------------|---------------|--------------------------|----------------|-------|
| A.5.1 | Policies for Information Security | Found in Security Controls Document | Git policy repo | CISO |
| A.5.3 | Segregation of Duties | Role‑based access control via Keycloak (RBAC/ABAC) | Keycloak policies | Security Lead |
| A.6.2 | Information Security Awareness | Mandatory staff training every quarter | LMS records | HR/Security Officer |
| A.8.10 | Cryptographic Controls | AES‑256/TLS 1.3 standard, Vault key management | Vault logs | DevOps |
| A.8.11 | Physical Security of Facilities | Datacenter access control and CCTV | Vendor audit | Infra Manager |
| A.8.16 | Monitoring Activities | Prometheus + Grafana dashboards + SIEM forwarding | Alert reports | SRE Lead |
| A.8.20 | Protection of Log Information | Immutable Loki storage with retention policy | Logs retention config | Platform Ops |
| A.8.23 | Information Security Testing | Penetration testing & red‑team exercises | Pentest reports | CISO |
| A.8.28 | Secure Coding | Static analysis (SonarQube) + SAST pipelines | Build logs | Dev Lead |
| A.8.30 | Business Continuity | Automated backup / DR tested quarterly | DR runbook | Ops Lead |

***

### 4. Risk Management and Continuous Improvement  

- **Framework:** ISO 31000 adapted for Inopsio risk register.  
- **Process:** Quarterly review of risk matrix → re‑classification → control update.  
- **Tools:** Risk insight reports stored in `/docs/governance/risk-register.md`.  
- **Metrics:** - Open Risk Tickets < 5  - Resolved within 30 days  - SLA 90% for critical fixes.  

***

### 5. Evidence Collection and Automation  

| Evidence Type | Generated By | Frequency | Stored At |
|----------------|---------------|------------|-------------|
| CI/CD Reports | GitHub Actions workflow `security-scan.yml` | Per deployment | `/reports/ci-security/` |
| Vault Audit Logs | Vault Server | Continuous | `/logs/audit/vault/` |
| Access Review Reports | Keycloak Realm Audits | Monthly | `/compliance/audit-artifacts/` |
| Incident Logs | Grafana + Loki | Real‑time | `/infrastructure/logs/security/` |
| Pentest Reports | External Auditors | Bi‑annual | `/reports/security-tests/` |

***

### 6. Periodic Audit Cycle  

| Phase | Task | Responsible | Timeline |
|--------|-------|--------------|-----------|
| Preparation | Collect evidence and logs | Compliance Officer | Week 1 |
| Review | Internal audit validation | CISO | Week 2 |
| Corrective Actions | Mitigate findings | Owners | Week 3 |
| Report & Sign‑off | ISO Validator review | External Auditor | Week 4 |

***

### 7. Integration with Automation Pipelines  

- **Compliance as Code:** OPA + Checkov rules in CI/CD.  
- **Policy Verification:** All PRs validated against `policy.lint.yml`.  
- **Security Badge:** Automatic GitHub status check: `ISO 27001 Validated ✔️`.  
- **Drift Detection:** Terraform change logs checked weekly.

***

### 8. Certification Roadmap  

**Target:** ISO 27001 Type I Audit Completion by Q2 2026  
- Q4 2025 – Gap Assessment & Documentation Review  
- Q1 2026 – Internal Audit and POAM (Plan of Action and Milestones)  
- Q2 2026 – External Assurance Audit + Certification  

***

### 9. Linked References  

| Linked Doc | Purpose |
|-------------|---------|
| `/docs/architecture/security-controls.md` | Maps technical controls |
| `/docs/compliance/data-governance.md` | Data lifecycle policy |
| `/docs/security/incident-response.md` | Incident readiness |
| `/docs/governance/risk-register.md` | Risk evidence |
| `/docs/operational/runbook.md` | Operational control execution |

***

### Expert Recommendation  

This **ISO 27001 Controls** document serves as Inopsio’s unified security and compliance index — mapping every system safeguard to auditable evidence.  
Once finalized, it enables mechanical audit readiness for ISO 27001, SOC 2, and CNDP standards in Morocco and MENA.  