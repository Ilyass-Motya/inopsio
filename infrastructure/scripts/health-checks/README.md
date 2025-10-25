# Infrastructure Health Checks

This directory contains health check scripts and monitoring automation for the Inopsio infrastructure.

## Health Check Scripts

### Service Health Checks
- **check-services.sh**: Verify all microservices are running and healthy
- **check-database.sh**: Database connectivity and performance checks
- **check-redis.sh**: Redis cache health and performance
- **check-kubernetes.sh**: Kubernetes cluster health and resource usage

### Infrastructure Health Checks
- **check-load-balancer.sh**: Load balancer health and configuration
- **check-storage.sh**: Storage systems health and capacity
- **check-networking.sh**: Network connectivity and DNS resolution
- **check-security.sh**: Security services and certificate validity

### Application Health Checks
- **check-frontend.sh**: Frontend applications health and performance
- **check-backend.sh**: Backend services health and API endpoints
- **check-monitoring.sh**: Monitoring stack health (Prometheus, Grafana)
- **check-logging.sh**: Logging system health and log aggregation

## Alerting Scripts

### Critical Alerts
- **alert-cpu-usage.sh**: High CPU usage alerts
- **alert-memory-usage.sh**: High memory usage alerts
- **alert-disk-space.sh**: Low disk space alerts
- **alert-service-down.sh**: Service down alerts

### Performance Alerts
- **alert-response-time.sh**: High response time alerts
- **alert-error-rate.sh**: High error rate alerts
- **alert-throughput.sh**: Low throughput alerts
- **alert-queue-depth.sh**: High queue depth alerts

### Security Alerts
- **alert-security-events.sh**: Security event alerts
- **alert-failed-logins.sh**: Failed login attempt alerts
- **alert-certificate-expiry.sh**: Certificate expiration alerts
- **alert-vulnerability-scan.sh**: Vulnerability scan alerts

## Usage Examples

### Run All Health Checks
```bash
# Run comprehensive health check
./infrastructure/scripts/health-checks/check-all.sh

# Run specific service checks
./infrastructure/scripts/health-checks/check-services.sh
./infrastructure/scripts/health-checks/check-database.sh
```

### Set Up Monitoring
```bash
# Configure alerting rules
./infrastructure/scripts/health-checks/setup-alerts.sh

# Test alerting system
./infrastructure/scripts/health-checks/test-alerts.sh
```

### Automated Monitoring
```bash
# Schedule health checks via cron
0 */5 * * * /path/to/check-services.sh
0 */10 * * * /path/to/check-database.sh
0 */15 * * * /path/to/check-storage.sh
```

## Integration

### Prometheus Integration
- Health check metrics are exposed on `/metrics` endpoints
- Custom metrics for service availability and performance
- Alert rules defined in Prometheus configuration

### Grafana Integration
- Health check dashboards for real-time monitoring
- Historical data visualization
- Custom alerting channels (Slack, email, PagerDuty)

### Kubernetes Integration
- Health checks integrated with K8s liveness and readiness probes
- Custom resource definitions for monitoring
- Operator-based health management

## Requirements
- kubectl (Kubernetes CLI)
- curl (HTTP requests)
- jq (JSON processing)
- prometheus-cli (Prometheus integration)
- grafana-cli (Grafana integration)
