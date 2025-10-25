# Inosec Core Service

## Purpose
IT cybersecurity platform managing threat detection, vulnerability assessment, and security monitoring for IT infrastructure.

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string for threat intelligence cache
- `JWT_SECRET`: JWT secret for authentication
- `INOSEC_CORE_PORT`: Service port (default: 3009)
- `THREAT_INTEL_API`: External threat intelligence API endpoint
- `SIEM_ENDPOINT`: SIEM system integration endpoint

## Docker Run Command
```bash
docker run -d \
  --name inosec-core-service \
  -p 3009:3000 \
  -e DATABASE_URL=postgresql://user:pass@db:5432/inopsio \
  -e REDIS_URL=redis://redis:6379 \
  -e JWT_SECRET=your-secret \
  -e THREAT_INTEL_API=https://api.threatintel.com \
  inopsio/inosec-core-service:latest
```

## Dependencies
- **Shared modules**: Uses `@inopsio/shared` for common utilities
- **Database**: PostgreSQL for security events and policies
- **Cache**: Redis for threat intelligence and rules
- **External**: Threat intelligence feeds, SIEM systems
