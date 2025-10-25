# Shared Test Fixtures

This directory contains reusable test fixtures, utilities, and common testing patterns used across all backend services to ensure test suite consistency.

## Test Fixture Categories

### Database Fixtures
- **User Data**: Test user accounts and profiles
- **Tenant Data**: Multi-tenant test data and configurations
- **Business Data**: CRM, ERP, and workflow test data
- **Security Data**: Authentication and authorization test data

### API Fixtures
- **Request/Response**: Common API request and response patterns
- **Authentication**: JWT tokens and authentication test data
- **Error Scenarios**: Error response fixtures and edge cases
- **Performance**: Load testing data and performance benchmarks

### Integration Fixtures
- **External Services**: Mock external service responses
- **Message Queues**: Event and message queue test data
- **File Storage**: File upload and storage test fixtures
- **Third-Party APIs**: Mock third-party API responses

## Database Test Fixtures

### User Test Data
```typescript
// fixtures/users.ts
export const testUsers = {
  admin: {
    id: 'user-admin-001',
    email: 'admin@inopsio.com',
    name: 'Admin User',
    role: 'admin',
    tenantId: 'tenant-001',
    permissions: ['read', 'write', 'delete', 'admin']
  },
  user: {
    id: 'user-regular-001',
    email: 'user@inopsio.com',
    name: 'Regular User',
    role: 'user',
    tenantId: 'tenant-001',
    permissions: ['read', 'write']
  },
  guest: {
    id: 'user-guest-001',
    email: 'guest@inopsio.com',
    name: 'Guest User',
    role: 'guest',
    tenantId: 'tenant-001',
    permissions: ['read']
  }
};

export const testTenants = {
  enterprise: {
    id: 'tenant-enterprise-001',
    name: 'Enterprise Corp',
    domain: 'enterprise.inopsio.com',
    plan: 'enterprise',
    features: ['crm', 'erp', 'ai', 'security']
  },
  startup: {
    id: 'tenant-startup-001',
    name: 'Startup Inc',
    domain: 'startup.inopsio.com',
    plan: 'startup',
    features: ['crm', 'basic-ai']
  }
};
```

### Business Data Fixtures
```typescript
// fixtures/business-data.ts
export const testCRMData = {
  leads: [
    {
      id: 'lead-001',
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      status: 'new',
      source: 'website',
      tenantId: 'tenant-001'
    }
  ],
  contacts: [
    {
      id: 'contact-001',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1-555-0123',
      company: 'Tech Inc',
      tenantId: 'tenant-001'
    }
  ],
  deals: [
    {
      id: 'deal-001',
      name: 'Enterprise License',
      value: 50000,
      stage: 'negotiation',
      tenantId: 'tenant-001'
    }
  ]
};

export const testERPData = {
  products: [
    {
      id: 'product-001',
      name: 'Software License',
      sku: 'SW-LIC-001',
      price: 1000,
      category: 'software',
      tenantId: 'tenant-001'
    }
  ],
  orders: [
    {
      id: 'order-001',
      customerId: 'customer-001',
      total: 5000,
      status: 'pending',
      tenantId: 'tenant-001'
    }
  ]
};
```

## API Test Fixtures

### Authentication Fixtures
```typescript
// fixtures/auth.ts
export const testTokens = {
  validJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  expiredJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  invalidJWT: 'invalid-token',
  refreshToken: 'refresh-token-123'
};

export const testAuthHeaders = {
  valid: {
    'Authorization': 'Bearer ' + testTokens.validJWT,
    'Content-Type': 'application/json'
  },
  expired: {
    'Authorization': 'Bearer ' + testTokens.expiredJWT,
    'Content-Type': 'application/json'
  },
  invalid: {
    'Authorization': 'Bearer ' + testTokens.invalidJWT,
    'Content-Type': 'application/json'
  }
};
```

### API Request/Response Fixtures
```typescript
// fixtures/api.ts
export const testRequests = {
  createUser: {
    method: 'POST',
    url: '/api/users',
    body: {
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    },
    headers: testAuthHeaders.valid
  },
  updateUser: {
    method: 'PUT',
    url: '/api/users/user-001',
    body: {
      name: 'Updated User',
      email: 'updated@example.com'
    },
    headers: testAuthHeaders.valid
  }
};

export const testResponses = {
  userCreated: {
    status: 201,
    body: {
      id: 'user-001',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      createdAt: '2024-01-01T00:00:00Z'
    }
  },
  userUpdated: {
    status: 200,
    body: {
      id: 'user-001',
      name: 'Updated User',
      email: 'updated@example.com',
      role: 'user',
      updatedAt: '2024-01-01T01:00:00Z'
    }
  },
  unauthorized: {
    status: 401,
    body: {
      error: 'Unauthorized',
      message: 'Invalid or expired token'
    }
  }
};
```

## Integration Test Fixtures

