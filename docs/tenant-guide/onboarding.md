# Tenant Onboarding and Provisioning Guide v2.0

***
id: TENANT-GUIDE-001  
title: Tenant Onboarding and Provisioning Guide  
version: 2.0  
owner: DevOps & Platform Team  
linked_api: /docs/api-specs/tenant-service.yml  
compliance_ref: /docs/compliance/data-governance.md  
last_reviewed: 2025‑10‑24  
***

## **Overview**

This document details the **end‑to‑end tenant onboarding process** within the Inopsio multi‑tenant SaaS platform.  
It guides administrators, DevOps teams, and reseller partners through the creation, configuration, and activation of tenant environments, ensuring compliance, security, and audit traceability.

Linked Docs:  
- `/docs/architecture/architecture.md`  
- `/docs/security/policies.md`  
- `/docs/compliance/data-governance.md`  
- `/docs/api-specs/tenant-service.yml`  

***

## **1. Tenant Lifecycle Overview**

| Stage | Description | Responsible |
|--------|---------------|-------------|
| Creation | Tenant account and namespace provisioning | Platform Ops |
| Configuration | Assign domain, resources, and limits | DevOps |
| Activation | Enable services and SSO integration | Tenant Admin |
| Monitoring | Set up metrics, logging, and alerts | SRE |
| Audit & Termination | Archival or offboarding workflow | Compliance Officer |

Lifecycle is managed through the Tenant API and Terraform automation.

***

## **2. Tenant Creation**

### **2.1 API Based Provisioning**
**Endpoint:** `/tenants`  
Reference: [`/docs/api-specs/tenant-service.yml`](../api-specs/tenant-service.yml)

#### **Example Request:**
```json
POST /tenants
{
  "name": "Acme Corp",
  "domain": "acme.inosec.com",
  "contact_email": "admin@acme.com"
}
```

#### **Example Response:**
```json
{
  "tenant_id": "b1c3e8f4-8123-496c-8dac-f8a7da746e21",
  "status": "provisioning"
}
```

### **2.2 Terraform Automation**

Tenant onboarding can be automated using the platform Terraform module:
```hcl
module "tenant" {
  source       = "modules/tenant"
  tenant_id    = "b1c3e8f4-8123-496c-8dac-f8a7da746e21"
  domain       = "acme.inosec.com"
  vault_policy = "tenant_acme_policy"
}
```

This module creates:
- Kubernetes namespace `tenant‑acme`  
- Keycloak realm `acme`  
- Vault KV store path `secret/data/tenants/acme`  
- Grafana datasource and dashboard entry  

***

## **3. Configuration**

### **3.1 Tenant Settings**

Settings are stored in `tenant_config` schema for each tenant.

| Field | Type | Description |
|--------|-------|--------------|
| `id` | UUID | Tenant identifier |
| `name` | String | Display name |
| `domain` | String | Assigned tenant domain |
| `theme` | JSON | Color and branding customizations |
| `limits` | JSON | Resource quotas (CPU, Memory, Storage) |
| `contact_email` | String | Primary tenant administrator email |

***

### **3.2 Domain & Certificate Provisioning**

Tenant domains follow: `{tenant_name}.inosec.com`

Steps:
1. Automatically generate DNS record via Cloudflare API.  
2. Issue TLS certificates with Vault PKI engine.  
3. Deploy certificate as a Kubernetes secret.  
4. Validate SSL termination via Ingress controller.  

***

## **4. Access and Identity Setup**

Each tenant receives a dedicated Keycloak realm with custom roles.

| Role | Description |
|-------|--------------|
| `tenant‑admin` | Full administration over tenant resources. |
| `tenant‑manager` | Manage users and settings. |
| `tenant‑user` | Access assigned modules only. |
| `tenant‑auditor` | Read‑only access for compliance. |

SSO Integration options:
- SAML/OIDC for corporate directory integration.  
- Group mapping via Keycloak LDAP provider.  
- MFA enforced globally (TOTP or WebAuthn).  

***

## **5. Monitoring and Observability**

The Inopsio Observability suite provides per‑tenant dashboards for:
- Application usage metrics (Grafana)  
- Log aggregation via Loki namespace filters  
- Security event feeds from Wazuh and Vault audit logs  
- SLI/SLO monitoring per tenant namespace  

**Example Dashboard:** `dashboards/tenant-acme.json`

See also: `/docs/architecture/monitoring.md`

***

## **6. Audit and Compliance**

Each tenant automatically registers auditable events in:
- `audit_logs` (PostgreSQL table)  
- Vault audit devices  
- Kafka topic `tenant.audit.events`  

### **Retention**
| Type | Duration | Control |
|-------|------------|-----------|
| Operational Logs | 30 days | ISO 27001 A.12.1 |
| Security Events | 90 days | SOC 2 CC6 |
| Audit Records | 7 years | Compliance Retention Policy |

Refer to `/docs/compliance/data-governance.md`.

***

## **7. Offboarding Procedure**

### **Steps**
1. Suspend tenant and notify primary contact.  
2. Export data (snapshot and backup).  
3. Revoke all access tokens and Vault policies.  
4. Deactivate Keycloak realm and revoke certificates.  
5. Archive all logs to `/archives/tenant‑<id>/`.  
6. Purge namespaces and storage after 30 days.  

### **Compliance**
Permanent deletion requires: CISO + Compliance Officer approval per ISO 27001 A.8.3.2.  

***

## **8. Automation Pipeline Reference**

| Component | Tool | Purpose |
|-------------|------|----------|
| Tenant Provisioner | Terraform + Vault API | Automates env creation. |
| Tenant API Client | NestJS Microservice | Manages tenant metadata. |
| IAM Bootstrapping | Keycloak Terraform provider | Realm and Role setup. |
| Secret Distribution | Vault Transit Engine | Encrypts application credentials. |

***

## **9. Support and Escalation**

| Issue Type | Contact | Response SLA |
|--------------|-----------|--------------|
| Provisioning Error | DevOps Team | 2 hours |
| Access Issue | Tenant Admin → Support | 4 hours |
| Security Incident | CISO on call | Immediate |
| Audit Inquiry | Compliance Officer | 1 business day |

Support channels: [community.inopsio.com](https://community.inopsio.com) or enterprise support portal.

***

### **Linked Documents**
- `/docs/api-specs/tenant-service.yml`  
- `/docs/compliance/data-governance.md`  
- `/docs/architecture/monitoring.md`  
- `/docs/security/policies.md`

***

### **Summary**

This guide defines repeatable, automated, and compliant tenant onboarding for the Inopsio platform.  
It ensures consistent security, resource management, and auditing across all customer deployments.  
Following this model guarantees adherence to ISO 27001, SOC 2, and GDPR standards.

---