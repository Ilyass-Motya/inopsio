# Inopsio MVP User Stories & Acceptance Criteria

## Purpose
This document defines user stories and acceptance criteria for the Inopsio MVP (v1.0). Each story follows the standard format: **As a [role], I want [feature], so that [benefit]**, with clear acceptance criteria, priority levels, and dependencies.

---

## Document Structure

### Story Format
```
**Story ID**: [MODULE]-US-[NUMBER]
**Title**: Brief descriptive title
**As a**: [User role]
**I want**: [Feature/capability]
**So that**: [Business value/benefit]
**Priority**: Critical | High | Medium | Low
**Epic**: Link to feature epic
**Dependencies**: Technical or feature dependencies

**Acceptance Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Technical Notes**: Implementation guidance
**Validation**: Link to validation scenario
```

---

## Table of Contents
1. [CRM Module User Stories](#crm-module)
2. [ERP Module User Stories](#erp-module)
3. [Email Module User Stories](#email-module)
4. [Workflow Module User Stories](#workflow-module)
5. [InoSec Module User Stories](#inosec-module)
6. [Platform User Stories](#platform-module)
7. [Cross-Module User Stories](#cross-module)

---

## CRM Module User Stories {#crm-module}

### CRM-US-001: Lead Capture and Creation

**Story ID**: CRM-US-001
**Title**: Create and manage leads
**As a**: Sales Manager
**I want**: To capture and create new leads with all relevant information
**So that**: I can track potential customers through the sales pipeline

**Priority**: 🔴 Critical
**Epic**: CRM-EPIC-001 - Lead Management
**Dependencies**: User authentication, PostgreSQL database

**Acceptance Criteria**:
- [ ] User can create a new lead with mandatory fields (name, email, company)
- [ ] User can add optional fields (phone, source, notes, custom fields)
- [ ] Lead is saved to database within 2 seconds
- [ ] Lead appears in leads list immediately after creation
- [ ] Form validation prevents duplicate emails
- [ ] Success notification displayed after lead creation
- [ ] Kafka event published for lead creation

**Technical Notes**:
- Backend: NestJS + PostgreSQL
- Frontend: `/frontend/apps/platform/modules/crm/`
- API: POST `/api/v1/crm/leads`
- Event: `lead.created` published to Kafka

**Validation**: `/docs/prd/validation-scenarios.md#CRM-VAL-01`

---

### CRM-US-002: Lead Enrichment

**Story ID**: CRM-US-002
**Title**: Enrich lead data automatically
**As a**: Sales Representative
**I want**: Lead data to be automatically enriched with company information
**So that**: I have more context for sales conversations

**Priority**: 🟡 High
**Epic**: CRM-EPIC-001 - Lead Management
**Dependencies**: CRM-US-001, AI Service integration

**Acceptance Criteria**:
- [ ] System automatically fetches company data when lead is created
- [ ] Enrichment includes company size, industry, location
- [ ] Enrichment completes within 5 seconds
- [ ] User can manually trigger re-enrichment
- [ ] Failed enrichment doesn't block lead creation
- [ ] Enrichment status displayed in UI

**Technical Notes**:
- AI Service: FastAPI enrichment endpoint
- Background processing: Celery job queue
- External API: LinkedIn/Clearbit integration

**Validation**: `/docs/prd/validation-scenarios.md#CRM-VAL-02`

---

### CRM-US-003: Pipeline Kanban Board

**Story ID**: CRM-US-003
**Title**: Visualize and manage sales pipeline
**As a**: Sales Manager
**I want**: A drag-and-drop Kanban board to manage deal stages
**So that**: I can visualize pipeline progress and move deals efficiently

**Priority**: 🔴 Critical
**Epic**: CRM-EPIC-002 - Pipeline Management
**Dependencies**: CRM-US-001, React DnD library

**Acceptance Criteria**:
- [ ] Pipeline displays with customizable stages (Lead, Qualified, Proposal, Negotiation, Closed)
- [ ] User can drag deals between stages
- [ ] Stage changes persist immediately to database
- [ ] Deal count and total value displayed per stage
- [ ] Changes sync in real-time across users
- [ ] Pipeline supports filtering by user, date, value
- [ ] Mobile-responsive layout for tablet users

**Technical Notes**:
- Frontend: React DnD + Zustand state management
- Backend: WebSocket for real-time updates
- Path: `/frontend/apps/platform/modules/crm/components/pipeline`

**Validation**: `/docs/prd/validation-scenarios.md#CRM-VAL-03`

---

### CRM-US-004: CRM Analytics Dashboard

**Story ID**: CRM-US-004
**Title**: View sales analytics and insights
**As a**: Sales Director
**I want**: A dashboard showing sales metrics and trends
**So that**: I can make data-driven decisions about the sales process

**Priority**: 🟡 High
**Epic**: CRM-EPIC-003 - Analytics
**Dependencies**: CRM-US-001, CRM-US-003, Recharts library

**Acceptance Criteria**:
- [ ] Dashboard displays key metrics (conversion rate, revenue, pipeline value)
- [ ] Charts show trends over time (weekly, monthly, quarterly)
- [ ] User can filter by date range, team member, product
- [ ] Data refreshes automatically every 5 minutes
- [ ] Dashboard loads within 3 seconds
- [ ] Export functionality for reports (PDF, CSV)

**Technical Notes**:
- Frontend: Recharts for data visualization
- Backend: Aggregation queries with caching (Redis)
- AI insights: Predictive analytics from AI service

**Validation**: `/docs/prd/validation-scenarios.md#CRM-VAL-04`

---

## ERP Module User Stories {#erp-module}

### ERP-US-001: Invoice Generation

**Story ID**: ERP-US-001
**Title**: Generate and manage invoices
**As a**: Finance Manager
**I want**: To generate professional invoices with PDF export
**So that**: I can bill customers accurately and professionally

**Priority**: 🔴 Critical
**Epic**: ERP-EPIC-001 - Financial Management
**Dependencies**: User authentication, React-PDF library

**Acceptance Criteria**:
- [ ] User can create invoice with line items, quantities, prices
- [ ] Invoice auto-calculates totals, taxes, discounts
- [ ] PDF generated with company branding
- [ ] Invoice numbered sequentially with custom prefix
- [ ] User can save draft invoices
- [ ] Published invoices are immutable
- [ ] Email invoice directly to customer
- [ ] Support multiple currencies

**Technical Notes**:
- Frontend: React Hook Form + Zod validation
- PDF Generation: React-PDF
- Backend: NestJS + PostgreSQL
- Path: `/frontend/apps/platform/modules/erp/`

**Validation**: `/docs/prd/validation-scenarios.md#ERP-VAL-01`

---

### ERP-US-002: Payment Processing Integration

**Story ID**: ERP-US-002
**Title**: Process payments via Stripe
**As a**: Customer
**I want**: To pay invoices securely online
**So that**: I can complete transactions quickly

**Priority**: 🔴 Critical
**Epic**: ERP-EPIC-001 - Financial Management
**Dependencies**: ERP-US-001, Stripe API integration

**Acceptance Criteria**:
- [ ] Customer receives payment link via email
- [ ] Secure payment page with Stripe checkout
- [ ] Multiple payment methods supported (card, bank transfer)
- [ ] Payment confirmation sent to customer and admin
- [ ] Invoice marked as paid automatically
- [ ] Partial payments supported
- [ ] Refund processing capability

**Technical Notes**:
- Stripe integration: Backend webhook handlers
- PCI compliance: All payment data handled by Stripe
- Link: `/docs/api-specs/erp-payments.yaml`

**Validation**: `/docs/prd/validation-scenarios.md#ERP-VAL-02`

---

### ERP-US-003: Inventory Management

**Story ID**: ERP-US-003
**Title**: Track and manage inventory
**As a**: Warehouse Manager
**I want**: Real-time inventory tracking across locations
**So that**: I can prevent stockouts and optimize inventory levels

**Priority**: 🟡 High
**Epic**: ERP-EPIC-002 - Inventory Management
**Dependencies**: PostgreSQL, Real-time sync

**Acceptance Criteria**:
- [ ] View inventory levels across all locations
- [ ] Track product variants (size, color, SKU)
- [ ] Low stock alerts with configurable thresholds
- [ ] Inventory adjustments with reason tracking
- [ ] Stock movement history (in, out, transfer)
- [ ] Barcode scanning support
- [ ] Inventory valuation reports

**Technical Notes**:
- Real-time updates: WebSocket connections
- Background jobs: Inventory reconciliation (Celery)
- Mobile support: Barcode scanner integration

**Validation**: `/docs/prd/validation-scenarios.md#ERP-VAL-03`

---

## Email Module User Stories {#email-module}

### EMAIL-US-001: Email Campaign Creation

**Story ID**: EMAIL-US-001
**Title**: Create and send email campaigns
**As a**: Marketing Manager
**I want**: To create email campaigns with templates
**So that**: I can engage customers with targeted messaging

**Priority**: 🟡 High
**Epic**: EMAIL-EPIC-001 - Campaign Management
**Dependencies**: Email service, Template engine

**Acceptance Criteria**:
- [ ] User can select from pre-built templates
- [ ] Drag-and-drop email editor
- [ ] Personalization variables (name, company, custom fields)
- [ ] Preview email before sending
- [ ] Send test email to self
- [ ] Schedule campaign for future date/time
- [ ] A/B testing support (subject lines, content)

**Technical Notes**:
- Frontend: Email template editor
- Backend: Email queue (BullMQ)
- Service: `/backend/email-service/`

**Validation**: `/docs/prd/validation-scenarios.md#EMAIL-VAL-01`

---

### EMAIL-US-002: Email Analytics

**Story ID**: EMAIL-US-002
**Title**: Track email campaign performance
**As a**: Marketing Manager
**I want**: Analytics on email campaign performance
**So that**: I can optimize future campaigns

**Priority**: 🟡 High
**Epic**: EMAIL-EPIC-002 - Analytics
**Dependencies**: EMAIL-US-001

**Acceptance Criteria**:
- [ ] Track open rates, click rates, bounce rates
- [ ] Geographic data for opens/clicks
- [ ] Device and email client breakdown
- [ ] Unsubscribe tracking
- [ ] Link click tracking with heatmap
- [ ] Compare campaign performance
- [ ] Export analytics reports

**Technical Notes**:
- Tracking pixels for opens
- Link redirects for click tracking
- Dashboard: Recharts visualization

**Validation**: `/docs/prd/validation-scenarios.md#EMAIL-VAL-02`

---

## Workflow Module User Stories {#workflow-module}

### WORKFLOW-US-001: Visual Workflow Builder

**Story ID**: WORKFLOW-US-001
**Title**: Design workflows visually
**As a**: Process Manager
**I want**: A visual workflow designer with drag-and-drop nodes
**So that**: I can automate business processes without coding

**Priority**: 🔴 Critical
**Epic**: WORKFLOW-EPIC-001 - Process Automation
**Dependencies**: React Flow library, Workflow engine

**Acceptance Criteria**:
- [ ] Drag-and-drop node-based editor
- [ ] Node types: Start, Action, Condition, End
- [ ] Connect nodes with visual connections
- [ ] Configure node properties (actions, conditions)
- [ ] Validate workflow before saving
- [ ] Version control for workflows
- [ ] Test workflow with sample data
- [ ] Publish/unpublish workflows

**Technical Notes**:
- Frontend: React Flow/XYFlow
- Backend: Workflow execution engine (NestJS)
- Path: `/frontend/apps/platform/modules/workflows/`

**Validation**: `/docs/prd/validation-scenarios.md#WORKFLOW-VAL-01`

---

### WORKFLOW-US-002: Real-time Workflow Execution

**Story ID**: WORKFLOW-US-002
**Title**: Execute workflows in real-time
**As a**: System User
**I want**: Workflows to execute automatically based on triggers
**So that**: Business processes are automated efficiently

**Priority**: 🔴 Critical
**Epic**: WORKFLOW-EPIC-001 - Process Automation
**Dependencies**: WORKFLOW-US-001, Kafka event bus

**Acceptance Criteria**:
- [ ] Workflows trigger on events (lead created, invoice paid, etc.)
- [ ] Real-time execution with <200ms latency
- [ ] Execution status visible in UI
- [ ] Error handling and retry logic
- [ ] Execution history and logs
- [ ] Parallel execution support
- [ ] WebSocket updates for real-time progress

**Technical Notes**:
- Event-driven: Kafka triggers
- Execution: FastAPI async processing
- Real-time updates: WebSocket connections

**Validation**: `/docs/prd/validation-scenarios.md#WORKFLOW-VAL-02`

---

## InoSec Module User Stories {#inosec-module}

### INOSEC-US-001: Threat Detection

**Story ID**: INOSEC-US-001
**Title**: Detect and alert on security threats
**As a**: Security Analyst
**I want**: AI-powered threat detection with real-time alerts
**So that**: I can respond to security incidents quickly

**Priority**: 🔴 Critical
**Epic**: INOSEC-EPIC-001 - Threat Monitoring
**Dependencies**: AI Service, TimescaleDB

**Acceptance Criteria**:
- [ ] Real-time threat analysis using ML models
- [ ] Severity classification (Critical, High, Medium, Low)
- [ ] Alert notifications (email, Slack, in-app)
- [ ] Threat details with recommended actions
- [ ] False positive marking
- [ ] Threat timeline visualization
- [ ] Integration with incident response workflows

**Technical Notes**:
- AI Service: FastAPI + ML models
- Database: TimescaleDB for time-series events
- Service: `/backend/inosec-core-service/`

**Validation**: `/docs/prd/validation-scenarios.md#INOSEC-VAL-01`

---

### INOSEC-US-002: Security Dashboard

**Story ID**: INOSEC-US-002
**Title**: View security posture and metrics
**As a**: CISO
**I want**: A comprehensive security dashboard
**So that**: I can assess overall security posture

**Priority**: 🟡 High
**Epic**: INOSEC-EPIC-002 - Security Analytics
**Dependencies**: INOSEC-US-001

**Acceptance Criteria**:
- [ ] Real-time threat count by severity
- [ ] Security score calculation
- [ ] Trend analysis over time
- [ ] Compliance status indicators
- [ ] Top vulnerabilities list
- [ ] Mean Time to Detect (MTTD) / Mean Time to Respond (MTTR)
- [ ] Downloadable compliance reports

**Technical Notes**:
- Frontend: `/frontend/apps/inosec/modules/core/`
- Real-time data: WebSocket connections
- Analytics: Recharts visualization

**Validation**: `/docs/prd/validation-scenarios.md#INOSEC-VAL-02`

---

## Platform User Stories {#platform-module}

### PLATFORM-US-001: Multi-Tenant Management

**Story ID**: PLATFORM-US-001
**Title**: Create and manage tenants
**As a**: Platform Administrator
**I want**: To create and configure tenant accounts
**So that**: Customers can use isolated instances of the platform

**Priority**: 🔴 Critical
**Epic**: PLATFORM-EPIC-001 - Multi-tenancy
**Dependencies**: Keycloak, PostgreSQL row-level security

**Acceptance Criteria**:
- [ ] Create tenant with unique subdomain
- [ ] Configure tenant settings (branding, features, limits)
- [ ] Complete data isolation between tenants
- [ ] Tenant-specific user management
- [ ] Resource quotas and usage tracking
- [ ] Tenant suspension/reactivation
- [ ] Tenant migration tools

**Technical Notes**:
- Authentication: Keycloak realms per tenant
- Database: PostgreSQL tenant_id column with RLS
- Routing: Subdomain-based routing

**Validation**: `/docs/prd/validation-scenarios.md#PLATFORM-VAL-01`

---

### PLATFORM-US-002: Single Sign-On (SSO)

**Story ID**: PLATFORM-US-002
**Title**: Enable SSO authentication
**As a**: Enterprise User
**I want**: To log in using my company's SSO
**So that**: I can access the platform with existing credentials

**Priority**: 🟡 High
**Epic**: PLATFORM-EPIC-002 - Authentication
**Dependencies**: Keycloak configuration

**Acceptance Criteria**:
- [ ] Support SAML 2.0 and OAuth2/OIDC
- [ ] SSO configuration per tenant
- [ ] Just-in-time user provisioning
- [ ] Role mapping from SSO provider
- [ ] Multi-factor authentication support
- [ ] Session management across services
- [ ] SSO troubleshooting logs

**Technical Notes**:
- SSO Provider: Keycloak
- Protocols: SAML, OAuth2, OIDC
- Service: `/backend/auth-service/`

**Validation**: `/docs/prd/validation-scenarios.md#PLATFORM-VAL-02`

---

## Cross-Module User Stories {#cross-module}

### CROSS-US-001: Unified Search

**Story ID**: CROSS-US-001
**Title**: Search across all modules
**As a**: Platform User
**I want**: A unified search across CRM, ERP, and other modules
**So that**: I can quickly find information regardless of where it's stored

**Priority**: 🟢 Medium
**Epic**: PLATFORM-EPIC-003 - User Experience
**Dependencies**: Elasticsearch/OpenSearch

**Acceptance Criteria**:
- [ ] Global search bar accessible from navigation
- [ ] Search results from all modules (CRM, ERP, Email, etc.)
- [ ] Results grouped by module type
- [ ] Search filters (module, date, user)
- [ ] Search history and saved searches
- [ ] Quick actions from search results
- [ ] Keyboard shortcuts for search

**Technical Notes**:
- Search engine: Elasticsearch
- Indexing: Real-time via Kafka events
- Frontend: Command bar component

**Validation**: `/docs/prd/validation-scenarios.md#CROSS-VAL-01`

---

### CROSS-US-002: Activity Feed

**Story ID**: CROSS-US-002
**Title**: View activity across all modules
**As a**: Manager
**I want**: A unified activity feed showing recent actions
**So that**: I can stay informed about team activities

**Priority**: 🟢 Medium
**Epic**: PLATFORM-EPIC-003 - User Experience
**Dependencies**: Event logging system

**Acceptance Criteria**:
- [ ] Real-time activity feed in sidebar
- [ ] Activities from all modules
- [ ] Filter by user, module, action type
- [ ] Activity details with context
- [ ] Click activity to navigate to source
- [ ] Configurable activity types
- [ ] Activity search and export

**Technical Notes**:
- Event sourcing: Kafka event log
- Storage: PostgreSQL activity table
- Real-time: WebSocket push notifications

**Validation**: `/docs/prd/validation-scenarios.md#CROSS-VAL-02`

---

## Story Statistics

### By Priority
- 🔴 **Critical**: 10 stories
- 🟡 **High**: 6 stories
- 🟢 **Medium**: 2 stories
- **Total**: 18 stories

### By Module
- **CRM**: 4 stories
- **ERP**: 3 stories
- **Email**: 2 stories
- **Workflow**: 2 stories
- **InoSec**: 2 stories
- **Platform**: 2 stories
- **Cross-Module**: 2 stories

### By Epic
- Lead Management: 2 stories
- Pipeline Management: 1 story
- CRM Analytics: 1 story
- Financial Management: 2 stories
- Inventory Management: 1 story
- Campaign Management: 1 story
- Email Analytics: 1 story
- Process Automation: 2 stories
- Threat Monitoring: 1 story
- Security Analytics: 1 story
- Multi-tenancy: 1 story
- Authentication: 1 story
- User Experience: 2 stories

---

## Implementation Roadmap

### Phase 1 (MVP v1.0) - Critical Stories
- CRM-US-001: Lead Capture
- CRM-US-003: Pipeline Kanban
- ERP-US-001: Invoice Generation
- ERP-US-002: Payment Processing
- WORKFLOW-US-001: Visual Workflow Builder
- WORKFLOW-US-002: Workflow Execution
- INOSEC-US-001: Threat Detection
- PLATFORM-US-001: Multi-Tenant Management

**Status**: ✅ Delivered (Nov 2024)

### Phase 2 (v1.1) - High Priority Stories
- CRM-US-002: Lead Enrichment
- CRM-US-004: CRM Analytics
- ERP-US-003: Inventory Management
- EMAIL-US-001: Email Campaigns
- EMAIL-US-002: Email Analytics
- INOSEC-US-002: Security Dashboard
- PLATFORM-US-002: SSO

**Status**: 🟡 In Progress (Q1 2025)

### Phase 3 (v1.2) - Medium Priority Stories
- CROSS-US-001: Unified Search
- CROSS-US-002: Activity Feed

**Status**: ⚪ Planned (Q2 2025)

---

## Linked Documentation

- **PRD**: `/docs/prd/v2.0.md`
- **Feature Map**: `/docs/prd/feature-map.md`
- **Validation Scenarios**: `/docs/prd/validation-scenarios.md`
- **Validation Report**: `/docs/mvp/validation-report.md`
- **Release Plan**: `/docs/mvp/release-plan.md`
- **Architecture**: `/docs/architecture/architecture.md`

---

**Last Updated**: January 2025
**Version**: 1.0
**Owner**: Product Management Office
