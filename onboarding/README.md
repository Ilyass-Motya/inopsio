# Inopsio Development Environment Setup

## Overview

This guide will help you set up your development environment for the Inopsio platform.

## Prerequisites

### **Required Software**
- **Node.js**: Version 18+ (recommended: 20.x)
- **npm**: Version 9+ (comes with Node.js)
- **Docker**: Version 20+ with Docker Compose
- **Git**: Version 2.30+
- **VS Code**: Latest version with recommended extensions

### **Recommended Extensions**
- **ES7+ React/Redux/React-Native snippets**
- **TypeScript Importer**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **ESLint**
- **GitLens**
- **Thunder Client** (API testing)
- **Docker**

## Quick Start

### **1. Clone Repository**
```bash
git clone https://github.com/inopsio/inopsio.git
cd inopsio
```

### **2. Install Dependencies**
```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### **3. Environment Setup**
```bash
# Copy environment files
cp env.example .env.local
cp frontend/env.example frontend/.env.local
cp backend/env.example backend/.env.local

# Update environment variables
# Edit .env.local files with your configuration
```

### **4. Start Development Environment**
```bash
# Start all services with Docker
make dev

# Or start individual services
make dev-frontend
make dev-backend
```

### **5. Verify Installation**
```bash
# Check all services are running
make health

# Run tests
make test

# Check code quality
make lint
```

## Detailed Setup

### **Frontend Development**

#### **Marketing Website**
```bash
cd frontend/apps/marketing
npm run dev
# Access at http://localhost:3000
```

#### **Admin Dashboard**
```bash
cd frontend/apps/admin-dashboard
npm run dev
# Access at http://localhost:3003
```

#### **Platform Dashboard**
```bash
cd frontend/apps/platform
npm run dev
# Access at http://localhost:3001
```

#### **InoSec Platform**
```bash
cd frontend/apps/inosec
npm run dev
# Access at http://localhost:3002
```

### **Backend Development**

#### **NestJS Services**
```bash
cd backend
npm run dev
# Services will start on ports 3001-3010
```

#### **FastAPI Services**
```bash
cd backend/ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

cd backend/inosec-core-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8001

cd backend/inosec-edge-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8002
```

### **Database Setup**

#### **PostgreSQL**
```bash
# Start PostgreSQL with Docker
docker-compose up postgres -d

# Run migrations
make db-migrate

# Seed database
make db-seed
```

#### **Redis**
```bash
# Start Redis with Docker
docker-compose up redis -d
```

### **Monitoring Setup**

#### **Prometheus & Grafana**
```bash
# Start monitoring stack
docker-compose up prometheus grafana -d

# Access Grafana at http://localhost:3001
# Default credentials: admin/admin
```

## Development Workflow

### **Daily Development**
```bash
# Start development environment
make dev

# Run tests
make test

# Check code quality
make lint

# Format code
make format
```

### **Feature Development**
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push and create PR
git push origin feature/your-feature-name
```

### **Testing**
```bash
# Run all tests
make test

# Run specific test suites
make test-frontend
make test-backend
make test-e2e

# Run tests with coverage
make test-coverage
```

### **Code Quality**
```bash
# Lint all code
make lint

# Fix linting issues
make lint:fix

# Format code
make format

# Type check
make type-check
```

## Project Structure

### **Frontend Structure**
```
frontend/
├── packages/           # Shared packages
│   ├── ui/            # @inopsio/ui
│   ├── auth/          # @inopsio/auth
│   ├── api/           # @inopsio/api
│   └── utils/         # @inopsio/utils
├── apps/              # Applications
│   ├── marketing/     # Next.js 14
│   ├── admin-dashboard/ # React (Vite)
│   ├── platform/      # Next.js 14
│   ├── inosec/        # Next.js 14
│   └── mobile/        # React Native
├── config/            # Configuration
├── devtools/          # Development tools
└── playwright/        # E2E tests
```

### **Backend Structure**
```
backend/
├── auth-service/      # NestJS
├── user-service/      # NestJS
├── crm-service/       # NestJS
├── erp-service/       # NestJS
├── email-service/     # NestJS
├── workflow-service/  # NestJS
├── ai-service/        # FastAPI
├── inosec-core-service/ # FastAPI
├── inosec-edge-service/ # FastAPI
├── monitoring-service/ # NestJS
├── gateway/           # NestJS
├── libs/              # Shared libraries
├── observability/     # Monitoring
└── test-suite/        # Shared tests
```

## Common Commands

### **Development**
```bash
make dev              # Start all services
make dev-frontend     # Start frontend services
make dev-backend      # Start backend services
make dev-db           # Start database services
```

### **Building**
```bash
make build            # Build all services
make build-frontend   # Build frontend
make build-backend    # Build backend
```

### **Testing**
```bash
make test             # Run all tests
make test-unit        # Run unit tests
make test-integration # Run integration tests
make test-e2e         # Run E2E tests
```

### **Code Quality**
```bash
make lint             # Lint all code
make lint:fix         # Fix linting issues
make format           # Format code
make type-check       # Type check
```

### **Database**
```bash
make db-migrate       # Run migrations
make db-seed          # Seed database
make db-reset         # Reset database
make db-backup        # Backup database
```

### **Docker**
```bash
make up               # Start Docker services
make down             # Stop Docker services
make restart          # Restart Docker services
make logs             # View Docker logs
```

### **Monitoring**
```bash
make health           # Check service health
make monitor          # Start monitoring
make logs             # View logs
```

## Troubleshooting

### **Common Issues**

#### **Port Conflicts**
```bash
# Check what's using a port
lsof -i :3000

# Kill process using port
kill -9 <PID>
```

#### **Docker Issues**
```bash
# Clean Docker
docker system prune -a

# Rebuild containers
docker-compose build --no-cache
```

#### **Node Modules Issues**
```bash
# Clean node_modules
rm -rf node_modules package-lock.json
npm install

# Clean all workspace node_modules
make clean
npm run install:all
```

#### **Database Issues**
```bash
# Reset database
make db-reset

# Check database connection
make db-health
```

### **Getting Help**

#### **Documentation**
- **Architecture**: `docs/architecture/`
- **API Documentation**: `docs/api-specs/`
- **Development Guide**: `docs/dev/`

#### **Support Channels**
- **Slack**: #dev-help
- **Email**: dev-support@inopsio.com
- **Issues**: GitHub Issues

#### **Team Contacts**
- **Frontend Lead**: frontend-lead@inopsio.com
- **Backend Lead**: backend-lead@inopsio.com
- **DevOps Lead**: devops-lead@inopsio.com

## Next Steps

### **After Setup**
1. **Read Documentation**: Review architecture and development guides
2. **Explore Codebase**: Familiarize yourself with the project structure
3. **Run Tests**: Ensure all tests are passing
4. **Start Coding**: Pick up a task and start contributing

### **Learning Resources**
- **React**: https://react.dev/
- **Next.js**: https://nextjs.org/docs
- **NestJS**: https://docs.nestjs.com/
- **FastAPI**: https://fastapi.tiangolo.com/
- **Tailwind CSS**: https://tailwindcss.com/docs

### **Development Practices**
- **Git Flow**: Follow conventional commits
- **Code Review**: All changes require review
- **Testing**: Write tests for new features
- **Documentation**: Update docs for changes
- **Security**: Follow security best practices

Welcome to the Inopsio development team! 🚀
