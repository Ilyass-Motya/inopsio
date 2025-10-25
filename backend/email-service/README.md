# Email Service

## Purpose
Handles email communications, templates, campaigns, and email automation workflows.

## Environment Variables
- `SMTP_HOST`: SMTP server hostname
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password
- `EMAIL_SERVICE_PORT`: Service port (default: 3005)
- `REDIS_URL`: Redis connection string for queue management

## Docker Run Command
```bash
docker run -d \
  --name email-service \
  -p 3005:3000 \
  -e SMTP_HOST=smtp.gmail.com \
  -e SMTP_PORT=587 \
  -e SMTP_USER=your-email@gmail.com \
  -e SMTP_PASS=your-app-password \
  -e REDIS_URL=redis://redis:6379 \
  inopsio/email-service:latest
```

## Dependencies
- **Shared modules**: Uses `@inopsio/shared` for common utilities
- **Queue**: Redis for email queue management
- **Templates**: Email template engine
- **External**: SMTP providers, email analytics APIs
