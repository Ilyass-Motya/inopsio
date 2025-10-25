# Security Configuration Templates

This directory contains sanitized configuration templates for security services used in the Inopsio platform. These templates provide secure defaults and can be customized for different environments.

## Overview

The configuration templates are designed to:
- Provide secure defaults for production environments
- Enable rapid deployment of new environments
- Ensure consistent security configurations across environments
- Support compliance requirements (GDPR, SOC 2, ISO 27001, HIPAA)

## Templates

### Vault Configuration

| File | Purpose | Description |
|------|---------|-------------|
| `vault-config.hcl` | Vault server configuration | Main Vault server configuration with secure defaults |
| `vault-policies.hcl` | Vault access policies | RBAC policies for different services and users |

### Keycloak Configuration

| File | Purpose | Description |
|------|---------|-------------|
| `keycloak-realm.json` | Keycloak realm configuration | Complete realm setup with users, roles, and clients |

## Usage

### 1. Vault Setup

#### Basic Configuration
```bash
# Copy template to Vault config directory
cp security/config-templates/vault-config.hcl /etc/vault/vault.hcl

# Update placeholder values
sed -i 's/PLACEHOLDER_VAULT_ADDR/your-vault-address/g' /etc/vault/vault.hcl
sed -i 's/PLACEHOLDER_CONSUL_ADDR/your-consul-address/g' /etc/vault/vault.hcl

# Start Vault
vault server -config=/etc/vault/vault.hcl
```

#### Policy Setup
```bash
# Initialize Vault
vault operator init

# Unseal Vault
vault operator unseal

# Apply policies
vault policy write inopsio-admin security/config-templates/vault-policies.hcl

# Create admin user
vault auth enable userpass
vault write auth/userpass/users/admin \
  password=secure-password \
  policies=inopsio-admin
```

### 2. Keycloak Setup

#### Realm Import
```bash
# Start Keycloak
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev

# Import realm configuration
./kcadm.sh create realms -f security/config-templates/keycloak-realm.json
```

#### Environment-Specific Configuration
```bash
# Update SMTP settings
sed -i 's/smtp.inopsio.local/your-smtp-server/g' security/config-templates/keycloak-realm.json

# Update redirect URIs
sed -i 's/app.inopsio.local/your-app-domain/g' security/config-templates/keycloak-realm.json
```

## Security Features

### Vault Security Features
- **High Availability**: Consul backend with HA configuration
- **TLS Encryption**: All communications encrypted with TLS
- **Access Control**: Fine-grained RBAC policies
- **Audit Logging**: Comprehensive audit trail
- **Seal/Unseal**: Hardware security module (HSM) support
- **Token Management**: Short-lived tokens with renewal

### Keycloak Security Features
- **Multi-Factor Authentication**: TOTP support
- **Password Policies**: Strong password requirements
- **Brute Force Protection**: Account lockout mechanisms
- **Session Management**: Secure session handling
- **OAuth2/OIDC**: Industry-standard protocols
- **Federation**: External identity provider support

## Environment-Specific Customization

### Development Environment
```bash
# Disable TLS for local development
sed -i 's/tls_disable = false/tls_disable = true/g' vault-config.hcl

# Use HTTP for local testing
sed -i 's/https:/http:/g' keycloak-realm.json
```

### Staging Environment
```bash
# Use staging certificates
sed -i 's/\/etc\/vault\/tls\/vault.crt/\/etc\/vault\/tls\/staging-vault.crt/g' vault-config.hcl

# Update domain names
sed -i 's/inopsio.local/staging.inopsio.local/g' keycloak-realm.json
```

### Production Environment
```bash
# Enable all security features
# Use production certificates
# Configure external authentication providers
# Set up monitoring and alerting
```

## Compliance Considerations

### GDPR Compliance
- Data encryption at rest and in transit
- Right to be forgotten implementation
- Data portability features
- Consent management

### SOC 2 Compliance
- Access controls and authentication
- System monitoring and logging
- Data integrity and availability
- Incident response procedures

### ISO 27001 Compliance
- Information security management
- Risk assessment and treatment
- Security incident management
- Business continuity planning

### HIPAA Compliance
- Administrative safeguards
- Physical safeguards
- Technical safeguards
- Audit controls and documentation

## Monitoring and Alerting

### Vault Monitoring
```bash
# Enable metrics endpoint
vault write sys/config/ui api_addr="https://vault.inopsio.local:8200"

# Configure Prometheus scraping
curl -H "X-Vault-Token: $VAULT_TOKEN" \
  https://vault.inopsio.local:8200/v1/sys/metrics
```

### Keycloak Monitoring
```bash
# Enable health checks
curl https://keycloak.inopsio.local:8080/health

# Monitor authentication events
curl -H "Authorization: Bearer $TOKEN" \
  https://keycloak.inopsio.local:8080/admin/realms/inopsio/events
```

## Backup and Recovery

### Vault Backup
```bash
# Backup Vault data
vault operator raft snapshot save vault-backup.snap

# Restore from backup
vault operator raft snapshot restore vault-backup.snap
```

### Keycloak Backup
```bash
# Export realm configuration
./kcadm.sh get realms/inopsio -o realm-backup.json

# Import realm configuration
./kcadm.sh create realms -f realm-backup.json
```

## Troubleshooting

### Common Issues

**Vault Unseal Issues**
```bash
# Check seal status
vault status

# Unseal with recovery keys
vault operator unseal <recovery-key-1>
vault operator unseal <recovery-key-2>
vault operator unseal <recovery-key-3>
```

**Keycloak Connection Issues**
```bash
# Check Keycloak health
curl https://keycloak.inopsio.local:8080/health

# Verify realm configuration
./kcadm.sh get realms/inopsio
```

**Authentication Failures**
```bash
# Check Vault authentication
vault auth -method=userpass username=admin

# Verify Keycloak user
./kcadm.sh get users -r inopsio -q username=admin
```

## Security Best Practices

1. **Regular Updates**: Keep Vault and Keycloak updated
2. **Certificate Management**: Rotate certificates regularly
3. **Access Review**: Regular access review and cleanup
4. **Monitoring**: Continuous monitoring of security events
5. **Backup**: Regular backup of configurations and data
6. **Testing**: Regular security testing and penetration testing

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review logs for error messages
3. Consult Vault and Keycloak documentation
4. Create an issue in the project repository

## Contributing

To contribute to the configuration templates:
1. Follow security best practices
2. Test configurations in non-production environments
3. Document any changes and their impact
4. Update this README with new configurations