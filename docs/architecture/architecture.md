**Inopsio System Architecture – Hybrid Multi-Tenant SaaS v2.0**

### Purpose  
To describe the complete system architecture of the Inopsio platform, including backend microservices, frontend applications, infrastructure composition, data flow, and integration patterns. This document acts as the authoritative technical blueprint for system design, scalability, and compliance.

***

### 1. Architecture Overview  

#### High-Level Goals
- Cloud-native, event-driven SaaS architecture  
- Secure-by-design, modular by domain  
- Multi-cloud compatible (AWS, Azure, OVH)  
- Built for horizontal scale and observability  

**Linked Docs:**  
- `/docs/prd/v2.0.md` – Product Vision  
- `/docs/security/security-controls.md` – Compliance Framework  
- `/docs/devops/ci-cd-pipelines.md` – Delivery Automation  
- `/docs/architecture/data-model.md` – Data Schema Layer  

***

### 2. Architectural Layers  

| Layer | Core Technology | Responsibilities | Linked Module |
|-------|------------------|------------------|---------------|
| **Frontend** | Next.js + React (Vite) + Tailwind + shadcn/ui | Marketing site, Admin Dashboard, Tenants’ Web UI | `/frontend/` |
| **Backend (Node)** | NestJS + Prisma + Kafka | Business logic, orchestration, message queues | `/backend/` |
| **Backend (Python)** | FastAPI + SQLModel + Celery | AI & Security analytics (InoSec suite) | `/ai-service/` |
| **Data Layer** | PostgreSQL 15 + Redis + Object Storage (S3/MinIO) | Data storage, caching, file blob management | `/infrastructure/db/` |
| **Infrastructure** | Kubernetes + Terraform + Vault + Helm | Deployment, secret management, security, scaling | `/infrastructure/` |
| **Monitoring** | Prometheus + Grafana + Jaeger + Loki | Metrics, traces, and logs pipeline | `/infrastructure/monitoring/` |

***

### 3. Microservice Topology  

**Core Node Services:**
- `crm-service`: Customer and lead management  
- `erp-service`: Procurement, invoicing, accounting  
- `mail-service`: Email campaigns and sender reputation engine  
- `workflow-service`: Automation engine and task management  
- `tenant-service`: Identity and domain management  
- `notifications-service`: WebSocket real-time updates  
- `api-gateway`: Entry point for all frontend clients (NestJS REST + GraphQL)

**Python (AI/Security) Services:**
- `inosec-service`: Threat detection, vulnerability scans, SOC assistant  
- `ml-service`: Model orchestration and training pipelines  

**Shared Services:**
- `auth-service`: Keycloak integration & token broker  
- `scheduler-service`: BullMQ/Celery for background jobs  
- `storage-service`: S3-compatible file bucket abstraction  

***

### 4. Data Flow Diagram (Conceptual)  

1. User request enters via `api-gateway`.  
2. Access verified through Keycloak (SSO).  
3. Tenant context resolved by middleware (domain → tenant_id).  
4. Service request routed to the corresponding microservice.  
5. Kafka bus publishes related events for async operations.  
6. Celery/BullMQ workers handle background tasks.  
7. Logs and metrics flow into Loki and Prometheus for observability.

**Linked File:** `/docs/architecture/event-schemas.md`

***

### 5. Infrastructure Topology  

| Component | Provider | Orchestration | Region Example |
|------------|-----------|---------------|----------------|
| Compute | Kubernetes | Helm + ArgoCD | eu-west-1 |
| Secrets & IAM | Vault + Keycloak | Automated policies | Local/Cloud hybrid |
| Networking | Nginx + Cloudflare | SSL termination & DDoS protection | geo multi-zone |
| Storage | S3 / MinIO | Terraform managed | Regionally redundant |
| CI/CD | GitHub Actions + DockerHub | Automated pipelines | Continuous delivery |

**Linked Docs:**  
- `/docs/infrastructure/terraform-modules.md`  
- `/docs/devops/release-management.md`

***

### 6. Observability Architecture  

| Tool | Function | Integration |
|------|-------------|-------------|
| Prometheus | Metrics aggregation | Service annotations |
| Grafana | Dashboarding | Product, infra, and tenant-level KPIs |
| Loki | Log aggregation | Application and system logs |
| Jaeger | Distributed tracing | Cross-service latency |
| Sentry | Error tracking | Frontend & backend events |

**Extended Ref:** `/docs/monitoring/architecture.md`

***

### 7. Security & Compliance Integration  

- **Zero Trust approach:** Every service mutual-TLS authenticated  
- **CSP & rate limiting enforced** (reverse proxy level)  
- **Vault:** Secret rotation and restricted secrets metadata  
- **OPA Policies:** YAML-based access control  
- **Security scanning** integrated in CI/CD (`checkov`, `trivy`, `grype`)  

Compliance references:
- `/docs/compliance/iso27001-controls.md`  
- `/docs/security/policies.md`  

***

### 8. Scalability Strategy  

**Horizontal:**  
- Stateless microservices make scaling automatic under load.  
**Vertical:**  
- Resource profiles defined per service for intensive tasks (AI & logs).  
**Tenant-Level:**  
- Lightweight multi-tenant DB partitions with schema-per-customer model available for enterprise editions.  
**Multi-Domain:**  
- Domain-based functional separation via reverse proxy routing with dynamic middleware resolution.

***

### 9. Disaster Recovery (DR)  

- **RTO < 60 minutes, RPO < 15 minutes**  
- Incremental backups automated through K8s cron jobs  
- Replicated storage in multi-zone configuration  
- DR simulation logs stored in `/docs/operational/disaster-recovery.md`

***

### 10. Linked Documentation  

| Linked File | Description |
|--------------|--------------|
| `/docs/prd/v2.0.md` | Product Requirements & Vision |
| `/docs/prd/feature-map.md` | Modules and functionality |
| `/docs/architecture/data-model.md` | ER Diagrams and DB schemas |
| `/docs/architecture/event-schemas.md` | Kafka topics and event specs |
| `/docs/security/policies.md` | Security governance rules |
| `/docs/compliance/audit-artifacts/` | Audit & certification evidence |
| `/docs/dev/dev-environment.md` | Local development setup guide |

***

### Expert Recommendation  

This **Architecture Master Document** serves as the central system anatomy reference for Inopsio.  
With this file finalized, the documentation ecosystem achieves full engineering visibility — combining functional design (PRD), operational metrics (MVP Validation), and technical structure (Architecture).