### External Service Mocks
```typescript
// fixtures/external-services.ts
export const mockExternalServices = {
  keycloak: {
    tokenEndpoint: 'http://localhost:8080/auth/realms/inopsio/protocol/openid-connect/token',
    userInfoEndpoint: 'http://localhost:8080/auth/realms/inopsio/protocol/openid-connect/userinfo',
    mockResponses: {
      validToken: {
        access_token: 'mock-access-token',
        token_type: 'Bearer',
        expires_in: 3600
      },
      userInfo: {
        sub: 'user-001',
        email: 'user@example.com',
        name: 'Test User',
        roles: ['user']
      }
    }
  },
  sendgrid: {
    apiKey: 'mock-sendgrid-api-key',
    mockResponses: {
      emailSent: {
        message_id: 'msg-001',
        status: 'sent'
      }
    }
  },
  stripe: {
    apiKey: 'sk_test_mock_stripe_key',
    mockResponses: {
      paymentIntent: {
        id: 'pi_001',
        status: 'succeeded',
        amount: 5000
      }
    }
  }
};
```

### Message Queue Fixtures
```typescript
// fixtures/message-queue.ts
export const testEvents = {
  userCreated: {
    type: 'user.created',
    data: {
      userId: 'user-001',
      email: 'user@example.com',
      tenantId: 'tenant-001'
    },
    timestamp: '2024-01-01T00:00:00Z'
  },
  orderPlaced: {
    type: 'order.placed',
    data: {
      orderId: 'order-001',
      customerId: 'customer-001',
      total: 5000,
      tenantId: 'tenant-001'
    },
    timestamp: '2024-01-01T00:00:00Z'
  }
};

export const testMessages = {
  emailNotification: {
    to: 'user@example.com',
    subject: 'Welcome to Inopsio',
    template: 'welcome-email',
    data: {
      name: 'Test User',
      tenantName: 'Test Tenant'
    }
  },
  smsNotification: {
    to: '+1-555-0123',
    message: 'Your order has been confirmed',
    data: {
      orderId: 'order-001'
    }
  }
};
```

## Performance Test Fixtures

### Load Testing Data
```typescript
// fixtures/performance.ts
export const loadTestData = {
  concurrentUsers: 1000,
  requestsPerSecond: 100,
  testDuration: '5m',
  scenarios: [
    {
      name: 'User Authentication',
      weight: 30,
      requests: [
        { method: 'POST', url: '/api/auth/login', body: { email: 'user@example.com', password: 'password' } }
      ]
    },
    {
      name: 'User Profile',
      weight: 40,
      requests: [
        { method: 'GET', url: '/api/users/profile' },
        { method: 'PUT', url: '/api/users/profile', body: { name: 'Updated Name' } }
      ]
    },
    {
      name: 'CRM Operations',
      weight: 30,
      requests: [
        { method: 'GET', url: '/api/crm/leads' },
        { method: 'POST', url: '/api/crm/leads', body: { name: 'New Lead', email: 'lead@example.com' } }
      ]
    }
  ]
};
```

## Test Utilities

### Database Utilities
```typescript
// utilities/database.ts
export class DatabaseTestUtils {
  static async seedTestData(connection: Connection) {
    await connection.query('INSERT INTO users VALUES (?, ?, ?, ?)', [
      'user-001', 'Test User', 'test@example.com', 'tenant-001'
    ]);
  }

  static async cleanupTestData(connection: Connection) {
    await connection.query('DELETE FROM users WHERE id LIKE "user-%"');
  }

  static async resetDatabase(connection: Connection) {
    await connection.query('TRUNCATE TABLE users');
    await connection.query('TRUNCATE TABLE tenants');
  }
}
```

### API Testing Utilities
```typescript
// utilities/api.ts
export class APITestUtils {
  static async makeRequest(request: any) {
    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify(request.body)
    });
    return {
      status: response.status,
      body: await response.json()
    };
  }

  static async authenticateUser(email: string, password: string) {
    const response = await this.makeRequest({
      method: 'POST',
      url: '/api/auth/login',
      body: { email, password }
    });
    return response.body.token;
  }
}
```

## Best Practices

### Test Fixture Design
- **Reusability**: Create fixtures that can be used across multiple test suites
- **Consistency**: Maintain consistent data structures and naming conventions
- **Isolation**: Ensure test fixtures don't interfere with each other
- **Cleanup**: Always clean up test data after tests complete

### Performance Considerations
- **Efficient Data**: Use minimal data sets for faster test execution
- **Parallel Execution**: Design fixtures to support parallel test execution
- **Memory Management**: Clean up large fixtures to prevent memory leaks
- **Database Optimization**: Use database transactions for test isolation

## Getting Started

1. **Import Fixtures**: Import required fixtures in your test files
2. **Setup Data**: Use fixtures to set up test data before tests
3. **Cleanup**: Clean up test data after tests complete
4. **Maintain**: Keep fixtures updated with schema changes
5. **Document**: Document any custom fixtures you create

For detailed fixture examples and usage patterns, see the individual fixture files.
