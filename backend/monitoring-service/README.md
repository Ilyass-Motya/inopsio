# Monitoring Service

## Purpose
System monitoring, metrics collection, alerting, and observability for the entire Inopsio platform.

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string for metrics cache
- `JWT_SECRET`: JWT secret for authentication
- `MONITORING_SERVICE_PORT`: Service port (default: 3011)
- `PROMETHEUS_ENDPOINT`: Prometheus metrics endpoint
- `GRAFANA_URL`: Grafana dashboard URL
- `ALERTMANAGER_URL`: AlertManager endpoint

## Docker Run Command
```bash
docker run -d \
  --name monitoring-service \
  -p 3011:3000 \
  -e DATABASE_URL=postgresql://user:pass@db:5432/inopsio \
  -e REDIS_URL=redis://redis:6379 \
  -e JWT_SECRET=your-secret \
  -e PROMETHEUS_ENDPOINT=http://prometheus:9090 \
  inopsio/monitoring-service:latest
```

## Dependencies
- **Shared modules**: Uses `@inopsio/shared` for common utilities
- **Database**: PostgreSQL for monitoring data and alerts
- **Cache**: Redis for real-time metrics aggregation
- **External**: Prometheus, Grafana, AlertManager, PagerDuty
