**Inopsio Architecture Decision Record – Infrastructure & Cloud Topology**

***

### 1. Purpose  
To document the major architectural decisions that define Inopsio’s infrastructure framework — covering cloud architecture, deployment automation, network topology, tenant isolation, observability, and infrastructure‑as‑code principles.  
Each decision is intended to be traceable, reviewable, and version‑controlled.

***

### 2. Architecture Goals  
- High availability (HA) and low latency service delivery.  
- Modular microservice infrastructure supporting multi‑tenant SaaS.  
- Zero‑trust security model with automated policies.  
- Predictable, reliable DevSecOps delivery through IaC and CI/CD.  
- Observability and self‑healing capabilities by default.

**Linked Files:**  
- `/docs/architecture/architecture.md`  
- `/docs/devops/environment-lifecycle.md`  
- `/docs/security/security-controls.md`  
- `/docs/operational/disaster-recovery.md`

***

### 3. Decision Summary  

| Decision ID | Topic | Status | Date | Owner |
|---------------|----------|-------------|---------|-----------|
| ADR‑INF‑001 | Hybrid Cloud (OVH + AWS Regions) | Accepted | 2024‑11‑10 | CTO |
| ADR‑INF‑002 | Multi‑tenant Cluster per Region | Accepted | 2025‑02‑03 | DevOps Lead |
| ADR‑INF‑003 | Kubernetes Orchestration via ArgoCD | Accepted | 2025‑03‑20 | SRE Team |
| ADR‑INF‑004 | Hashicorp Vault for Secrets | Accepted | 2025‑03‑28 | CISO |
| ADR‑INF‑005 | PostgreSQL 15 HA + Redis Cluster | Accepted | 2025‑04‑12 | DBA |
| ADR‑INF‑006 | Terraform as Canonical IaC Tool | Accepted | 2025‑05‑01 | DevOps Lead |
| ADR‑INF‑007 | Prometheus & Loki Observability Stack | Accepted | 2025‑05‑15 | Ops Team |
| ADR‑INF‑008 | Event‑Driven Architecture via Kafka | Accepted | 2025‑07‑20 | CTO |
| ADR‑INF‑009 | Data Residency per MENA region | Approved | 2025‑10‑05 | Compliance Officer |

***

### 4. Infrastructure Topology  

```
               ┌────────────────────────────┐
               │        Cloudflare          │
               │  CDN + WAF + SSL Offload   │
               └───────────┬────────────────┘
                           │
               ┌───────────┴───────────┐
               │       API Gateway     │
               │  (NestJS + Rate Limit)│
               └───────────┬───────────┘
                           │
                    ┌──────┴──────┐
                    │  K8s Cluster│
                    │ (OVH/AWS)   │
                    ├──────────────┤
                    │  Backend Pods│
                    │  Frontend Pods│
                    │  AI Services  │
                    └──────┬───────┘
                           │
            ┌──────────────┴────────────────┐
            │ Prometheus │ Loki │ Vault │ PostgreSQL │ Kafka │
            └────────────────────────────────────────┘
```

***

### 5. Tenant Segregation Design  

| Strategy | Decision | Justification |
|------------|------------|---------------|
| Shared Cluster | Yes (for SMB Tenants) | Optimized cost and resource efficiency |
| Dedicated Namespace | Default Model | Ensures tenant security isolation |
| Enterprise Dedicated Cluster | Optional | Meets data residency/compliance needs |
| Separate DB Schemas per Tenant | Yes | Simplifies per‑tenant backup and RTO targets |

Each deployment uses dynamic Helm values and Vault token‑scoped access.

***

### 6. Infrastructure‑as‑Code (IaC)  

- **Primary tool:** `Terraform v1.8` across multi‑cloud.  
- **Modules:** `/infrastructure/terraform/modules/{network,compute,database,monitoring}`.  
- **Backend:** S3‑compatible storage + Terraform Cloud workspaces.  
- **Checks:** Checkov / OPA policies validate every PR merge.  
- **Lifecycle:** Plan → Apply → Verify → Destroy.  

CI/CD pipeline: `.github/workflows/infrastructure-deploy.yml`.

***

### 7. Secrets and Key Management  

| Component | Tool / Standard | Rotation Policy |
|-------------|------------------|------------------|
| API Keys | Vault Transit Engine | Every 30 days |
| Database Credentials | Vault Dynamic Secrets | Every 24 hours |
| Encryption at Rest | AES‑256 encrypted volumes | Continuous |
| TLS Certificates | CertManager + Vault | 90‑day auto‑renew |
| KMS Keys | AWS‑KMS + Vault wrapper | Quarterly rotation |

***

### 8. Network and Security Architecture  

| Zone | Purpose | Controls |
|--------|----------|-----------|
| DMZ | Incoming traffic filter zone | Cloudflare + WAF + IDS/IPS |
| App Zone | Core apps and backend APIs | Pod Security Policies, mTLS |
| Data Zone | Databases and storage | TLS + role‑based IAM |
| Mgmt Zone | CI/CD + monitoring | VPN and MFA required |

All zones enforced through Network Policies in K8s and Terraform SGs.

***

### 9. Observability and Monitoring  

| Component | Purpose | Metrics / Logs |
|-------------|----------|----------------|
| Prometheus | Collect service metrics | CPU, Memory, Latency |
| Grafana | Visualization & dashboard portal | SLO/SLA metrics |
| Loki | Aggregated application logs | Multi‑tenant labels |
| Jaeger | Distributed tracing | Microservice calls |
| AlertManager | Alerting and notification | Email + Slack Ops |

Linked to: `/docs/architecture/monitoring.md`.

***

### 10. Disaster Recovery & Resilience Strategy  

- **Replication:** DB streaming replica to Paris region.  
- **Snapshots:** Daily backup of Vault + S3 stored offsite.  
- **Failover:** Auto promotion in ≤ 60 minutes (RTO < 1h).  
- **RPO:** 10 minutes data loss max allowed.  
- **Validation:** Quarterly DR simulations (`/docs/operational/disaster-recovery.md`).  

***

### 11. ADR Change Workflow  

| Step | Action | Owner |
|-------|----------|----------|
| 1 | Propose change as ADR (PR to `/docs/adr/`) | Developer |
| 2 | Review and approve in Security Board | Architect + CISO |
| 3 | Tag versioned ADR and publish to README index | CTO |
| 4 | Integrate into Terraform module design | DevOps Lead |
| 5 | Archive superseded ADR versions | Compliance Officer |

Warehouse: `/docs/adr/index.md`.

***

### 12. Linked Documents  

| Document | Purpose |
|------------|-----------|
| `/docs/architecture/architecture.md` | System‑level overview |
| `/docs/security/security-controls.md` | Infrastructure security references |
| `/docs/compliance/iso27001-controls.md` | Control alignment |
| `/docs/devops/environment-lifecycle.md` | Infra provisioning process |
| `/docs/operational/disaster-recovery.md` | Recovery execution plan |

***

### Expert Recommendation  
This **Infrastructure ADR** establishes a transparent, controlled process for managing infrastructure decisions at Inopsio.  
By embedding decision traceability, it provides audit‑ready justification for every architectural change — critical for your ISO 27001 and SOC 2 certification paths.