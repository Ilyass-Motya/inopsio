**Inopsio Security Controls & Compliance Framework**

### Purpose  
To formally describe Inopsio’s security architecture, policies, access control systems, compliance frameworks, and monitoring infrastructure.  
It acts as the unifying document tying together app-layer security, infrastructure controls, incident response, and regulatory compliance.

***

### 1. Overview  

**Security Philosophy**:  
- “Defense in Depth” – multi-layered protection from app to infrastructure.  
- “Zero Trust” – no implicit network trust; continuous verification.  
- “Compliance-Driven Operations” – native alignment with ISO, SOC, and GDPR.  

**Scope:**  
All backend, AI, infrastructure, and operational layers across environments (dev, staging, prod).

**Linked Docs:**  
- `/docs/architecture/monitoring.md`  
- `/docs/security/incident-response.md`  
- `/docs/compliance/iso27001-controls.md`  
- `/docs/operational/runbook.md`

***

### 2. Security Architecture Layers  

| Layer | Controls | Tools | Evidence |
|--------|-----------|--------|-----------|
| **Network** | TLS 1.3, Firewall segmentation, IDS/IPS | Nginx, Cloudflare, Wazuh | `/infrastructure/network/` |
| **Application** | CSRF, CSP, input validation, session isolation | NestJS, FastAPI | `/backend/` |
| **Identity** | MFA, SSO, OIDC, SCIM | Keycloak, Vault, JWT | `/infrastructure/auth/` |
| **Storage** | AES-256 encryption, backups, access logging | PostgreSQL, MinIO, Vault | `/infrastructure/storage/` |
| **Infrastructure** | IaC scanning, drift detection, patch management | Terraform, Checkov | `/infrastructure/security/` |
| **Observability** | Continuous event monitoring | Prometheus + Loki + Grafana | `/docs/architecture/monitoring.md` |

***

### 3. Authentication & Access Control  

- **Framework:** Keycloak acts as the SSO and authorization broker.  
- **User Groups:** Admins, Tenants, Developers, Auditors.  
- **Policy Model:** Role-Based Access Control (RBAC) with optional Attribute-Based Access Control (ABAC).  
- **Token Standard:** OAuth2.1 + JWT + PKCE.  
- **Service-to-Service Auth:** Mutual TLS + OIDC client credentials.  

**Security Policy File:** `/docs/security/policies.md`  

***

### 4. Vault & Secret Management  

**Technology:** HashiCorp Vault  

| Category | Control | Description |
|-----------|----------|-------------|
| Secrets Storage | Transit encryption | AES256-GCM per secret engine |
| Access Policies | Token-scoped RBAC | Per-service access identity |
| Rotation | Automated rollout | 30-day cycle, enforced CI/CD |
| Audit Logs | Vault audit backend | Immutable compliance logging |

Linked File: `/infrastructure/vault/policies.hcl`

***

### 5. Encryption Standards  

| Area | Algorithm | Details |
|-------|-----------|----------|
| At Rest | AES-256 | PostgreSQL, Redis, S3, backup archives |
| In Transit | TLS 1.3 | HTTPS, gRPC, Kafka SSL |
| Secrets Management | AES256-GCM | Vault transit secrets |
| JWT Signing | ECDSA (P-256) | Keycloak private keys |
| Hashing | Argon2id | Password storage standard |

All cryptographic modules comply with **FIPS 140-3** validation.

***

### 6. Secure Development Lifecycle (SDLC)  

| Phase | Security Control | Tool |
|--------|------------------|------|
| **Commit** | Commit hooks, lint checks, secret scan | Husky + GitGuardian |
| **Build** | Dependency scan | Dependabot + Trivy |
| **Test** | Security regression tests | pytest-security, Jest |
| **Deploy** | Image signing and verification | Sigstore (cosign) |
| **Monitor** | Ongoing metrics and alerts | Grafana + Loki |

Documentation Reference: `/docs/dev/security-dev-guidelines.md`

***

### 7. Compliance Mapping  

| Framework | Status | Validation Source |
|------------|---------|------------------|
| ISO 27001 | In progress | `/docs/compliance/iso27001-controls.md` |
| SOC 2 Type I | Achieved via pipeline-level controls | `/docs/compliance/audit-artifacts/` |
| GDPR | Fully compliant | `/docs/compliance/data-governance.md` |
| Moroccan Data Law N°09-08 | Compliant – CNDP conformity | `/docs/compliance/regional-laws.md` |
| HIPAA (Enterprise Tier) | Supported – tenant isolation | `/docs/compliance/hipaa-guidelines.md` |

***

### 8. Incident Response & Recovery  

- Real-time alerts to Security Operations Center (SOC).  
- **Incident Source:**  
  - Keycloak audit trail  
  - Vault secret access logs  
  - InoSec monitoring (threat detection pipeline)  
- **Escalation Path:**  
  - L1: Platform Engineer  
  - L2: Security Engineer  
  - L3: CISO  
- **Response Reference:** `/docs/security/incident-response/playbook.md`

***

### 9. Compliance Automation  

| Category | Tool | Objective |
|-----------|------|-----------|
| IaC Scanning | Checkov / Terrascan | Terraform compliance |
| Container Scanning | Trivy / Grype | Image vulnerability check |
| Policy Enforcement | OPA Gatekeeper | Kubernetes admission control |
| Code Analysis | SonarQube | Static code audit |
| Access Review | Custom script | Logs Keycloak role changes |

Linked File: `/docs/devops/security-pipeline.md`

***

### 10. Third-Party Integrations & Vendor Control  

- External vendors vetted under security risk review checklist.  
- Integrations: Stripe, SendGrid, AWS SES, Cloudflare.  
- All credentials provisioned via Vault and rotate quarterly.  

Linked Report: `/docs/compliance/vendor-assessment.md`

***

### 11. Governance  

| Role | Responsibility | Review Frequency |
|-------|------------------|-----------------|
| **CISO** | Policy creation & SOC oversight | Quarterly |
| **DevOps Lead** | CI/CD + IaC compliance | Monthly |
| **Security Engineer** | Vulnerability remediation | Continuous |
| **DPO (Data Protection Officer)** | GDPR & CNDP compliance | Monthly |

Policy references: `/docs/governance/security-review-schedule.md`

***

### 12. Linked Documentation  

| Linked Doc | Description |
|-------------|-------------|
| `/docs/security/policies.md` | Core operational & access policies |
| `/docs/architecture/monitoring.md` | Observability integration |
| `/docs/compliance/iso27001-controls.md` | International standard alignment |
| `/docs/compliance/data-governance.md` | PII handling and anonymization |
| `/docs/security/incident-response.md` | SOC procedures |
| `/docs/operational/runbook.md` | Incident remediation |

***

### Expert Recommendation  

The **Security Controls** document provides the compliance backbone for Inopsio’s SaaS framework — uniting authentication, encryption, auditing, and regulatory coverage into one operational blueprint.  
