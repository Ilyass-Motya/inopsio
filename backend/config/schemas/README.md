# Configuration Schemas

This directory contains environment-specific variable validation schemas using JSON Schema and Zod for runtime configuration validation.

## Schema Categories

### Environment Validation
- **Development**: Development environment configuration validation
- **Staging**: Staging environment configuration validation
- **Production**: Production environment configuration validation
- **Testing**: Test environment configuration validation

### Service-Specific Schemas
- **Database**: Database connection and configuration validation
- **Authentication**: Auth service configuration validation
- **External APIs**: Third-party service configuration validation
- **Monitoring**: Monitoring and observability configuration validation

## Schema Implementation

### JSON Schema Validation
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "database": {
      "type": "object",
      "properties": {
        "host": { "type": "string", "format": "hostname" },
        "port": { "type": "integer", "minimum": 1, "maximum": 65535 },
        "username": { "type": "string", "minLength": 1 },
        "password": { "type": "string", "minLength": 8 },
        "database": { "type": "string", "minLength": 1 }
      },
      "required": ["host", "port", "username", "password", "database"]
    },
    "redis": {
      "type": "object",
      "properties": {
        "host": { "type": "string", "format": "hostname" },
        "port": { "type": "integer", "minimum": 1, "maximum": 65535 },
        "password": { "type": "string" }
      },
      "required": ["host", "port"]
    }
  },
  "required": ["database", "redis"]
}
```

### Zod Schema Validation
```typescript
import { z } from 'zod';

// Database configuration schema
const DatabaseConfigSchema = z.object({
  host: z.string().min(1),
  port: z.number().int().min(1).max(65535),
  username: z.string().min(1),
  password: z.string().min(8),
  database: z.string().min(1),
  ssl: z.boolean().optional().default(false),
  pool: z.object({
    min: z.number().int().min(0).default(2),
    max: z.number().int().min(1).default(10),
    idle: z.number().int().min(0).default(10000)
  }).optional()
});

// Redis configuration schema
const RedisConfigSchema = z.object({
  host: z.string().min(1),
  port: z.number().int().min(1).max(65535),
  password: z.string().optional(),
  db: z.number().int().min(0).max(15).default(0),
  retryDelayOnFailover: z.number().int().min(0).default(100),
  maxRetriesPerRequest: z.number().int().min(0).default(3)
});

