# Database Migration Scripts

This directory contains database migration scripts and utilities for managing schema changes across all microservices.

## Migration Structure

### Service-Specific Migrations
- **auth-service/**: Authentication and user management migrations
- **user-service/**: User profile and preferences migrations
- **crm-service/**: Customer relationship management migrations
- **erp-service/**: Enterprise resource planning migrations
- **email-service/**: Email templates and queue migrations
- **ai-service/**: AI model metadata and training data migrations
- **workflow-service/**: Workflow definitions and execution migrations
- **inosec-core/**: Core security platform migrations
- **inosec-edge/**: Edge security device migrations

### Migration Types
- **schema/**: Database schema changes (tables, indexes, constraints)
- **data/**: Data migrations and transformations
- **seeds/**: Initial data seeding scripts
- **rollback/**: Rollback scripts for failed migrations

## Migration Naming Convention

```
{timestamp}_{service}_{description}.sql
```

Examples:
- `20240101_001_auth_create_users_table.sql`
- `20240101_002_auth_add_user_preferences.sql`
- `20240101_003_crm_create_customers_table.sql`

## Migration Script Structure

```sql
-- Migration: {description}
-- Service: {service-name}
-- Author: {author}
-- Date: {date}
-- Dependencies: {list of dependent migrations}

BEGIN;

-- Forward migration
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Add constraints
ALTER TABLE users ADD CONSTRAINT chk_email_format 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

COMMIT;
```

## Rollback Script Structure

```sql
-- Rollback: {description}
-- Service: {service-name}
-- Author: {author}
-- Date: {date}

BEGIN;

-- Rollback operations
DROP INDEX IF EXISTS idx_users_email;
DROP TABLE IF EXISTS users;

COMMIT;
```

## Migration Execution

### Using Migration Tool
```bash
# Run all pending migrations
./migrate.sh up

# Run specific service migrations
./migrate.sh up --service auth-service

# Rollback last migration
./migrate.sh down

# Rollback specific migration
./migrate.sh down --version 20240101_001

# Check migration status
./migrate.sh status
```

### Manual Execution
```bash
# Connect to database
psql -h localhost -U inopsio_user -d inopsio_db

# Execute migration
\i migrations/20240101_001_auth_create_users_table.sql
```

## Environment-Specific Migrations

### Development
- All migrations run automatically on service startup
- Database is recreated from scratch each time
- Seed data is loaded for testing

### Staging
- Migrations run during deployment
- Database backup is created before migration
- Rollback plan is verified

### Production
- Migrations require manual approval
- Database backup is mandatory
- Blue-green deployment for zero-downtime migrations
- Rollback procedures are tested

## Migration Best Practices

### Schema Changes
1. **Always use IF NOT EXISTS** for CREATE statements
2. **Use IF EXISTS** for DROP statements
3. **Add constraints after data migration**
4. **Use transactions for atomicity**
5. **Test rollback procedures**

### Data Migrations
1. **Backup data before transformation**
2. **Use batch processing for large datasets**
3. **Validate data integrity after migration**
4. **Log migration progress and errors**

### Performance Considerations
1. **Add indexes during low-traffic periods**
2. **Use CONCURRENTLY for index creation**
3. **Monitor migration duration**
4. **Plan for maintenance windows**

## Migration Dependencies

```yaml
# migration-dependencies.yml
migrations:
  - version: "20240101_001"
    service: "auth-service"
    dependencies: []
    
  - version: "20240101_002"
    service: "user-service"
    dependencies: ["20240101_001"]
    
  - version: "20240101_003"
    service: "crm-service"
    dependencies: ["20240101_001", "20240101_002"]
```

## Monitoring and Logging

### Migration Logs
- All migrations are logged with timestamps
- Success/failure status is tracked
- Performance metrics are collected
- Error details are captured

### Health Checks
- Database connectivity verification
- Schema version validation
- Data integrity checks
- Performance impact assessment

## Troubleshooting

### Common Issues
1. **Migration timeout**: Increase timeout or split large migrations
2. **Constraint violations**: Check data before adding constraints
3. **Lock timeouts**: Use shorter transactions
4. **Disk space**: Monitor disk usage during migrations

### Recovery Procedures
1. **Identify failed migration**
2. **Restore from backup if necessary**
3. **Fix migration script**
4. **Re-run migration**
5. **Verify data integrity**
