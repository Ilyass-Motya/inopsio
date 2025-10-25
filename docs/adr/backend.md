**Inopsio Architecture Decision Record – Backend Services**

***

### 1. Purpose  
This ADR describes the core backend architecture decisions across Inopsio’s hybrid system — covering framework selection, multi‑language interoperability, message brokering, tenancy management, and API design strategy.

It provides transparency for technology adoption, change control, and cross‑service governance.

**Linked Files:**  
- `/docs/adr/infrastructure.md`  
- `/docs/architecture/data-model.md`  
- `/docs/architecture/event-schemas.md`  
- `/docs/devops/ci-cd-pipelines.md`

***

### 2. Architecture Goals  

- Maintain **modular, domain‑driven microservice architecture.**  
- Ensure **scalable multitenancy** while preserving data isolation.  
- Unify JavaScript and Python ecosystems through **API gateways** and **event bus.**  
- Enforce **DevSecOps** practices as standard within all services.  
- Achieve observability and resilience via standard instrumentation.

***

### 3. Decision Summary  

| Decision ID | Topic | Status | Date | Owner |
|--------------|-------|---------|---------|--------|
| ADR‑BE‑001 | Framework Choice (NestJS + FastAPI) | Approved | 2024‑11‑21 | CTO |
| ADR‑BE‑002 | Hybrid Language Model (JS / Python) | Accepted | 2025‑01‑05 | Architect |
| ADR‑BE‑003 | API Gateway (NestJS Monolith as Edge) | Accepted | 2025‑02‑14 | Backend Lead |
| ADR‑BE‑004 | Event Bus via Kafka / NATS | Approved | 2025‑03‑04 | DevOps Lead |
| ADR‑BE‑005 | ORM Selection (Prisma + SQLModel) | Accepted | 2025‑03‑18 | Backend Team |
| ADR‑BE‑006 | Tenant Context Resolver Middleware | Accepted | 2025‑04‑25 | Engineering Lead |
| ADR‑BE‑007 | Centralized Auth (Keycloak) | Accepted | 2025‑06‑07 | CISO |
| ADR‑BE‑008 | Caching Layer (Redis Cluster) | Approved | 2025‑07‑22 | DBA |
| ADR‑BE‑009 | Async Tasks and Queues (BullMQ + Celery) | Accepted | 2025‑08‑11 | DevOps Lead |

***

### 4. Core Backend Structure  

```
inopsio-backend/
├── services/
│   ├── crm-service/          (NestJS + Prisma)
│   ├── erp-service/          (NestJS + Prisma)
│   ├── workflow-service/     (NestJS + Redis Queue)
│   ├── inosec-service/       (FastAPI + SQLModel + Celery)
│   ├── mail-service/         (NestJS + SMTP + Kafka)
│   └── auth-service/         (NestJS + Keycloak Adapter)
├── shared/
│   └── libs/ (logging, validation, metrics, OpenTelemetry)
└── gateway/
    └── api-gateway/ (NestJS unified entrypoint)
```

Each service builds its own Docker image; deployed separately on Kubernetes.

***

### 5. Programming Language Strategy  

| Domain | Language | Framework | Purpose |
|----------|----------|-------------|----------|
| Core Business Modules | TypeScript | NestJS | CRM, ERP, Workflows |
| AI Security (Analytic Layer) | Python | FastAPI | Machine Learning & InoSec |
| Automation / Batch Jobs | Python | Celery | Async compute workers |
| Gateway / Routing | Node (TypeScript) | NestJS | Multi‑API aggregation |

Decision Rationale: NestJS provides structured DDD with strong typing and DI, while FastAPI offers modern async support and rapid data processing for AI‑driven microservices.

***

### 6. API Architecture  

- **Design Style:** REST + GraphQL Hybrid.  
- **Documentation:** OpenAPI (Gateway) + GraphiQL developer UI.  
- **Gateway Layer:** Handles routing, rate limiting, and tenant auth propagation.  
- **Service Contracts:** Strict schema validation shared via `/docs/api-specs/`.  
- **Versioning:** Semantic URL‑based (`/v1`, `/v2`) + backward compatibility tests.  

Linked Reference → `/docs/architecture/event-schemas.md`.

***

