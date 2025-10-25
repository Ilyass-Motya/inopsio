**Inopsio Security Policies & Access Control Framework**

***

### 1. Purpose  
To define the technical and administrative security policies that govern the Inopsio SaaS platform.  
These policies ensure consistency, confidentiality, integrity, and availability across infrastructure, users, and tenant data, aligning with ISO 27001 A.5–A.9 and SOC 2 CC6–CC7 controls.

**Linked Docs:**  
- `/docs/security/incident-response.md`  
- `/docs/architecture/security-controls.md`  
- `/docs/compliance/data-governance.md`  
- `/docs/compliance/iso27001-controls.md`

***

### 2. Policy Scope  
Applies to: 
- All platform applications (frontend, backend, AI services).  
- Infrastructure (Kubernetes, Terraform, Vault).  
- All personnel who interact with production systems.  
- Tenants and external integrations with sensitive data.  

***

### 3. Access Control Policy  

| Aspect | Policy | Implementation |
|----------|----------|----------------|
| Roles & Responsibilities | Least Privilege Principle | Keycloak RBAC + OIDC roles |
| Multi‑Factor Auth (MFA) | Mandatory for admins and engineering accounts | Keycloak Duo extension |
| Service Account Tokens | Must be rotated every 30 days | Vault dynamic secret lease |
| Session Timeouts | Automatic logout after 15 min idle | SSO config policy |
| SSH Access | Key‑pair based only (no password login) | Managed via Ansible roles |

Audit Evidence: `/logs/audit/access/`.

***

### 4. Authentication & Authorization  

- Central IAM through **Keycloak SSO** connected to Vault and GitHub OIDC.  
- OAuth 2.1 and OpenID Connect used for application auth.  
- Client and machine‑to‑machine auth secured via mutual TLS.  

```bash
# Example – Verifying token origin and expiration
curl -s https://auth.inopsio.com/realms/master/protocol/openid-connect/userinfo -H "Authorization: Bearer $TOKEN" | jq
```

Linked Config: `/infrastructure/auth/keycloak-config/`.

***

### 5. Network Security Policy  

| Layer | Policy | Tool / Implementation |
|--------|----------|----------------|
| Edge | DDoS protection / WAF enabled for all domains | Cloudflare / AWS Shield |
| Internal | Zero‑Trust peer service verification | mTLS via Envoy |
| Network Segmentation | Separate VPCs for infra, security, AI | Terraform VPC modules |
| VPN Access | Required for remote ops | WireGuard Managed VPN |
| Firewall Rules | Deny‑all default, whitelisted ports open | Mgmt via Terraform Security Groups |

All rules automatically audited by: `Checkov + Falco`.

***

### 6. Encryption Policy  

| Data Type | Encryption Standard | Key Management |
|-------------|------------------|----------------|
| At Rest | AES‑256 | Vault Transit Engine |
| In Transit | TLS 1.3 | Managed Secrets CA |
| Backups | AES‑256‑GCM | Vault per‑tenant keys |
| Passwords | Argon2id | Keycloak Hash |
| API Tokens | HMAC‑SHA512 | Vault Transit Sign Engine |

Key rotation policy: every 90 days (automated).

***

### 7. Vulnerability Management Policy  

- Pipelines run daily security scans (`trivy`, `grype`, `checkov`).  
- All critical CVEs must be patched within **48 hours**.  
- Medium severity within **1 week**.  
- Low severity logged for tracking only.  
Reports stored under: `/reports/security/weekly‑summary.md`.

***

### 8. Data Retention & Privacy Policy  

- Production logs retain 90 days.  
- Access logs kept 30 days for audit.  
- Deleted tenant data irreversibly scrubbed within 7 days of offboarding.  
- Backup retention controlled via `/docs/compliance/data-governance.md`.  
- Data anonymization mandatory before AI training datasets export.

***

### 9. Patch Management Policy  

| Category | Frequency | Responsibility | Tool |
|-----------|-------------|----------------|------|
| OS Level | Weekly | DevOps Team | Ansible Patch Playbook |
| Container Images | Per Deployment | CI/CD automation | Trivy |
| Libraries | Per Merge Request | GitHub Dependabot | Package lock scan |

Patch tracking sheet: `/reports/patch-management/log.md`.

***

### 10. Monitoring and Alert Policy  

- All critical infrastructure monitored with Prometheus.  
- Threshold breach alerts route to `#security‑alerts` Slack.  
- Alert Manager integrated with PagerDuty for off‑hours coverage.  
- Sentry used for error tracking in user facing applications.  
- Falco agent enforces runtime security on K8s clusters.  

Alerting matrix maintained in: `/docs/architecture/monitoring.md`.

***

### 11. Remote Access Policy  

- VPN mandatory for prod shell access.  
- SSH over bastion only (through Keycloak 2FA).  
- Cloud CLI usage restricted to approved IAM users with temporary tokens.  
- All remote access logged in Vault Audit and `/logs/audit/access.log`.

***

### 12. Third‑Party Integration Policy  

- Vendors must complete security review (`/docs/compliance/vendor-assessment.md`).  
- All APIs exchanged over HTTPS only.  
- PII transfer allowed only on encrypted channels with DPA template signed.  

***

### 13. Incident Link Policy  
In case of security anomaly:  

```bash
# Trigger incident workflow
gh workflow run incident.yml -f type=security -f severity=P1
```

Creates a report in: `/reports/incidents/`.

***

### 14. User Awareness Training  
- Every employee completes cybersecurity training every 6 months.  
- Phishing simulation campaign records maintained under `/reports/training/phishing/`.  
- New hires receive onboarding training within 2 weeks of start date.  

***

### 15. Governance and Ownership  

| Policy Group | Owner | Review Cycle | Linked Control |
|----------------|--------|---------------|----------------|
| Access Control | CISO | Quarterly | ISO A.9 |
| Encryption | Security Engineer | Monthly | ISO A.10 |
| Network Protection | DevOps Lead | Monthly | SOC CC6 |
| Incident Response | SOC Manager | Quarterly | SOC CC7 |
| Patch Management | Infra Team | Monthly | ISO A.12 |

***

### 16. Linked Documents  

| Document | Purpose |
|-----------|----------|
| `/docs/security/incident-response.md` | Breach management workflow |
| `/docs/compliance/data-governance.md` | Data lifecycle rules |
| `/docs/architecture/security-controls.md` | Mapped technical enforcements |
| `/docs/compliance/iso27001-controls.md` | Control validation evidence |

***

### Expert Recommendation  
This **Security Policies Document** defines the operational security standard baseline for Inopsio.  
It ensures uniform enforcement across CI/CD, Kubernetes, Vault, and tenant data flows and is essential for ISO 27001 / SOC 2 audit readiness.  