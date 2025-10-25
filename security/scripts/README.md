# Security Scripts

This directory contains automated security scripts for compliance checks, key rotation, and security maintenance tasks.

## Script Categories

### Compliance Checks
- **Vulnerability Scanning**: Automated vulnerability assessment
- **Configuration Auditing**: Security configuration validation
- **Compliance Validation**: Regulatory compliance checking
- **Security Baseline**: Security baseline validation

### Key Rotation
- **Certificate Rotation**: SSL/TLS certificate renewal
- **API Key Rotation**: API key rotation and management
- **Database Credentials**: Database password rotation
- **Encryption Keys**: Cryptographic key rotation

### Security Maintenance
- **Access Review**: Regular access rights review
- **Security Updates**: Security patch management
- **Log Analysis**: Security log analysis and reporting
- **Threat Detection**: Automated threat detection and response

## Compliance Check Scripts

### Vulnerability Scanning
```bash
#!/bin/bash
# vulnerability-scan.sh - Automated vulnerability scanning

# Scan for known vulnerabilities
nmap -sV --script vuln target_host

# Check for outdated packages
apt list --upgradable | grep security

# Scan Docker images
docker scout cves image_name

# Check for security misconfigurations
lynis audit system
```

### Configuration Auditing
```bash
#!/bin/bash
# config-audit.sh - Security configuration validation

# Check firewall configuration
ufw status verbose

# Validate SSL/TLS configuration
testssl.sh domain.com

# Check file permissions
find /etc -type f -perm /o+w

# Validate user accounts
awk -F: '$3 == 0 {print $1}' /etc/passwd
```

### Compliance Validation
```bash
#!/bin/bash
# compliance-check.sh - Regulatory compliance validation

# Check data encryption
grep -r "encrypt" /etc/ssl/

# Validate access controls
ls -la /etc/shadow

# Check audit logging
auditctl -l

# Verify backup encryption
gpg --list-keys
```

## Key Rotation Scripts

### Certificate Rotation
```bash
#!/bin/bash
# cert-rotation.sh - SSL/TLS certificate rotation

# Generate new certificate
certbot renew --dry-run

# Update certificate in Vault
vault kv put secret/ssl/certificates \
  certificate="$(cat /etc/ssl/certs/new_cert.pem)" \
  private_key="$(cat /etc/ssl/private/new_key.pem)"

# Restart services
systemctl reload nginx
systemctl reload apache2
```

### API Key Rotation
```bash
#!/bin/bash
# api-key-rotation.sh - API key rotation

# Generate new API key
NEW_API_KEY=$(openssl rand -hex 32)

# Update in Vault
vault kv put secret/api/keys \
  current_key="$NEW_API_KEY" \
  previous_key="$OLD_API_KEY"

# Notify services
curl -X POST "https://api.service.com/rotate-key" \
  -H "Authorization: Bearer $NEW_API_KEY"
```

### Database Credentials
```bash
#!/bin/bash
# db-rotation.sh - Database password rotation

# Generate new password
NEW_PASSWORD=$(openssl rand -base64 32)

# Update database user
mysql -u root -p -e "ALTER USER 'app_user'@'%' IDENTIFIED BY '$NEW_PASSWORD';"

# Update in Vault
vault kv put secret/database/credentials \
  username="app_user" \
  password="$NEW_PASSWORD"

# Update application configuration
kubectl create secret generic db-credentials \
  --from-literal=password="$NEW_PASSWORD" \
  --dry-run=client -o yaml | kubectl apply -f -
```

## Security Maintenance Scripts

### Access Review
```bash
#!/bin/bash
# access-review.sh - Regular access rights review

# List all users with sudo access
getent group sudo

# Check for inactive accounts
lastlog -b 90

# Review file permissions
find /home -type f -perm /o+w

# Check for shared accounts
awk -F: '$3 >= 1000 {print $1}' /etc/passwd
```

### Security Updates
```bash
#!/bin/bash
# security-updates.sh - Security patch management

# Update system packages
apt update && apt upgrade -y

# Check for security updates
apt list --upgradable | grep -i security

# Update Docker images
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.CreatedAt}}" | \
  grep -v "latest" | sort -k3

# Scan for vulnerabilities
trivy image image_name
```

### Log Analysis
```bash
#!/bin/bash
# log-analysis.sh - Security log analysis

# Analyze authentication logs
grep "Failed password" /var/log/auth.log | tail -100

# Check for suspicious activity
grep -i "suspicious\|attack\|intrusion" /var/log/syslog

# Analyze web server logs
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr

# Check for privilege escalation
grep "sudo" /var/log/auth.log | grep "COMMAND"
```

## Automated Security Tasks

### Daily Security Checks
```bash
#!/bin/bash
# daily-security.sh - Daily security maintenance

# Check system health
systemctl status --failed

# Verify backup integrity
md5sum /backup/latest.tar.gz

# Check disk usage
df -h | awk '$5 > 80 {print $0}'

# Monitor network connections
netstat -tuln | grep LISTEN
```

### Weekly Security Reports
```bash
#!/bin/bash
# weekly-report.sh - Weekly security reporting

# Generate security report
{
  echo "=== Security Report $(date) ==="
  echo "System Status:"
  systemctl status --failed
  echo "Disk Usage:"
  df -h
  echo "Memory Usage:"
  free -h
  echo "Network Connections:"
  netstat -tuln
} > /var/log/security-report-$(date +%Y%m%d).log
```

### Monthly Compliance Audit
```bash
#!/bin/bash
# monthly-audit.sh - Monthly compliance audit

# Run comprehensive security scan
lynis audit system --auditor "Inopsio Security Team"

# Check compliance status
compliance-check.sh

# Generate audit report
security-report.sh > /var/log/monthly-audit-$(date +%Y%m).log

# Send notification
mail -s "Monthly Security Audit" security@inopsio.com < /var/log/monthly-audit-$(date +%Y%m).log
```

## Security Monitoring

### Real-time Monitoring
```bash
#!/bin/bash
# security-monitor.sh - Real-time security monitoring

# Monitor failed login attempts
tail -f /var/log/auth.log | grep "Failed password"

# Monitor network traffic
tcpdump -i eth0 -n | grep -E "(SYN|FIN|RST)"

# Monitor file system changes
inotifywait -m /etc -r -e modify,create,delete
```

### Alert Management
```bash
#!/bin/bash
# security-alerts.sh - Security alert management

# Check for security alerts
grep -i "alert\|warning\|error" /var/log/syslog | tail -50

# Send critical alerts
if grep -q "CRITICAL" /var/log/security.log; then
  curl -X POST "https://hooks.slack.com/services/..." \
    -H "Content-Type: application/json" \
    -d '{"text":"Critical security alert detected"}'
fi
```

## Best Practices

### Script Security
- **Input Validation**: Validate all script inputs
- **Error Handling**: Proper error handling and logging
- **Access Control**: Restrict script execution permissions
- **Audit Logging**: Log all security script execution

### Automation
- **Scheduling**: Use cron for automated execution
- **Monitoring**: Monitor script execution and results
- **Notification**: Alert on script failures
- **Documentation**: Document all security procedures

## Getting Started

1. **Setup Environment**: Configure security script environment
2. **Install Dependencies**: Install required security tools
3. **Configure Scripts**: Customize scripts for your environment
4. **Test Execution**: Test all security scripts
5. **Schedule Automation**: Set up automated execution
6. **Monitor Results**: Monitor script execution and results

For detailed script documentation and examples, see the individual script files.
