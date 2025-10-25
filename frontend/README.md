# Inopsio Frontend

## Overview
Multi-application frontend architecture for the Inopsio platform, including marketing site, dashboards, and specialized applications.

## Applications

### Core Applications
- **website/**: Marketing site (Next.js + Tailwind)
- **dashboard/**: Admin and control dashboard
- **email-dashboard/**: Email and communication center
- **crm/**: CRM platform UI
- **erp/**: ERP interface
- **automations/**: AI automations dashboard
- **workflows/**: Workflow management UI

### Security Applications
- **inosec-core/**: IT cybersecurity platform
- **inosec-edge/**: OT cybersecurity platform
- **inosec-one/**: Unified IT + OT platform

### Additional
- **mobile/**: Future mobile app (React Native / Flutter)
- **apps/**: Micro-frontend apps container

## Shared Resources
- **shared/**: Shared UI library
- **themes/**: White-label theming per tenant
- **styles/**: Global Tailwind/SASS variables
- **feature-flags/**: Feature toggles and rollouts
- **tenants/**: Tenant-level branding/configs
- **lib/**: Shared front-end logic (hooks, context, services)
- **utils/**: Utility functions

## Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker (for local development)

### Running Individual Apps
```bash
# Marketing site
cd website && npm run dev

# Admin dashboard
cd dashboard && npm run dev

# CRM platform
cd crm && npm run dev

# ERP interface
cd erp && npm run dev
```

### Shared Dependencies
All applications share common dependencies managed in the root `package.json`:
- React 18+
- Next.js 14+
- Tailwind CSS
- TypeScript
- ESLint & Prettier

### Testing
```bash
# Run tests for all apps
npm run test

# Run tests for specific app
cd website && npm run test

# Run linting
npm run lint

# Run type checking
npm run type-check
```

### Building
```bash
# Build all applications
npm run build

# Build specific application
cd website && npm run build
```

## Architecture
- **Micro-frontend**: Each app can be deployed independently
- **Monorepo Management**: Managed with Nx/Turborepo for optimal build caching and dependency management
- **Shared components**: Common UI components in `/shared/`
- **Theming**: Tenant-specific theming in `/themes/`
- **Feature flags**: Dynamic feature toggles in `/feature-flags/` with REST/GraphQL backend integration
- **Type Safety**: Shared TypeScript interfaces in `/lib/types/`

## Feature Flags Integration

### Backend Connectivity
Feature flags connect to backend services through multiple integration patterns:

#### REST API Integration
```typescript
// REST API for feature flag evaluation
const featureFlags = await fetch('/api/feature-flags', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(res => res.json());

// Real-time flag updates via polling
setInterval(async () => {
  const updatedFlags = await fetch('/api/feature-flags/updates');
  updateFeatureFlags(updatedFlags);
}, 30000);
```

#### GraphQL Integration
```typescript
// GraphQL query for feature flags
const GET_FEATURE_FLAGS = gql`
  query GetFeatureFlags($userId: ID!) {
    user(id: $userId) {
      featureFlags {
        name
        enabled
        rolloutPercentage
        userSegments
      }
    }
  }
`;

// Real-time updates via GraphQL subscriptions
const FEATURE_FLAG_UPDATES = gql`
  subscription OnFeatureFlagUpdate($userId: ID!) {
    featureFlagUpdated(userId: $userId) {
      name
      enabled
      rolloutPercentage
    }
  }
`;
```

#### WebSocket Integration
```typescript
// WebSocket connection for real-time flag updates
const ws = new WebSocket('wss://api.inopsio.com/feature-flags');
ws.onmessage = (event) => {
  const flagUpdate = JSON.parse(event.data);
  updateFeatureFlag(flagUpdate);
};
```
