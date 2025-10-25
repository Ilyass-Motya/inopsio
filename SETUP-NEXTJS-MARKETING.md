# Setup Next.js Marketing Website - Step by Step

**Your Vercel Configuration**:
- Domain: `inopsio-website.vercel.app`
- Project Name: `inopsio-website`
- Project ID: `prj_U8Kvo2KKfzkUTTitrgJVDFFIooW1`
- GitHub Repo: `https://github.com/Ilyass-Motya/inopsio`

**Technology Stack**:
- **Next.js 15** (Latest stable - October 2024)
- **React 19** (Latest)
- **TypeScript 5**
- **Tailwind CSS 4**

---

## 🚀 **Quick Setup (15 minutes)**

### **Step 1: Initialize Next.js 15 App** (5 min)

Navigate to the marketing app directory:
```bash
cd frontend/apps/marketing
```

Create Next.js 15 app with TypeScript and Tailwind:
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
```

**This will automatically install Next.js 15** (the latest stable version)

**When prompted, select**:
- ✅ Would you like to use TypeScript? **Yes**
- ✅ Would you like to use ESLint? **Yes**
- ✅ Would you like to use Tailwind CSS? **Yes**
- ✅ Would you like to use `src/` directory? **Yes**
- ✅ Would you like to use App Router? **Yes**
- ✅ Would you like to customize the default import alias? **No** (use @/*)

---

### **Step 2: Configure for Monorepo** (5 min)

Update `frontend/apps/marketing/package.json`:
```json
{
  "name": "@inopsio/marketing",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.0.1",
    "eslint": "^9",
    "eslint-config-next": "^15.1.0",
    "postcss": "^8",
    "tailwindcss": "^4.0.0",
    "typescript": "^5"
  }
}
```

**Note**: `dev` script uses `--turbo` flag for Turbopack (much faster dev server)

Update `frontend/apps/marketing/next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@inopsio/ui'],

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Inopsio',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://inopsio-website.vercel.app',
  },

  // Image optimization (Next.js 15)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },

  // Enable Turbopack for development (Next.js 15)
  // This is now stable in Next.js 15
  turbo: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

module.exports = nextConfig
```

**Next.js 15 Changes**:
- ✅ `images.remotePatterns` replaces `images.domains` (more secure)
- ✅ Turbopack configuration (stable in v15)
- ✅ Better performance and dev experience

Create `frontend/apps/marketing/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@inopsio/ui": ["../../packages/ui/src"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### **Step 3: Create Initial Pages** (3 min)

Create a simple landing page at `frontend/apps/marketing/src/app/page.tsx`:
```tsx
export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Welcome to Inopsio
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The All-in-One Business Platform
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#features"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}
```

Update `frontend/apps/marketing/src/app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inopsio - All-in-One Business Platform',
  description: 'Transform your business with our integrated CRM, ERP, Email Marketing, and Security Platform.',
  keywords: ['CRM', 'ERP', 'Business Platform', 'Email Marketing', 'Cybersecurity'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

---

### **Step 4: Configure Environment Variables** (2 min)

Create `frontend/apps/marketing/.env.local`:
```bash
# App Configuration
NEXT_PUBLIC_APP_NAME=Inopsio
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Vercel (Production)
# These will be set in Vercel dashboard
# NEXT_PUBLIC_APP_URL=https://inopsio-website.vercel.app
```

Add to `.gitignore` (at project root):
```
# Environment files
.env.local
.env*.local

# Next.js
.next/
out/
build/
dist/

# Dependencies
node_modules/
```

---

### **Step 5: Test Locally** (2 min)

```bash
# From frontend/apps/marketing directory
pnpm install

# Start dev server
pnpm dev
```

Open browser: http://localhost:3000

You should see your landing page! ✅

---

### **Step 6: Commit and Push to GitHub** (3 min)

```bash
# Navigate back to project root
cd ../../..

# Stage all changes
git add .

# Commit
git commit -m "feat: initialize Next.js 14 marketing website with landing page"

# Push to GitHub
git push origin main
```

---

### **Step 7: Verify Vercel Auto-Deployment** (2 min)

1. Go to your Vercel dashboard: https://vercel.com/inopsio-dev
2. Click on **"inopsio-website"** project
3. You should see a new deployment in progress
4. Wait ~1-2 minutes for build to complete
5. ✅ Visit: https://inopsio-website.vercel.app

**Your website should now be live!** 🎉

---

## 📋 **Verification Checklist**

- [ ] Next.js app created in `frontend/apps/marketing/`
- [ ] Local dev server runs: `pnpm dev` works at http://localhost:3000
- [ ] TypeScript configured with no errors
- [ ] Tailwind CSS working (gradient background visible)
- [ ] Code pushed to GitHub: https://github.com/Ilyass-Motya/inopsio
- [ ] Vercel auto-deployed successfully
- [ ] Website live at: https://inopsio-website.vercel.app

---

## 🔧 **Troubleshooting**

### **Issue: `create-next-app` fails**
```bash
# Clear npm cache
npm cache clean --force

# Try with specific version
npx create-next-app@14.1.0 . --typescript --tailwind --app
```

### **Issue: `pnpm install` fails**
```bash
# From project root, install pnpm workspace
cd ../..
pnpm install
```

### **Issue: Vercel doesn't auto-deploy**
1. Go to Vercel dashboard → Settings → Git
2. Verify connected to: `Ilyass-Motya/inopsio`
3. Verify root directory: `frontend/apps/marketing`
4. Check build command: `pnpm build` (or leave empty for auto-detect)

### **Issue: Build fails on Vercel**
Check Vercel build logs:
1. Vercel Dashboard → Deployments → Click failed deployment
2. View build logs
3. Common fixes:
   - Add `pnpm-lock.yaml` to git
   - Verify `package.json` scripts are correct
   - Check environment variables in Vercel dashboard

---

## 🎯 **After Successful Deployment**

### **Next Steps** (Phase 1 Development):

1. **Add more pages**:
   - `/about` - Company information
   - `/features` - Product features
   - `/pricing` - Pricing plans
   - `/contact` - Contact form

2. **Set up design system**:
   - Create `frontend/packages/ui/` components
   - Import shared components in marketing app

3. **Add CMS integration**:
   - Install Strapi or Payload CMS
   - Connect to marketing website for blog/content

4. **Set up CI/CD**:
   - Add GitHub secrets (VERCEL_TOKEN, etc.)
   - GitHub Actions will run tests on every PR

---

## 📚 **Useful Commands**

```bash
# Development
cd frontend/apps/marketing
pnpm dev                 # Start dev server
pnpm build               # Build for production
pnpm start               # Start production server
pnpm lint                # Run ESLint
pnpm type-check          # Run TypeScript checks

# Git workflow
git status               # Check changes
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push origin main     # Push to GitHub
```

---

## 🔗 **Your Links**

- **Local Dev**: http://localhost:3000
- **Production**: https://inopsio-website.vercel.app
- **GitHub Repo**: https://github.com/Ilyass-Motya/inopsio
- **Vercel Dashboard**: https://vercel.com/inopsio-dev/inopsio-website
- **Vercel Deployments**: https://vercel.com/inopsio-dev/inopsio-website/deployments

---

**Ready?** Start with Step 1 and follow the guide! 🚀

Your first deployment should take about 15 minutes total.
