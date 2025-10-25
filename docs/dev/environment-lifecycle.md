**Inopsio Environment Lifecycle Management & Provisioning Framework**

### Purpose  
To define the standardized process for creating, updating, and decommissioning Inopsio’s environments (development, staging, production, and tenant‑specific instances).  
It ensures consistency across infrastructure as code (IaC) workflows, configuration management, and tenant deployment pipelines.

***

### 1. Overview  

- **Scope:** Applies to all environments managed through Terraform, Kubernetes, and Vault.  
- **Principles:**
  - Immutable Infrastructure – no manual configuration in production.  
  - Environment Parity – staging mirrors production.  
  - Ephemeral Preview Environments – auto‑generated per feature branch for validation.  
  - Observability Integration – every environment emits metrics and logs by default.  

**Linked Docs:**  
- `/docs/devops/ci-cd-pipelines.md`  
- `/docs/architecture/architecture.md`  
- `/docs/compliance/data-governance.md`  
- `/docs/operational/disaster-recovery.md`

***

### 2. Environment Classification  

| Environment | Purpose | Infrastructure | Lifecycle | Owner |
|--------------|----------|----------------|------------|--------|
| Development | Feature testing / sandbox | Docker Compose / K8s sandbox | 24 h reusable | Developer |
| Staging | Integration + QA | K8s cluster / Terraform apply | Persistent | QA Team |
| Production | Customer workloads | Managed K8s + Vault backend | Permanent | Ops Team |
| Preview (Per‑Tenant) | Tenant‑specific demo / UAT | Namespaced K8s isolates | Ephemeral | DevOps |

Each tenant deployment receives a unique `namespace` in the multi‑tenant cluster.

***

### 3. Environment Provisioning Workflow  

1. **Trigger:** new branch or tenant registration event.  
2. **Terraform Plan:** Load base modules (`/infrastructure/terraform/env/`).  
3. **Resource Allocation:** create namespace, DB, and storage volumes.  
4. **Secret Bootstrap:** fetched from Vault KV engine.  
5. **Configuration Injection:** apply Helm values (`/infrastructure/helm/values.yaml`).  
6. **Health Check:** Verify Uptime via Prometheus alerts.  
7. **Auto‑Cleanup:** Ephemeral env destroy after TTL (24–72 h default).  

***

### 4. Terraform Structure  

```
infrastructure/
├── terraform/
│   ├── env/
│   │   ├── dev.tfvars
│   │   ├── staging.tfvars
│   │   ├── prod.tfvars
│   │   └── tenant.tfvars
│   ├── modules/
│   │   ├── network/
│   │   ├── compute/
│   │   ├── database/
│   │   └── observability/
│   └── main.tf
```

State backend: Terraform Cloud (organization: inopsio).  
Workspaces → `inopsio-dev`, `inopsio-staging`, `inopsio-prod`.  

***

### 5. Secrets and Configuration Management  

- Managed via **Vault** with auto‑rotation.  
- Environment‑specific policies under `/infrastructure/vault/policies/`.  
- Helm values and environment variables templated via `envsubst`.  
- Example:

```yaml
env:
  DATABASE_URL: "{{ vault('database/creds/tenant-db') }}"
  REDIS_URL: "{{ vault('cache/creds/tenant-cache') }}"
```

***

### 6. Observability Hooks  

Each environment has:
- Prometheus scrape targets.  
- Loki log aggregation labels (`env`, `namespace`).  
- Grafana dashboard variables for multi‑tenant filtering.

Monitoring definition file: `/infrastructure/monitoring/prometheus-rules.yaml`.

***

### 7. Access Control and Audit  

| Access Method | Tool | Audit Evidence |
|---------------|------|----------------|
| K8s cluster RBAC | Keycloak + OIDC | /var/log/audit/k8s |
| Vault access | Token policies per env | Vault audit backend |
| Terraform runs | GitHub Action audit logs | /reports/env‑automation/ |

All access logged and retained for 90 days per ISO 27001 A.8.15.

***

### 8. Environment Decommissioning  

- Ephemeral environments destroyed automatically via `cleanup‑env.yml`.  
- Permanent environments require two‑step approval workflow.  
- Decommission script performs:  
  1. Backup  (db + volumes).  
  2. Vault secret revocation.  
  3. Terraform destroy with confirmation flag.  

Linked runbook: `/docs/operational/disaster-recovery.md`.

***

### 9. Multi‑Tenant Deployment Lifecycle  

| Action | Mechanism | Frequency |
|---------|------------|-----------|
| Provision Tenant | Triggered by billing microservice event | On signup |
| Deploy Modules | Helm install per namespace | Automated |
| Upgrade Tenant | ArgoCD sync + schema migrations | Monthly |
| Suspend Tenant | K8s CPU/memory limits reduction | Inactivity > 90 days |
| Archive/Remove | DR/backup → destroy namespace | Manual approval |

***

### 10. Backup and Recovery  

- Automated cron jobs in Kubernetes:  
  - `pg_dump` for PostgreSQL daily snapshots.  
  - `mc mirror` for MinIO/S3 object storage.  
  - Retention: 30 days local / 90 days offsite.  
- Verification via Grafana “Backup Status” dashboard.  

***

### 11. Linked Documents  

| File | Purpose |
|-------|----------|
| `/docs/devops/ci-cd-pipelines.md` | Pipeline triggers provisioning stages |
| `/docs/architecture/architecture.md` | Cloud infrastructure overview |
| `/docs/operational/runbook.md` | Operational manual for failovers |
| `/docs/compliance/data-governance.md` | Residency rules and data retention |

***

### Expert Recommendation  

This **Environment Lifecycle Documentation** finalizes the DevOps section of the Inopsio project.  
It establishes strict alignment between IaC, multi‑tenant deployments, security policies, and compliance requirements, making the platform both scalable and audit‑ready.