# Vault Configuration Template for Inopsio
# This is a sanitized template with secure defaults
# Replace placeholder values with actual secrets in production

# Storage backend configuration
storage "consul" {
  address = "consul:8500"
  path    = "vault/"
  service = "vault"
  
  # Enable high availability
  ha_enabled = true
  
  # Connection settings
  scheme = "https"
  tls_ca_file = "/etc/vault/tls/ca.crt"
  tls_cert_file = "/etc/vault/tls/vault.crt"
  tls_key_file = "/etc/vault/tls/vault.key"
}

# API listener configuration
listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = false
  
  # TLS configuration
  tls_cert_file = "/etc/vault/tls/vault.crt"
  tls_key_file  = "/etc/vault/tls/vault.key"
  tls_ca_file   = "/etc/vault/tls/ca.crt"
  
  # Security headers
  x_forwarded_for_authorized_addrs = "10.0.0.0/8,172.16.0.0/12,192.168.0.0/16"
  x_forwarded_for_hop_skips = 1
}

# Cluster listener for HA
listener "tcp" {
  address = "0.0.0.0:8201"
  purpose = "cluster"
  
  tls_cert_file = "/etc/vault/tls/vault.crt"
  tls_key_file  = "/etc/vault/tls/vault.key"
  tls_ca_file   = "/etc/vault/tls/ca.crt"
}

# Telemetry configuration
telemetry {
  prometheus_retention_time = "30s"
  disable_hostname = false
  enable_hostname_label = true
}

# UI configuration
ui = true

# Logging configuration
log_level = "INFO"
log_format = "json"

# High availability settings
ha_storage "consul" {
  address = "consul:8500"
  path    = "vault-ha/"
  service = "vault"
  
  scheme = "https"
  tls_ca_file = "/etc/vault/tls/ca.crt"
  tls_cert_file = "/etc/vault/tls/vault.crt"
  tls_key_file = "/etc/vault/tls/vault.key"
}

# Seal configuration (use AWS KMS in production)
seal "awskms" {
  region     = "us-west-2"
  kms_key_id = "alias/vault-unseal-key"
  endpoint   = "https://kms.us-west-2.amazonaws.com"
}

# Disable mlock for containerized environments
disable_mlock = true

# Performance tuning
max_lease_ttl = "8760h"
default_lease_ttl = "168h"

# Security settings
disable_cache = false
disable_mlock = true
disable_sealwrap = false
disable_printable_check = false

# API rate limiting
api_addr = "https://vault.inopsio.local:8200"
cluster_addr = "https://vault.inopsio.local:8201"