// Complete application configuration schema
const AppConfigSchema = z.object({
  nodeEnv: z.enum(['development', 'staging', 'production', 'test']),
  port: z.number().int().min(1).max(65535).default(3000),
  database: DatabaseConfigSchema,
  redis: RedisConfigSchema,
  auth: z.object({
    jwtSecret: z.string().min(32),
    jwtExpiresIn: z.string().default('24h'),
    refreshTokenExpiresIn: z.string().default('7d'),
    bcryptRounds: z.number().int().min(10).max(15).default(12)
  }),
  monitoring: z.object({
    prometheus: z.object({
      enabled: z.boolean().default(true),
      port: z.number().int().min(1).max(65535).default(9090)
    }),
    jaeger: z.object({
      enabled: z.boolean().default(false),
      endpoint: z.string().url().optional()
    })
  })
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
```

## Environment-Specific Schemas

### Development Environment
```typescript
// development.config.schema.ts
export const DevelopmentConfigSchema = AppConfigSchema.extend({
  nodeEnv: z.literal('development'),
  database: DatabaseConfigSchema.extend({
    ssl: z.boolean().default(false),
    logging: z.boolean().default(true)
  }),
  auth: z.object({
    jwtSecret: z.string().default('dev-secret-key'),
    jwtExpiresIn: z.string().default('24h'),
    bcryptRounds: z.number().int().default(10)
  }),
  monitoring: z.object({
    prometheus: z.object({
      enabled: z.boolean().default(true)
    }),
    jaeger: z.object({
      enabled: z.boolean().default(true)
    })
  })
});
```

### Production Environment
```typescript
// production.config.schema.ts
export const ProductionConfigSchema = AppConfigSchema.extend({
  nodeEnv: z.literal('production'),
  database: DatabaseConfigSchema.extend({
    ssl: z.boolean().default(true),
    logging: z.boolean().default(false)
  }),
  auth: z.object({
    jwtSecret: z.string().min(64),
    jwtExpiresIn: z.string().default('1h'),
    bcryptRounds: z.number().int().min(12).max(15)
  }),
  monitoring: z.object({
    prometheus: z.object({
      enabled: z.boolean().default(true)
    }),
    jaeger: z.object({
      enabled: z.boolean().default(true)
    })
  })
});
```

## Service-Specific Schemas

### Authentication Service
```typescript
// auth-service.config.schema.ts
export const AuthServiceConfigSchema = z.object({
  keycloak: z.object({
    baseUrl: z.string().url(),
    realm: z.string().min(1),
    clientId: z.string().min(1),
    clientSecret: z.string().min(1),
    adminUsername: z.string().min(1),
    adminPassword: z.string().min(8)
  }),
  jwt: z.object({
    secret: z.string().min(32),
    expiresIn: z.string().default('15m'),
    refreshExpiresIn: z.string().default('7d'),
    issuer: z.string().min(1),
    audience: z.string().min(1)
  }),
  mfa: z.object({
    enabled: z.boolean().default(true),
    totpIssuer: z.string().default('Inopsio'),
    smsProvider: z.string().optional(),
    backupCodes: z.number().int().min(5).max(20).default(10)
  })
});
```

### AI Service Configuration
```typescript
// ai-service.config.schema.ts
export const AIServiceConfigSchema = z.object({
  models: z.object({
    basePath: z.string().min(1),
    cacheSize: z.number().int().min(1).max(1000).default(100),
    timeout: z.number().int().min(1000).max(300000).default(30000)
  }),
  training: z.object({
    dataPath: z.string().min(1),
    modelPath: z.string().min(1),
    batchSize: z.number().int().min(1).max(1000).default(32),
    epochs: z.number().int().min(1).max(1000).default(100)
  }),
  inference: z.object({
    maxConcurrent: z.number().int().min(1).max(100).default(10),
    timeout: z.number().int().min(1000).max(60000).default(30000)
  })
});
```

## Validation Implementation

### Runtime Validation
```typescript
// config/validation.ts
import { z } from 'zod';
import { AppConfigSchema } from './schemas/app.config.schema';

export function validateConfig(config: unknown): AppConfig {
  try {
    return AppConfigSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Configuration validation failed:');
      error.errors.forEach((err) => {
        console.error(`- ${err.path.join('.')}: ${err.message}`);
      });
      throw new Error('Invalid configuration');
    }
    throw error;
  }
}

// Usage in application startup
const config = validateConfig(process.env);
```

### Environment Variable Loading
```typescript
// config/loader.ts
import { config } from 'dotenv';
import { validateConfig } from './validation';

// Load environment variables
config();

// Validate configuration on startup
const appConfig = validateConfig({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '3000'),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12')
  }
});

export default appConfig;
```

## Best Practices

### Schema Design
- **Comprehensive Validation**: Validate all configuration parameters
- **Environment-Specific**: Different schemas for different environments
- **Type Safety**: Use TypeScript for compile-time type checking
- **Documentation**: Document all configuration options

### Error Handling
- **Clear Error Messages**: Provide detailed validation error messages
- **Graceful Degradation**: Handle missing optional configuration
- **Logging**: Log configuration validation results
- **Monitoring**: Monitor configuration validation failures

### Security
- **Sensitive Data**: Never log sensitive configuration values
- **Secret Management**: Use secure secret management for sensitive config
- **Access Control**: Restrict access to configuration files
- **Audit Logging**: Log configuration changes

## Getting Started

1. **Install Dependencies**: Install Zod and JSON Schema validation libraries
2. **Define Schemas**: Create schema definitions for your configuration
3. **Implement Validation**: Add runtime configuration validation
4. **Test Validation**: Test configuration validation with different inputs
5. **Monitor**: Monitor configuration validation in production

For detailed schema definitions and examples, see the individual schema files.
