# Terraform Infrastructure as Code

This directory contains Terraform configurations for managing Inopsio's cloud infrastructure across multiple environments.

## Directory Structure

```
terraform/
├── backend.tf              # Remote state backend configuration
├── modules/                 # Reusable Terraform modules
├── envs/                   # Environment-specific configurations
├── networking/             # Network infrastructure
├── state/                  # State management utilities
└── README.md              # This file
```

## Remote State Configuration

### Backend Configuration (`backend.tf`)

The remote state backend is configured to use AWS S3 with DynamoDB for state locking:

```hcl
terraform {
  backend "s3" {
    bucket         = "inopsio-terraform-state"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "inopsio-terraform-locks"
    
    # Environment-specific state files
    workspace_key_prefix = "envs/"
  }
}
```

### State Management

#### State File Organization
- **Global State**: `infrastructure/terraform.tfstate`
- **Environment States**: `envs/{environment}/terraform.tfstate`
- **Module States**: `modules/{module-name}/terraform.tfstate`

#### State Access Roles

| Role | Permissions | Purpose |
|------|-------------|---------|
| `terraform-admin` | Full S3 and DynamoDB access | Infrastructure management |
| `terraform-reader` | S3 read-only access | State inspection |
| `terraform-lock` | DynamoDB lock table access | State locking |

#### State Security
- All state files are encrypted at rest using S3 server-side encryption
- State locking prevents concurrent modifications
- Access logging enabled for audit trails
- State files are versioned for rollback capability

### Environment Configuration

#### Development Environment
```bash
# Initialize development workspace
terraform workspace new dev
terraform init -backend-config=envs/dev/backend.conf

# Apply development configuration
terraform plan -var-file=envs/dev/terraform.tfvars
terraform apply -var-file=envs/dev/terraform.tfvars
```

#### Staging Environment
```bash
# Initialize staging workspace
terraform workspace new staging
terraform init -backend-config=envs/staging/backend.conf

# Apply staging configuration
terraform plan -var-file=envs/staging/terraform.tfvars
terraform apply -var-file=envs/staging/terraform.tfvars
```

#### Production Environment
```bash
# Initialize production workspace
terraform workspace new prod
terraform init -backend-config=envs/prod/backend.conf

# Apply production configuration (requires approval)
terraform plan -var-file=envs/prod/terraform.tfvars
terraform apply -var-file=envs/prod/terraform.tfvars
```

## Module Structure

### Core Modules
- **networking/**: VPC, subnets, security groups, load balancers
- **compute/**: ECS clusters, EC2 instances, auto-scaling groups
- **database/**: RDS instances, ElastiCache clusters
- **security/**: IAM roles, policies, KMS keys
- **monitoring/**: CloudWatch, Prometheus, Grafana
- **storage/**: S3 buckets, EFS file systems

### Module Usage Example
```hcl
module "networking" {
  source = "./modules/networking"
  
  environment = var.environment
  vpc_cidr    = var.vpc_cidr
  azs         = var.availability_zones
  
  tags = {
    Environment = var.environment
    Project     = "inopsio"
    ManagedBy   = "terraform"
  }
}
```

## Environment Variables

### Required Variables
```bash
# AWS Configuration
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_DEFAULT_REGION="us-east-1"

# Terraform Backend
export TF_VAR_terraform_state_bucket="inopsio-terraform-state"
export TF_VAR_terraform_lock_table="inopsio-terraform-locks"
```

### Environment-Specific Variables
```bash
# Development
export TF_VAR_environment="dev"
export TF_VAR_instance_type="t3.medium"
export TF_VAR_database_instance_class="db.t3.micro"

# Production
export TF_VAR_environment="prod"
export TF_VAR_instance_type="t3.large"
export TF_VAR_database_instance_class="db.r5.large"
```

## Deployment Workflow

### 1. Infrastructure Planning
```bash
# Validate configuration
terraform validate

# Format code
terraform fmt -recursive

# Plan changes
terraform plan -out=tfplan
```

### 2. State Management
```bash
# List workspaces
terraform workspace list

# Switch workspace
terraform workspace select dev

# Show current state
terraform show
```

### 3. Deployment Execution
```bash
# Apply changes
terraform apply tfplan

# Destroy resources (with caution)
terraform destroy
```

### 4. State Operations
```bash
# Import existing resources
terraform import aws_instance.example i-1234567890abcdef0

# Move resources
terraform state mv aws_instance.old aws_instance.new

# Remove from state
terraform state rm aws_instance.example
```

## Security Best Practices

### State Security
- State files are stored in encrypted S3 buckets
- Access is restricted through IAM policies
- All state operations are logged
- State files are versioned for audit trails

### Resource Security
- All resources are tagged for cost tracking
- Security groups follow least-privilege principle
- IAM roles use minimal required permissions
- Secrets are managed through AWS Secrets Manager

### Access Control
- Terraform state access is restricted to authorized personnel
- Multi-factor authentication required for production changes
- All changes require peer review and approval
- Automated security scanning in CI/CD pipeline

## Monitoring and Alerting

### Infrastructure Monitoring
- CloudWatch metrics for all resources
- Cost monitoring and alerting
- Security compliance monitoring
- Performance and availability tracking

### State Monitoring
- State file access logging
- Unauthorized access attempts
- State drift detection
- Resource compliance monitoring

## Troubleshooting

### Common Issues
1. **State lock conflicts**: Check DynamoDB for active locks
2. **Permission errors**: Verify IAM roles and policies
3. **Resource conflicts**: Check for existing resources
4. **Network issues**: Verify VPC and security group configurations

### Recovery Procedures
1. **State corruption**: Restore from S3 versioning
2. **Resource deletion**: Use `terraform import` to restore
3. **Configuration drift**: Run `terraform plan` to identify changes
4. **Lock issues**: Manually remove locks from DynamoDB

## Contributing

### Development Workflow
1. Create feature branch
2. Make infrastructure changes
3. Test in development environment
4. Submit pull request for review
5. Deploy to staging for validation
6. Deploy to production after approval

### Code Standards
- Use consistent naming conventions
- Document all modules and resources
- Include validation rules
- Follow security best practices
- Maintain backward compatibility
