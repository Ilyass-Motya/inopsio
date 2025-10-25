### **Title:** *Tenant Configuration and Resource Management Guide v2.0*

***

### **Purpose**  
This document defines how each tenant’s configuration, resources, and services are managed after onboarding is complete.  
It guides DevOps engineers and tenant administrators on managing quotas, branding, AI workloads, and feature toggles within the multi‑tenant platform.

***

### **Full File Content**

```markdown
# Tenant Configuration and Resource Management Guide v2.0

---
id: TENANT-GUIDE-002
title: Tenant Configuration and Resource Management Guide
version: 2.0
owner: Platform & DevOps Team
linked_docs:
  - /docs/tenant-guide/onboarding.md
  - /docs/api-specs/tenant-service.yml
  - /docs/compliance/data-governance.md
  - /docs/architecture/architecture.md
last_reviewed: 2025-10-24
---

## **Overview**

This document provides a detailed framework for managing **tenant‑specific configuration**, including limits, resource allocation, compute scaling, and service customization.  
It ensures consistency, secure resource boundaries, and compliance alignment across all tenant environments.

Linked Docs:  
- `/docs/tenant-guide/onboarding.md`  
- `/docs/architecture/monitoring.md`  
- `/docs/compliance/data-governance.md`  

---

## **1. Tenant Configuration Model**

All tenant metadata and resource configuration are stored centrally in the **tenant_config** database schema (PostgreSQL).

| Field | Type | Description |
|--------|-------|--------------|
| id | UUID | Unique tenant identifier |
| tenant_name | String | Display name |
| domain | String | Assigned web domain `{tenant}.inosec.com` |
| status | Enum | (`provisioned`, `active`, `suspended`) |
| features | JSONB | Feature toggles enabled/disabled |
| limits | JSONB | Resource constraints for CPU, RAM, Storage |
| theme | JSONB | UI customization (theme colors, logo) |
| created_at | Timestamp | Record creation date |
| updated_at | Timestamp | Last update timestamp |

---

## **2. Resource Limits and Quotas**

Each tenant is assigned a set of resource quotas defined via Terraform configuration files.

### **Infrastructure Parameters**

| Parameter | Example | Description |
|-------------|----------|-------------|
| `cpu_limit` | 4 CPUs | Max container CPU allocation |
| `memory_limit` | 8 GB | Namespace memory quota |
| `storage_limit` | 200 GB | Persistent volume limit |
| `ai_gpu` | 1 GPU | GPU access for AI‑enabled tenants |

Terraform Snippet:
```
resource "kubernetes_resource_quota" "tenant_quota" {
  metadata {
    name      = "quota-${var.tenant_id}"
    namespace = "tenant-${var.tenant_name}"
  }
  spec {
    hard = {
      "requests.cpu"    = var.cpu_limit
      "requests.memory" = var.memory_limit
      "requests.storage"= var.storage_limit
    }
  }
}
```

All resource limits are tracked via Prometheus alerts and Grafana dashboards.

---

## **3. Branding and UI Customization**

### **Branding Parameters**
| Parameter | Example | Description |
|-------------|-----------|--------------|
| Primary Color | `#0072FF` | Main accent color |
| Secondary Color | `#E5E5E5` | Background and filler |
| Logo URL | `https://cdn.inopsio.com/assets/acme/logo.svg` | Tenant logo asset |
| Dashboard Layout | `vertical`/`horizontal` | Default UI layout |

Branding files reside in the `/themes/<tenant>` directory and are deployed automatically via build pipelines.  
Common components are imported from `@inopsio/ui`.

---

## **4. Feature Management**

Tenants can enable or disable specific platform modules (customized at the application layer).

| Feature Key | Module | Default | Description |
|---------------|----------|-----------|--------------|
| `crm_enabled` | CRM | true | Enable CRM module. |
| `erp_enabled` | ERP | true | Enterprise resource management. |
| `ml_enabled` | AI/Automation | false | Access AI pipelines. |
| `security_insights` | InoSec | true | InoSec security events. |
| `email_marketing` | Email Module | true | Outbound email automation. |

Feature flags are exposed via:
```
GET /tenants/{tenant_id}/features
PATCH /tenants/{tenant_id}/features
```
(See `/docs/api-specs/tenant-service.yml` for payload schema.)

---

## **5. Storage and Data Segregation**

All tenant data is partitioned logically and physically.

| Layer | Method | Isolation |
|--------|----------|-----------|
| Database | Schema‑per‑tenant | PostgreSQL multi‑schema model |
| Cache | Keyspace prefixing | Redis `tenant:<id>` |
| Storage | S3 bucket per tenant | Isolated version control and retention |
| Monitoring | Label scoping | Prometheus + Grafana filtering |

Encryption and retention settings are defined in `/docs/compliance/data-governance.md`.

---

## **6. Security Configuration**

Each tenant’s security policies are enforced using OPA (Open Policy Agent) and Vault policies.

### **Security Services**
- Dedicated Keycloak realm per tenant.  
- Vault KV namespace: `secret/data/tenants/<id>/`  
- Automatic credential rotation every 90 days.  
- OPA policy bundles loaded per tenant namespace.  

Refer to: `/docs/security/policies.md`

---

## **7. Monitoring Configuration Per Tenant**

Tenants are tagged with Prometheus labels and Grafana datasources for observability.

**Example:**
```
prometheus:
  scrape_configs:
    - job_name: tenant-acme-apps
      kubernetes_sd_configs:
        - namespaces:
            names: ["tenant-acme"]
      relabel_configs:
        - source_labels: [__meta_kubernetes_namespace]
          target_label: tenant
```

Tenants may view their own dashboards only, ensured through Grafana folder permissions.

---

## **8. Data Retention and Backup**

| Data Type | Retention | Backup Frequency | Storage Type |
|-------------|-------------|------------------|---------------|
| Operational Logs | 30 days | Daily | Loki + S3 Object Store |
| Database Snapshots | 7 years | Daily Incremental | PostgreSQL Replica |
| Security Events | 90 days | Hourly | Wazuh Central Store |
| AI Models | 12 months | Weekly Versioning | S3 (MLflow Artifact Store) |

Policies are auditable via annual ISO 27001/SOC 2 reviews.

---

## **9. Change Management and Governance**

Change requests to tenant configurations follow the release policies established in:
- `/docs/governance/release-policies.md`
- `/docs/governance/release-checklist.md`

Each change requires:
1. GitHub PR with Tenant ID and Change Description.  
2. CI automation validation (`tenant‑config‑validator.yml`).  
3. Dual approval from DevOps and Compliance.  
4. Automated update to `tenant_config` registry post‑merge.  

---

## **10. References**

| File | Purpose |
|-------|-----------|
| `/docs/tenant-guide/onboarding.md` | Tenant creation procedure. |
| `/docs/api-specs/tenant-service.yml` | Tenant management API. |
| `/docs/compliance/data-governance.md` | Data control and retention rules. |
| `/docs/security/policies.md` | IAM and security models. |
| `/docs/architecture/monitoring.md` | Observability and dashboards. |

---

### **Summary**

This guide defines multi‑layer tenant configuration management for Inopsio.  
It provides a uniform method to control resource allocation, branding, data segregation, and feature governance while maintaining strict compliance and security standards.

```

***