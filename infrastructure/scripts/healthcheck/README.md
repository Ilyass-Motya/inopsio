# Infrastructure Health Check Scripts

This directory contains automated health check scripts to test cluster readiness post-deployment and validate infrastructure components.

## Health Check Categories

### Cluster Readiness
- **Kubernetes Cluster**: Cluster health and node status validation
- **Service Health**: Service availability and endpoint validation
- **Database Connectivity**: Database connection and query validation
- **External Dependencies**: Third-party service connectivity validation

### Post-Deployment Validation
- **Application Health**: Application startup and functionality validation
- **Load Balancer**: Load balancer configuration and routing validation
- **SSL/TLS**: Certificate validation and HTTPS connectivity
- **Monitoring**: Monitoring stack health and alerting validation

## Health Check Scripts

### Cluster Readiness Check
```bash
#!/bin/bash
# cluster-readiness.sh - Kubernetes cluster readiness validation

set -e

echo "🔍 Checking Kubernetes cluster readiness..."

# Check cluster connectivity
echo "Checking cluster connectivity..."
kubectl cluster-info

# Check node status
echo "Checking node status..."
kubectl get nodes -o wide

# Check system pods
echo "Checking system pods..."
kubectl get pods -n kube-system

# Check ingress controller
echo "Checking ingress controller..."
kubectl get pods -n ingress-nginx

# Check monitoring stack
echo "Checking monitoring stack..."
kubectl get pods -n monitoring

# Check storage classes
echo "Checking storage classes..."
kubectl get storageclass

# Check persistent volumes
echo "Checking persistent volumes..."
kubectl get pv

echo "✅ Cluster readiness check completed successfully!"
```

### Service Health Validation
```bash
#!/bin/bash
# service-health.sh - Service health validation

set -e

echo "🔍 Checking service health..."

# Check service endpoints
echo "Checking service endpoints..."
kubectl get services

# Check ingress
echo "Checking ingress..."
kubectl get ingress

# Test service connectivity
echo "Testing service connectivity..."
SERVICES=("auth-service" "user-service" "crm-service" "erp-service" "ai-service")

for service in "${SERVICES[@]}"; do
  echo "Testing $service..."
  
  # Get service URL
  SERVICE_URL=$(kubectl get service $service -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
  
  if [ -n "$SERVICE_URL" ]; then
    # Test health endpoint
    curl -f "http://$SERVICE_URL/health" || echo "❌ $service health check failed"
  else
    echo "❌ $service service not found or not ready"
  fi
done

echo "✅ Service health check completed!"
```

### Database Connectivity Check
```bash
#!/bin/bash
# database-health.sh - Database connectivity validation

set -e

echo "🔍 Checking database connectivity..."

# Check PostgreSQL
echo "Checking PostgreSQL..."
kubectl exec -it postgres-0 -- pg_isready -U postgres

# Test database connection
echo "Testing database connection..."
kubectl exec -it postgres-0 -- psql -U postgres -c "SELECT 1;"

# Check database size
echo "Checking database size..."
kubectl exec -it postgres-0 -- psql -U postgres -c "SELECT pg_size_pretty(pg_database_size('inopsio'));"

# Check Redis
echo "Checking Redis..."
kubectl exec -it redis-0 -- redis-cli ping

# Test Redis operations
echo "Testing Redis operations..."
kubectl exec -it redis-0 -- redis-cli set test_key "test_value"
kubectl exec -it redis-0 -- redis-cli get test_key
kubectl exec -it redis-0 -- redis-cli del test_key

echo "✅ Database health check completed!"
```

### SSL/TLS Validation
```bash
#!/bin/bash
# ssl-health.sh - SSL/TLS certificate validation

set -e

echo "🔍 Checking SSL/TLS certificates..."

# Get ingress hostnames
INGRESS_HOSTS=$(kubectl get ingress -o jsonpath='{.items[*].spec.rules[*].host}')

for host in $INGRESS_HOSTS; do
  echo "Checking SSL certificate for $host..."
  
  # Check certificate validity
  openssl s_client -connect $host:443 -servername $host < /dev/null 2>/dev/null | \
    openssl x509 -noout -dates
  
  # Check certificate chain
  openssl s_client -connect $host:443 -servername $host < /dev/null 2>/dev/null | \
    openssl x509 -noout -issuer -subject
  
  # Check certificate expiration
  EXPIRY=$(openssl s_client -connect $host:443 -servername $host < /dev/null 2>/dev/null | \
    openssl x509 -noout -enddate | cut -d= -f2)
  
  EXPIRY_EPOCH=$(date -d "$EXPIRY" +%s)
  CURRENT_EPOCH=$(date +%s)
  DAYS_UNTIL_EXPIRY=$(( (EXPIRY_EPOCH - CURRENT_EPOCH) / 86400 ))
  
  if [ $DAYS_UNTIL_EXPIRY -lt 30 ]; then
    echo "⚠️  Certificate for $host expires in $DAYS_UNTIL_EXPIRY days"
  else
    echo "✅ Certificate for $host is valid for $DAYS_UNTIL_EXPIRY days"
  fi
done

echo "✅ SSL/TLS health check completed!"
```

