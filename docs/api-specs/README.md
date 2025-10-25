# API Specifications

OpenAPI/Swagger specifications for all Inopsio microservices.

## Available API Specs

### Core Services
- ✅ `backend-openapi.yml` - Unified API Gateway documentation
- ✅ `auth-service.yml` - Authentication and authorization
- ✅ `tenant-service.yml` - Multi-tenant management

### Business Services
- ✅ `crm-service.yml` - Customer Relationship Management
- ✅ `erp-service.yml` - Enterprise Resource Planning
- ✅ `email-service.yml` - Email marketing and campaigns
- ✅ `workflow-service.yml` - Business process automation
- ✅ `monitoring-service.yml` - System monitoring and metrics

### AI & Security Services
- ✅ `ai-service.yml` - AI/ML model management
- ✅ `inosec-core-service.yml` - Core cybersecurity platform
- ✅ `inosec-edge-service.yml` - Edge device management

## Viewing API Docs

### Online Viewers
- **Swagger UI**: Import YAML files to https://editor.swagger.io
- **Redoc**: Better documentation rendering
- **Postman**: Import for API testing

### Local Setup
```bash
# Install Swagger UI locally
npm install -g swagger-ui-watcher

# View API spec
swagger-ui-watcher docs/api-specs/backend-openapi.yml
```

## API Standards

### Authentication
All APIs use JWT Bearer token authentication:
```
Authorization: Bearer <jwt_token>
```

### Response Format
Standard JSON response structure:
```json
{
  "data": {},
  "meta": {},
  "errors": []
}
```

### Error Codes
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

### Rate Limiting
- Default: 1000 requests/hour per API key
- Enterprise: 10000 requests/hour

## API Versioning
- Current version: `v1`
- Base URL: `https://api.inopsio.com/v1/`
- Version in URL path (not headers)

## Related Documentation
- **Architecture**: `/docs/architecture/`
- **Developer Guide**: `/docs/dev/`
- **Integration Guide**: `/docs/tenant-guide/`
