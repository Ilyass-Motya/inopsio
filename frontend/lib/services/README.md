# Shared Services

This directory contains reusable API clients, data fetching wrappers, and service utilities used across all frontend applications.

## Service Categories

### API Clients (`api/`)
- **auth.service.ts**: Authentication and user management API client
- **crm.service.ts**: CRM operations and customer data API client
- **erp.service.ts**: ERP and inventory management API client
- **email.service.ts**: Email and communication API client
- **workflow.service.ts**: Workflow and automation API client
- **inosec.service.ts**: Security platform API client
- **ai.service.ts**: AI and machine learning API client

### Data Services (`data/`)
- **cache.service.ts**: Client-side caching utilities
- **storage.service.ts**: Local storage and session management
- **sync.service.ts**: Data synchronization and offline support
- **validation.service.ts**: Data validation and sanitization

### External Services (`external/`)
- **analytics.service.ts**: Analytics and telemetry integration
- **monitoring.service.ts**: Error tracking and performance monitoring
- **payment.service.ts**: Payment gateway integration
- **notification.service.ts**: Push notifications and alerts

### Utility Services (`utils/`)
- **http.service.ts**: HTTP client with interceptors and error handling
- **websocket.service.ts**: WebSocket connection management
- **file.service.ts**: File upload and download utilities
- **crypto.service.ts**: Client-side encryption and security utilities

## Usage

```typescript
// Import service clients
import { AuthService } from '@/lib/services/api/auth.service';
import { CacheService } from '@/lib/services/data/cache.service';
import { AnalyticsService } from '@/lib/services/external/analytics.service';

// Initialize services
const authService = new AuthService();
const cacheService = new CacheService();
const analyticsService = new AnalyticsService();
```

## Configuration

Services are configured through environment variables and can be customized per tenant:

```typescript
// Service configuration
const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID,
  features: process.env.NEXT_PUBLIC_FEATURES?.split(',') || []
};
```

## Error Handling

All services implement standardized error handling with:
- Automatic retry logic for transient failures
- Circuit breaker pattern for external services
- Structured error reporting
- User-friendly error messages

## Testing

Services include comprehensive test coverage:
- Unit tests for individual service methods
- Integration tests for API interactions
- Mock implementations for development
- Performance benchmarks for critical paths
