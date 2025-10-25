# Infrastructure Bootstrap Guide

Quick first-time setup guide for DevOps team to get the Inopsio infrastructure running.

## Prerequisites

- **Cloud Provider Access**: AWS/Azure/GCP account with appropriate permissions
- **Terraform**: v1.0+ installed locally
- **kubectl**: Kubernetes CLI configured
- **Docker**: For local development and testing
- **Git**: For repository access

## Quick Start (5 Minutes)

### 1. Clone and Setup
```bash
git clone https://github.com/inopsio/inopsio.git
cd inopsio/infrastructure
cp terraform/envs/dev/terraform.tfvars.example terraform/envs/dev/terraform.tfvars
```

### 2. Configure Environment
```bash
# Edit terraform.tfvars with your values
vim terraform/envs/dev/terraform.tfvars
```

### 3. Initialize Infrastructure
```bash
cd terraform/envs/dev
terraform init
terraform plan
terraform apply
```

### 4. Configure Kubernetes
```bash
# Get kubeconfig
aws eks update-kubeconfig --region us-west-2 --name inopsio-dev

# Deploy applications
kubectl apply -f kubernetes/base/
kubectl apply -f kubernetes/overlays/dev/
```

### 5. Verify Deployment
```bash
kubectl get pods -A
kubectl get services
```

## Environment-Specific Setup

### Development Environment
- **Purpose**: Local development and testing
- **Resources**: Minimal resources for cost efficiency
- **Access**: Open access for development team
- **Monitoring**: Basic monitoring and logging

### Staging Environment
- **Purpose**: Pre-production testing and validation
- **Resources**: Production-like resources for accurate testing
- **Access**: Restricted access with approval gates
- **Monitoring**: Full monitoring and alerting

### Production Environment
- **Purpose**: Live production environment
- **Resources**: High availability and performance
- **Access**: Highly restricted with multi-factor authentication
- **Monitoring**: Comprehensive monitoring and alerting

## Common Issues and Solutions

### Terraform State Issues
```bash
# If state is locked
terraform force-unlock <lock-id>

# If state is corrupted
terraform refresh
```

### Kubernetes Connection Issues
```bash
# Check kubectl configuration
kubectl config current-context

# Reset kubectl configuration
kubectl config use-context <context-name>
```

### Resource Quota Issues
```bash
# Check resource quotas
kubectl describe quota

# Increase resource limits
kubectl edit quota <quota-name>
```

## Next Steps

1. **Review Documentation**: Read the full infrastructure documentation
2. **Configure Monitoring**: Set up monitoring and alerting
3. **Security Review**: Review security configurations
4. **Team Training**: Train team on infrastructure management
5. **Documentation**: Update documentation with environment-specific notes

For detailed setup procedures, see the individual infrastructure documentation files.
