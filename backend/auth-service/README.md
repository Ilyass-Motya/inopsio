# Auth Service

## Purpose
Handles authentication and authorization for the Inopsio platform. Supports OAuth2, Microsoft SSO, and Keycloak integration.

## Environment Variables
- `JWT_SECRET`: Secret key for JWT token signing
- `KEYCLOAK_URL`: Keycloak server URL
- `KEYCLOAK_REALM`: Keycloak realm name
- `MICROSOFT_CLIENT_ID`: Microsoft OAuth client ID
- `MICROSOFT_CLIENT_SECRET`: Microsoft OAuth client secret
- `REDIS_URL`: Redis connection string for session storage

## Docker Run Command
```bash
docker run -d \
  --name auth-service \
  -p 3001:3000 \
  -e JWT_SECRET=your-secret \
  -e KEYCLOAK_URL=http://keycloak:8080 \
  -e REDIS_URL=redis://redis:6379 \
  inopsio/auth-service:latest
```

## Dependencies
- **Shared modules**: Uses `@inopsio/shared` for common utilities
- **Database**: PostgreSQL for user data
- **Cache**: Redis for session management
- **External**: Keycloak, Microsoft Graph API
