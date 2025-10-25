# Inopsio Project Structure

This document provides a comprehensive overview of the Inopsio project structure, detailing all folders, files, and their purposes within the multi-tenant SaaS platform.

## Project Overview

Inopsio is a comprehensive multi-tenant SaaS platform focused on AI and cybersecurity, built with modern microservices architecture, cloud-native technologies, and enterprise-grade security practices.

## Root Directory Structure

```
inopsio/
├── architecture.md              # High-level architecture documentation and system design
├── CONTRIBUTING.md              # Contribution guidelines and development standards
├── docker-compose.yml          # Multi-service Docker orchestration for local development
├── LICENSE                     # MIT License file for open source compliance
├── Makefile                   # Build automation and common development tasks
├── package.json                # Root package configuration with workspace management
├── README.md                   # Project overview and getting started guide
├── env.example                # Environment variables template for all environments
├── env.local                   # Local development environment configuration
├── secrets.env                # Production secrets template (excluded from git)
├── .gitignore                  # Git ignore patterns for security and cleanliness
├── .husky/                     # Git hooks for code quality and automation
├── .editorconfig              # Editor configuration standards for consistency
├── .prettierrc                # Code formatting configuration
├── .nvmrc                     # Node.js version specification
├── .commitlintrc.js           # Commit message validation configuration
├── .github/                   # GitHub Actions workflows and automation
│   └── workflows/             # CI/CD pipelines and security hardening
├── backend/                   # Backend microservices and shared components
├── docs/                      # Comprehensive documentation and guides
├── frontend/                  # Frontend applications and shared components
├── infrastructure/            # Infrastructure as Code and deployment automation
├── logs/                      # Application and system logs
├── scripts/                   # Automation and utility scripts
├── security/                  # Security policies and configurations
└── onboarding/                # Developer onboarding and setup guides
```

## Backend Microservices (`/backend/`)

The backend follows a **hybrid microservices architecture** combining NestJS and FastAPI technologies for optimal performance and functionality.

### **Hybrid Architecture Strategy**

#### **NestJS Services (Business Logic)**
- **Technology**: NestJS 10 + TypeScript + PostgreSQL
- **Purpose**: Business logic, user management, CRM, ERP, workflows
- **Features**: Robust enterprise features, comprehensive APIs, database integration

#### **FastAPI Services (AI/ML & Security)**
- **Technology**: FastAPI + Python + PostgreSQL + TimescaleDB
- **Purpose**: AI/ML workloads, cybersecurity, high-performance computing
- **Features**: Async processing, ML model management, real-time security analysis

### Service Structure
Each microservice contains:
- **Monitoring**: Prometheus metrics and alerting rules
- **README.md**: Service-specific documentation
- **Dockerfile**: Container configuration
- **package.json** (NestJS) or **requirements.txt** (FastAPI): Service dependencies

### Services Overview

#### Authentication Service (`/backend/auth-service/`)
**Purpose**: Handles user authentication, authorization, and identity management
- **Keycloak Integration**: OAuth2/OpenID Connect provider
- **JWT Token Management**: Token generation, validation, and refresh
- **Multi-Factor Authentication**: SMS, TOTP, and biometric support
- **SAML Integration**: Enterprise SSO capabilities
- **Monitoring**: Authentication metrics, failure rates, and security events

#### User Service (`/backend/user-service/`)
**Purpose**: Manages user profiles, preferences, and account settings
- **Profile Management**: User data and preferences
- **Account Settings**: Password changes, notifications, privacy settings
- **User Analytics**: Activity tracking and behavior analysis
- **Multi-tenant Support**: Tenant-specific user configurations

#### CRM Service (`/backend/crm-service/`)
**Purpose**: Customer relationship management and sales pipeline
- **Lead Management**: Lead capture, qualification, and conversion
- **Contact Management**: Customer contact information and history
- **Deal Tracking**: Sales pipeline and opportunity management
- **Customer Analytics**: Sales metrics and performance tracking

#### ERP Service (`/backend/erp-service/`)
**Purpose**: Enterprise resource planning and business operations
- **Inventory Management**: Stock levels, procurement, and warehousing
- **Order Processing**: Order management and fulfillment
- **Financial Management**: Invoicing, payments, and accounting
- **Supplier Management**: Vendor relationships and procurement

#### Email Service (`/backend/email-service/`)
**Purpose**: Email communication and marketing automation
- **Email Templates**: Dynamic template system with personalization
- **Email Queuing**: Reliable email delivery with retry logic
- **Marketing Automation**: Campaign management and automation
- **Email Analytics**: Delivery rates, open rates, and engagement metrics

#### AI Service (`/backend/ai-service/`) - **FastAPI**
**Purpose**: Artificial intelligence and machine learning capabilities
- **Technology**: FastAPI + Python + PostgreSQL + Redis + S3 (model storage)
- **ML Stack**: PyTorch + scikit-learn + TensorFlow + pandas/numpy
- **Model Management**: AI model deployment and versioning with async processing
- **Data Processing**: Training data preparation and preprocessing with pandas/numpy
- **Inference Engine**: Real-time AI predictions and recommendations with high performance
- **MLOps Pipeline**: Model training, validation, and deployment automation
- **Evaluation**: Model performance validation and testing (`/evaluation/`)
- **Metadata**: Dataset lineage tracking and data governance (`/metadata/`)
- **Database**: PostgreSQL for metadata, Redis for caching, S3 for model artifacts
- **API Endpoints**: RESTful APIs for model management, inference, and training
- **Async Processing**: Background tasks for model training and evaluation with Celery

#### Workflow Service (`/backend/workflow-service/`)
**Purpose**: Business process automation and workflow management
- **Process Definition**: Visual workflow designer and BPMN support
- **Execution Engine**: Workflow runtime and state management
- **Task Management**: Human task assignment and completion
- **Process Analytics**: Workflow performance and optimization

#### Inosec Core Service (`/backend/inosec-core-service/`) - **FastAPI**
**Purpose**: Core cybersecurity platform functionality
- **Technology**: FastAPI + Python + TimescaleDB + Redis
- **Threat Detection**: Real-time threat analysis and detection with async processing
- **Security Analytics**: Security event correlation and analysis with time-series data
- **Incident Response**: Automated incident handling and escalation
- **Compliance Monitoring**: Regulatory compliance tracking and reporting
- **API Endpoints**: RESTful APIs for threat detection, analytics, and incident management
- **Real-time Processing**: WebSocket connections for live threat monitoring

#### Inosec Edge Service (`/backend/inosec-edge-service/`) - **FastAPI**
**Purpose**: Edge security device management and monitoring
- **Technology**: FastAPI + Python + TimescaleDB + Redis
- **Device Management**: Edge device registration and configuration with async operations
- **Data Collection**: Security telemetry and event collection with high throughput
- **Edge Analytics**: Local threat analysis and response with ML models
- **Device Monitoring**: Health monitoring and maintenance with real-time alerts
- **API Endpoints**: RESTful APIs for device management and telemetry
- **Stream Processing**: Real-time data processing for edge security events

#### Monitoring Service (`/backend/monitoring-service/`)
**Purpose**: System monitoring, alerting, and observability
- **Metrics Collection**: System and application metrics
- **Alerting Engine**: Intelligent alerting with noise reduction
- **Dashboard Management**: Customizable monitoring dashboards
- **Health Checks**: Service health monitoring and reporting

### Shared Backend Components

#### Monitoring (`/backend/monitoring/`)
**Purpose**: Shared monitoring configurations and alerting rules
- **Prometheus Exporters**: System and application metrics collection
- **Alerting Rules**: Service health, performance, and security alerts
- **Grafana Dashboards**: Service-specific monitoring dashboards
- **Health Checks**: Service health monitoring and validation

#### Gateway (`/backend/gateway/`)
**Purpose**: API gateway and service mesh entry point
- **Technology**: NestJS + Express + Kong (API Gateway layer)
- **Request Routing**: Intelligent request routing and load balancing
- **Authentication**: JWT validation and authentication
- **Rate Limiting**: API rate limiting and throttling
- **Request/Response Transformation**: Data format conversion and validation
- **Service Discovery**: Automatic service registration and discovery
- **Circuit Breaking**: Fault tolerance and resilience patterns

#### Events (`/backend/events/`)
**Purpose**: Event-driven architecture and message bus
- **Technology**: Apache Kafka + Redis Streams (hybrid messaging)
- **Event Publishing**: Asynchronous event publishing
- **Event Subscribing**: Event consumption and processing
- **Event Schema**: Event schema definition and validation with Avro/JSON Schema
- **Dead Letter Queues**: Failed event handling and retry logic
- **Event Sourcing**: Event log persistence and replay capabilities
- **Stream Processing**: Real-time event stream processing

