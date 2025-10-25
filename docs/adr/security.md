**Inopsio Architecture Decision Record – Security and Zero Trust Framework**

***

### 1. Purpose  
To document the architecture decisions shaping Inopsio’s security foundation—governing authentication, authorization, encryption, and monitoring controls across multi‑tenant environments.  
It defines each component’s role in enforcing Zero Trust principles, CIA triad (Confidentiality, Integrity, Availability), and compliance alignment.

**Linked Docs:**  
- `/docs/security/security-controls.md`  
- `/docs/security/policies.md`  
- `/docs/compliance/iso27001-controls.md`  
- `/docs/devops/security-pipeline.md`

***

### 2. Security Architecture Goals  

- Enforce **Zero Trust** through identity‑first access control.  
- Standardize encryption in storage, transit, and communication layers.  
- Automate security scanning and incident response in CI/CD.  
- Ensure full traceability and security observability across microservices.  
- Achieve ISO 27001, SOC 2 CC6 compliance, and CNDP data protection requirements.

***

### 3. Decision Summary  

| Decision ID | Topic | Status | Date | Owner |
|--------------|----------|---------|---------|----------|
| ADR‑SEC‑001 | Zero Trust Implementation Model | Accepted | 2024‑11‑05 | CISO |
| ADR‑SEC‑002 | Identity Platform (Keycloak) | Accepted | 2024‑12‑10 | CISO |
| ADR‑SEC‑003 | Secrets Management (Vault + Transit Engine) | Approved | 2025‑01‑20 | DevOps Lead |
| ADR‑SEC‑004 | Application Encryption (TLS 1.3 + AES‑256) | Approved | 2025‑02‑03 | Security Engineer |
| ADR‑SEC‑005 | Policy as Code (OPA + Gatekeeper) | Accepted | 2025‑03‑01 | Compliance Officer |
| ADR‑SEC‑006 | SIEM Integration (Wazuh + Grafana Loki) | Implemented | 2025‑05‑12 | SOC Manager |
| ADR‑SEC‑007 | Automated Incident Response | Active | 2025‑06‑18 | CISO |
| ADR‑SEC‑008 | Tenant Key Isolation and BYOK Support | In progress | 2025‑09‑10 | CTO |

***

### 4. Security Architecture Overview  

```
                ┌────────────────────────────────┐
                │      Identity & Access Layer   │
                │   (Keycloak OIDC + Vault Auth) │
                └───────────────┬────────────────┘
                                │
┌──────────────────────┐  ┌─────┴─────┐  ┌──────────────────────┐
│   Application Layer   │  │ Data Layer │  │ Observability Layer │
│ NestJS / FastAPI API │  │ Postgres / S3│  │ Loki / Prometheus │
└──────────────────────┘  └─────┬─────┘  └─────────┬────────────┘
                                │                    │
                        ┌────────┴────────┐   ┌──────┴──────┐
                        │Encryption & KMS │   │ SIEM Stack  │
                        │(Vault / AWS KMS)│   │ Wazuh + Falco│
                        └─────────────────┘   └──────────────┘
```

***

### 5. Zero Trust Implementation Model  

| Layer | Decision | Mechanism |
|--------|-----------|------------|
| Network | No implicit trust between zones | Segmented VPCs + Security Groups |
| Identity | Every user / service authenticated | OIDC via Keycloak |
| Access | Dynamic policy evaluation | OPA + Rego rules |
| Device & Workload | Mutual TLS cert rotation | Vault PKI |
| Telemetry | Continuous validation of auth state | Loki + Prometheus alerting |

Zero Trust flows verified via OPA Gatekeeper in Kubernetes.

***

### 6. Identity and Access Control (SSO + RBAC)  

| Control | Description | Implementation |
|-----------|--------------|----------------|
| RBAC + ABAC Hybrid Model | Role and context‑based access| Keycloak roles + Rego policies |
| SSO Integration | Unified login via OIDC | Keycloak client connectors |
| Service Authentication | JWT exchange for microservices | Keycloak service account tokens |
| Tenant Custom Domains | Per‑tenant SSO flows supported | Realm isolation by domain |
| Access Review Automation | Monthly export to audit repo | GitHub Action + Vault logs |

