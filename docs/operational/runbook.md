**Inopsio Operations Runbook — Daily Ops, Maintenance & Incident Response**

***

### 1. Purpose and Scope  
This runbook serves as the **central operational guide** for Inopsio’s platform teams, covering daily actions, troubleshooting, system recovery, and security operations.  
It links directly to:  
- `/docs/operational/disaster-recovery.md`  
- `/docs/devops/environment-lifecycle.md`  
- `/docs/security/incident-response.md`  

***

### 2. Runbook Structure Enhancements  

#### 2.1 Logging Automation Integration  
After each **make**, **kubectl**, or **backup** command, logs are automatically pushed to:
- Loki (`/var/log/inopsio.operations.log`)
- Grafana via AlertManager for visual status.  
A new command example for validation:

```bash
# Validate operational job completion
./scripts/monitor/verify-ops-job.sh --job runbook-daily
```

***

#### 2.2 Incident Code Reference  
Every incident procedure must register an **Incident ID** in `/reports/incidents/INC-YYYYMMDD-N.json` (auto‑created by monitor script):  

```bash
./scripts/incident/new-incident.sh "Database replication lag detected"
```

***

### 3. Command Structure Verification (Developed by Cursor)  
All previous command blocks remain, but add small metadata comments for traceability:  

```bash
# @Inopsio Mission: Verify Service Status
make logs SERVICE=auth-service
```

and  

```bash
# @Inopsio Tag: IncidentResponse
make db:backup-emergency
```

This ensures pipeline-level recognition and automated tagging for reports.  

***

### 4. New Section Added — 🧩 Automation Workflows  

#### 4.1 Health Automation Jobs  
Each listed command now corresponds to a GitHub Action or K8s cron job for continuous testing.  

| Action | Pipeline File | Frequency |
|---------|----------------|-------------|
| `ci-service-health` | `.github/workflows/health.yml` | 30 min |
| `dr-backup-verify` | `.github/workflows/backup.yml` | daily |
| `security-audit` | `.github/workflows/security.yml` | weekly |

***

#### 4.2 ChatOps Integration (New)  
Operators can execute all emergency functions via Slack (`@InopsioBot`):  

Commands now remote‑call `./scripts/chatops/ops-handler.sh` using keywords:

```
/inopsio status all
/inopsio backup now
/inopsio rollback app auth-service
```

Linked scripts: `/scripts/chatops/ops-handler.sh`.

***

### 5. Service‑Specific Operational Notes  
To align with architecture modules:

| Service | Ops Contact | Critical Metric | Health Dashboard |
|----------|--------------|------------------|------------------|
| Auth‑Service | SecOps Lead | JWT failure < 1% | `auth-metrics` |
| CRM‑Service | App Ops | Queue latency < 100 ms | `crm-perf` |
| InoSec | Security Team | Alert throughput | `inosec-soc` |

Each service exec script referenced under `/scripts/service/ops-*.sh`.

***

### 6. Backup & Recovery Enhancement  
Include verification step integrated with HASH checksum comparison:

```bash
# Verify last backup file integrity using SHA256
sha256sum -c backups/latest-backup.sha256
```

Backups automatically report status to:
`/reports/backups/backup-summary.json`.

***

### 7. Audit and Compliance Integration  

| Activity | Audit Log Path | Control Mapped |
|-----------|----------------|----------------|
| DB Backup | `/logs/audit/db-backups.log` | ISO 27001 A.12 |
| DR Exercise | `/reports/dr-simulation/` | A.17 Business Continuity |
| Incident Response | `/logs/audit/incidents/` | SOC 2 CC7 |
| Security Scan | `/logs/audit/security-audit.log` | A.8 Asset Protection |

This makes the runbook auditable and traceable.

***

### 8. Governance & Ownership  

| Role | Scope | Frequency | Linked Policy |
|-------|--------|-------------|----------------|
| SRE Lead | Runbook maintenance + DR testing | Monthly | `/docs/governance/security-review-schedule.md` |
| DevOps Engineers | Exec automation and CI/CD sync | Continuous | `/docs/devops/environment-lifecycle.md` |
| Security Officer | Audit compliance mapping | Quarterly | `/docs/compliance/iso27001-controls.md` |

***

### 9. Change Management Tracking  

All scripts executed from this runbook are tracked via a new metadata entry in:
`/reports/change-management/log.md`:

```bash
# Log instruction line automatically after successful command execution
echo "[$(date)] Executed command via runbook – make restart" >> /reports/change-management/log.md
```

***

### 10. Linked Documents  

| File | Purpose |
|-------|----------|
| `/docs/operational/disaster-recovery.md` | Failover and regional continuity |
| `/docs/devops/ci-cd-pipelines.md` | Pipeline standards and integration |
| `/docs/security/incident-response.md` | Incident and alert workflow |
| `/docs/compliance/iso27001-controls.md` | Audit and evidence alignment |

***

### Expert Recommendation  
Your previous runbook from Cursor is solid as a **technical handbook**.  
This version upgrades it into a **live governance‑integrated operations manual**, ready for compliance, audit logging, and automation linkage.  

Once merged, Inopsio achieves **operational excellence documentation maturity — Tier 4 (trigger‑driven runbooks)**.