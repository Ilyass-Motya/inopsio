# RBAC (Role-Based Access Control) Examples

## Basic Role Definitions

### Admin Role
```yaml
role: admin
permissions:
  - "*:*"  # Full access to all resources
  - "system:configure"
  - "users:manage"
  - "security:audit"
```

### Manager Role
```yaml
role: manager
permissions:
  - "crm:read"
  - "crm:write"
  - "erp:read"
  - "users:read"
  - "reports:generate"
```

### User Role
```yaml
role: user
permissions:
  - "crm:read"
  - "profile:read"
  - "profile:write"
  - "workflows:execute"
```

### Security Analyst Role
```yaml
role: security_analyst
permissions:
  - "inosec:read"
  - "inosec:analyze"
  - "security:audit"
  - "threats:investigate"
```

## Resource-Based Permissions

### CRM Resources
```yaml
resource: crm
actions:
  - leads:read
  - leads:write
  - contacts:read
  - contacts:write
  - deals:read
  - deals:write
  - reports:generate
```

### ERP Resources
```yaml
resource: erp
actions:
  - inventory:read
  - inventory:write
  - orders:read
  - orders:write
  - suppliers:read
  - suppliers:write
  - financials:read
```

### Security Resources
```yaml
resource: inosec
actions:
  - threats:read
  - threats:analyze
  - policies:read
  - policies:write
  - incidents:read
  - incidents:respond
```

## Multi-Tenant RBAC

### Tenant-Specific Roles
```yaml
tenant: acme-corp
roles:
  - admin
  - manager
  - user
  - security_analyst
```

### Cross-Tenant Permissions
```yaml
role: super_admin
permissions:
  - "tenants:manage"
  - "system:configure"
  - "security:audit"
  - "billing:manage"
```
