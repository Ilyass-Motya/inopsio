# Inopsio Architecture Overview  

### Purpose  
This document provides a structured entry point to all architecture-related documentation for the **Inopsio** platform.  
It summarizes the overall architecture domains, data flow, observability structure, and links to key files across subfolders for quick navigation.  

***

## **1. Architectural Domains**

The Inopsio system architecture is divided into seven main domains:

| Domain | Description | Primary Document |
|----------|--------------|----------------|
| **System Architecture** | Core blueprint of the platform and infrastructure layout. | [`architecture.md`](./architecture.md) |
| **4‑App Architecture Implementation** | Frontend multi‑app structure and shared workspace integration. | [`4-app-architecture.md`](./4-app-architecture.md) |
| **Data Model** | Database design, entity relationships, and multi‑tenant conventions. | [`data-model.md`](./data-model.md) |
| **Event Schemas** | Event‑driven patterns and Kafka message contracts. | [`event-schemas.md`](./event-schemas.md) |
| **Monitoring and Observability** | Metrics, traces, and alert workflows. | [`monitoring.md`](./monitoring.md) |
| **Security Controls** | IAM, access policies and infrastructure security models. | [`security-controls.md`](./security-controls.md) |
| **Diagrams and Visuals** | Illustrations showing architecture flows and multi‑tenant routing. | [`diagrams/`](./diagrams/) |

***

## **2. Folder Structure Summary**

```
/docs/architecture/
 ├── architecture.md
 ├── 4-app-architecture.md
 ├── data-model.md
 ├── event-schemas.md
 ├── monitoring.md
 ├── security-controls.md
 ├── components/
 ├── diagrams/
 ├── security-diagrams/
 ├── sequence-diagrams/
 ├── data-flow/
 └── overview.md
```

***

## **3. Key Architectural Principles**

| Principle | Meaning for Inopsio |
|-------------|--------------------|
| Modular Architecture | Each microservice and frontend app is independently deployable. |
| Multi‑Tenant Isolation | Tenant data separated via namespace and DB schema. |
| Event‑Driven Processing | All changes and workflows react to Kafka events. |
| Zero Trust Security | All connections are verified and tokenized through Keycloak + Vault. |
| Observability by Default | Every service exports metrics, traces, and logs to Prometheus/Loki. |
| Multi‑App Frontend Layer | Separate apps serve distinct audiences — Marketing, Platform, InoSec, Mobile. |

***

## **4. Navigation to Architecture Subfolders**

- **[Components Overview](./components/overview.md)** – microservice summaries.  
- **[Diagrams](./diagrams/)** – system and infrastructure visualizations.  
- **[Security Diagrams](./security-diagrams/)** – access and Zero Trust flows.  
- **[Sequence Diagrams](./sequence-diagrams/)** – async process timelines.  
- **[Integration Diagrams](./integration-diagrams/README.md)** – external service connections.  
- **[Data Flow](./data-flow/)** – ETL and ML pipeline paths.  

***

## **5. System & Architecture Diagrams**

| Diagram | Location | Description |
|-----------|-----------|-------------|
| 4‑App Architecture Diagram | [`./diagrams/4app-architecture-diagram.drawio`](./diagrams/4app-architecture-diagram.drawio) | Shows frontend app separation, shared workspaces, and CI/CD interactions. |
| Multi‑Tenant Routing Flow | [`./sequence-diagrams/multi-tenant-flow.mmd`](./sequence-diagrams/multi-tenant-flow.mmd) | Demonstrates dynamic subdomain tenant resolution workflow. |
| Authentication and SSO Flow | [`./security-diagrams/auth-session-flow.mmd`](./security-diagrams/auth-session-flow.mmd) | Illustrates Keycloak/OAuth‑based Zero Trust login and token rotation. |
| Monitoring Pipeline | [`./diagrams/observability-stack.drawio`](./diagrams/observability-stack.drawio) | Tracks metrics and alerts from Prometheus, Grafana, Loki, and Jaeger. |

***

## **6. Architectural Compliance Links**

| Framework | Mapped Controls | Evidence Location |
|-------------|----------------|-------------------|
| ISO 27001 | A.12.1 Change Control, A.14 System Design | `/docs/compliance/iso27001-controls.md` |
| SOC 2 | CC6 Security Monitoring, CC7 Change Workflow | `/docs/compliance/audit-artifacts/` |
| CNDP (Morocco) | Data Protection and Multi‑Tenant Separation | `/docs/compliance/data-governance.md` |

***

## **7. Linked Documents**

- [`/docs/architecture/4-app-architecture.md`](./4-app-architecture.md) – Frontend and Platform multi‑app implementation guide.  
- [`/docs/adr/001-4-app-architecture-strategy.md`](../adr/001-4-app-architecture-strategy.md) – Decision rationale for the multi‑app architecture.  
- [`/docs/devops/ci-cd-pipelines.md`](../dev/ci-cd-pipelines.md) – Automated delivery and infra provisioning workflows.  
- [`/docs/operational/runbook.md`](../operational/runbook.md) – Operational commands and incident response processes.  
- [`/docs/governance/business-kpis.md`](../governance/business-kpis.md) – Monitoring of architecture‑driven KPIs.  
- [`/docs/security/policies.md`](../security/policies.md) – Defined security and data usage models.  
- [`/docs/compliance/audit-artifacts/readme.md`](../compliance/audit-artifacts/readme.md) – Audit evidence and architecture trace.  

***

### Expert Recommendation  
This **overview.md** now includes cross‑references to the **4‑App Architecture Implementation** document and its complementary diagram set.  
It serves as the **central navigation hub** for Inopsio’s architectural landscape — unifying strategic ADRs, implementation documentation, diagrams, and compliance visibility.