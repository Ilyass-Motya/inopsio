# Vault Policies for Inopsio
# Secure policy templates with least-privilege access

# Admin policy for full access
path "sys/*" {
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Auth service policy
path "auth-service/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# User service policy
path "user-service/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# AI service policy
path "ai-service/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# CRM service policy
path "crm-service/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# ERP service policy
path "erp-service/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Email service policy
path "email-service/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Workflow service policy
path "workflow-service/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Gateway policy
path "gateway/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Monitoring service policy
path "monitoring-service/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Inosec core service policy
path "inosec-core-service/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Inosec edge service policy
path "inosec-edge-service/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Database credentials policy
path "database/creds/*" {
  capabilities = ["read"]
}

# API keys policy
path "api-keys/*" {
  capabilities = ["read"]
}

# TLS certificates policy
path "tls/cert/*" {
  capabilities = ["read"]
}

# JWT tokens policy
path "jwt/*" {
  capabilities = ["read"]
}

# Audit logs policy (read-only)
path "audit/*" {
  capabilities = ["read", "list"]
}

# Health check policy
path "health" {
  capabilities = ["read"]
}

# Metrics policy
path "metrics" {
  capabilities = ["read"]
}
