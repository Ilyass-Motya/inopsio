 **Inopsio Incident Response Playbook (SEC‑IR‑001)**

### Purpose  
To outline the structured and auditable incident response procedures for Inopsio’s environments, ensuring rapid detection, containment, mitigation, and post‑incident review.  
It integrates automated alerting from the monitoring stack and aligns with your compliance and security policies.

***

### 1. Scope and Goals  

- **Scope:** All platform services, tenants, and infrastructure assets.  
- **Goals:**  
  1. Identify and triage security or operational incidents within defined SLAs.  
  2. Minimize damage and data loss.  
  3. Maintain audit evidence for regulatory compliance.  
  4. Continuously improve based on lessons learned.

**Linked Docs:**  
- `/docs/operational/runbook.md`  
- `/docs/operational/disaster-recovery.md`  
- `/docs/security/policies.md`  
- `/docs/compliance/iso27001-controls.md`

***

### 2. Incident Lifecycle  

| Phase | Description | Responsible Team |
|---------|--------------|------------------|
| **Detection** | Alert or anomaly from monitoring tools. | SOC / DevOps |
| **Triage** | Assess severity and impact. | CISO / Security Engineer |
| **Containment** | Isolate affected systems or tenants. | Infra Ops |
| **Eradication** | Remove threat vectors, patch, restart. | Dev + Security |
| **Recovery** | Restore services, validate integrity. | Ops + QA |
| **Post‑Incident Review** | Document root cause, update controls. | CISO + DPO |

Workflow is orchestrated via the **“incident pipeline”** (`.github/workflows/incident.yml`) that automatically generates an IR report in `/reports/incidents/`.

***

### 3. Incident Classification  

| Level | Type | Example | Response Time |
|--------|-------|----------|----------------|
| **P1 Critical** | Data breach, major service loss | Database compromise, system outage | < 15 minutes |
| **P2 High** | Security alert or tenant failure | Unauthorized admin access, tenant data exposure | < 1 hour |
| **P3 Medium** | Misconfiguration or service degradation | SSL expiration, container crash loop | < 4 hours |
| **P4 Low** | False positive or minor bug | Incomplete logs, minor timeout | Next scheduled cycle |

Incident severity level determines escalation chain and required evidence.

***

### 4. Detection and Alert Sources  

**Automatic Detection Stacks:**
- Falco (runtime intrusion detection).  
- Prometheus alert rules (`alerts/security.rules`).  
- Sentry (backend and frontend exceptions).  
- Loki log correlation / Grafana panels.  
- Keycloak audit events (invalid logins, token replays).  

**Alert Routing:** Prometheus → Alertmanager → Slack (` #security‑alerts `) → Jira Incident.

***

### 5. Immediate Response Procedures  

```bash
# Step 1: Verify incident alert
./scripts/incident/verify-alert.sh --id <ALERT_ID>

# Step 2: Isolate affected namespace
kubectl cordon node <node-name>
kubectl delete pod -n tenant-namespace --grace-period=0

# Step 3: Revoke access tokens if user is compromised
./scripts/keycloak/revoke-tokens.sh <USER_ID>

# Step 4: Trigger emergency backup before system restore
make db:backup-emergency

# Step 5: Launch post‑mitigation sanity check
./scripts/incident/verify-recovery.sh
```

All actions logged in `/logs/audit/incidents/INC-yyyyMMdd.log`.

***

### 6. Containment Guidelines  

- Disable service accounts suspected of compromise.  
- Quarantine affected containers via Falco action hook.  
- Block malicious IP or ports at Cloudflare / firewall layer.  
- Deactivate tenant access via Keycloak API if impact is multi‑tenant.  

Escalation trigger contact: `security@inopsio.com`.

***

### 7. Forensic Data Collection  

| Artifact | Location | Retention |
|-----------|-----------|------------|
| Application Logs | `/logs/app` | 90 days |
| System Logs | `/var/log/syslog` | 30 days |
| K8s Events | `kubectl get events -n namespace` | 7 days |
| Network Traces | `/logs/network/pcap` | 14 days |
| Vault Audit Logs | `/logs/audit/vault.log` | 90 days |

Artifacts are synchronized to S3 incident buckets (`/backups/incidents/`).

***

### 8. Communication and Escalation  

- **Internal notification:**  
  - Slack `#security‑alerts` and email to SOC on incident creation.  
  - Postmortem review added to Confluence + `/reports/incidents/`.  

- **External Notification (CNDP & Customers):**  
  - If P1 incident involves personal data → report to CNDP within 72 hours.  
  - Customer notification via email template `/templates/incident‑notice.md`.

***

### 9. Post‑Incident Activities  

| Task | Executor | Deliverable |
|--------|-----------|-------------|
| Root Cause Analysis | Security Team | `/reports/incidents/rca/<incident‑id>.md` |
| Lessons Learned | Ops + Engineering | Confluence task entry |
| Remediation Tracking | CISO | Risk register update `/docs/governance/risk-register.md` |
| Policy Update | Compliance Officer | `/docs/security/policies.md` review |

***

### 10. Incident Testing (Simulation)  

- Quarterly tabletop tests run on SOC and Ops teams.  
- Every test produces a mock incident report with: discovery time, detection efficiency, and response accuracy.  
- Simulations tracked under `/reports/incident-simulation/`.

***

### 11. Governance and Compliance Mapping  

| Framework | Control | Evidence |
|------------|----------|-----------|
| ISO 27001 | A.16 Information Security Incident Management | Incident Record Logs |
| SOC 2 | CC7.3 – Incident Response Process | Incident Reports |
| CNDP (Morocco) | Article 25 – Breach Notification | DPO Records |
| GDPR | Art. 33 – Supervisor Notification | Breach Report |

***

### 12. Linked Documents  

| File | Purpose |
|-------|----------|
| `/docs/operational/runbook.md` | Execution commands and health checks |
| `/docs/operational/disaster-recovery.md` | Recovery coordination |
| `/docs/security/policies.md` | Corporate response rules |
| `/docs/compliance/data-governance.md` | Data responsibility scope |

***

### Expert Recommendation  
This **Incident Response Playbook** serves as the official escalation plan for Inopsio. It connects operational command‑level responses with governance and legal requirements, ensuring your platform is SOC2 / ISO compliant and fully auditable.  