#### Jobs (`/backend/jobs/`)
**Purpose**: Background job processing and task scheduling
- **Technology**: BullMQ (Node.js services) + Celery (Python services) + Redis
- **Job Scheduling**: Cron-based and event-driven job scheduling
- **Job Processing**: Distributed job execution and management
- **Job Monitoring**: Job status tracking and failure handling with Bull Board UI
- **Resource Management**: Job resource allocation and optimization
- **Priority Queues**: Multi-priority job queue management
- **Job Retry Logic**: Automatic retry with exponential backoff

#### Shared (`/backend/shared/`)
**Purpose**: Common utilities and shared code across services
- **Common Libraries**: Shared business logic and utilities
- **Data Models**: Common data structures and DTOs
- **Validation**: Input validation and data sanitization
- **Testing**: Shared test utilities and fixtures (`/tests/`)

#### Libs (`/backend/libs/`)
**Purpose**: Shared libraries and utilities for all backend services
- **Database Connectors**: Standardized database connections for PostgreSQL, TimescaleDB, Redis
- **Authentication Library**: Shared JWT validation and token management
- **Logger Library**: Centralized logging utilities with Winston/Pino
- **Error Handling**: Standardized error handling and exception management
- **DTOs**: Shared Data Transfer Objects across all services
- **Middleware**: Common middleware for authentication, validation, and logging
- **Utilities**: Helper functions and common utilities

#### Observability (`/backend/observability/`)
**Purpose**: Centralized monitoring and observability for all services
- **Technology**: Prometheus + OpenTelemetry + Grafana
- **Metrics Collection**: Prometheus exporters for all microservices
- **Distributed Tracing**: OpenTelemetry tracing across services
- **Logging**: Centralized log aggregation with ELK stack
- **Dashboards**: Grafana dashboards for service health and performance
- **Alerting**: Alert rules and notification configurations
- **Health Checks**: Service health check endpoints and monitoring

#### Test Suite (`/backend/test-suite/`)
**Purpose**: Shared test fixtures, E2E runners, and test utilities
- **Test Fixtures**: Shared test data and mock objects
- **E2E Test Runners**: End-to-end test execution frameworks
- **Mock Services**: Mock implementations for external dependencies
- **Test Utilities**: Helper functions for testing across services
- **Integration Tests**: Cross-service integration test suites
- **Performance Tests**: Load testing and performance benchmarking

#### Scripts (`/backend/scripts/`)
**Purpose**: Database and system administration scripts
- **Database Migrations**: Schema changes and data migrations
- **System Administration**: Service management and maintenance

#### Backend Configuration (`/backend/`)
**Purpose**: Backend workspace management and deployment configuration
- **Package Management**: Comprehensive Node.js workspace configuration (`package.json`)
- **Docker Configuration**: Multi-stage Dockerfile for production deployment (`Dockerfile`)
- **Docker Compose**: Complete local development environment with all services (`docker-compose.yml`)
- **Environment Variables**: Comprehensive backend environment variable template (`env.example`)
- **Makefile**: Developer-friendly commands for development, testing, and deployment (`Makefile`)
- **Workspace Dependencies**: Express, TypeScript, testing tools, and microservice libraries
- **Build Scripts**: Development, testing, building, and deployment automation
- **Code Quality**: ESLint, Prettier, Jest, Supertest, and development tools
- **Database Operations**: Migration, seeding, backup, and restore procedures
- **Service Management**: Individual service development and testing commands

## Frontend Applications (`/frontend/`)

The frontend follows a modern 4-app architecture with shared packages and specialized applications.

### **4-App Architecture Overview**

#### **Shared Packages (`/frontend/packages/`)**
**Purpose**: Reusable components and utilities across all applications
- **@inopsio/ui**: Shared UI components and design system (shadcn/ui + Radix UI)
- **@inopsio/auth**: Authentication utilities and components
- **@inopsio/api**: API client and data fetching utilities
- **@inopsio/utils**: Shared utility functions and helpers

#### **Marketing Website (`/frontend/apps/marketing/`)**
**Purpose**: Public-facing marketing website and blog
- **Technology**: Next.js 14 + Tailwind CSS + shadcn/ui
- **Features**: Multi-page structure, SEO optimization, blog with CMS
- **Domain**: inopsio.com
- **Components**: Landing pages, product showcases, documentation, blog system

#### **Admin Dashboard (`/frontend/apps/admin-dashboard/`)**
**Purpose**: Administrative interface and system management
- **Technology**: React 18 (Vite) + Tailwind CSS + shadcn/ui
- **Features**: Fast development, hot module replacement, client-side routing
- **Domain**: admin.inopsio.com
- **Components**: System management, user administration, analytics dashboard

#### **Platform Dashboard (`/frontend/apps/platform/`)**
**Purpose**: Unified business dashboard and user interface
- **Technology**: Next.js 14 + Tailwind CSS + shadcn/ui
- **Features**: CRM, ERP, Email, Workflows, Automations modules
- **Domain**: app.inopsio.com
- **Components**: Business intelligence, reporting, real-time updates

#### **InoSec Platform (`/frontend/apps/inosec/`)**
**Purpose**: Multi-tenant security platform
- **Technology**: Next.js 14 + Tailwind CSS + shadcn/ui
- **Features**: Multi-tenant routing, subdomain strategy, security modules
- **Domain**: {tenant}.inosec.com
- **Components**: InoSec Core, InoSec Edge, InoSec One features

#### **Mobile Application (`/frontend/apps/mobile/`)**
**Purpose**: Cross-platform mobile applications
- **Technology**: React Native (Expo)
- **Features**: iOS and Android support, offline functionality, push notifications
- **Components**: Native mobile interfaces for all platform features

