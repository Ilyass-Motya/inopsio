# Bootstrap Scripts

This directory contains scripts for quick environment provisioning, development setup, and automated environment initialization.

## Bootstrap Categories

### Environment Provisioning
- **Local Development**: Local development environment setup
- **Docker Environment**: Containerized development setup
- **Cloud Environment**: Cloud infrastructure provisioning
- **CI/CD Environment**: Continuous integration environment setup

### Dependency Management
- **Tool Installation**: Required development tools
- **Package Management**: Dependency installation and updates
- **Configuration Setup**: Environment configuration
- **Service Dependencies**: External service setup

### Development Setup
- **Project Initialization**: New project setup
- **Database Setup**: Database initialization and seeding
- **Service Configuration**: Service configuration and setup
- **Testing Environment**: Test environment preparation

## Environment Provisioning Scripts

### Local Development Setup
```bash
#!/bin/bash
# setup-local-dev.sh - Local development environment setup

# Check prerequisites
echo "Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo "Node.js is required"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "Docker is required"; exit 1; }
command -v git >/dev/null 2>&1 || { echo "Git is required"; exit 1; }

# Install dependencies
echo "Installing dependencies..."
npm install
cd frontend && npm install
cd ../backend && npm install

# Setup environment variables
echo "Setting up environment variables..."
cp .env.example .env.local
cp .secrets.env.example .secrets.env

# Start services
echo "Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 30

# Run database migrations
echo "Running database migrations..."
npm run db:migrate

# Seed database
echo "Seeding database..."
npm run db:seed

echo "Local development environment setup complete!"
```

### Docker Environment Setup
```bash
#!/bin/bash
# setup-docker.sh - Docker environment setup

# Build Docker images
echo "Building Docker images..."
docker-compose build

# Start all services
echo "Starting services..."
docker-compose up -d

# Wait for services
echo "Waiting for services..."
docker-compose exec -T postgres pg_isready -U postgres
docker-compose exec -T redis redis-cli ping

# Run migrations
echo "Running migrations..."
docker-compose exec -T backend npm run db:migrate

# Run tests
echo "Running tests..."
docker-compose exec -T backend npm test
docker-compose exec -T frontend npm test

echo "Docker environment setup complete!"
```

### Cloud Environment Setup
```bash
#!/bin/bash
# setup-cloud.sh - Cloud environment setup

# Check cloud provider
echo "Checking cloud provider..."
if [ "$CLOUD_PROVIDER" = "aws" ]; then
    echo "Setting up AWS environment..."
    ./scripts/aws/setup-aws.sh
elif [ "$CLOUD_PROVIDER" = "azure" ]; then
    echo "Setting up Azure environment..."
    ./scripts/azure/setup-azure.sh
elif [ "$CLOUD_PROVIDER" = "gcp" ]; then
    echo "Setting up GCP environment..."
    ./scripts/gcp/setup-gcp.sh
fi

# Initialize Terraform
echo "Initializing Terraform..."
cd infrastructure/terraform
terraform init

# Plan infrastructure
echo "Planning infrastructure..."
terraform plan -out=tfplan

# Apply infrastructure
echo "Applying infrastructure..."
terraform apply tfplan

# Configure Kubernetes
echo "Configuring Kubernetes..."
kubectl apply -f infrastructure/kubernetes/

echo "Cloud environment setup complete!"
```

## Dependency Management Scripts

### Tool Installation
```bash
#!/bin/bash
# install-tools.sh - Install required development tools

# Node.js and npm
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Docker
echo "Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Kubernetes tools
echo "Installing Kubernetes tools..."
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Helm
echo "Installing Helm..."
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Terraform
echo "Installing Terraform..."
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

echo "Tool installation complete!"
```

### Package Management
```bash
#!/bin/bash
# install-packages.sh - Package installation and updates

# Update system packages
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install development packages
echo "Installing development packages..."
sudo apt install -y \
    build-essential \
    git \
    curl \
    wget \
    vim \
    htop \
    tree \
    jq \
    unzip

# Install Node.js packages
echo "Installing Node.js packages..."
npm install -g \
    @angular/cli \
    @vue/cli \
    create-react-app \
    typescript \
    eslint \
    prettier

# Install Python packages
echo "Installing Python packages..."
pip install \
    requests \
    flask \
    django \
    pytest \
    black \
    flake8

echo "Package installation complete!"
```

## Development Setup Scripts

