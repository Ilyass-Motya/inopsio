# Inopsio Makefile
# Build automation and common tasks

.PHONY: help setup dev build test lint format clean install deps backup restore

# Default target
help: ## Show this help message
	@echo "Inopsio Development Commands"
	@echo "=========================="
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Setup and Installation
setup: ## Initial project setup
	@echo "🚀 Setting up Inopsio development environment..."
	@npm install
	@npm run install:all
	@docker-compose pull
	@echo "✅ Setup complete!"

install: ## Install all dependencies
	@echo "📦 Installing dependencies..."
	@npm install
	@npm run install:all

deps: install ## Alias for install

# Development
dev: ## Start development environment
	@echo "🔧 Starting development environment..."
	@docker-compose up -d postgres redis vault keycloak
	@echo "⏳ Waiting for services to be ready..."
	@sleep 10
	@docker-compose up -d
	@echo "✅ Development environment started!"
	@echo "🌐 Frontend: http://localhost:3000"
	@echo "🔗 API Gateway: http://localhost:8000"
	@echo "📊 Grafana: http://localhost:3001"
	@echo "🔐 Keycloak: http://localhost:8080"

dev-backend: ## Start only backend services
	@echo "🔧 Starting backend services..."
	@docker-compose up -d postgres redis vault keycloak
	@sleep 10
	@docker-compose up -d auth-service user-service ai-service crm-service erp-service email-service workflow-service gateway

dev-frontend: ## Start only frontend
	@echo "🔧 Starting frontend..."
	@docker-compose up -d frontend

# Building
build: ## Build all services
	@echo "🏗️  Building all services..."
	@npm run build

build-backend: ## Build backend services
	@echo "🏗️  Building backend services..."
	@docker-compose build auth-service user-service ai-service crm-service erp-service email-service workflow-service gateway

build-frontend: ## Build frontend
	@echo "🏗️  Building frontend..."
	@docker-compose build frontend

# Testing
test: ## Run all tests
	@echo "🧪 Running all tests..."
	@npm run test

test-unit: ## Run unit tests
	@echo "🧪 Running unit tests..."
	@npm run test:unit

test-integration: ## Run integration tests
	@echo "🧪 Running integration tests..."
	@npm run test:integration

test-e2e: ## Run end-to-end tests
	@echo "🧪 Running E2E tests..."
	@npm run test:e2e

test-coverage: ## Run tests with coverage
	@echo "🧪 Running tests with coverage..."
	@npm run test:coverage

# Code Quality
lint: ## Run linting
	@echo "🔍 Running linting..."
	@npm run lint

lint-fix: ## Fix linting issues
	@echo "🔧 Fixing linting issues..."
	@npm run lint:fix

format: ## Format code
	@echo "✨ Formatting code..."
	@npm run format

format-check: ## Check code formatting
	@echo "✨ Checking code formatting..."
	@npm run format:check

# Database Operations
db-migrate: ## Run database migrations
	@echo "🗄️  Running database migrations..."
	@docker-compose exec postgres psql -U inopsio -d inopsio -f /docker-entrypoint-initdb.d/init.sql

db-reset: ## Reset database
	@echo "🗄️  Resetting database..."
	@docker-compose down -v
	@docker-compose up -d postgres
	@sleep 5
	@make db-migrate

db-backup: ## Backup database
	@echo "💾 Backing up database..."
	@docker-compose exec postgres pg_dump -U inopsio inopsio > backup_$(shell date +%Y%m%d_%H%M%S).sql

db-restore: ## Restore database from backup
	@echo "💾 Restoring database..."
	@docker-compose exec -T postgres psql -U inopsio -d inopsio < backup_$(shell date +%Y%m%d_%H%M%S).sql

# Docker Operations
up: ## Start all services
	@echo "🐳 Starting all services..."
	@docker-compose up -d

down: ## Stop all services
	@echo "🐳 Stopping all services..."
	@docker-compose down

restart: ## Restart all services
	@echo "🔄 Restarting all services..."
	@docker-compose restart

logs: ## Show logs for all services
	@echo "📋 Showing logs..."
	@docker-compose logs -f

