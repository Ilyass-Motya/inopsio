# Inopsio Scripts

This directory contains automation scripts for the Inopsio platform.

## Script Categories

### CI/CD Scripts (`ci/`)
- **build.sh**: Build all services and applications
- **test.sh**: Run comprehensive test suite
- **deploy.sh**: Deploy to staging/production environments
- **rollback.sh**: Rollback to previous deployment

### Local Development (`local/`)
- **setup.sh**: Initial development environment setup
- **start-dev.sh**: Start all services locally
- **stop-dev.sh**: Stop all local services
- **reset-db.sh**: Reset database to clean state

### Testing (`test/`)
- **unit-tests.sh**: Run unit tests for all services
- **integration-tests.sh**: Run integration tests
- **e2e-tests.sh**: Run end-to-end tests
- **load-tests.sh**: Run performance and load tests

### Database (`migrations/`)
- **migrate-up.sh**: Apply database migrations
- **migrate-down.sh**: Rollback database migrations
- **seed-data.sh**: Seed database with test data
- **backup-db.sh**: Create database backup

### Deployment (`deploy/`)
- **deploy-staging.sh**: Deploy to staging environment
- **deploy-production.sh**: Deploy to production environment
- **health-check.sh**: Verify deployment health
- **smoke-tests.sh**: Run smoke tests after deployment

### Patching (`patch/`)
- **security-patch.sh**: Apply security patches
- **dependency-update.sh**: Update dependencies
- **os-patch.sh**: Apply OS-level patches
- **hotfix.sh**: Apply hotfixes

### Monitoring (`monitor/`)
- **check-services.sh**: Check service health
- **log-analysis.sh**: Analyze application logs
- **metrics-collect.sh**: Collect system metrics
- **alert-check.sh**: Check alerting systems

### Utilities (`utils/`)
- **cleanup.sh**: Clean up temporary files
- **backup.sh**: Create system backups
- **restore.sh**: Restore from backups
- **maintenance.sh**: Run maintenance tasks

### Telemetry (`telemetry/`)
- **collect-metrics.sh**: Collect telemetry data
- **send-analytics.sh**: Send analytics data
- **performance-report.sh**: Generate performance reports

## Usage Examples

### Development Setup
```bash
# Initial setup
./scripts/local/setup.sh

# Start development environment
./scripts/local/start-dev.sh

# Run tests
./scripts/test/unit-tests.sh
```

### Deployment
```bash
# Deploy to staging
./scripts/deploy/deploy-staging.sh

# Run health checks
./scripts/deploy/health-check.sh

# Deploy to production
./scripts/deploy/deploy-production.sh
```

### Maintenance
```bash
# Apply security patches
./scripts/patch/security-patch.sh

# Run maintenance tasks
./scripts/utils/maintenance.sh

# Create backup
./scripts/utils/backup.sh
```

## Script Requirements
- Bash 4.0+
- Docker and Docker Compose
- kubectl (for Kubernetes deployments)
- jq (for JSON processing)
- curl (for API calls)

## Environment Variables
Scripts use environment variables from `.env` files:
- `ENVIRONMENT`: Target environment (dev/staging/prod)
- `DOCKER_REGISTRY`: Docker registry URL
- `K8S_NAMESPACE`: Kubernetes namespace
- `DB_HOST`: Database host
- `REDIS_HOST`: Redis host
