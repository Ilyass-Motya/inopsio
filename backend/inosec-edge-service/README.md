# Inosec Edge Service

## Purpose
OT (Operational Technology) cybersecurity platform managing industrial control systems, SCADA security, and OT threat detection.

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string for OT threat cache
- `JWT_SECRET`: JWT secret for authentication
- `INOSEC_EDGE_PORT`: Service port (default: 3010)
- `OT_PROTOCOL_HANDLERS`: Supported OT protocols (Modbus, DNP3, etc.)
- `INDUSTRIAL_IOT_ENDPOINT`: Industrial IoT device management endpoint

## Docker Run Command
```bash
docker run -d \
  --name inosec-edge-service \
  -p 3010:3000 \
  -e DATABASE_URL=postgresql://user:pass@db:5432/inopsio \
  -e REDIS_URL=redis://redis:6379 \
  -e JWT_SECRET=your-secret \
  -e OT_PROTOCOL_HANDLERS=modbus,dnp3,iec61850 \
  inopsio/inosec-edge-service:latest
```

## Dependencies
- **Shared modules**: Uses `@inopsio/shared` for common utilities
- **Database**: PostgreSQL for OT security events
- **Cache**: Redis for OT protocol rules and threat patterns
- **External**: Industrial security standards, OT threat feeds
