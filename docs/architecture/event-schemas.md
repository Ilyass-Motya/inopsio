**Inopsio Event Architecture & Messaging Schemas**

### Purpose  
To define the structure and specifications for all Kafka and WebSocket-based asynchronous events used across Inopsio microservices.  
This document ensures cross-service consistency, schema validation, and eventual observability traceability.

***

### 1. Overview  

- **Event Transport:** Apache Kafka (primary message bus), WebSockets (real-time updates), Redis Streams (lightweight queueing).  
- **Schema Registry:** Confluent Schema Registry (via Kafka) enforcing Avro/JSON schema validation.  
- **Purpose:** Decouple services, enable observability, ensure resiliency to failure.  

**Linked Docs:**  
- `/docs/architecture/data-model.md` – Database entity definitions  
- `/docs/architecture/architecture.md` – System topology  
- `/docs/prd/feature-map.md` – Functional modules dependency  
- `/docs/security/security-controls.md` – Access control for internal topics  

***

### 2. Event Taxonomy  

| Category | Layer | Example Topics | Description |
|-----------|--------|----------------|--------------|
| **Core** | Tenant/Identity | `tenant.created`, `tenant.updated`, `user.invited` | System orchestration |
| **CRM** | Sales pipeline | `lead.created`, `deal.stage.changed`, `customer.synced` | Sales events |
| **ERP** | Commerce | `invoice.generated`, `payment.processed`, `order.received` | Business workflow |
| **Workflow** | Automation | `workflow.triggered`, `task.completed`, `bpmn.node.failed` | Internal processes |
| **Security (InoSec)** | Threat detection | `threat.detected`, `alert.acknowledged`, `policy.violation` | Security telemetry |
| **Analytics** | Metrics Bus | `metrics.published`, `logstream.new`, `alert.rate.limit` | Observability signals |

***

### 3. Event Header Specification  

All events share a consistent header for traceability and correlation.

```json
{
  "event_id": "uuid-v4",
  "event_name": "lead.created",
  "source": "crm-service",
  "timestamp": "2025-10-24T14:00:00Z",
  "tenant_id": "uuid-v4",
  "trace_id": "correlation-id",
  "version": "1.0.0",
  "schema": "crm-lead-schema-v1"
}
```

**Header Notes:**  
- `event_id` ensures deduplication.  
- `trace_id` integrates with Jaeger.  
- `version` supports backward compatibility.  

***

### 4. Example Payload Schemas  

#### CRM – Lead Created

```json
{
  "lead_id": "uuid-v4",
  "tenant_id": "uuid-v4",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "source": "marketing",
  "assigned_to": "user_id",
  "created_at": "2025-10-24T14:00:00Z"
}
```

#### ERP – Invoice Generated

```json
{
  "invoice_id": "INV-2025-004",
  "tenant_id": "uuid-v4",
  "amount": 3500.00,
  "currency": "USD",
  "status": "PENDING",
  "issued_by": "user_id",
  "issued_at": "2025-10-24T12:00:00Z"
}
```

#### Workflow – Task Completed

```json
{
  "workflow_id": "WFL-2025-001",
  "tenant_id": "uuid-v4",
  "task_id": "uuid-v4",
  "user_id": "uuid-v4",
  "status": "COMPLETED",
  "completed_at": "2025-10-24T11:42:33Z"
}
```

#### InoSec – Threat Detected

```json
{
  "alert_id": "uuid-v4",
  "tenant_id": "uuid-v4",
  "severity": "HIGH",
  "source_system": "endpoint-agent",
  "description": "Unusual data exfiltration pattern",
  "detected_at": "2025-10-24T09:30:00Z"
}
```

***

### 5. Schema Versioning and Validation  

| Rule | Enforcement |
|-------|--------------|
| Backward compatibility | Required; new fields must be optional |
| Forward compatibility | Recommended using Avro schemas |
| Validation method | JSON Schema Validator / Avro registry |
| Change tracking | Log under `/docs/architecture/event-schemas/changelog.md` |
| Testing | Automated via Jest + pytest integration |

***

### 6. Message Flow Architecture  

1. Producer service publishes event with standardized headers.  
2. Kafka schema registry validates message contract.  
3. Consumer services subscribe asynchronously:
   - NestJS: `@KafkaListener()` decorators  
   - FastAPI: Async consumers with SQLModel transaction contexts  
4. Dead letter queues (DLQs) handle failed event deserialization.  
5. Observability layer (Loki, Jaeger) captures message lifecycle telemetry.

**Linked File:** `/docs/architecture/monitoring.md`

***

### 7. WebSocket Real-Time Event Bridge  

| Event | Description | Destination |
|--------|--------------|--------------|
| `tenant.metrics.update` | Metrics delivery to admin dashboards | Admin Frontend |
| `alert.new` | Real-time alert for InoSec suite | Security Console |
| `workflow.step.update` | BPMN flow update | Workflow Designer |
| `crm.pipeline.refresh` | Kanban update | CRM Dashboard |

Handled via the `notifications-service` using Redis Pub/Sub or Socket.IO clusters.

***

### 8. Dead-Letter Queue (DLQ) Policy  

- Retention: 7 days  
- Topic naming: `<original-topic>.dlq`  
- Retry strategy: exponential backoff (0.5s, 2s, 8s, 32s)  
- Manual resolution logs stored in `/docs/operations/dlq-handbook.md`.

***

### 9. Security and Compliance  

- Events carrying PII fields require encryption for transmission (`AES-GCM`).  
- Keycloak-issued service tokens attached in headers.  
- Sensitive event payload audits logged to `audit_trail` table.  
- Encryption keys managed via Vault APIs (auto-rotated every 90 days).

**Linked Reference:** `/docs/security/policies.md`

***

### 10. Linked References  

| Linked File | Description |
|--------------|--------------|
| `/docs/architecture/data-model.md` | Entity structure definitions |
| `/docs/architecture/architecture.md` | System topology |
| `/docs/security/policies.md` | Security governance for events |
| `/docs/devops/ci-cd-pipelines.md` | Integration tests for message brokers |
| `/docs/analytics/dashboard-architecture.md` | Mapping metrics back to event telemetry |

***

### Expert Recommendation  

This **Event Schemas document** is the digital spine of Inopsio’s microservices.  
It establishes event standardization, resilience, and traceability across domains while serving as a compliance and observability pillar.  