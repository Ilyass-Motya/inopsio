### **Title:** *Tenant Customization and White‑Label Deployment Guide v2.0*

***

### **Purpose**  
This document explains how tenants can customize and white‑label their instances of the Inopsio platform, including UI branding, feature toggles, domain mapping, and deployment pipelines for customized apps.  
It provides DevOps and product teams with repeatable methods to safely manage customization without breaking upgrade compatibility.

***

### **Full File Content**

```markdown
# Tenant Customization and White‑Label Deployment Guide v2.0

---
id: TENANT-GUIDE-004
title: Tenant Customization and White‑Label Deployment Guide
version: 2.0
owner: Platform and Frontend Teams
linked_docs:
  - /docs/tenant-guide/onboarding.md
  - /docs/tenant-guide/configuration.md
  - /docs/devops/ci-cd-pipelines.md
  - /docs/security/policies.md
last_reviewed: 2025-10-24
---

## **Overview**

This guide defines how to build and deploy **white‑labeled, tenant‑specific customizations** in the Inopsio platform.  
It explains how theming, modules, and deployment settings are isolated and safely rolled out through CI/CD.

Linked Docs: 
- `/docs/architecture/architecture.md`
- `/docs/tenant-guide/configuration.md`
- `/docs/security/policies.md`

---

## **1. White‑Label Concept**

Each tenant instance can be visually branded and feature‑tuned while sharing the same core runtime.

| Layer | Example Override | Controlled By |
|--------|------------------|---------------|
| Branding | Logo, colors, layout | Tenant UI theme config |
| Domain | customdomain.com | DNS + SSL automation |
| Feature Modules | CRM, Email, AI | Feature toggle API |
| Deployment | Custom subdomain (`{tenant}.inosec.com`) | Terraform + Helm |
| Legal Pages | Tenant terms of service | Admin panel upload |

---

## **2. Theming and UI Overrides**

Tenant‑specific themes are stored in `/themes/<tenant_name>/theme.json`.

### **Sample Theme File**
```
{
  "primaryColor": "#0072FF",
  "secondaryColor": "#F5F5F5",
  "fontFamily": "Inter, sans-serif",
  "logoUrl": "https://cdn.inopsio.com/assets/acme/logo.svg",
  "darkMode": true
}
```

### **Build Injection Process**
1. Frontend pipeline loads `tenant_id` from environment variable.  
2. Checks for corresponding theme folder in `/themes`.  
3. Merges core UI theme + tenant overrides.  
4. Builds dedicated static asset bundle.  

Example:
```
npm run build --workspace=@inopsio/platform --tenant=acme
```

---

## **3. Feature Toggles**

Feature toggles are controlled per tenant through the Tenant API.

| Feature Key | Description | Default |  
|---------------|--------------|-----------|
| `ml_insights` | Enable AI insight dashboard | false |  
| `security_analytics` | Activate InoSec security panels | true |  
| `email_campaigns` | Enable email automation engine | true |  
| `crm_integration` | Allow CRM module usage | true |

Example API Usage:
```
PATCH /tenants/{tenant_id}/features
{
  "ml_insights": true
}
```

CI validation through `tenant-feature-check.yml` ensures compatibility before deployment.

---

## **4. Domain and SSL Customization**

Custom domains are registered and validated using Cloudflare API and Vault PKI.

### **Steps**
1. Add custom domain in Admin Portal (`tenant_settings → domains`).  
2. System creates CNAME entry for `customdomain.com ➜ app.inopsio.com`.  
3. Vault issues TLS certificate via ACME.  
4. Ingress controller applies certificate and reloads routing.  
5. Certification event is audited in Vault logs.  

Domains are renewed automatically every 90 days.

---

## **5. Legal and Compliance Customization**

Tenants can upload:
- Custom privacy policies, cookie management scripts, and terms of service.  
- Localized documents in multiple languages.  
- Optional GDPR Data Processing Addendum links.  

These documents are stored in the tenant S3 bucket (`/compliance/<tenant>/legal`).  
Audit tracking requires metadata JSON with hash and upload timestamp.

---

## **6. Pipeline and Deployment**

All builds and deployments for tenant customizations are managed via the CI/CD pipeline.

| Stage | Action | Tool |
|---------|-----------|--------|
| Build | Compile Next.js tenant bundles | GitHub Actions |
| Test | Cypress UI validation | E2E Testing Stage |
| Deploy | ArgoCD sync to tenant namespace | Helm Release |
| Monitor | Rollback on error and alert | Slack Webhooks |

### **Environment Values**
```
TENANT_ID: acme
THEME_PATH: ./themes/acme
CUSTOM_DOMAINS: acme.security.com
```

---

## **7. Rollback and Recovery**

In case of build failure or theme conflict:
1. Rollback automatically to previous commit tag (`tenant‑<id>‑stable`).  
2. Notify DevOps and Tenant Admin via Slack + Email.  
3. Log incident for auditing (`/reports/tenant-customization-errors.log`).  

---

## **8. Security Considerations**

- Tenant custom assets are scanned in CI (virus + integrity check).  
- Vault policies prevent cross‑tenant access to custom assets.  
- Keycloak realm separation enforces theme and domain boundaries.  
- SSLF certificates are validated via Vault PKI inspections every 24 hours.  

---

## **9. Examples**

### **Example: Tenant Feature Override**
```
tenant: "Acme Corp"
features:
  crm_enabled: true
  ai_insights: false
  security_monitoring: true
```

### **Example: Custom Build Command CI**
```
jobs:
  build-acme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run build -- --tenant=acme
      - run: npm run deploy
```

---

## **10. References**

| File | Purpose |
|-------|-----------|
| `/docs/tenant-guide/configuration.md` | Resource and theme management. |
| `/docs/devops/ci-cd-pipelines.md` | Pipeline automation for tenant deployments. |
| `/docs/security/policies.md` | Security isolation rules. |
| `/docs/compliance/data-governance.md` | Compliance and audit data retention. |
| `/docs/api-specs/tenant-service.yml` | Tenant feature API reference. |

---

### **Summary**

Tenant customization in Inopsio allows each client to operate under its own brand and domain—all while preserving security, compliance, and upgrade compatibility.  
It uses build‑time isolation, Terraform provisioning, and Vault policy controls to guarantee secure multi‑tenant operations at scale.
```

***