logs-backend: ## Show backend logs
	@echo "📋 Showing backend logs..."
	@docker-compose logs -f auth-service user-service ai-service crm-service erp-service email-service workflow-service gateway

logs-frontend: ## Show frontend logs
	@echo "📋 Showing frontend logs..."
	@docker-compose logs -f frontend

# Security and Compliance
security-scan: ## Run security scans
	@echo "🔒 Running security scans..."
	@docker-compose run --rm security-scanner

compliance-check: ## Run compliance checks
	@echo "📋 Running compliance checks..."
	@./infrastructure/scripts/compliance-check/run-compliance-check.sh

# Monitoring
monitor: ## Start monitoring services
	@echo "📊 Starting monitoring services..."
	@docker-compose up -d prometheus grafana

monitor-logs: ## Show monitoring logs
	@echo "📋 Showing monitoring logs..."
	@docker-compose logs -f prometheus grafana

# Cleanup
clean: ## Clean up development environment
	@echo "🧹 Cleaning up..."
	@docker-compose down -v
	@docker system prune -f
	@rm -rf node_modules
	@rm -rf frontend/node_modules
	@rm -rf backend/node_modules
	@rm -rf .next
	@rm -rf coverage
	@rm -rf logs/*.log

clean-docker: ## Clean up Docker resources
	@echo "🧹 Cleaning up Docker resources..."
	@docker-compose down -v --remove-orphans
	@docker system prune -f
	@docker volume prune -f

# Backup and Restore
backup: ## Create full backup
	@echo "💾 Creating full backup..."
	@mkdir -p backups
	@docker-compose exec postgres pg_dump -U inopsio inopsio > backups/db_backup_$(shell date +%Y%m%d_%H%M%S).sql
	@tar -czf backups/full_backup_$(shell date +%Y%m%d_%H%M%S).tar.gz .

restore: ## Restore from backup
	@echo "💾 Restoring from backup..."
	@echo "Please specify backup file: make restore BACKUP_FILE=backups/full_backup_YYYYMMDD_HHMMSS.tar.gz"

# Health Checks
health: ## Check service health
	@echo "🏥 Checking service health..."
	@docker-compose ps
	@echo "🔍 Checking database connection..."
	@docker-compose exec postgres pg_isready -U inopsio -d inopsio
	@echo "🔍 Checking Redis connection..."
	@docker-compose exec redis redis-cli ping
	@echo "🔍 Checking Vault connection..."
	@docker-compose exec vault vault status

# Development Utilities
shell-backend: ## Open shell in backend container
	@echo "🐚 Opening backend shell..."
	@docker-compose exec gateway /bin/bash

shell-db: ## Open database shell
	@echo "🐚 Opening database shell..."
	@docker-compose exec postgres psql -U inopsio -d inopsio

shell-redis: ## Open Redis shell
	@echo "🐚 Opening Redis shell..."
	@docker-compose exec redis redis-cli

# Production
prod-build: ## Build for production
	@echo "🏗️  Building for production..."
	@docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

prod-up: ## Start production environment
	@echo "🚀 Starting production environment..."
	@docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Documentation
docs: ## Generate documentation
	@echo "📚 Generating documentation..."
	@npm run docs

docs-serve: ## Serve documentation locally
	@echo "📚 Serving documentation..."
	@npm run docs:serve

# Environment Management
env-check: ## Check environment variables
	@echo "🔍 Checking environment variables..."
	@echo "Required environment variables:"
	@echo "- POSTGRES_PASSWORD"
	@echo "- VAULT_ROOT_TOKEN"
	@echo "- KEYCLOAK_ADMIN"
	@echo "- KEYCLOAK_PASSWORD"
	@echo "- GRAFANA_PASSWORD"
	@echo "- SMTP_HOST (optional)"
	@echo "- SMTP_PORT (optional)"
	@echo "- SMTP_USER (optional)"
	@echo "- SMTP_PASSWORD (optional)"

# Quick Commands
quick-start: setup dev ## Quick start for new developers
	@echo "🚀 Quick start complete!"

quick-test: test lint format-check ## Quick test suite
	@echo "✅ Quick test complete!"

# Default target
.DEFAULT_GOAL := help
