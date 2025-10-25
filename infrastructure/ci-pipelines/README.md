# CI/CD Pipeline Templates

This directory contains reusable CI/CD pipeline templates for the Inopsio platform infrastructure and deployment automation.

## Pipeline Categories

### Infrastructure Pipelines
- **Terraform Pipeline**: Infrastructure provisioning and management
- **Kubernetes Pipeline**: Container orchestration and deployment
- **Monitoring Pipeline**: Observability and monitoring setup
- **Security Pipeline**: Security scanning and compliance

### Application Pipelines
- **Frontend Pipeline**: Next.js application build and deployment
- **Backend Pipeline**: Node.js API build and deployment
- **Database Pipeline**: Database migrations and updates
- **AI/ML Pipeline**: Machine learning model deployment

## Pipeline Templates

### Terraform Infrastructure Pipeline
```yaml
# terraform-pipeline.yml
name: Terraform Infrastructure Pipeline

on:
  push:
    branches: [ main ]
    paths: [ 'infrastructure/terraform/**' ]
  pull_request:
    branches: [ main ]
    paths: [ 'infrastructure/terraform/**' ]

jobs:
  terraform-plan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v2
      - name: Terraform Init
        run: terraform init
      - name: Terraform Plan
        run: terraform plan -out=tfplan
      - name: Upload Plan
        uses: actions/upload-artifact@v3
        with:
          name: terraform-plan
          path: tfplan

  terraform-apply:
    runs-on: ubuntu-latest
    needs: terraform-plan
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v2
      - name: Download Plan
        uses: actions/download-artifact@v3
        with:
          name: terraform-plan
      - name: Terraform Apply
        run: terraform apply tfplan
```

### Kubernetes Deployment Pipeline
```yaml
# kubernetes-pipeline.yml
name: Kubernetes Deployment Pipeline

on:
  push:
    branches: [ main ]
    paths: [ 'infrastructure/kubernetes/**' ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure kubectl
        uses: azure/setup-kubectl@v3
      - name: Deploy to Kubernetes
        run: |
          kubectl apply -f infrastructure/kubernetes/
          kubectl rollout status deployment/inopsio-backend
```

### Security Scanning Pipeline
```yaml
# security-pipeline.yml
name: Security Scanning Pipeline

on:
  schedule:
    - cron: '0 2 * * 1' # Weekly
  push:
    branches: [ main ]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Trivy
        uses: aquasecurity/trivy-action@master
      - name: Run Checkov
        run: checkov -d . --framework terraform
      - name: Run Snyk
        uses: snyk/actions/node@master
```

## Pipeline Configuration

### Environment Variables
```yaml
# pipeline-config.yml
environments:
  development:
    terraform_workspace: dev
    kubernetes_namespace: inopsio-dev
    aws_region: us-west-2
    
  staging:
    terraform_workspace: staging
    kubernetes_namespace: inopsio-staging
    aws_region: us-west-2
    
  production:
    terraform_workspace: prod
    kubernetes_namespace: inopsio-prod
    aws_region: us-west-2
```

### Pipeline Secrets
```yaml
# pipeline-secrets.yml
secrets:
  required:
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - TERRAFORM_BACKEND_BUCKET
    - KUBECONFIG_CONTENT
    
  optional:
    - SNYK_TOKEN
    - TRIVY_GITHUB_TOKEN
    - SLACK_WEBHOOK_URL
```

## Pipeline Best Practices

### Security
- **Secrets Management**: Use GitHub Secrets for sensitive data
- **Least Privilege**: Minimal required permissions
- **Audit Logging**: Comprehensive pipeline logging
- **Vulnerability Scanning**: Regular security scans

### Performance
- **Parallel Execution**: Run independent jobs in parallel
- **Caching**: Cache dependencies and build artifacts
- **Resource Optimization**: Efficient resource usage
- **Build Optimization**: Optimize build times

### Reliability
- **Error Handling**: Proper error handling and recovery
- **Rollback Procedures**: Automated rollback capabilities
- **Health Checks**: Post-deployment validation
- **Monitoring**: Pipeline monitoring and alerting

## Getting Started

1. **Copy Templates**: Copy relevant pipeline templates
2. **Customize**: Customize for your specific needs
3. **Configure Secrets**: Set up required secrets
4. **Test**: Test pipelines in development
5. **Deploy**: Deploy to production

For detailed pipeline procedures, see the individual pipeline files and configuration templates.