### 7. Multitenancy Model  

| Component | Isolation Type | Enforcement Layer |
|-------------|----------------|------------------|
| Database | Schema per tenant (PostgreSQL) | Tenant Resolver middleware |
| Cache (Redis) | Namespaced keys | Tenant prefixes |
| Storage (S3) | Folder per tenant | IAM roles + Vault access |
| Logs and Metrics | Label‑based tenant filters | Prometheus metric labels |

Decision `ADR‑BE‑006`: Middleware extracts `tenant_id` from headers/domain, propagates to DB context and Kafka event metadata.

***

### 8. Event‑Driven Integration  

- **Message Broker:** Kafka – primary bus for domain events and audit logs.  
- **Schema Validation:** Avro schema registry (`/docs/architecture/event-schemas.md`).  
- **Producers:** CRM, ERP, Workflow services.  
- **Consumers:** Analytics engine, InoSec AI modules, Auditing system.  
- **Fallback Queue:** Redis Streams for lightweight workflows.  
- **Error Handling:** DLQ policy for message retries (x3).  

Linked Monitoring: `Loki / Grafana eventbus‑dashboard`.

***

### 9. Data Layer and ORMs  

- **Relational DB:** PostgreSQL 15 (clustered + replicas).  
- **ORM for NestJS:** Prisma – type‑safe queries + migration CLI.  
- **ORM for FastAPI:** SQLModel – SQLAlchemy on Pydantic models.  
- **Schema Sync:** JSON Schema definitions shared across services via `/docs/architecture/data-model.md`.  
- **Caching:** Redis Cluster (HA mode with snapshot backup).  

Migration pipeline: `make db:migrate SERVICE=crm-service`.

***

### 10. Security and Authentication  

| Layer | Mechanism | Implementation |
|--------|-------------|----------------|
| User Identity | OIDC / OAuth2 | Keycloak server + Realm per environment |
| Service Auth | mTLS + JWT Exchange | Vault PKI + Keycloak service account |
| Secrets Management | Vault KV Store | Dynamic vault roles per pod |
| API Gateway | Rate limits per tenant | Redis Quota Tracker |

Security governance documented in `/docs/security/policies.md`.

***

### 11. DevSecOps Integration  

- All backend services built with GitHub Actions + Docker.  
- Security scans (Vulnerabilities, SAST, Secrets) embedded in pipeline.  
- CI/CD artifacts signed before deployment.  
- Automated testing via Jest (NestJS) + pytest (FastAPI).  
- Helm charts templated per service for K8s deployment.  

Pipeline reference: `/docs/devops/ci-cd-pipelines.md`.

***

### 12. Observability and Tracing  

- **Metrics:** OpenTelemetry exporters in all services.  
- **Logs:** JSON format → Loki ingestion.  
- **Traces:** Jaeger instrumentation via gRPC/HTTP interceptors.  
- **Dashboards:** Per module KPIs (`/docs/governance/business-kpis.md`).  

SLI/SLO targets recorded under `/reports/observability/`.

***

### 13. ADR Change Workflow  

| Step | Description | Responsibility |
|-------|--------------|----------------|
| 1 | Propose change + rationale (PR to ADR) | Developer / Architect |
| 2 | Review Impact on Infra, Security | CISO + DevOps Lead |
| 3 | Tag and Sign ADR Version | CTO |
| 4 | Archive old ADR versions | Compliance Officer |
| 5 | Cross‑link in ADR index (`/docs/adr/index.md`) | Documentation Team |

***

### 14. Linked Documents  

| File | Purpose |
|-------|-----------|
| `/docs/architecture/data-model.md` | Entity structures and schemas |
| `/docs/architecture/event-schemas.md` | Message contracts for microservices |
| `/docs/devops/security-pipeline.md` | Security tests and scans |
| `/docs/security/incident-response.md` | Incident workflow ties to services |
| `/docs/compliance/iso27001-controls.md` | Control alignment and audit mapping |

***

### Expert Recommendation  
This **Backend ADR** ensures a unified record of design reasoning, implementation standards, and cross‑service interoperability rules.  
It ensures backend evolution stays auditable, compliant, and scalable as Inopsio expands multi‑tenant services and AI‑powered modules.  