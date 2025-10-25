# OPA (Open Policy Agent) Policy Examples

## Basic Policy Structure
```rego
package inopsio.auth

# Default deny
default allow = false

# Allow if user has required permission
allow {
    input.user.role == "admin"
}

allow {
    input.user.role == "manager"
    input.action == "read"
}

allow {
    input.user.role == "user"
    input.action == "read"
    input.resource.owner == input.user.id
}
```

## RBAC Implementation
```rego
package inopsio.rbac

# Role definitions
roles = {
    "admin": ["*:*"],
    "manager": ["crm:read", "crm:write", "erp:read"],
    "user": ["profile:read", "profile:write"],
    "security_analyst": ["inosec:read", "inosec:analyze"]
}

# Check if user has permission
has_permission(user_role, required_permission) {
    user_permissions := roles[user_role]
    required_permission in user_permissions
}

has_permission(user_role, required_permission) {
    user_permissions := roles[user_role]
    "*:*" in user_permissions
}

# Main authorization rule
allow {
    has_permission(input.user.role, input.permission)
}
```

## ABAC Implementation
```rego
package inopsio.abac

# User attributes
user_attributes = {
    "department": input.user.department,
    "clearance_level": input.user.clearance_level,
    "location": input.user.location,
    "employment_status": input.user.employment_status
}

# Resource attributes
resource_attributes = {
    "classification": input.resource.classification,
    "department": input.resource.department,
    "data_type": input.resource.data_type
}

# Environment attributes
environment_attributes = {
    "time": input.environment.time,
    "location": input.environment.location,
    "network": input.environment.network
}

# Data classification policy
allow {
    user_attributes.clearance_level >= resource_attributes.classification
    user_attributes.department == resource_attributes.department
    environment_attributes.time == "business_hours"
}

# Location-based access
allow {
    user_attributes.location == resource_attributes.location
    environment_attributes.network == "corporate"
}

# Time-based access
allow {
    environment_attributes.time == "business_hours"
    user_attributes.employment_status == "active"
}
```

## Multi-Tenant Policies
```rego
package inopsio.tenant

# Tenant isolation
allow {
    input.user.tenant == input.resource.tenant
    input.user.role == "admin"
}

allow {
    input.user.tenant == input.resource.tenant
    input.user.role == "manager"
    input.action == "read"
}

# Cross-tenant access (super admin)
allow {
    input.user.role == "super_admin"
    input.action == "manage"
}
```

## Security-Specific Policies
```rego
package inopsio.security

# Security data access
allow {
    input.user.department == "security"
    input.user.clearance_level >= "confidential"
    input.resource.data_type == "security"
    input.environment.device == "managed"
}

# Threat analysis access
allow {
    input.user.role == "security_analyst"
    input.resource.data_type == "threats"
    input.action == "analyze"
}

# Incident response
allow {
    input.user.role == "security_analyst"
    input.resource.data_type == "incidents"
    input.action == "respond"
    input.environment.time == "after_hours"
}
```

## Audit and Compliance
```rego
package inopsio.audit

# Audit trail requirements
audit_required {
    input.action == "write"
    input.resource.classification >= "confidential"
}

audit_required {
    input.user.role == "admin"
    input.action == "delete"
}

# Compliance checks
compliance_check {
    input.user.clearance_level >= input.resource.classification
    input.environment.network == "corporate"
    input.environment.device == "managed"
}
```
