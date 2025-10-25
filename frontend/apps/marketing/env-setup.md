# Environment Variables Setup

## Create .env.local file

Create a `.env.local` file in the `frontend/apps/marketing/` directory with the following content:

```bash
# App Configuration
NEXT_PUBLIC_APP_NAME=Inopsio
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Vercel (Production)
# These will be set in Vercel dashboard
# NEXT_PUBLIC_APP_URL=https://inopsio-website.vercel.app
```

## Environment Variables Explained

- `NEXT_PUBLIC_APP_NAME`: The name of your application (used in metadata)
- `NEXT_PUBLIC_APP_URL`: The base URL for your application
  - Local development: `http://localhost:3000`
  - Production: `https://inopsio-website.vercel.app`

## Vercel Configuration

In your Vercel dashboard, set these environment variables:
- `NEXT_PUBLIC_APP_NAME`: Inopsio
- `NEXT_PUBLIC_APP_URL`: https://inopsio-website.vercel.app

## Security Note

The `.env.local` file is already included in `.gitignore` and will not be committed to version control.
