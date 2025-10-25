# CRM Service

## Purpose
Customer Relationship Management service handling leads, contacts, deals, and sales pipeline management.

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string for caching
- `JWT_SECRET`: JWT secret for authentication
- `CRM_SERVICE_PORT`: Service port (default: 3003)
- `EMAIL_SERVICE_URL`: Email service endpoint

## Docker Run Command
```bash
docker run -d \
  --name crm-service \
  -p 3003:3000 \
  -e DATABASE_URL=postgresql://user:pass@db:5432/inopsio \
  -e REDIS_URL=redis://redis:6379 \
  -e JWT_SECRET=your-secret \
  -e EMAIL_SERVICE_URL=http://email-service:3005 \
  inopsio/crm-service:latest
```

## Dependencies
- **Shared modules**: Uses `@inopsio/shared` for common utilities
- **Database**: PostgreSQL for CRM data
- **Cache**: Redis for lead scoring and pipeline caching
- **Email Service**: For automated follow-ups and notifications
