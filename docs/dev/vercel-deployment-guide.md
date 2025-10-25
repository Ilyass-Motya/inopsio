# Vercel Deployment Guide - Marketing Website

Complete guide for deploying the Inopsio marketing website to Vercel with CI/CD.

**Last Updated**: January 2025
**Status**: Production-ready workflow

---

## 🎯 Overview

### Deployment Strategy

```
┌─────────────────────────────────────────────┐
│           Development Workflow               │
└─────────────────────────────────────────────┘

Local Development
    ↓
Feature Branch (e.g., feature/new-homepage)
    ↓
Push to GitHub
    ↓
┌─────────────────────────────────────────────┐
│  Vercel Preview Deployment (Automatic)      │
│  URL: marketing-git-feature-*.vercel.app    │
│  - Unique URL per branch                    │
│  - Shareable with team/clients              │
│  - Comments added to PR automatically       │
└─────────────────────────────────────────────┘
    ↓
Code Review & Testing
    ↓
Merge to main
    ↓
┌─────────────────────────────────────────────┐
│  Production Deployment (Automatic)          │
│  URL: inopsio.com                           │
│  - Instant deployment on merge              │
│  - Automatic HTTPS                          │
│  - Edge caching globally                    │
└─────────────────────────────────────────────┘
```

---

## 📋 Prerequisites

### 1. Accounts Needed
- ✅ GitHub account (repository access)
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ Domain (optional: inopsio.com for custom domain)

### 2. Required Files
- ✅ `frontend/apps/marketing/package.json`
- ✅ `frontend/apps/marketing/next.config.js`
- ✅ `frontend/apps/marketing/vercel.json` (optional config)
- ✅ `frontend/apps/marketing/.env.example` (environment variables)

---

## 🚀 Initial Vercel Setup (One-Time)

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub repositories

### Step 2: Import Project

1. From Vercel dashboard, click **"Add New Project"**
2. Select your GitHub organization/account
3. Find the **`Inopsio`** repository
4. Click **"Import"**

### Step 3: Configure Project Settings

**Framework Preset**: Next.js (auto-detected) ✅

**Root Directory**:
```
frontend/apps/marketing
```

**Build & Development Settings**:
```
Build Command:        pnpm run build
Output Directory:     .next
Install Command:      pnpm install
Development Command:  pnpm run dev
```

**Node.js Version**: `20.x` (recommended)

### Step 4: Add Environment Variables

In Vercel Project Settings → Environment Variables, add:

#### **Production Environment**
```bash
# App Config
NEXT_PUBLIC_APP_URL=https://inopsio.com
NEXT_PUBLIC_APP_NAME=Inopsio
NEXT_PUBLIC_APP_ENV=production

# CMS
NEXT_PUBLIC_CMS_URL=https://cms.inopsio.com
CMS_API_TOKEN=your_production_cms_token

# Analytics
NEXT_PUBLIC_GA_ID=G-YOUR_GA_ID
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=inopsio.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Email Service
EMAIL_SERVICE_API_KEY=your_sendgrid_key
EMAIL_FROM_ADDRESS=noreply@inopsio.com
EMAIL_TO_ADDRESS=contact@inopsio.com

# Feature Flags
NEXT_PUBLIC_ENABLE_BLOG=true
NEXT_PUBLIC_ENABLE_DEMO_BOOKING=true
```

#### **Preview Environment**
Same as production but with:
```bash
NEXT_PUBLIC_APP_URL=https://preview.inopsio.com
NEXT_PUBLIC_APP_ENV=preview
NEXT_PUBLIC_ENABLE_ANALYTICS=false  # Don't track preview analytics
```

#### **Development Environment**
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_ENV=development
CMS_API_TOKEN=your_dev_cms_token
```

**Tip**: Use Vercel's environment selector to set variables for specific environments.

### Step 5: Deploy!

1. Click **"Deploy"**
2. Vercel will:
   - Install dependencies
   - Run build command
   - Deploy to edge network
   - Generate preview URL

**First deployment takes ~2-3 minutes** ⏱️

---

## 🔄 Continuous Deployment Workflow

### Automatic Preview Deployments (Every PR)

**Trigger**: Push to any branch or open a PR

**What Happens**:
1. Vercel detects the push
2. Runs build automatically
3. Creates unique preview URL: `marketing-git-<branch-name>-<team>.vercel.app`
4. Adds comment to PR with preview URL
5. Updates preview on every commit

**Example**:
```bash
# Create feature branch
git checkout -b feature/new-pricing-page

