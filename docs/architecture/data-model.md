**Inopsio Data Model & Entity Relationship Specification**

### Purpose  
To document the database models, schema designs, entity relationships, and data partitioning strategy for the Inopsio SaaS platform.  
It links business logic (from PRD/Feature Map) to backend implementation (NestJS + FastAPI + Prisma + SQLModel).

***

### 1. Overview  

- **Primary Databases:** PostgreSQL (relational), Redis (cache), MinIO/S3 (object storage).  
- **ORMs:** Prisma (Node microservices), SQLModel (Python AI/Security services).  
- **Partitioning Model:** Hybrid multi-tenant strategy – shared DB with tenant_id scoping (default), and optional dedicated schema or DB for enterprise tenants.  

**Linked Files:**  
- `/docs/prd/feature-map.md` – Modules-to-features mapping  
- `/docs/architecture/architecture.md` – Overall system design  
- `/docs/compliance/data-governance.md` – Data protection and residency  

***

### 2. Core Schema Overview  

| Schema | Purpose | Main Entities | DB Type |
|---------|----------|----------------|----------|
| **core** | Shared multi-tenant base | tenants, users, roles, domains | PostgreSQL |
| **crm** | Sales & customer management | leads, opportunities, contacts, pipelines | PostgreSQL |
| **erp** | Business operations | invoices, products, purchase_orders, suppliers | PostgreSQL |
| **inosec** | Security analytics | alerts, threat_events, agent_logs, audit_trails | PostgreSQL & Timescale |
| **workflow** | Automation engine | workflows, tasks, process_nodes, triggers | PostgreSQL |
| **analytics** | Observability metrics | dashboard_events, usage_stats, tenant_metrics | Prometheus / InfluxStore |
| **cache** | High-speed temporary data | sessions, jobs, tokens | Redis |

***

### 3. Entity-Relationship (ER) Overview  

**Core Relationships:**
- One **tenant** → multiple **users** (1:N).  
- Each **user** → multiple **roles** (M:N) via `user_roles`.  
- **Tenant** is linked to each module through `tenant_id`.  

**CRM Highlights:**
- `lead` —(1:N)→ `opportunity`  
- `opportunity` —(1:1)→ `deal`  
- Each `deal` references `customer_id` and `assigned_user_id`.  

**ERP Highlights:**
- `product` —(1:N)→ `invoice_items`  
- `supplier` —(1:N)→ `purchase_orders`  
- `invoice` —(N:1)→ `tenant`  

**InoSec Highlights:**
- `alert` —(N:1)→ `tenant`  
- `alert` —(1:N)→ `threat_event`  
- `agent_log` —(1:N)→ `host_device`  

**Workflow:**
- `workflow` —(1:N)→ `task`  
- `task` —(N:1)→ `user`  
- `trigger` linked via Kafka events for async execution.  

**Visualization:**  
Diagrams stored as SVGs: `/docs/architecture/diagrams/er-diagram.svg`

***

### 4. Prisma Model Example (Node Microservices)

```ts
model Tenant {
  id             String   @id @default(uuid())
  name           String
  domain         String   @unique
  plan           String
  users          User[]
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model User {
  id             String   @id @default(uuid())
  email          String   @unique
  hashedPassword String
  role           String
  tenant_id      String
  Tenant         Tenant   @relation(fields: [tenant_id], references: [id])
  createdAt      DateTime @default(now())
}
```

***

### 5. SQLModel Example (Python AI/Security Services)

```python
class ThreatEvent(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    tenant_id: UUID = Field(index=True)
    alert_id: UUID = Field(foreign_key="alert.id")
    signature: str
    severity: str
    detected_at: datetime
    payload: dict
```

*Stored in `inosec.threat_event` schema – optimized for high-volume insert and time-series querying.*

***

### 6. Tenant Isolation Logic  

| Tier | Storage Model | Example |
|------|---------------|----------|
| **Standard SaaS** | Shared DB (`tenant_id` column on all tables) | `public.crm_leads` |
| **Enterprise Dedicated** | Separate schema per tenant (schema named after UUID) | `schema_8ab7.crm_leads` |
| **Compliance Tier (HIPAA)** | Dedicated database per tenant | `tenant_8ab7_db.crm_leads` |

Automated via provisioning script: `/infrastructure/tenant-provisioner/`.

***

### 7. Data Indexing and Optimization  

- **Indexes:** Compound keys (`tenant_id`, `created_at`) across all high-volume tables.  
- **Materialized Views:** For dashboards (analytics, reporting).  
- **Partitioning:** Time-range partitioning on `log_event` and `audit_trail` tables.  
- **Caching Strategies:** Redis caching for sessions, query results, and webhook state.

***

### 8. Data Governance and Security  

- **Encryption:** AES-256-at-rest, TLS-in-transit.  
- **Anonymization:** PII fields masked on backup/replicas.  
- **Audit Logs:** All create/update/delete recorded in `audit_trail`.  
- **Backups:** Point-in-time recovery managed by Kubernetes CronJobs.  
- **Compliance:** GDPR and Moroccan data residency confirmed (storage zone: `ma1.cloud.inopsio.net`).

**Linked Docs:**  
- `/docs/compliance/data-governance.md`  
- `/docs/security/incident-response.md`  

***

### 9. Entity Count and Scalability Baseline  

| Module | Entities | Expected Volume (per tenant / month) |
|---------|-----------|------------------------------------|
| CRM | ~12 | 500k records |
| ERP | ~9 | 100k records |
| Workflow | ~7 | 50k tasks |
| InoSec | ~15 | 2M logs / 40GB |
| Analytics | ~10 | 10M metric points |

***

### 10. Linked References  

| File | Description |
|------|-------------|
| `/docs/prd/feature-map.md` | Maps features to data models |
| `/docs/architecture/event-schemas.md` | Kafka events per entity |
| `/docs/compliance/data-governance.md` | Compliance and data safety |
| `/docs/architecture/architecture.md` | System topology integration |
| `/docs/architecture/monitoring.md` | Observability of DB performance |

***

### Expert Recommendation  

This **Data Model document** defines the foundation of Inopsio’s information architecture and ensures compliance-readiness while enabling massive scalability for multi-tenant environments.  
After its creation, the next file to prepare is **`/docs/architecture/event-schemas.md`**, where you’ll document Kafka topic design, message payload formats, and service event flow orchestration.