### Monitoring Stack Validation
```bash
#!/bin/bash
# monitoring-health.sh - Monitoring stack validation

set -e

echo "🔍 Checking monitoring stack..."

# Check Prometheus
echo "Checking Prometheus..."
kubectl get pods -n monitoring -l app=prometheus

# Test Prometheus API
echo "Testing Prometheus API..."
kubectl port-forward -n monitoring svc/prometheus 9090:9090 &
PROMETHEUS_PID=$!
sleep 5

curl -f http://localhost:9090/api/v1/query?query=up || echo "❌ Prometheus API not responding"
kill $PROMETHEUS_PID

# Check Grafana
echo "Checking Grafana..."
kubectl get pods -n monitoring -l app=grafana

# Test Grafana API
echo "Testing Grafana API..."
kubectl port-forward -n monitoring svc/grafana 3000:3000 &
GRAFANA_PID=$!
sleep 5

curl -f http://localhost:3000/api/health || echo "❌ Grafana API not responding"
kill $GRAFANA_PID

# Check AlertManager
echo "Checking AlertManager..."
kubectl get pods -n monitoring -l app=alertmanager

# Test AlertManager API
echo "Testing AlertManager API..."
kubectl port-forward -n monitoring svc/alertmanager 9093:9093 &
ALERTMANAGER_PID=$!
sleep 5

curl -f http://localhost:9093/api/v1/status || echo "❌ AlertManager API not responding"
kill $ALERTMANAGER_PID

echo "✅ Monitoring stack health check completed!"
```

## Post-Deployment Validation

### Application Startup Check
```bash
#!/bin/bash
# app-startup.sh - Application startup validation

set -e

echo "🔍 Checking application startup..."

# Wait for deployments to be ready
echo "Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/auth-service
kubectl wait --for=condition=available --timeout=300s deployment/user-service
kubectl wait --for=condition=available --timeout=300s deployment/crm-service
kubectl wait --for=condition=available --timeout=300s deployment/erp-service
kubectl wait --for=condition=available --timeout=300s deployment/ai-service

# Check pod status
echo "Checking pod status..."
kubectl get pods -l app=inopsio

# Check service endpoints
echo "Checking service endpoints..."
kubectl get endpoints

# Test application health
echo "Testing application health..."
kubectl get ingress -o jsonpath='{.items[0].spec.rules[0].host}' | xargs -I {} curl -f https://{}/health

echo "✅ Application startup check completed!"
```

### Load Balancer Validation
```bash
#!/bin/bash
# loadbalancer-health.sh - Load balancer validation

set -e

echo "🔍 Checking load balancer health..."

# Check load balancer services
echo "Checking load balancer services..."
kubectl get services -o wide

# Check ingress controller
echo "Checking ingress controller..."
kubectl get pods -n ingress-nginx

# Test load balancer routing
echo "Testing load balancer routing..."
INGRESS_HOST=$(kubectl get ingress -o jsonpath='{.items[0].spec.rules[0].host}')

# Test different endpoints
ENDPOINTS=("/health" "/api/auth/health" "/api/user/health" "/api/crm/health")

for endpoint in "${ENDPOINTS[@]}"; do
  echo "Testing endpoint: $endpoint"
  curl -f "https://$INGRESS_HOST$endpoint" || echo "❌ Endpoint $endpoint failed"
done

echo "✅ Load balancer health check completed!"
```

## Comprehensive Health Check

### Full System Health Check
```bash
#!/bin/bash
# full-health-check.sh - Comprehensive system health check

set -e

echo "🚀 Starting comprehensive health check..."

# Run all health checks
echo "Running cluster readiness check..."
./cluster-readiness.sh

echo "Running service health check..."
./service-health.sh

echo "Running database health check..."
./database-health.sh

echo "Running SSL/TLS health check..."
./ssl-health.sh

echo "Running monitoring health check..."
./monitoring-health.sh

echo "Running application startup check..."
./app-startup.sh

echo "Running load balancer health check..."
./loadbalancer-health.sh

echo "✅ All health checks completed successfully!"
echo "🎉 System is ready for production traffic!"
```

## Automated Health Checks

### CI/CD Integration
```yaml
# .github/workflows/health-check.yml
name: Post-Deployment Health Check

on:
  workflow_run:
    workflows: ["Deploy to Staging"]
    types: [completed]

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup kubectl
        uses: azure/setup-kubectl@v1
        
      - name: Configure kubectl
        run: |
          echo "${{ secrets.KUBE_CONFIG }}" | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig
          
      - name: Run health checks
        run: |
          chmod +x infrastructure/scripts/healthcheck/*.sh
          ./infrastructure/scripts/healthcheck/full-health-check.sh
```

### Monitoring Integration
```bash
#!/bin/bash
# health-check-monitor.sh - Continuous health monitoring

while true; do
  echo "🔄 Running scheduled health check..."
  
  # Run health checks
  ./infrastructure/scripts/healthcheck/full-health-check.sh
  
  # Send results to monitoring system
  if [ $? -eq 0 ]; then
    echo "✅ Health check passed"
    # Send success metric to monitoring system
  else
    echo "❌ Health check failed"
    # Send alert to monitoring system
  fi
  
  # Wait 5 minutes before next check
  sleep 300
done
```

## Best Practices

### Health Check Design
- **Comprehensive Coverage**: Check all critical system components
- **Fast Execution**: Minimize health check execution time
- **Clear Output**: Provide clear success/failure indicators
- **Error Handling**: Handle failures gracefully with detailed error messages

### Automation
- **CI/CD Integration**: Integrate with deployment pipelines
- **Scheduled Checks**: Regular automated health checks
- **Alerting**: Alert on health check failures
- **Documentation**: Document all health check procedures

## Getting Started

1. **Setup Scripts**: Make health check scripts executable
2. **Configure Access**: Ensure kubectl access to target cluster
3. **Test Scripts**: Run health checks in development environment
4. **Integrate CI/CD**: Add health checks to deployment pipeline
5. **Monitor Results**: Set up monitoring and alerting for health checks

For detailed health check procedures, see the individual script files.