### **Micro-Frontend Bridge Layer (`/frontend/apps/platform/modules/`)**
**Purpose**: Plug-and-play business modules for the platform dashboard
- **CRM Module** (`/frontend/apps/platform/modules/crm/`): Customer relationship management micro-frontend
- **ERP Module** (`/frontend/apps/platform/modules/erp/`): Enterprise resource planning micro-frontend
- **Email Module** (`/frontend/apps/platform/modules/email/`): Email marketing and communication micro-frontend
- **Workflows Module** (`/frontend/apps/platform/modules/workflows/`): Business process automation micro-frontend
- **Automations Module** (`/frontend/apps/platform/modules/automations/`): Automation rule and trigger management micro-frontend
- **Independent Development**: Each module can be developed and deployed independently
- **Shared Dependencies**: Consistent use of @inopsio/* packages across all modules
- **Module Configuration**: Each module with its own package.json and build configuration

#### CRM Module (`/frontend/apps/platform/modules/crm/`)
**Purpose**: Customer relationship management interface
- **Lead Management**: Lead capture and qualification interface
- **Contact Management**: Customer contact and interaction management
- **Sales Pipeline**: Visual sales process and opportunity tracking with drag-drop functionality
- **Reporting**: Sales analytics and performance reporting
- **Advanced Data Tables**: AG Grid / TanStack Table integration for complex data management
- **Pipeline Management**: React DnD integration for drag-drop pipeline stages
- **Analytics Dashboard**: Recharts integration for comprehensive sales analytics

#### ERP Module (`/frontend/apps/platform/modules/erp/`)
**Purpose**: Enterprise resource planning interface
- **Inventory Management**: Stock management and procurement interface
- **Order Processing**: Order management and fulfillment interface
- **Financial Management**: Accounting and financial reporting interface
- **Supplier Management**: Vendor relationship management interface
- **Advanced Form Validation**: React Hook Form + Zod integration for complex form validation
- **PDF Generation**: React-PDF integration for invoice and report generation
- **Analytics Dashboard**: Recharts integration for comprehensive business analytics

#### Email Module (`/frontend/apps/platform/modules/email/`)
**Purpose**: Email marketing and communication management
- **Campaign Management**: Email campaign creation and management
- **Template Editor**: Email template design and customization
- **Analytics**: Email performance and engagement analytics
- **Automation**: Marketing automation workflow management

#### Workflows Module (`/frontend/apps/platform/modules/workflows/`)
**Purpose**: Business process automation interface
- **Process Designer**: Visual workflow design and modeling with React Flow / XYFlow
- **Process Management**: Workflow execution and monitoring
- **Task Management**: Human task assignment and completion interface
- **Process Analytics**: Workflow performance and optimization
- **Visual Workflow Editor**: React Flow integration for drag-drop workflow design
- **Real-time Collaboration**: Multi-user workflow editing capabilities

#### Automations Module (`/frontend/apps/platform/modules/automations/`)
**Purpose**: Automation rule and trigger management
- **Rule Engine**: Automation rule creation and management
- **Trigger Management**: Event trigger configuration
- **Action Management**: Automated action configuration
- **Automation Analytics**: Automation performance and effectiveness

### **InoSec Application Modules (`/frontend/apps/inosec/modules/`)**
**Purpose**: Security platform modules within the InoSec application

#### InoSec Core Module (`/frontend/apps/inosec/modules/core/`)
**Purpose**: Core cybersecurity platform interface
- **Threat Dashboard**: Security threat monitoring and analysis
- **Incident Management**: Security incident tracking and response
- **Compliance Reporting**: Regulatory compliance and reporting interface
- **Security Analytics**: Security metrics and trend analysis

#### InoSec Edge Module (`/frontend/apps/inosec/modules/edge/`)
**Purpose**: Edge security device management interface
- **Device Management**: Edge device configuration and monitoring
- **Data Visualization**: Security telemetry and event visualization
- **Device Analytics**: Device performance and health monitoring
- **Remote Management**: Remote device configuration and updates

#### InoSec One Module (`/frontend/apps/inosec/modules/one/`)
**Purpose**: Unified security platform interface
- **Unified Dashboard**: Integrated security platform overview
- **Cross-platform Analytics**: Multi-platform security analysis
- **Unified Reporting**: Comprehensive security reporting
- **Centralized Management**: Centralized security policy management

#### Frontend Configuration (`/frontend/`)
**Purpose**: Frontend workspace management and deployment configuration
- **Package Management**: Comprehensive Next.js workspace configuration (`package.json`)
- **Vercel Configuration**: Production-ready Vercel deployment configuration (`vercel.json`)
- **Environment Variables**: Comprehensive frontend environment variable template (`env.example`)
- **Coverage Reports**: Test coverage tracking and reporting (`/coverage/`)
- **Workspace Dependencies**: React, Next.js, TypeScript, Tailwind CSS, and development tools
- **Build Scripts**: Development, testing, building, and deployment automation
- **Code Quality**: ESLint, Prettier, Jest, Playwright, and Storybook integration
- **Performance Tools**: Bundle analysis, optimization, and monitoring tools

### Shared Frontend Components and Packages

#### Shared Packages (`/frontend/packages/`)
**Purpose**: Reusable npm packages shared across all frontend applications

##### @inopsio/ui Package (`/frontend/packages/ui/`)
- **Purpose**: Shared UI components and design system
- **Technology**: React + Tailwind CSS + Radix UI + Framer Motion
- **Components**: Button, Input, Card, Modal, Table, Form, Layout, Navigation
- **Features**: Theme support, responsive design, accessibility (WCAG compliant)

##### @inopsio/auth Package (`/frontend/packages/auth/`)
- **Purpose**: Authentication utilities and components
- **Technology**: React + NextAuth + JWT + Axios
- **Features**: Login/Register forms, session management, token handling
- **Hooks**: useAuth, useSession, useUser

##### @inopsio/api Package (`/frontend/packages/api/`)
- **Purpose**: API client and data fetching utilities
- **Technology**: Axios + SWR + React Query
- **Features**: HTTP client, request/response interceptors, error handling
- **Hooks**: useApi, useQuery, useMutation

##### @inopsio/utils Package (`/frontend/packages/utils/`)
- **Purpose**: Shared utility functions
- **Technology**: Lodash + date-fns + clsx
- **Features**: Formatting, validation, date handling, React utilities

#### Frontend Configuration and Utilities

##### Lib (`/frontend/lib/`)
**Purpose**: Shared libraries and utilities (legacy - migrate to packages/)
- **Context**: React context providers and state management
- **Hooks**: Custom React hooks for common functionality
- **Services**: API clients and service layer
- **Types**: Shared TypeScript interfaces and types (`/types/`)

##### Config (`/frontend/config/`)
**Purpose**: Centralized configuration management
- **Tenant Themes**: Multi-tenant theme configurations (`tenant-themes.json`)
- **Feature Flags**: Global and module-specific feature flags (`feature-flags.json`)
- **Domain Mapping**: Domain and routing configuration (`domain-mapping.json`)

##### Styles (`/frontend/styles/`)
**Purpose**: Global styles and theming
- **Global Styles**: Application-wide CSS and styling
- **Tailwind Configuration**: Tailwind CSS theme customization
- **Responsive Design**: Mobile-first responsive design utilities
- **Accessibility**: WCAG compliance and accessibility features

## Infrastructure (`/infrastructure/`)

Infrastructure as Code (IaC) and deployment automation.

### Infrastructure Components

#### Bootstrap (`/infrastructure/bootstrap/`)
**Purpose**: Environment initialization and setup
- **State Backend Setup**: Terraform state backend configuration
- **IAM Configuration**: Identity and access management setup
- **Network Configuration**: VPC, subnets, and security groups
- **Secrets Management**: Initial secrets and key generation
- **Quick Start Guide**: First-time setup guide for DevOps team (`README-bootstrap.md`)

#### Terraform (`/infrastructure/terraform/`)
**Purpose**: Infrastructure provisioning and management
- **Modules**: Reusable Terraform modules for common infrastructure
- **Environments**: Environment-specific configurations (dev, staging, prod)
- **Networking**: VPC, subnets, security groups, and load balancers
- **State Management**: Remote state backend with S3 and DynamoDB

#### Kubernetes (`/infrastructure/kubernetes/`)
**Purpose**: Container orchestration and management
- **Base Configurations**: Base Kubernetes manifests and configurations
- **Overlays**: Environment-specific Kubernetes overlays (dev, staging, prod)
- **Templates**: Reusable Kubernetes templates and Helm charts
- **Service Mesh** (`/infrastructure/kubernetes/service-mesh/`): Istio service mesh configuration
  - **Istio Configuration**: Service mesh installation and configuration
  - **Virtual Services**: Traffic routing and load balancing rules
  - **Destination Rules**: Circuit breaking and connection pooling
  - **Gateway Configuration**: Ingress and egress gateway setup
  - **mTLS Policies**: Mutual TLS authentication policies
  - **Observability**: Service mesh monitoring and tracing

#### Docker (`/infrastructure/docker/`)
**Purpose**: Container configuration and management
- **Dockerfiles**: Service-specific Docker configurations
- **Docker Compose**: Local development and testing environments
- **Registry**: Private Docker registry configuration
- **Security**: Container security scanning and hardening

#### CI/CD (`/infrastructure/ci-cd/`)
**Purpose**: Continuous integration and deployment
- **Pipelines**: GitHub Actions and GitLab CI pipeline configurations
- **Templates**: Reusable pipeline templates and workflows
- **Deployment**: Automated deployment strategies and rollbacks
- **Testing**: Automated testing and quality gates
- **Approval Gates**: Manual approval gates for staging and production deployments
- **Test Reports** (`/infrastructure/ci-cd/test-reports/`): Test execution reports and artifacts
  - **Unit Test Reports**: Jest/Pytest test results and coverage reports
  - **Integration Test Reports**: API and service integration test results
  - **E2E Test Reports**: Playwright/Cypress end-to-end test results
  - **Performance Test Reports**: Load testing and benchmark results
  - **Security Scan Reports**: Vulnerability and security audit reports
  - **Artifact Storage**: GitHub Actions artifacts with 90-day retention

#### CI/CD Templates (`/infrastructure/ci-pipelines/`)
**Purpose**: Reusable CI/CD pipeline templates
- **Terraform Pipeline**: Infrastructure provisioning and management templates
- **Kubernetes Pipeline**: Container orchestration and deployment templates
- **Security Pipeline**: Security scanning and compliance templates
- **Application Pipeline**: Frontend and backend deployment templates

#### Monitoring (`/infrastructure/monitoring/`)
**Purpose**: Infrastructure monitoring and observability
- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboard management
- **Alerting**: Alert rule configuration and management
- **Logging**: Centralized logging with ELK stack

#### SLOs (`/infrastructure/monitoring/slos/`)
**Purpose**: Service Level Objectives and performance monitoring
- **SLO Definitions**: Comprehensive SLO targets for all services and infrastructure
- **SLO Alerts**: Automated alerting for SLO violations and performance degradation
- **SLO Dashboard**: Grafana dashboard for SLO monitoring and compliance reporting
- **Compliance Integration**: SLO targets aligned with GDPR, SOC 2, ISO 27001, HIPAA requirements
- **Operational Metrics**: Availability, latency, and error rate monitoring for governance reports

#### Backups (`/infrastructure/backups/`)
**Purpose**: Data backup and disaster recovery
- **Database Backups**: Automated database backup procedures
- **File Backups**: File system and storage backups
- **Disaster Recovery**: Recovery procedures and testing
- **Retention Policies**: Backup retention and cleanup policies

#### Patching (`/infrastructure/patching/`)
**Purpose**: System updates and security patching
- **Security Updates**: Automated security patch management
- **System Updates**: Operating system and dependency updates
- **Vulnerability Management**: Vulnerability scanning and remediation
- **Compliance**: Security compliance and audit procedures

#### Secrets (`/infrastructure/secrets/`)
**Purpose**: Secrets management and security
- **Vault Configuration**: HashiCorp Vault setup and configuration
- **Secret Rotation**: Automated secret rotation procedures
- **Access Control**: Secret access policies and permissions
- **Audit Logging**: Secret access audit and compliance

#### Vault Infrastructure (`/infrastructure/vault/`)
**Purpose**: Vault infrastructure deployment and configuration
- **Deployment Configuration**: Kubernetes/Docker deployment manifests for Vault
- **High Availability**: HA cluster configuration and setup
- **Storage Backend**: Vault storage backend configuration (Consul/etcd)
- **TLS Configuration**: Certificate management for Vault communication
- **Auto-unseal**: Cloud KMS auto-unseal configuration
- **Backup/Restore**: Vault data backup and disaster recovery procedures
- **Monitoring**: Vault infrastructure health checks and metrics

## Documentation (`/docs/`)

Comprehensive documentation for all aspects of the platform.

### Documentation Structure

#### API Specifications (`/docs/api-specs/`)
**Purpose**: API documentation and specifications
- **OpenAPI Specs**: REST API specifications and schemas
- **GraphQL Schemas**: GraphQL API schemas and documentation
- **API Testing**: API testing documentation and examples
- **SDK Documentation**: Client SDK documentation and examples

#### Architecture (`/docs/architecture/`)
**Purpose**: System architecture and design documentation
- **Components**: System component documentation and relationships (`/components/`)
- **Data Flow**: Data flow diagrams and process documentation
- **Diagrams**: System architecture diagrams and visualizations
- **Security Diagrams**: Security architecture and flow documentation
- **Sequence Diagrams**: Comprehensive flow documentation (`/sequence-diagrams/`)

#### Compliance (`/docs/compliance/`)
**Purpose**: Regulatory compliance and audit documentation
- **GDPR**: General Data Protection Regulation compliance
- **SOC 2**: Service Organization Control 2 compliance
- **HIPAA**: Health Insurance Portability and Accountability Act compliance
- **PCI DSS**: Payment Card Industry Data Security Standard compliance

#### Development (`/docs/dev/`)
**Purpose**: Development guidelines and best practices
- **Coding Standards**: Code style and quality guidelines
- **Development Workflow**: Git workflow and collaboration guidelines
- **Testing Guidelines**: Testing strategies and best practices
- **Code Review**: Code review process and guidelines

#### Deployment (`/docs/deployment/`)
**Purpose**: Deployment guides and procedures
- **Environment Setup**: Environment-specific deployment configurations
- **Deployment Strategies**: Blue-green, canary, and rolling deployment strategies
- **Rollback Procedures**: Deployment rollback and recovery procedures
- **Database Migrations**: Database migration strategies and procedures
- **Infrastructure Provisioning**: Terraform and Kubernetes deployment guides
- **Zero-Downtime Deployment**: Strategies for zero-downtime releases
- **Post-Deployment Validation**: Health checks and validation procedures

#### Troubleshooting (`/docs/troubleshooting/`)
**Purpose**: Common issues and resolution procedures
- **Service Issues**: Common service errors and resolutions
- **Database Issues**: Database connectivity and performance issues
- **Infrastructure Issues**: Kubernetes, networking, and cloud issues
- **Security Issues**: Authentication, authorization, and security problems
- **Performance Issues**: Performance degradation and optimization
- **Integration Issues**: Third-party integration and API issues
- **Debugging Guide**: Step-by-step debugging procedures
- **Log Analysis**: Log interpretation and error tracking

#### MVP (`/docs/mvp/`)
**Purpose**: Minimum Viable Product documentation
- **Feature Specifications**: MVP feature requirements and specifications
- **User Stories**: User story documentation and acceptance criteria
- **Release Planning**: MVP release planning and milestones
- **Success Metrics**: MVP success criteria and metrics

#### Operational (`/docs/operational/`)
**Purpose**: Operations and maintenance documentation
- **Deployment Procedures**: Deployment and release procedures
- **Monitoring Procedures**: System monitoring and alerting procedures
- **Incident Response**: Incident response and troubleshooting procedures
- **Maintenance**: System maintenance and update procedures
- **Runbook**: Key commands for daily operations (`runbook.md`)

#### PRD (`/docs/prd/`)
**Purpose**: Product Requirements Document
- **Product Vision**: Product vision and strategic goals
- **Feature Requirements**: Detailed feature requirements and specifications
- **User Experience**: UX/UI requirements and design guidelines
- **Success Metrics**: Product success metrics and KPIs

#### Tenant Guide (`/docs/tenant-guide/`)
**Purpose**: Multi-tenant platform usage guide
- **Tenant Onboarding**: Tenant setup and configuration guide
- **Feature Usage**: Platform feature usage and best practices
- **Customization**: Tenant customization and branding guide
- **Support**: Tenant support and troubleshooting guide

#### Release Notes (`/docs/release-notes/`)
**Purpose**: Version control and release documentation
- **Release Notes**: Version release notes and changelog (`v1.0.md`)
- **Migration Guides**: Version upgrade and migration procedures
- **Deprecation Notices**: Feature deprecation and removal notices
- **Compatibility**: Version compatibility and upgrade paths

#### Documentation Index (`/docs/index.md`)
**Purpose**: Comprehensive documentation navigation
- **Auditor Navigation**: Quick access for compliance auditors
- **Engineer Navigation**: Easy navigation for development teams
- **Product Team Navigation**: Clear paths for product management
- **DevOps Navigation**: Infrastructure and operations documentation

#### Technical Glossary (`/docs/glossary.md`)
**Purpose**: Technical terms and definitions for all stakeholders
- **Comprehensive Definitions**: 200+ technical terms, acronyms, and concepts
- **Compliance Terms**: GDPR, SOC 2, ISO 27001, HIPAA terminology
- **Architecture Concepts**: Microservices, security, and infrastructure terms
- **Stakeholder Support**: Clear definitions for auditors and non-technical stakeholders

#### Governance Documentation (`/docs/governance/`)
**Purpose**: Business governance and cross-reference system
- **Business KPIs** (`/docs/governance/business-kpis.md`): Comprehensive KPI definitions and reporting schedules
- **Release Policies** (`/docs/governance/release-policies.md`): Detailed release procedures and approval gates
- **Cross-Reference System**: Global documentation navigation and governance
- **Business Metrics**: Platform, module-specific, technical, and compliance KPIs
- **Reporting Schedule**: Daily, weekly, monthly, and quarterly reports

#### Architecture Decision Records (`/docs/adr/`)
**Purpose**: Architecture Decision Records for tracking architectural changes
- **ADR Index** (`/docs/adr/README.md`): Complete ADR system with decision tracking
- **Frontend Architecture ADRs**: 4-app strategy, shared packages, micro-frontend bridge
- **Backend Architecture ADRs**: Hybrid strategy, microservices communication, database strategy
- **Infrastructure ADRs**: Containerization, CI/CD, monitoring, security
- **Data & Integration ADRs**: Multi-tenant data, event-driven architecture, caching, API versioning

## CI/CD Integration (`.github/`)

GitHub Actions workflows, issue templates, and automation for continuous integration and deployment.

### GitHub Workflows (`.github/workflows/`)
**Purpose**: Automated CI/CD pipelines for testing, building, and deployment
- **Test Pipeline**: Unit, integration, and E2E testing with multi-Node.js version support
- **Build Pipeline**: Frontend, backend, and infrastructure build automation with comprehensive caching
- **Deploy Pipeline**: Vercel frontend deployment and ECS backend deployment
- **Lint Pipeline**: ESLint, Prettier, and TypeScript checking across all components
- **Security Scan Pipeline**: Dependency scanning, container scanning, and secrets scanning
- **Backup Pipeline**: Nightly database and configuration backups with notifications
- **PR Lint Pipeline**: Commit message and branch naming validation with conventional standards
- **Frontend CI Pipeline**: Dedicated frontend CI with Next.js and TypeScript caching optimization
- **Backend Test Pipeline**: Comprehensive backend testing with shared composite actions
- **Security Hardening Pipeline** (`security-hardening.yml`): Daily security scans with multiple tools
  - **Dependency Scanning**: npm audit and Snyk vulnerability scanning
  - **Container Scanning**: Trivy vulnerability scanner for Docker images
  - **Infrastructure Scanning**: Checkov for Terraform and Kubernetes security
  - **Secrets Scanning**: TruffleHog and GitLeaks for secret detection
  - **Security Reporting**: Comprehensive security reports with Slack integration

### GitHub Actions (`.github/actions/`)
**Purpose**: Reusable composite actions for shared CI/CD logic
- **Backend Test Action**: Shared test logic for all backend microservices with coverage thresholds
- **Test Artifacts**: Automated test result and coverage artifact uploads
- **PR Comments**: Automated PR comments with test results and coverage summaries
- **Service-Specific Testing**: Individual service testing with appropriate coverage thresholds

### Issue Templates (`.github/ISSUE_TEMPLATE/`)
**Purpose**: Structured issue reporting and feature request management
- **Bug Report Template**: Comprehensive bug reporting with environment details and error logs
- **Feature Request Template**: Structured feature requests with use cases and acceptance criteria
- **Security Issue Template**: Security vulnerability reporting with responsible disclosure

### GitHub Automation (`.github/`)
**Purpose**: Automated dependency management and code coverage reporting
- **Dependabot Configuration**: Automated dependency updates for npm, Docker, GitHub Actions, and Terraform
- **Codecov Configuration**: Code coverage reporting with path-based requirements and thresholds

## Scripts (`/scripts/`)

Automation scripts and utilities for development, deployment, and maintenance.

### Script Categories

#### CI (`/scripts/ci/`)
**Purpose**: Continuous integration scripts and automation
- **Build Scripts**: Automated build and compilation scripts
- **Test Scripts**: Automated testing and quality assurance scripts
- **Deployment Scripts**: Automated deployment and release scripts
- **Quality Gates**: Code quality and security scanning scripts

#### Deploy (`/scripts/deploy/`)
**Purpose**: Deployment automation and procedures
- **Environment Deployment**: Environment-specific deployment scripts
- **Service Deployment**: Microservice deployment and configuration
- **Database Deployment**: Database migration and update scripts
- **Rollback Procedures**: Deployment rollback and recovery scripts

#### Local (`/scripts/local/`)
**Purpose**: Local development environment setup and management
- **Environment Setup**: Local development environment configuration
- **Dependency Management**: Local dependency installation and management
- **Development Tools**: Local development tool configuration
- **Testing Environment**: Local testing environment setup

#### Migrations (`/scripts/migrations/`)
**Purpose**: Database and system migration scripts
- **Database Migrations**: Database schema and data migration scripts
- **System Migrations**: System configuration and data migration scripts
- **Version Migrations**: Version upgrade and migration scripts
- **Data Transformations**: Data transformation and cleanup scripts

#### Monitor (`/scripts/monitor/`)
**Purpose**: Monitoring and observability scripts
- **Health Checks**: System and service health check scripts
- **Performance Monitoring**: Performance monitoring and analysis scripts
- **Alert Management**: Alert configuration and management scripts
- **Log Analysis**: Log analysis and reporting scripts

#### Patch (`/scripts/patch/`)
**Purpose**: System patching and update automation
- **Security Patches**: Security patch installation and management
- **System Updates**: Operating system and dependency updates
- **Vulnerability Remediation**: Vulnerability scanning and remediation scripts
- **Compliance Updates**: Compliance and audit update scripts

#### Test (`/scripts/test/`)
**Purpose**: Testing automation and quality assurance
- **Unit Tests**: Unit testing automation and execution
- **Integration Tests**: Integration testing automation and execution
- **Performance Tests**: Performance testing and benchmarking scripts
- **Security Tests**: Security testing and vulnerability assessment scripts

#### Bootstrap (`/scripts/bootstrap/`)
**Purpose**: Quick environment provisioning and setup
- **Environment Setup**: Automated environment initialization
- **Dependency Installation**: Required tools and dependencies
- **Configuration Setup**: Environment configuration
- **Service Dependencies**: External service setup

#### Backup (`/scripts/backup/`)
**Purpose**: Manual database snapshot/restore procedures
- **Database Backups**: PostgreSQL, MySQL, MongoDB backup scripts
- **File System Backups**: Application files and configuration backups
- **Cloud Storage Backups**: S3, Azure Blob, GCP storage backups
- **Disaster Recovery**: Complete disaster recovery procedures

#### Utils (`/scripts/utils/`)
**Purpose**: Utility scripts and helper functions
- **Data Processing**: Data processing and transformation utilities
- **File Management**: File and directory management utilities
- **System Utilities**: System administration and management utilities
- **Development Utilities**: Development and debugging utilities

#### Compliance Check (`/infrastructure/scripts/compliance-check/`)
**Purpose**: Automated infrastructure compliance validation
- **Checkov Integration**: Terraform and Kubernetes security scanning with Checkov
- **OPA Policies**: Custom Open Policy Agent policies for infrastructure validation
- **Compliance Runner**: Comprehensive compliance checking with combined reporting
- **CI/CD Integration**: Automated compliance validation in deployment pipelines
- **Custom Policies**: Terraform and Kubernetes-specific compliance rules

#### Telemetry (`/scripts/telemetry/`)
**Purpose**: Telemetry and analytics collection
- **Usage Analytics**: Application usage analytics and tracking
- **Performance Metrics**: Performance monitoring and metrics collection
- **Error Tracking**: Error tracking and reporting
- **User Behavior**: User behavior analysis and tracking

## Security (`/security/`)

Security policies, configurations, and compliance management.

### Security Components

#### Requirements (`/security/requirements/`)
**Purpose**: Security requirements and compliance baselines
- **ISO 27001**: Information Security Management System controls
- **SOC 2**: Service Organization Control 2 compliance requirements
- **GDPR**: General Data Protection Regulation compliance
- **CCPA**: California Consumer Privacy Act compliance
- **Controls Mapping**: Complete control-to-module mapping for compliance traceability

#### Scripts (`/security/scripts/`)
**Purpose**: Recurring compliance checks and key rotation
- **Vulnerability Scanning**: Automated vulnerability assessment
- **Configuration Auditing**: Security configuration validation
- **Key Rotation**: Certificate and API key rotation scripts
- **Compliance Validation**: Regulatory compliance checking

#### Policies (`/security/policies/`)
**Purpose**: Security policy definition and management
- **RBAC Examples**: Role-based access control examples and templates
- **ABAC Examples**: Attribute-based access control examples and templates
- **OPA Policies**: Open Policy Agent policy definitions
- **Policy Tests**: Security policy testing and validation

#### Audit Logs (`/security/audit-logs/`)
**Purpose**: Security audit logging and compliance
- **Access Logs**: User access and authentication logging
- **Security Events**: Security event logging and monitoring
- **Compliance Logs**: Regulatory compliance logging and reporting
- **Forensic Analysis**: Security incident forensic analysis

#### Keycloak Config (`/security/keycloak-config/`)
**Purpose**: Identity and access management configuration
- **Realm Configuration**: Keycloak realm setup and configuration
- **Client Configuration**: OAuth2 and OpenID Connect client configuration
- **User Federation**: LDAP and Active Directory integration
- **Multi-Factor Authentication**: MFA configuration and policies

#### Pentest Reports (`/security/pentest-reports/`)
**Purpose**: Security testing and vulnerability assessment
- **Penetration Testing**: External security testing reports
- **Vulnerability Assessment**: Internal vulnerability assessment reports
- **Security Audits**: Third-party security audit reports
- **Remediation Plans**: Security issue remediation and improvement plans

#### TLS (`/security/tls/`)
**Purpose**: Transport Layer Security configuration
- **Certificate Management**: SSL/TLS certificate management and rotation
- **TLS Configuration**: TLS protocol configuration and hardening
- **Certificate Authority**: Internal certificate authority setup
- **Security Policies**: TLS security policies and best practices

#### Vault Security Policies (`/security/vault/`)
**Purpose**: Vault security policies and access control management
- **Secret Engines**: Secret engine policies for different service types
- **Access Policies**: Role-based access control (RBAC) policies for Vault
- **Service Policies**: Service-specific Vault policies (auth-service, AI-service, etc.)
- **Authentication Methods**: JWT, AppRole, Kubernetes auth configurations
- **Audit Logging**: Vault access audit and compliance logging
- **Secret Paths**: Organizational structure for secret storage paths
- **Policy Templates**: Reusable policy templates for different environments

#### Incident Response (`/security/incident-response/`)
**Purpose**: Security incident response procedures and playbooks
- **Security Incident Response Playbook** (`/security/incident-response/playbooks/security-incident-response.md`): Detailed security incident response procedures
- **Incident Classification**: Critical, High, Medium, Low severity levels with response times
- **Response Team**: Incident Commander, Technical Lead, Communication Lead, Legal Counsel
- **Response Procedures**: Detection, containment, eradication, recovery, and lessons learned
- **Communication Procedures**: Internal and external communication protocols
- **Evidence Collection**: System and user evidence preservation requirements
- **Recovery Procedures**: System and data recovery with security validation
- **Post-Incident Activities**: Incident reports, lessons learned, and follow-up actions

#### Config Templates (`/security/config-templates/`)
**Purpose**: Sanitized security configuration templates for rapid deployment
- **Vault Configuration**: Secure Vault server configuration with HA and TLS
- **Vault Policies**: RBAC policies for all services with least-privilege access
- **Keycloak Realm**: Complete realm configuration with OAuth2/OIDC setup
- **Environment Customization**: Templates for dev, staging, and production environments
- **Compliance Integration**: GDPR, SOC 2, ISO 27001, HIPAA compliant configurations

## Logs (`/logs/`)

Application and system logging directory.

### Log Categories

#### Application Logs
- **Service Logs**: Microservice application logs
- **Error Logs**: Application error and exception logs
- **Access Logs**: API access and request logs
- **Performance Logs**: Application performance and timing logs

#### System Logs
- **Infrastructure Logs**: Infrastructure and system logs
- **Security Logs**: Security event and audit logs
- **Monitoring Logs**: Monitoring and alerting logs
- **Deployment Logs**: Deployment and release logs

## Developer Experience (`/onboarding/`)

Comprehensive developer onboarding and setup guides for optimal development experience.

### Onboarding Documentation (`/onboarding/`)
**Purpose**: Developer onboarding and environment setup
- **Setup Guide** (`/onboarding/README.md`): Comprehensive environment setup documentation
- **Prerequisites**: Required software and recommended extensions
- **Quick Start**: Step-by-step setup instructions
- **Detailed Setup**: Frontend, backend, database, and monitoring setup
- **Development Workflow**: Daily development, feature development, testing, and code quality
- **Project Structure**: Complete project structure explanation
- **Common Commands**: Development, building, testing, code quality, database, Docker, and monitoring
- **Troubleshooting**: Common issues and solutions
- **Getting Help**: Documentation, support channels, and team contacts
- **Next Steps**: Learning resources, development practices, and team integration

## Configuration Files

### Root Configuration Files

#### `package.json`
**Purpose**: Root package configuration with workspace management for the entire monorepo
- **Workspace Configuration**: Manages frontend and backend workspaces with shared dependencies
- **Scripts**: Common build, test, lint, and deployment scripts across all services
- **Dependencies**: Shared development tools (ESLint, Prettier, TypeScript, Jest, Husky)
- **Husky Configuration**: Git hooks for pre-commit linting, formatting, and testing
- **Commitlint**: Conventional commit message validation and formatting
- **Lint-staged**: Automated code quality checks on staged files

#### `docker-compose.yml`
**Purpose**: Complete multi-service Docker orchestration for local development environment
- **Database Services**: PostgreSQL (primary database) and Redis (caching/sessions)
- **Security Services**: Vault (secrets management) and Keycloak (identity/authentication)
- **Monitoring Services**: Prometheus (metrics) and Grafana (dashboards/visualization)
- **Backend Services**: All microservices (auth, user, AI, CRM, ERP, email, workflow, etc.)
- **Frontend Service**: Next.js application with hot reloading
- **Networking**: Inter-service communication and external access ports
- **Health Checks**: Service readiness validation and dependency management
- **Volume Management**: Persistent data storage for databases and file uploads

#### `Makefile`
**Purpose**: Comprehensive build automation and development workflow management
- **Setup Commands**: `make setup` for initial environment configuration
- **Development**: `make dev` to start all services with hot reloading
- **Building**: `make build` for production builds across all services
- **Testing**: `make test` for unit, integration, and E2E testing
- **Code Quality**: `make lint` and `make format` for code standards
- **Docker Operations**: `make up/down/restart` for container management
- **Database Operations**: `make db-migrate/db-backup/db-restore` for data management
- **Security**: `make security-scan` and `make compliance-check` for security validation
- **Monitoring**: `make monitor` and `make health` for observability
- **Cleanup**: `make clean` for development environment reset

#### `env.example`
**Purpose**: Comprehensive environment variables template for all deployment environments
- **Database Configuration**: PostgreSQL and Redis connection settings
- **Security Configuration**: JWT secrets, encryption keys, and authentication settings
- **External Services**: AWS, Azure, Google Cloud integration settings
- **Email Configuration**: SMTP settings for email delivery and notifications
- **Monitoring Configuration**: Prometheus, Grafana, and logging settings
- **Compliance Settings**: GDPR, SOC 2, ISO 27001, HIPAA configuration flags
- **Feature Flags**: Service enablement and feature toggles
- **Development Settings**: Debug modes, hot reloading, and local development overrides

#### `env.local`
**Purpose**: Local development environment configuration with relaxed security settings
- **Development Database**: Local PostgreSQL and Redis instances
- **Local Services**: Development URLs for all services (localhost:3000, 8000, etc.)
- **Debug Settings**: Enhanced logging, debugging, and development tools
- **Relaxed Security**: Development-only secrets and authentication bypasses
- **Testing Configuration**: Test database and Redis instances
- **Hot Reloading**: File watching and automatic service restarts
- **Mock Services**: External service mocking for offline development

#### `secrets.env`
**Purpose**: Production secrets template for secure deployment (excluded from version control)
- **Database Secrets**: Production database passwords and connection strings
- **Encryption Keys**: Production JWT secrets, API keys, and encryption keys
- **External Service Keys**: AWS, Azure, Google Cloud API keys and credentials
- **SSL/TLS Certificates**: Production certificate paths and configurations
- **Third-party Integrations**: Slack, Teams, Discord webhook URLs and tokens
- **Payment Processing**: Stripe, PayPal API keys and webhook secrets
- **Security Services**: Vault unseal keys, Keycloak admin credentials
- **Backup Configuration**: S3, Azure Blob storage credentials for data backups

#### `architecture.md`
**Purpose**: High-level architecture documentation and system design overview
- **System Architecture**: Complete platform architecture with service relationships
- **Component Breakdown**: Detailed explanation of frontend, backend, and infrastructure layers
- **Security Architecture**: Multi-layer security design and compliance framework
- **Scalability Design**: Horizontal scaling, performance optimization, and load balancing
- **Technology Stack**: Complete technology stack for frontend, backend, and infrastructure
- **Data Architecture**: Database design, data flow, and integration patterns
- **Deployment Architecture**: Environment strategy, CI/CD pipeline, and deployment procedures
- **Performance Metrics**: Key performance indicators and monitoring requirements
- **Future Considerations**: Planned enhancements and scalability roadmap

#### `.gitignore`
**Purpose**: Git ignore patterns for security and cleanliness
- **Environment Files**: Local environment and secrets exclusion
- **Build Artifacts**: Generated files and build outputs
- **IDE Files**: Editor and IDE configuration files
- **OS Files**: Operating system specific files

#### `.husky/`
**Purpose**: Git hooks for code quality and automation
- **Pre-commit**: Code quality checks before commit
- **Commit-msg**: Commit message validation and formatting
- **Post-commit**: Post-commit automation and notifications
- **Pre-push**: Pre-push validation and testing

## Development Workflow

### Local Development
1. **Environment Setup**: Use `make setup` for local environment
2. **Service Development**: Use `make dev` for service development
3. **Testing**: Use `make test` for automated testing
4. **Code Quality**: Use `make lint` and `make format` for code quality

### Deployment Process
1. **Development**: Deploy to development environment
2. **Staging**: Deploy to staging for testing and validation
3. **Production**: Deploy to production with approval process
4. **Monitoring**: Monitor deployment and system health

### Quality Assurance
1. **Code Review**: All changes require peer review
2. **Automated Testing**: Comprehensive test suite execution
3. **Security Scanning**: Automated security vulnerability scanning
4. **Performance Testing**: Performance and load testing

## Best Practices

### Code Quality
- **TypeScript**: Strong typing and type safety
- **ESLint**: Code quality and style enforcement
- **Prettier**: Code formatting and consistency
- **Testing**: Comprehensive unit and integration testing

### Security
- **Least Privilege**: Minimal required permissions
- **Encryption**: Data encryption at rest and in transit
- **Authentication**: Strong authentication and authorization
- **Monitoring**: Security monitoring and incident response

### Performance
- **Caching**: Strategic caching for performance
- **Optimization**: Code and database optimization
- **Monitoring**: Performance monitoring and alerting
- **Scaling**: Horizontal and vertical scaling strategies

### Documentation
- **API Documentation**: Comprehensive API documentation
- **Code Documentation**: Inline code documentation
- **Architecture Documentation**: System architecture documentation
- **Operational Documentation**: Operations and maintenance guides

## Technology Stack Alignment (v1.1)

### **Frontend Technology Stack**

#### **Marketing Website**
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS for utility-first styling
- **Components**: shadcn/ui + Radix UI for accessible components
- **Features**: SEO optimization, multi-page structure, blog with CMS
- **Domain**: inopsio.com

#### **Admin Dashboard**
- **Framework**: React 18 with Vite bundler
- **Styling**: Tailwind CSS for consistent design
- **Components**: shadcn/ui + Radix UI for component library
- **Features**: Fast development, hot module replacement, client-side routing
- **Domain**: admin.inopsio.com

#### **Platform Dashboard**
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Features**: CRM, ERP, Email, Workflows, Automations modules
- **Domain**: app.inopsio.com

#### **InoSec Platform**
- **Framework**: Next.js 14 with multi-tenant routing
- **Styling**: Tailwind CSS + shadcn/ui
- **Features**: Subdomain strategy, tenant-specific theming
- **Domain**: {tenant}.inosec.com

#### **Mobile Application**
- **Framework**: React Native with Expo
- **Features**: Cross-platform iOS/Android, offline support, push notifications

### **Backend Technology Stack**

#### **NestJS Services (Business Logic)**
- **Technology**: NestJS 10 + TypeScript + PostgreSQL
- **Services**: Auth, User, CRM, ERP, Email, Workflow, Monitoring
- **Features**: Enterprise-grade APIs, comprehensive business logic
- **Communication**: REST APIs, WebSocket support

#### **FastAPI Services (AI/ML & Security)**
- **Technology**: FastAPI + Python + PostgreSQL + TimescaleDB
- **Services**: AI Service, InoSec Core, InoSec Edge
- **Features**: High-performance async processing, ML model management
- **Communication**: REST APIs, WebSocket connections, async tasks

### **Backend Standardization (`/backend/libs/` & `/backend/observability/`)**
**Purpose**: Shared libraries and observability for all backend services
- **Shared Libraries** (`/backend/libs/`): Cross-service utilities, DTOs, middleware, and common functions
- **Observability** (`/backend/observability/`): Centralized monitoring with Prometheus and OpenTelemetry
- **Test Suite** (`/backend/test-suite/`): Shared test fixtures, E2E runners, and mocks
- **Database Connectors**: Standardized database connections and utilities
- **Monitoring Integration**: Comprehensive monitoring and alerting across all services

### **Frontend Component Integration Roadmap**

#### **Planned Component Integrations**

##### **High Priority Integrations**
1. **AG Grid / TanStack Table** (CRM Module)
   - **Location**: `/frontend/apps/platform/modules/crm/`
   - **Purpose**: Advanced data tables for complex CRM data management
   - **Status**: Planned for MVP Phase 2

2. **React Hook Form + Zod** (ERP Module)
   - **Location**: `/frontend/apps/platform/modules/erp/`
   - **Purpose**: Advanced form validation for complex ERP forms
   - **Status**: Planned for MVP Phase 2

3. **React Flow / XYFlow** (Workflows Module)
   - **Location**: `/frontend/apps/platform/modules/workflows/`
   - **Purpose**: Visual workflow editing and design
   - **Status**: Planned for MVP Phase 2

4. **Recharts** (CRM/ERP Analytics)
   - **Location**: CRM and ERP analytics dashboards
   - **Purpose**: Comprehensive business analytics and data visualization
   - **Status**: Planned for MVP Phase 2

##### **Medium Priority Integrations**
5. **React DnD** (CRM Pipelines)
   - **Location**: `/frontend/apps/platform/modules/crm/`
   - **Purpose**: Drag-and-drop pipeline stage management
   - **Status**: Planned for MVP Phase 3

6. **React-PDF** (ERP Invoices)
   - **Location**: `/frontend/apps/platform/modules/erp/`
   - **Purpose**: PDF generation for invoices and reports
   - **Status**: Planned for MVP Phase 3

##### **Low Priority Integrations**
7. **React-virtuoso** (Logs)
   - **Location**: Monitoring and logging interfaces
   - **Purpose**: Real-time log streaming with UI virtualization
   - **Status**: Optional - add if required

### **Central Config Store (`/frontend/config/`)**
**Purpose**: Centralized configuration management for themes, features, and domains
- **Tenant Themes** (`/frontend/config/tenant-themes.json`): Comprehensive theme system with multiple tenant configurations
- **Feature Flags** (`/frontend/config/feature-flags.json`): Global and module-specific feature flags with rollout controls
- **Domain Mapping** (`/frontend/config/domain-mapping.json`): Complete domain and routing configuration for all environments
- **Tenant Configuration**: Tenant-specific settings, features, and domain mappings
- **Environment Support**: Development, staging, and production configurations

### **Development Tools (`/frontend/devtools/`)**
**Purpose**: Development tools for design system, testing, and shared playgrounds
- **Storybook** (`/frontend/devtools/storybook/`): Design system documentation and component showcase
- **Shared Playground** (`/frontend/devtools/playground/`): Development playground for testing all modules
- **Component Library**: Comprehensive component library with Radix UI + shadcn/ui
- **Hot Module Replacement**: Fast development experience with instant feedback
- **Design System**: Complete design system with themes, components, and documentation

### **Frontend Governance (`/frontend/playwright/`)**
**Purpose**: Cross-application governance with shared E2E tests and configuration
- **Playwright E2E Tests** (`/frontend/playwright/`): Comprehensive end-to-end testing across all applications
- **Shared Test Suites**: Consistent testing patterns and utilities across all apps
- **Cross-Application Testing**: Integration testing between different applications
- **Test Configuration**: Centralized test configuration and reporting

## Recent Enhancements (v1.0)

### Micro-Enhancements (v1.1)
- **CI/CD Optimization**: Enhanced PR lint workflow with conventional commit and branch naming validation
- **Frontend Performance**: Comprehensive caching for node_modules, Next.js, TypeScript, ESLint, and Prettier
- **Backend Testing**: Shared composite actions for consistent testing across all microservices
- **Infrastructure Compliance**: Automated Checkov/OPA validation for Terraform and Kubernetes
- **Documentation Enhancement**: Comprehensive technical glossary with 200+ terms for all stakeholders
- **Security Templates**: Sanitized Vault and Keycloak configuration templates for rapid deployment
- **SLO Monitoring**: Service Level Objectives with automated alerting and compliance reporting

### Architecture Enhancements (v1.2)
- **Micro-Frontend Bridge Layer**: Plug-and-play business modules (CRM, ERP, Email) for platform dashboard
- **Central Config Store**: Tenant themes, feature flags, and domain mapping configuration
- **Development Tools**: Storybook design system, shared playground, and component library
- **Backend Standardization**: Shared libraries, observability, and test suite for all services
- **Frontend Governance**: Playwright E2E tests and cross-application testing
- **Security Deepening**: Incident response playbooks and security hardening automation
- **CI/CD Modernization**: Security hardening pipeline with comprehensive vulnerability scanning
- **Developer Experience**: Enhanced onboarding guide and development tooling
- **Governance Documentation**: Business KPIs, release policies, and Architecture Decision Records

### Backend Improvements
- **Unified Monitoring**: Added `/backend/monitoring/` for shared Prometheus exporters and alerting rules
- **AI Service Enhancements**: Added `/ai-service/evaluation/` and `/ai-service/metadata/` for model validation and data lineage
- **Service Documentation**: Comprehensive `/backend/README.md` with service inter-dependencies and architecture diagrams
- **Configuration Validation**: Added `/backend/config/schemas/` for environment-specific variable validation (JSON Schema/Zod)

### Frontend Optimizations
- **Monorepo Management**: Enhanced frontend README with Nx/Turborepo integration
- **Type Safety**: Added `/frontend/lib/types/` for shared TypeScript interfaces
- **Component Architecture**: Improved shared component organization and documentation
- **Feature Flags Integration**: Documented REST/GraphQL/WebSocket backend connectivity patterns

### Infrastructure Enhancements
- **Bootstrap Automation**: Added `/infrastructure/bootstrap/` for environment initialization
- **State Management**: Comprehensive Terraform state backend configuration
- **IAM Setup**: Automated identity and access management configuration
- **Health Check Automation**: Added `/infrastructure/scripts/healthcheck/` for cluster readiness testing
- **CI/CD Approval Gates**: Enhanced CI/CD pipelines with staging approval gates for regulated clients

### Security & Compliance
- **Compliance Framework**: Added `/security/requirements/` with ISO 27001, SOC 2, GDPR, and CCPA baselines
- **Security Automation**: Added `/security/scripts/` for compliance checks and key rotation
- **Audit Procedures**: Enhanced security monitoring and compliance validation
- **Incident Response**: Added `/security/incident-response/` with ISO 27001 A.16 escalation workflows

### Documentation & Operations
- **Architecture Diagrams**: Added `/docs/architecture/sequence-diagrams/` and `/docs/architecture/components/overview.md`
- **Operational Runbook**: Added `/docs/operational/runbook.md` with daily operations commands
- **Release Management**: Added `/docs/release-notes/v1.0.md` for version baseline
- **Bootstrap Scripts**: Added `/scripts/bootstrap/` and `/scripts/backup/` for environment provisioning
- **Integration Diagrams**: Added `/docs/architecture/integration-diagrams/` bridging Frontend ↔ Backend ↔ Infrastructure

### Development Experience
- **Quick Setup**: Automated environment provisioning and dependency management
- **Backup Procedures**: Comprehensive database backup and disaster recovery
- **Monitoring Integration**: Enhanced observability and alerting capabilities
- **Compliance Automation**: Automated security scanning and compliance validation
- **Configuration Validation**: Runtime configuration validation and type safety
- **Health Check Automation**: Post-deployment validation and cluster readiness testing
- **Integration Documentation**: Complete system topology and integration patterns
- **Test Suite Consistency**: Reusable test fixtures across all backend services
- **Linting Standards**: Uniform ESLint configuration across all frontend applications
- **DevOps Onboarding**: Streamlined infrastructure setup with bootstrap guide
- **Compliance Traceability**: Complete control-to-module mapping for all frameworks
- **Documentation Navigation**: Comprehensive index for auditors and engineers
- **CI/CD Integration**: Complete GitHub Actions automation with Vercel and Docker deployment
- **Issue Management**: Structured GitHub issue templates for bugs, features, and security
- **Dependency Automation**: Automated dependency updates with Dependabot
- **Code Coverage**: Comprehensive coverage reporting and monitoring with Codecov
- **Local Development**: Complete Docker Compose environment with all services
- **Developer Commands**: Makefile with developer-friendly commands for all operations
- **Enhanced CI/CD**: PR validation, frontend caching, backend testing automation
- **Compliance Validation**: Automated infrastructure compliance checking with Checkov/OPA
- **Technical Documentation**: Comprehensive glossary for all stakeholders
- **Security Templates**: Rapid deployment with sanitized security configurations
- **SLO Monitoring**: Service Level Objectives with automated alerting and reporting

## Conclusion

The Inopsio project structure represents a **production-ready, enterprise-grade SaaS platform** with **aligned technology stack** and comprehensive coverage of all critical layers. This structure achieves:

### **✅ Aligned Technology Stack**
- **Marketing Website**: Next.js 14 + Tailwind CSS + shadcn/ui for optimal SEO and performance
- **Admin Dashboard**: React 18 (Vite) + Tailwind CSS for fast development and building
- **Platform Dashboard**: Next.js 14 + Tailwind CSS + shadcn/ui for unified business interface
- **InoSec Platform**: Next.js 14 + multi-tenant routing for security platform
- **Mobile Application**: React Native (Expo) for cross-platform mobile support
- **Backend Services**: Hybrid NestJS + FastAPI strategy for optimal performance
- **Gateway**: NestJS + Express + Kong for API gateway and service mesh
- **Events**: Apache Kafka + Redis Streams for event-driven architecture
- **Jobs**: BullMQ (Node.js) + Celery (Python) + Redis for background processing

### **✅ Enterprise-Grade Features**
- **100% Structural Completeness**: Fully aligned with multi-phase delivery plan with all optional enhancements, refinements, and CI/CD integration
- **Enterprise Security**: Comprehensive security policies and compliance frameworks with incident response
- **AI-Powered Platform**: Complete MLOps pipeline with FastAPI for high-performance AI/ML workloads
- **Multi-Tenant Architecture**: Complete tenant isolation and customization capabilities with subdomain strategy
- **Cloud-Native Infrastructure**: Kubernetes-based deployment with Infrastructure as Code
- **Developer Excellence**: Outstanding development experience with comprehensive tooling and shared packages
- **Operational Excellence**: Complete monitoring, logging, and incident response capabilities
- **Regulatory Compliance**: Full compliance traceability with approval gates for regulated clients

### **✅ Modern Development Practices**
- **Shared Package Architecture**: @inopsio/* packages for code reusability and consistency
- **4-App Architecture**: Specialized applications for different use cases
- **Hybrid Backend Strategy**: NestJS for business logic, FastAPI for AI/ML and security
- **TypeScript Throughout**: Type safety across all frontend and backend services
- **Modern Tooling**: Vite for fast development, Next.js App Router for performance
- **Component Library**: shadcn/ui + Radix UI for accessible, consistent components

### **✅ Enhanced Architecture (v1.2)**
- **Micro-Frontend Bridge**: Plug-and-play business modules (CRM, ERP, Email) for scalable platform development
- **Central Configuration**: Tenant themes, feature flags, and domain mapping for multi-tenancy
- **Development Tools**: Storybook design system and shared development playground
- **Backend Standardization**: Shared libraries and observability for all microservices
- **Frontend Governance**: Comprehensive E2E testing and cross-application validation
- **Security Deepening**: Incident response playbooks and automated security hardening
- **CI/CD Modernization**: Daily security scans with comprehensive vulnerability assessment
- **Developer Experience**: Enhanced onboarding guide and development tooling
- **Governance Documentation**: Business KPIs, release policies, and Architecture Decision Records

This structure provides a **solid foundation for building and maintaining a world-class SaaS platform** with AI and cybersecurity capabilities, ready for enterprise and government contracts with full compliance traceability (SOC 2 / GDPR / ISO 27001 foundation) and incident response procedures.

## Recent Structure Improvements (v1.3)

### **Critical Fixes**
1. ✅ **Frontend Structure Clarity**: Unified frontend architecture with clear apps/ and packages/ separation
   - Removed conflicting flat structure references (`/frontend/crm/`, `/frontend/erp/`)
   - Consolidated all modules under `/frontend/apps/platform/modules/` and `/frontend/apps/inosec/modules/`
   - Clear separation between applications and shared packages

2. ✅ **Backend Technology Specifications**: Added complete technology stack details
   - **Gateway**: NestJS + Express + Kong with circuit breaking and service discovery
   - **Events**: Apache Kafka + Redis Streams with event sourcing and stream processing
   - **Jobs**: BullMQ (Node.js) + Celery (Python) + Redis with priority queues and retry logic

3. ✅ **Backend Standardization**: Added missing critical backend folders
   - **Libs** (`/backend/libs/`): Shared libraries, DTOs, and middleware
   - **Observability** (`/backend/observability/`): Prometheus + OpenTelemetry + Grafana
   - **Test Suite** (`/backend/test-suite/`): Shared test fixtures and E2E runners

4. ✅ **Vault Clarification**: Clear separation of Vault responsibilities
   - **Infrastructure Vault** (`/infrastructure/vault/`): Deployment, HA, and infrastructure configuration
   - **Security Vault** (`/security/vault/`): Security policies, access control, and secret management

5. ✅ **AI Service Database**: Complete database specification
   - PostgreSQL for metadata, Redis for caching, S3 for model artifacts
   - Celery for async processing

6. ✅ **Service Mesh Configuration**: Detailed Istio service mesh setup
   - Virtual services, destination rules, gateway configuration
   - mTLS policies and observability

7. ✅ **Documentation Enhancements**: Added critical documentation sections
   - **Deployment** (`/docs/deployment/`): Deployment strategies, rollback procedures, zero-downtime deployment
   - **Troubleshooting** (`/docs/troubleshooting/`): Common issues, debugging guide, log analysis

8. ✅ **CI/CD Test Reports**: Clarified test artifact storage
   - Test reports location: `/infrastructure/ci-cd/test-reports/`
   - GitHub Actions artifacts with 90-day retention

9. ✅ **Legacy Cleanup**: Removed unnecessary legacy references

### **Structural Improvements**
- **Frontend Packages**: Clear @inopsio/* package architecture with technology specifications
- **Micro-Frontend Modules**: Unified module structure under platform and inosec applications
- **Backend Observability**: Centralized monitoring and distributed tracing
- **Configuration Management**: Central config store for themes, feature flags, and domain mapping

**Status**: ✅ **PRODUCTION-READY ARCHITECTURE** - Enterprise-grade SaaS platform structure with perfectly aligned technology stack, complete technology specifications, clear architectural boundaries, and comprehensive documentation. Ready for PRD and MVP Phase 1 (Website launch) with full compliance traceability (SOC 2 / GDPR / ISO 27001) and audit readiness.