### Project Initialization
```bash
#!/bin/bash
# init-project.sh - Initialize new project

# Create project structure
echo "Creating project structure..."
mkdir -p {frontend,backend,infrastructure,docs,scripts,security}

# Initialize Git repository
echo "Initializing Git repository..."
git init
git add .
git commit -m "Initial commit"

# Setup package.json
echo "Setting up package.json..."
npm init -y

# Install dependencies
echo "Installing dependencies..."
npm install --save-dev \
    typescript \
    @types/node \
    eslint \
    prettier \
    husky \
    lint-staged

# Setup Git hooks
echo "Setting up Git hooks..."
npx husky install
npx husky add .husky/pre-commit "npm run lint-staged"

# Create configuration files
echo "Creating configuration files..."
cat > .eslintrc.json << EOF
{
  "extends": ["@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error"
  }
}
EOF

cat > .prettierrc << EOF
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80
}
EOF

echo "Project initialization complete!"
```

### Database Setup
```bash
#!/bin/bash
# setup-database.sh - Database setup and initialization

# Start database services
echo "Starting database services..."
docker-compose up -d postgres redis

# Wait for database
echo "Waiting for database..."
sleep 10

# Create databases
echo "Creating databases..."
docker-compose exec -T postgres psql -U postgres -c "CREATE DATABASE inopsio_dev;"
docker-compose exec -T postgres psql -U postgres -c "CREATE DATABASE inopsio_test;"

# Run migrations
echo "Running migrations..."
npm run db:migrate

# Seed database
echo "Seeding database..."
npm run db:seed

# Verify setup
echo "Verifying database setup..."
docker-compose exec -T postgres psql -U postgres -c "\l"

echo "Database setup complete!"
```

### Service Configuration
```bash
#!/bin/bash
# setup-services.sh - Service configuration and setup

# Configure environment variables
echo "Configuring environment variables..."
cp .env.example .env.local

# Update configuration files
echo "Updating configuration files..."
sed -i 's/localhost:3000/localhost:3000/g' frontend/.env.local
sed -i 's/localhost:8000/localhost:8000/g' backend/.env.local

# Start services
echo "Starting services..."
docker-compose up -d

# Wait for services
echo "Waiting for services..."
sleep 30

# Health check
echo "Performing health check..."
curl -f http://localhost:3000/health || echo "Frontend health check failed"
curl -f http://localhost:8000/health || echo "Backend health check failed"

# Run tests
echo "Running tests..."
npm test

echo "Service configuration complete!"
```

## Testing Environment Setup

### Test Environment Preparation
```bash
#!/bin/bash
# setup-test-env.sh - Test environment setup

# Create test database
echo "Creating test database..."
docker-compose exec -T postgres psql -U postgres -c "CREATE DATABASE inopsio_test;"

# Run test migrations
echo "Running test migrations..."
NODE_ENV=test npm run db:migrate

# Seed test data
echo "Seeding test data..."
NODE_ENV=test npm run db:seed

# Run tests
echo "Running tests..."
npm run test:unit
npm run test:integration
npm run test:e2e

# Generate coverage report
echo "Generating coverage report..."
npm run test:coverage

echo "Test environment setup complete!"
```

## Automation Scripts

### CI/CD Setup
```bash
#!/bin/bash
# setup-cicd.sh - CI/CD environment setup

# Setup GitHub Actions
echo "Setting up GitHub Actions..."
mkdir -p .github/workflows

# Create CI workflow
cat > .github/workflows/ci.yml << EOF
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run lint
      - run: npm run build
EOF

# Setup Docker registry
echo "Setting up Docker registry..."
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

# Build and push images
echo "Building and pushing images..."
docker build -t inopsio/frontend:latest frontend/
docker build -t inopsio/backend:latest backend/
docker push inopsio/frontend:latest
docker push inopsio/backend:latest

echo "CI/CD setup complete!"
```

## Best Practices

### Script Design
- **Error Handling**: Proper error handling and exit codes
- **Logging**: Comprehensive logging and output
- **Validation**: Input validation and prerequisites
- **Documentation**: Clear script documentation

### Automation
- **Idempotency**: Scripts should be idempotent
- **Rollback**: Ability to rollback changes
- **Monitoring**: Script execution monitoring
- **Testing**: Script testing and validation

## Getting Started

1. **Choose Environment**: Select appropriate bootstrap script
2. **Check Prerequisites**: Verify required tools and dependencies
3. **Run Script**: Execute bootstrap script for your environment
4. **Verify Setup**: Validate environment setup
5. **Start Development**: Begin development work

For detailed bootstrap procedures, see the individual script documentation and examples.
