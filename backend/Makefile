# Inopsio Backend Makefile
# Helper commands for development, testing, and deployment

.PHONY: help install dev test build start stop clean lint format docker-build docker-run docker-stop

# Default target
help:
	@echo "Inopsio Backend Development Commands"
	@echo "====================================="
	@echo "Development:"
	@echo "  make install     - Install dependencies"
	@echo "  make dev         - Start development server"
	@echo "  make start       - Start production server"
	@echo "  make stop        - Stop server"
	@echo ""
	@echo "Testing:"
	@echo "  make test        - Run all tests"
	@echo "  make test-unit   - Run unit tests"
	@echo "  make test-integration - Run integration tests"
	@echo "  make test-e2e    - Run E2E tests"
	@echo "  make test-coverage - Run tests with coverage"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint        - Run ESLint"
	@echo "  make format      - Format code with Prettier"
	@echo "  make type-check  - Run TypeScript type checking"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build - Build Docker image"
	@echo "  make docker-run   - Run Docker container"
	@echo "  make docker-stop  - Stop Docker container"
	@echo ""
	@echo "Database:"
	@echo "  make db-migrate   - Run database migrations"
	@echo "  make db-seed      - Seed database with test data"
	@echo "  make db-reset     - Reset database"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean        - Clean build artifacts"
	@echo "  make logs         - Show application logs"

# Development commands
install:
	@echo "Installing dependencies..."
	npm install
	@echo "Dependencies installed successfully!"

dev:
	@echo "Starting development server..."
	npm run dev

start:
	@echo "Starting production server..."
	npm start

stop:
	@echo "Stopping server..."
	pkill -f "node.*backend" || true

# Testing commands
test:
	@echo "Running all tests..."
	npm run test

test-unit:
	@echo "Running unit tests..."
	npm run test:unit

test-integration:
	@echo "Running integration tests..."
	npm run test:integration

test-e2e:
	@echo "Running E2E tests..."
	npm run test:e2e

test-coverage:
	@echo "Running tests with coverage..."
	npm run test:coverage

# Code quality commands
lint:
	@echo "Running ESLint..."
	npm run lint

format:
	@echo "Formatting code with Prettier..."
	npm run format

type-check:
	@echo "Running TypeScript type checking..."
	npm run type-check

# Docker commands
docker-build:
	@echo "Building Docker image..."
	docker build -t inopsio-backend:latest .

docker-run:
	@echo "Running Docker container..."
	docker run -d \
		--name inopsio-backend \
		-p 3001:3001 \
		--env-file .env \
		inopsio-backend:latest

docker-stop:
	@echo "Stopping Docker container..."
	docker stop inopsio-backend || true
	docker rm inopsio-backend || true

# Database commands
db-migrate:
	@echo "Running database migrations..."
	npm run db:migrate

db-seed:
	@echo "Seeding database with test data..."
	npm run db:seed

db-reset:
	@echo "Resetting database..."
	npm run db:reset

# Utility commands
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist/
	rm -rf node_modules/.cache/
	rm -rf coverage/
	rm -rf logs/*.log
	@echo "Clean completed!"

logs:
	@echo "Showing application logs..."
	tail -f logs/app.log

# Docker Compose commands
compose-up:
	@echo "Starting all services with Docker Compose..."
	docker-compose up -d

compose-down:
	@echo "Stopping all services..."
	docker-compose down

compose-logs:
	@echo "Showing Docker Compose logs..."
	docker-compose logs -f

compose-restart:
	@echo "Restarting all services..."
	docker-compose restart

# Health check
health:
	@echo "Checking application health..."
	curl -f http://localhost:3001/health || echo "Health check failed!"

# Development setup
setup: install
	@echo "Setting up development environment..."
	cp env.example .env
	@echo "Please update .env file with your configuration"
	@echo "Setup completed!"

# Production deployment
deploy:
	@echo "Deploying to production..."
	npm run build
	npm run start

# Security scan
security-scan:
	@echo "Running security scan..."
	npm audit
	@echo "Security scan completed!"

# Performance test
perf-test:
	@echo "Running performance tests..."
	npm run test:performance

# Generate documentation
docs:
	@echo "Generating API documentation..."
	npm run docs:generate
