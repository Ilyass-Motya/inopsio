### **Title:** *Tenant Access and Identity Management Guide v2.0*

***

This file continues the flow after `onboarding.md` and `configuration.md`, establishing the key procedures for tenant login, SSO, role-based access, and permissions propagation across apps and services.

***

### **Full File Content**

```markdown
# Tenant Access and Identity Management Guide v2.0

---
id: TENANT-GUIDE-003
title: Tenant Access and Identity Management Guide
version: 2.0
owner: Security & Platform Team
linked_docs:
  - /docs/tenant-guide/onboarding.md
  - /docs/security/policies.md
  - /docs/api-specs/auth-service.yml
  - /docs/compliance/data-governance.md
last_reviewed: 2025-10-24
---

## **Overview**

This document defines the **identity and access management (IAM)** structure for Inopsio’s multi-tenant SaaS platform.  
It explains how authentication, authorization, and session management are separated per tenant and how roles and permissions are governed through Keycloak and Vault integration.

Linked Docs:  
- `/docs/security/policies.md`  
- `/docs/compliance/data-governance.md`  
- `/docs/api-specs/auth-service.yml`

---

## **1. Identity and Auth Model**

Each tenant is provisioned with a dedicated **Keycloak Realm** and replicated Vault namespace to ensure strict isolation.

| Component | Function | Isolation Mode |
|-------------|------------|----------------|
| Realm | Contains tenant users, roles, and clients | Dedicated per tenant |
| Client | Registered frontend app or service | Domain‑specific (`app.inopsio.com`, etc.) |
| User | Tenant account and credentials | Belongs to single tenant realm |
| Vault Namespace | Tenant‑level secret space | `secret/data/tenant/<id>/` |
| Group | Collection of tenant roles | Managed within realm |

SSO and MFA are enabled via OIDC and TOTP by default.  

---

## **2. Authentication Flow**

Authentication is based on OIDC and JWT standards.

### **Authentication Sequence**

```
sequenceDiagram
  participant User
  participant FrontendApp
  participant Keycloak
  participant API_Gateway

  User->>FrontendApp: Initiate Login
  FrontendApp->>Keycloak: Redirect OIDC Auth Request
  Keycloak-->>User: MFA Challenge
  User-->>Keycloak: Submit Credentials + MFA
  Keycloak-->>FrontendApp: Return Access Token
  FrontendApp->>API_Gateway: Send Bearer Token
  API_Gateway-->>Keycloak: Validate Token / Introspection
  API_Gateway-->>FrontendApp: Grant Access
```

See `/docs/api-specs/auth-service.yml` for token schema and introspection endpoints.

---

## **3. Authorization and Roles**

### **RBAC Structure**
Each realm has four predefined roles:

| Role | Scope | Description |
|-------|--------|--------------|
| `tenant-admin` | Global | Full access – manage config and users |
| `tenant-manager` | App specific | Can modify module settings, approve workflows |
| `tenant-user` | Limited | Access own dashboard modules |
| `tenant-auditor` | Read‑only | Can view logs, reports, and audit entries |

Custom role extensions can be defined in Keycloak’s admin console or through `/roles` API endpoint.

---

## **4. Single Sign‑On (SSO)**

### **Supported Standards**
- **OIDC** (OpenID Connect) – for web and mobile apps  
- **SAML 2.0** – for enterprise federation with third‑party ADFS  
- **SCIM v2** – for user provisioning sync  

### **SSO Providers Integration**
| Provider | Protocol | Use Case |
|------------|-----------|-----------|
| Azure AD | OIDC | Enterprise organizations |
| Google Workspace | OIDC | Default multi‑tenant auth |
| Okta | SAML | Partner identity providers |
| Custom LDAP | SCIM v2 | Legacy directory integration |

SSO can be configured per tenant by admin API or Keycloak UI.

---

## **5. Session and Token Management**

| Token Type | Purpose | Lifetime |
|--------------|-----------|-----------|
| Access Token | Authorizes API calls | 15 min |
| ID Token | Contains claims about user | 15 min |
| Refresh Token | Renews access token | 120 min |
| Service Account Token | Used for system integration | 60 min |
| API Key (Scoped) | Machine to machine automation | Configurable |

Tokens are validated in the API Gateway using JWKS introspection (`/.well-known/jwks.json`).

---

## **6. Permission Management**

Permissions combine RBAC and contextual ABAC policies enforced by OPA.

### **Sample ABAC Policy**
```
package tenant.authz

default allow = false

allow {
  input.role == "tenant-manager"
  input.resource == "workflow"
  input.action == "approve"
}
allow {
  input.role == "tenant-admin"
}
```

Policies are stored in Vault Transit engine and bundled per tenant.

---

## **7. Cross‑App Access Rules**

Identity federation is enabled between different Inopsio apps (e.g. CRM, ERP, InoSec).  
Cross‑app access uses OIDC federation mapping to avoid re‑authentication.

| App | Auth Method | Target API Scope |
|------|--------------|------------------|
| Marketing | No auth / Public | N/A |
| Platform Dashboard | OIDC (via Keycloak) | `platform.*` |
| InoSec Dashboard | OIDC per realm | `inosec.*` |
| Mobile App | JWT Token + Refresh | `mobile.*` |

---

## **8. Audit and Logging**

All authentication, token, and authorization events are captured in:
- Keycloak event logs (JSON) per tenant realm (`/var/log/keycloak/`)  
- Vault audit backend for secret access tracking  
- Kafka topic: `tenant.access.events`  
- Loki stream: labeled by `tenant_id` + `realm`  

Retention: 90 days by default (see `/docs/compliance/data-governance.md`).

---

## **9. Deactivation and Offboarding**

When a tenant is offboarded:
1. All realm users are disabled.  
2. Realm client credentials are revoked.  
3. Access tokens and sessions are invalidated.  
4. Audit records are archived under `/archives/tenant/<id>/`.  
5. IAM logs retained for 7 years to satisfy ISO 27001 A.12 controls.  

---

## **10. References**

| File | Purpose |
|-------|-----------|
| `/docs/security/policies.md` | Platform security model and enforcement. |
| `/docs/api-specs/auth-service.yml` | Auth & SSO OpenAPI definition. |
| `/docs/tenant-guide/onboarding.md` | Tenant provisioning details. |
| `/docs/compliance/data-governance.md` | Audit and retention rules. |

---

### **Summary**

The **Tenant Access and Identity Management Guide** provides operational and security guidelines for managing tenant auth realms, SSO connections, and role‑based permissions while maintaining Zero Trust principles across all apps and services.

```

***