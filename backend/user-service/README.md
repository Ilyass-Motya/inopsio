# User Service

## Purpose
Manages user profiles, permissions, and user-related operations across the Inopsio platform.

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string for caching
- `JWT_SECRET`: JWT secret for token validation
- `USER_SERVICE_PORT`: Service port (default: 3002)

## Docker Run Command
```bash
docker run -d \
  --name user-service \
  -p 3002:3000 \
  -e DATABASE_URL=postgresql://user:pass@db:5432/inopsio \
  -e REDIS_URL=redis://redis:6379 \
  -e JWT_SECRET=your-secret \
  inopsio/user-service:latest
```

## Dependencies
- **Shared modules**: Uses `@inopsio/shared` for common utilities
- **Database**: PostgreSQL for user data storage
- **Cache**: Redis for user session caching
- **Auth Service**: Validates JWT tokens
