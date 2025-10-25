# ERP Service

## Purpose
Enterprise Resource Planning service managing inventory, orders, suppliers, and financial operations.

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string for caching
- `JWT_SECRET`: JWT secret for authentication
- `ERP_SERVICE_PORT`: Service port (default: 3004)
- `INVENTORY_SERVICE_URL`: Inventory management endpoint

## Docker Run Command
```bash
docker run -d \
  --name erp-service \
  -p 3004:3000 \
  -e DATABASE_URL=postgresql://user:pass@db:5432/inopsio \
  -e REDIS_URL=redis://redis:6379 \
  -e JWT_SECRET=your-secret \
  -e INVENTORY_SERVICE_URL=http://inventory-service:3006 \
  inopsio/erp-service:latest
```

## Dependencies
- **Shared modules**: Uses `@inopsio/shared` for common utilities
- **Database**: PostgreSQL for ERP data
- **Cache**: Redis for inventory and order caching
- **External APIs**: Supplier APIs, payment gateways