Audit location: `/docs/compliance/audit-artifacts/access-reviews/`.

***

### 7. Encryption and Data Protection  

| Data Type | Encryption Method | Key Storage |
|-------------|----------------|---------------|
| At Rest | AES‑256 | Vault Transit + AWS KMS |
| In Transit | TLS 1.3 | CertManager |
| Database Fields (PII) | Envelope encryption | Per‑tenant Vault key |
| Backups | AES‑GCM + HMAC | Vault KV Store |
| Tokens and Passwords | Argon2id Hash | Keycloak Crypt |

Rotation schedules: 30‑day for application keys, 90‑day for TLS.

***

### 8. Policy as Code and Compliance Automation  

- **Engine:** Open Policy Agent + Gatekeeper controller in K8s.  
- **Policy Sources:** `/infrastructure/policies/*.rego`  
- **Scope:** Network, container security, image signing, RBAC boundaries.  
- **CI/CD Hook:** Terraform + OPA lint check 🟢 once per merge request.  
- **Compliance Mapping:** Directly linked to ISO 27001 A.5, A.9, A.12 controls.  

Audit outputs stored under `/docs/compliance/audit-artifacts/security-reports/`.

***

### 9. Threat and Incident Management (SIEM)  

| Phase | Tool | Output |
|---------|------|-----------|
| Detection | Falco + Wazuh | Runtime alerts on pods and file integrity |
| Aggregation | Grafana Loki + Elasticsearch | Central log index |
| Response | Auto playbooks via FastAPI webhooks | Containment actions |
| Escalation | PagerDuty + Slack | SOC notification stream |
| Review | Incident reports + RCA | `/docs/security/incident-response.md` |

Detection efficiency target: < 10 min to alert SOC.

***

### 10. DevSecOps and Pipeline Integration  

- Security gates embedded in CI/CD: Trivy (scan images), Checkov (IaC), GitGuardian (secrets).  
- Vault integration for dynamic secrets in GitHub Actions.  
- Signed artifacts (Cosign / Sigstore) before K8s deployment.  
- Auto rollback on critical security findings.  
- Daily log rotation to Loki + audit hash verification.

Pipeline: `.github/workflows/security-pipeline.yml`.

***

### 11. Resilience and Business Continuity  

- **Failover zones:** Casablanca → Paris (1 hour RTO / 10 min RPO).  
- **Periodic Testing:** Quarterly security simulation (Incident + DR).  
- **Backups:** Vault snapshots and DB replicas encrypted + rotated.  
- **High Availability:** All Identity and KMS clusters redundant.  

Linked File: `/docs/operational/disaster-recovery.md`.

***

### 12. Compliance and Audit Integration  

| Framework | Control | Evidence Folder |
|------------|----------|----------------|
| ISO 27001 | A.5 / A.9 / A.12 | `/docs/compliance/iso27001-controls.md` |
| SOC 2 | CC6 / CC7 | `/docs/compliance/audit-artifacts/security-reports/` |
| GDPR / CNDP | Art. 32 | `/docs/compliance/data-governance.md` |

***

### 13. ADR Change Workflow  

| Step | Action | Responsible |
|-------|-----------|--------------|
| 1 | New security feature proposal record (PR) | Security Engineer |
| 2 | Review by CISO + DevOps team | Security Board |
| 3 | Impact assessment on Zero Trust model | Architecture Committee |
| 4 | Approval + Sign‑off by CTO | Executive Change Board |
| 5 | Archive superseded records with signature hash | Compliance Officer |

***

### 14. Linked Documents  

| File | Purpose |
|-------|-----------|
| `/docs/security/policies.md` | Operational controls alignment |
| `/docs/security/security-controls.md` | Technical safeguards overview |
| `/docs/devops/security-pipeline.md` | CI/CD security enforcement |
| `/docs/compliance/iso27001-controls.md` | Audit mapping and attestation |

***

### Expert Recommendation  
This **Security ADR** formalizes Inopsio’s enterprise‑grade security foundation — a complete Zero Trust model integrated with DevSecOps.  
It guarantees continuous compliance, traceable incident response, and verifiable data protection for all multi‑tenant operations.