# Infrastructure Bootstrap Scripts

This directory contains scripts for initial environment setup and infrastructure provisioning across all deployment environments.

## Bootstrap Process Overview

The bootstrap process follows this sequence:
1. **Prerequisites Check** - Verify required tools and permissions
2. **Environment Setup** - Configure environment-specific settings
3. **Infrastructure Provisioning** - Deploy base infrastructure
4. **Service Deployment** - Deploy microservices
5. **Health Verification** - Validate all services are running
6. **Security Configuration** - Apply security policies and access controls

## Directory Structure

```
bootstrap/
├── README.md                    # This file
├── sample.env                   # Environment configuration template
├── prerequisites.sh            # Prerequisites verification
├── setup-dev.sh                # Development environment setup
├── setup-staging.sh            # Staging environment setup
├── setup-prod.sh              # Production environment setup
├── deploy-infrastructure.sh    # Infrastructure deployment
├── deploy-services.sh          # Microservices deployment
├── health-check.sh             # Health verification
├── security-setup.sh          # Security configuration
└── cleanup.sh                  # Environment cleanup
```

## Prerequisites

### Required Tools
- **Terraform** >= 1.0
- **Docker** >= 20.10
- **Kubectl** >= 1.21
- **Helm** >= 3.0
- **AWS CLI** >= 2.0
- **Git** >= 2.30

### Required Permissions
- AWS IAM permissions for infrastructure provisioning
- Kubernetes cluster admin access
- Docker registry push/pull permissions
- Git repository access

### Environment Variables
```bash
# Copy and customize environment configuration
cp sample.env .env
# Edit .env with your specific values
```

## Environment Setup

### Development Environment
```bash
# Run development bootstrap
./setup-dev.sh

# This will:
# - Create development namespace
# - Deploy development infrastructure
# - Configure local development tools
# - Set up monitoring and logging
```

### Staging Environment
```bash
# Run staging bootstrap
./setup-staging.sh

# This will:
# - Create staging namespace
# - Deploy staging infrastructure
# - Configure CI/CD pipelines
# - Set up automated testing
```

### Production Environment
```bash
# Run production bootstrap
./setup-prod.sh

# This will:
# - Create production namespace
# - Deploy production infrastructure
# - Configure high availability
# - Set up disaster recovery
```

## Infrastructure Deployment

### Base Infrastructure
```bash
# Deploy base infrastructure
./deploy-infrastructure.sh

# This includes:
# - VPC and networking
# - Security groups and IAM roles
# - Database clusters
# - Message queues
# - Storage buckets
```

### Service Deployment
```bash
# Deploy all microservices
./deploy-services.sh

# This includes:
# - Authentication service
# - User management service
# - CRM service
# - ERP service
# - Email service
# - AI service
# - Workflow service
# - Security services
```

## Health Verification

### Service Health Checks
```bash
# Run comprehensive health checks
./health-check.sh

# This verifies:
# - All services are running
# - Database connectivity
# - API endpoints are responding
# - Monitoring is active
# - Security policies are applied
```

### Health Check Endpoints
- **Gateway**: `http://gateway.inopsio.local/health`
- **Auth Service**: `http://auth.inopsio.local/health`
- **User Service**: `http://user.inopsio.local/health`
- **CRM Service**: `http://crm.inopsio.local/health`
- **ERP Service**: `http://erp.inopsio.local/health`
- **Email Service**: `http://email.inopsio.local/health`
- **AI Service**: `http://ai.inopsio.local/health`
- **Workflow Service**: `http://workflow.inopsio.local/health`

## Security Configuration

### Security Setup
```bash
# Configure security policies
./security-setup.sh

# This includes:
# - RBAC and ABAC policies
# - Network security groups
# - SSL/TLS certificates
# - Vault configuration
# - Audit logging
```

### Security Components
- **Keycloak**: Identity and access management
- **Vault**: Secrets management
- **OPA**: Policy enforcement
- **Falco**: Runtime security monitoring
- **Trivy**: Vulnerability scanning

## Environment-Specific Configurations

### Development
- Single-node Kubernetes cluster
- Local database instances
- Debug logging enabled
- Hot reloading for development

### Staging
- Multi-node Kubernetes cluster
- Managed database services
- Production-like configuration
- Automated testing enabled

### Production
- High-availability Kubernetes cluster
- Multi-region database replication
- Production security policies
- Disaster recovery configured

## Monitoring and Logging

### Monitoring Stack
- **Prometheus**: Metrics collection
- **Grafana**: Visualization and dashboards
- **Jaeger**: Distributed tracing
- **ELK Stack**: Log aggregation and analysis

### Key Metrics
- Service availability and performance
- Resource utilization
- Security events and anomalies
- Business metrics and KPIs

## Troubleshooting

### Common Issues
1. **Permission errors**: Verify IAM roles and policies
2. **Network connectivity**: Check security groups and VPC configuration
3. **Resource limits**: Verify Kubernetes resource quotas
4. **Service dependencies**: Check service startup order

### Debug Commands
```bash
# Check service status
kubectl get pods -n inopsio

# View service logs
kubectl logs -f deployment/auth-service -n inopsio

# Check service health
curl http://gateway.inopsio.local/health

# Verify database connectivity
kubectl exec -it postgres-0 -- psql -U inopsio_user -d inopsio_db
```

### Recovery Procedures
1. **Service failure**: Restart failed services
2. **Database issues**: Restore from backup
3. **Network problems**: Reconfigure networking
4. **Security breaches**: Apply incident response procedures

## Cleanup

### Environment Cleanup
```bash
# Clean up development environment
./cleanup.sh dev

# Clean up staging environment
./cleanup.sh staging

# Clean up production environment (with confirmation)
./cleanup.sh prod
```

### Cleanup Process
1. **Stop all services**
2. **Backup critical data**
3. **Remove Kubernetes resources**
4. **Destroy infrastructure**
5. **Clean up storage**

## Best Practices

### Security
- Use least-privilege access principles
- Encrypt all data at rest and in transit
- Regular security audits and updates
- Implement defense in depth

### Reliability
- Use health checks and circuit breakers
- Implement graceful degradation
- Plan for disaster recovery
- Monitor and alert on failures

### Performance
- Optimize resource allocation
- Use caching strategies
- Implement load balancing
- Monitor performance metrics

### Maintainability
- Use infrastructure as code
- Implement automated testing
- Document all procedures
- Regular backup and recovery testing
