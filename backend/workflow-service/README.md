# Workflow Service

## Purpose
Manages business process automation, workflow definitions, and execution engines.

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string for workflow state
- `JWT_SECRET`: JWT secret for authentication
- `WORKFLOW_SERVICE_PORT`: Service port (default: 3007)
- `AI_SERVICE_URL`: AI service endpoint for intelligent automation

## Docker Run Command
```bash
docker run -d \
  --name workflow-service \
  -p 3007:3000 \
  -e DATABASE_URL=postgresql://user:pass@db:5432/inopsio \
  -e REDIS_URL=redis://redis:6379 \
  -e JWT_SECRET=your-secret \
  -e AI_SERVICE_URL=http://ai-service:3008 \
  inopsio/workflow-service:latest
```

## Dependencies
- **Shared modules**: Uses `@inopsio/shared` for common utilities
- **Database**: PostgreSQL for workflow definitions
- **Cache**: Redis for workflow state management
- **AI Service**: For intelligent workflow suggestions
