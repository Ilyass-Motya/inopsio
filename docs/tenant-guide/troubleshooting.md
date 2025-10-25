### **Title:** *Tenant Troubleshooting and Operational Diagnostics Guide v2.0*

***

### **Purpose**
This document provides standardized troubleshooting and diagnostic procedures for tenant-related issues across the Inopsio platform.  
It helps support engineers, DevOps teams, and tenant administrators to efficiently resolve problems related to onboarding, configuration, access, performance, and service availability.

***

### **Full File Content**

```markdown
# Tenant Troubleshooting and Operational Diagnostics Guide v2.0

---
id: TENANT-GUIDE-005
title: Tenant Troubleshooting and Operational Diagnostics Guide
version: 2.0
owner: SRE & Support Engineering Team
linked_docs:
  - /docs/tenant-guide/onboarding.md
  - /docs/architecture/monitoring.md
  - /docs/devops/ci-cd-pipelines.md
  - /docs/security/policies.md
  - /docs/compliance/data-governance.md
last_reviewed: 2025-10-24
---

## **Overview**

This guide outlines best practices for identifying, isolating, and resolving tenant‑level issues — ensuring minimal downtime and maximum compliance with SLA objectives.  
It covers diagnostics for **access**, **performance**, **network**, **security**, and **configuration** layers within the Inopsio multi‑tenant architecture.

Linked Docs:  
- `/docs/architecture/monitoring.md`  
- `/docs/security/policies.md`  
- `/docs/devops/ci-cd-pipelines.md`

---

## **1. Troubleshooting Framework**

| Category | Objective | Tool or Process |
|------------|-------------|----------------|
| Application | Identify frontend or API errors | Inspect logs via Loki / Sentry |
| Infrastructure | Validate Kubernetes pods and deployments | `kubectl get pods -n tenant‑<id>` |
| Network | Check DNS and TLS validity | `dig`, `openssl s_client`, `cert-manager status` |
| Authentication | Debug Keycloak realm issues | Review Keycloak logs + JWT token inspection |
| Storage | Verify tenant DB and S3 bucket sync | pgAdmin / AWS CLI / MinIO client |
| Security | Check Vault policies and secret access | `vault kv list secret/data/tenants/<id>` |

---

## **2. Common Issues and Resolutions**

### **2.1 Onboarding Errors**
| Symptom | Possible Cause | Resolution |
|-----------|----------------|-------------|
| `tenant provisioning stuck` | Terraform state lock stale | `terraform force‑unlock <ID>` |
| `Keycloak realm not created` | Network timeout or API failure | Re‑run tenant-provisioner Job |
| `Vault secret missing` | KV sync policy error | `vault policy reload` and re‑apply automation |

---

### **2.2 Access and SSO**
| Symptom | Diagnosis | Fix |
|-----------|-----------|-----|
| User cannot log in | Token expired / incorrect realm | Force token refresh + check OIDC client mapping |
| Invalid Role scopes | Role not synced between Keycloak and API | Re‑sync `/roles` API for tenant |
| 2FA failure | Outdated MFA policy | Trigger MFA reset in Keycloak portal |

---

### **2.3 Performance or Latency**
| Symptom | Diagnostics | Resolution |
|-----------|-------------|-------------|
| Dashboard loads slowly | Grafana query timeout | Optimize PromQL queries or increase `max_datapoints` |
| API request > 300 ms | K8s pod CPU starvation | Increase resource limit in `tenant_config` |
| Intermittent timeouts | NAT gateway or DNS delay | Recreate Ingress service and flush DNS cache |

---

### **2.4 Data and Storage**
| Symptom | Root Cause | Fix |
|-----------|-------------|------|
| Missing reports or audit logs | Log archive rotation too short | Update retention in Loki config file |
| Backup failure alert | S3 bucket policy misconfigured | Validate S3 permissions with `s3cmd info` |
| Database access denied | Expired service token | Rotate DB credentials via Vault policy |

---

### **2.5 Security and Compliance**
| Issue | Impact | Corrective Action |
|---------|----------|------------------|
| Tenant audit logs missing | Non‑compliant reporting | Re‑activate Kafka topic `tenant.audit.events` |
| Unencrypted storage detected | Data protection violation | Enable AES‑256 encryption + re‑store migration |
| Expired Vault certificate | Auth denials across services | Renew via Vault PKI `renew-cert.sh` script |

---

## **3. Diagnostic Commands**

### **System and Resource Checks**
```
kubectl get pods -n tenant‑acme
kubectl describe pod app‑frontend‑xyz -n tenant‑acme
kubectl top pods --namespace tenant‑acme
```

### **Logs and Monitoring**
```
loki query '{namespace="tenant-acme"} |= "error"'
vault audit list
```

### **API Health**
```
curl ‑X GET https://api.inopsio.com/v2/health -H "Authorization: Bearer $TOKEN"
```

---

## **4. Escalation Workflow**

| Level | Ownership | Expected Response Time |
|--------|-------------|------------------------|
| L1 – Tenant Admin | Initial reporting and basic checks | < 2 h |
| L2 – Support Engineer | Deep diagnostic and service restart | < 4 h |
| L3 – DevOps/SRE | Infrastructure or policy re‑deployment | < 8 h |
| Compliance Officer | Audit and incident documentation | 24 h |

Audit trail for all incidents is logged in `/reports/tenant-incident.log`.

---

## **5. Preventive Practices**

- Automate resource alerts with Prometheus Alertmanager.  
- Check certificate expiration weekly.  
- Monitor Keycloak realm health every 6 hours.  
- Enable Vault audit log shipping to S3.  
- Run monthly load tests for tenant modules.  

---

## **6. References**

| Document | Purpose |
|------------|-----------|
| `/docs/tenant-guide/onboarding.md` | Tenant provisioning steps. |
| `/docs/architecture/monitoring.md` | System observability framework. |
| `/docs/devops/ci-cd-pipelines.md` | Pipeline deployment and rollback. |
| `/docs/security/policies.md` | Access control and security references. |
| `/docs/compliance/data-governance.md` | Data retention and audit requirements. |

---

### **Summary**

This guide standardizes tenant troubleshooting for Inopsio platform operations.  
By following these protocols, teams can diagnose and resolve issues quickly while maintaining security and compliance standards for multi‑tenant deployments.

```

***