# Make changes
code frontend/apps/marketing/src/app/pricing/page.tsx

# Commit and push
git add .
git commit -m "feat: add new pricing page"
git push origin feature/new-pricing-page

# Open PR on GitHub
# ✅ Vercel automatically creates preview deployment
# Preview URL: https://marketing-git-feature-new-pricing-page.vercel.app
```

### Automatic Production Deployments (Merge to Main)

**Trigger**: Merge PR to `main` branch

**What Happens**:
1. Vercel detects merge to main
2. Runs production build
3. Deploys to `inopsio.vercel.app` (or custom domain)
4. Automatic HTTPS with zero config
5. Global edge caching

**Example**:
```bash
# After PR is approved and merged
# ✅ Vercel automatically deploys to production
# Production URL: https://inopsio.com
```

---

## 🎨 Preview Deployment Features

### Share with Team/Clients
Each preview deployment gets a unique URL you can share:
```
https://marketing-git-feature-new-homepage-inopsio.vercel.app
```

**Perfect for**:
- ✅ Client reviews before merging
- ✅ Design feedback
- ✅ Stakeholder approvals
- ✅ QA testing

### Comments on Preview Deployments
Vercel adds comments to your GitHub PRs with:
- ✅ Preview URL
- ✅ Build status
- ✅ Build logs (if failed)
- ✅ Deployment time

### Lighthouse Scores (Optional)
Add Lighthouse CI to get performance scores on every preview:
```yaml
# Already configured in .github/workflows/marketing-deploy.yml
- Lighthouse scores posted as PR comment
- Track Core Web Vitals
- Catch performance regressions early
```

---

## 🌐 Custom Domain Setup

### Add Custom Domain (inopsio.com)

1. Go to Vercel Project Settings → Domains
2. Click **"Add Domain"**
3. Enter `inopsio.com`
4. Vercel provides DNS records to add

### DNS Configuration

Add these records to your domain registrar (Namecheap, GoDaddy, etc.):

**For Root Domain (inopsio.com)**:
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www Subdomain (www.inopsio.com)**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Automatic HTTPS**: Vercel automatically provisions SSL certificate ✅

**Propagation Time**: 24-48 hours (usually faster)

---

## 🔧 Advanced Configuration

### Vercel Edge Functions (API Routes)

Use Next.js API routes for serverless functions:

```typescript
// frontend/apps/marketing/src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Send email via SendGrid
  // ...

  return NextResponse.json({ success: true });
}
```

**Deployed automatically as Edge Function** ✅

### Environment-Specific Builds

**Preview builds**: Skip heavy optimizations for faster feedback
```json
// package.json
{
  "scripts": {
    "build": "next build",
    "build:preview": "SKIP_ENV_VALIDATION=true next build"
  }
}
```

### Vercel Analytics

Enable in Vercel dashboard:
1. Project Settings → Analytics
2. Toggle **"Enable Analytics"**
3. View Core Web Vitals, page views, and performance metrics

**Free tier includes**:
- ✅ Real User Monitoring (RUM)
- ✅ Core Web Vitals tracking
- ✅ Page load performance

---

## 📊 Monitoring & Logs

### View Deployment Logs

1. Go to Vercel dashboard
2. Click on deployment
3. View **"Build Logs"** and **"Function Logs"**

### Real-Time Function Logs

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Stream logs
vercel logs inopsio-marketing --follow
```

### Deployment Status

**Check deployment status**:
```bash
vercel ls
```

**Get deployment URL**:
```bash
vercel --prod  # Production URL
vercel         # Latest preview URL
```

---

## 🔄 Rollback & Revert

### Instant Rollback

1. Go to Vercel dashboard → Deployments
2. Find previous working deployment
3. Click **"Promote to Production"**
4. Instant rollback (no rebuild needed) ✅

### Redeploy from Git

```bash
# Revert commit locally
git revert <commit-hash>
git push origin main

# Vercel auto-deploys reverted code
```

---

## 🧪 Testing Deployments

### Preview URL Testing

```bash
# Get preview URL from PR comment, then test:
curl https://marketing-git-feature-branch.vercel.app
```

### Production Testing (after deployment)

```bash
# Test production
curl https://inopsio.com

# Check headers
curl -I https://inopsio.com
```

### Automated E2E Testing on Preview

Add to GitHub Actions (already configured):
```yaml
- name: Run E2E tests on preview
  run: |
    PREVIEW_URL=${{ steps.deploy.outputs.preview_url }}
    pnpm --filter marketing run test:e2e --base-url=$PREVIEW_URL
```

---

## 🔐 Security & Secrets

### Add Secrets to Vercel

**Never commit secrets to Git!**

Add via Vercel dashboard:
1. Project Settings → Environment Variables
2. Add secret (e.g., `CMS_API_TOKEN`)
3. Select environments: Production, Preview, Development
4. Click **"Save"**

### Access Secrets in Code

```typescript
// Automatic via environment variables
const cmsToken = process.env.CMS_API_TOKEN;
```

---

## 🚨 Troubleshooting

### Build Fails

**Check build logs**:
1. Go to failed deployment in Vercel dashboard
2. Click **"View Build Logs"**
3. Look for error messages

**Common issues**:
- ❌ Missing environment variables → Add in Vercel settings
- ❌ TypeScript errors → Run `pnpm type-check` locally
- ❌ Dependency issues → Delete `node_modules`, run `pnpm install`

### Preview Deployment Not Created

**Check**:
- ✅ Vercel GitHub app is installed and has repository access
- ✅ Branch is pushed to GitHub (not just local)
- ✅ Vercel project is connected to repository

### Custom Domain Not Working

**Check DNS propagation**:
```bash
dig inopsio.com
# Should return Vercel IP: 76.76.21.21
```

**Wait 24-48 hours for DNS propagation**

---

## 📋 Vercel CLI Commands (Optional)

### Install Vercel CLI

```bash
npm i -g vercel
```

### Common Commands

```bash
# Login
vercel login

# Link local project to Vercel
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# List deployments
vercel ls

# View logs
vercel logs

# Get environment variables
vercel env pull

# Remove deployment
vercel remove <deployment-url>
```

---

## 🎯 Best Practices

### 1. Use Preview Deployments for Reviews
✅ Always share preview URL with stakeholders before merging

### 2. Tag Production Deployments
✅ Add git tags for production releases:
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 3. Monitor Web Vitals
✅ Use Vercel Analytics to track Core Web Vitals

### 4. Use Environment Variables
✅ Never hardcode API keys or secrets in code

### 5. Enable Branch Protection
✅ Require PR reviews before merging to `main`

### 6. Test Before Merging
✅ Test preview deployments thoroughly before merging

---

## 📊 Deployment Checklist

### Before First Deployment
- [ ] Vercel account created and GitHub connected
- [ ] Project imported and configured
- [ ] Environment variables added
- [ ] Custom domain configured (if applicable)
- [ ] Team members invited to Vercel project

### Before Each Deployment
- [ ] Tests passing locally (`pnpm test`)
- [ ] Build successful locally (`pnpm build`)
- [ ] TypeScript checks passing (`pnpm type-check`)
- [ ] ESLint passing (`pnpm lint`)
- [ ] Environment variables updated (if needed)

### After Deployment
- [ ] Deployment successful in Vercel dashboard
- [ ] Website loads correctly (https://inopsio.com)
- [ ] Forms working (contact, newsletter)
- [ ] Analytics tracking (GA4/Plausible)
- [ ] SEO meta tags present (view page source)
- [ ] No console errors (Chrome DevTools)

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs
- **Vercel CLI Docs**: https://vercel.com/docs/cli
- **Vercel Status**: https://www.vercel-status.com

---

## 📞 Support

### Vercel Support
- **Documentation**: https://vercel.com/docs
- **Community**: https://github.com/vercel/vercel/discussions
- **Status Page**: https://www.vercel-status.com

### Internal Team
- **DevOps Lead**: devops@inopsio.com
- **Frontend Team**: frontend@inopsio.com
- **Slack Channel**: #deployments

---

**Last Updated**: January 2025
**Maintained By**: DevOps Team
**Review Cycle**: Quarterly
