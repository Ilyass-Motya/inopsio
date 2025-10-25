# Vercel Deployment Workflow - Visual Guide

**Your Current Setup**:
- GitHub Org: `@inopsio`
- Personal Account: `ilyassmpremium-6244`
- Vercel Project ID: `prj_U8Kvo2KKfzkUTTitrgJVDFFIooW1`

---

## 🔄 **Complete CI/CD Flow**

```
┌─────────────────────────────────────────────────────────────────┐
│                     LOCAL DEVELOPMENT                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ git push
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       GITHUB REPOSITORY                          │
│                    github.com/inopsio/Inopsio                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
        Feature Branch              Main Branch
              │                         │
              ▼                         ▼
    ┌─────────────────────┐   ┌─────────────────────┐
    │  GITHUB ACTIONS     │   │  GITHUB ACTIONS     │
    │  - Run ESLint       │   │  - Run ESLint       │
    │  - TypeScript       │   │  - TypeScript       │
    │  - Unit Tests       │   │  - Unit Tests       │
    │  - Lighthouse CI    │   │  - Build & Deploy   │
    └─────────────────────┘   └─────────────────────┘
              │                         │
              ▼                         ▼
    ┌─────────────────────┐   ┌─────────────────────┐
    │  VERCEL PREVIEW     │   │  VERCEL PRODUCTION  │
    │  marketing-git-     │   │  inopsio.com        │
    │  feature-*.vercel   │   │  (or *.vercel.app)  │
    └─────────────────────┘   └─────────────────────┘
              │                         │
              ▼                         ▼
    ┌─────────────────────┐   ┌─────────────────────┐
    │  PR Comment         │   │  LIVE WEBSITE       │
    │  "Preview ready!"   │   │  Public Access      │
    │  [Preview URL]      │   │  Global CDN         │
    └─────────────────────┘   └─────────────────────┘
```

---

## 🏗️ **Architecture Overview**

```
┌──────────────────────────────────────────────────────────────┐
│                        YOUR SETUP                             │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Developer (You)                                              │
│       │                                                       │
│       └─── Local Machine                                     │
│              │                                                │
│              ├─── Git Repository (Local)                     │
│              └─── VSCode / Editor                            │
│                                                               │
│       git push                                                │
│       │                                                       │
│       ▼                                                       │
│  GitHub (@inopsio/Inopsio)                                    │
│       │                                                       │
│       ├─── Repository Source Code                            │
│       ├─── GitHub Actions (CI/CD)                            │
│       │      ├─── .github/workflows/marketing-deploy.yml     │
│       │      └─── Secrets (VERCEL_TOKEN, etc.)               │
│       │                                                       │
│       └─── Webhooks                                           │
│              │                                                │
│              └─── Triggers ──────────────┐                   │
│                                          │                    │
│                                          ▼                    │
│  Vercel (ilyassmpremium-6244)                                 │
│       │                                                       │
│       ├─── Build System                                       │
│       │      ├─── Install dependencies                        │
│       │      ├─── Run next build                             │
│       │      └─── Optimize assets                            │
│       │                                                       │
│       ├─── Edge Network                                       │
│       │      ├─── Global CDN                                  │
│       │      ├─── HTTPS/SSL                                   │
│       │      └─── Image Optimization                         │
│       │                                                       │
│       └─── Deployments                                        │
│              ├─── Preview (per branch/PR)                    │
│              └─── Production (main branch)                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔐 **Access & Permissions Flow**

```
┌─────────────────────────────────────────────────────────────┐
│  CURRENT ISSUE (Before Fix)                                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  @inopsio Organization (GitHub)                              │
│       │                                                      │
│       ├─── Repository: Inopsio                              │
│       │                                                      │
│       └─── Members:                                          │
│              └─── ilyassmpremium-6244 (You)                 │
│                                                              │
│                         ❌ NO ACCESS                         │
│                             │                                │
│                             ▼                                │
│  Vercel (Personal Account)                                   │
│       │                                                      │
│       └─── ilyassmpremium-6244                              │
│              │                                               │
│              └─── ❌ Can't access @inopsio repos            │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  AFTER FIX (Installing Vercel GitHub App)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  @inopsio Organization (GitHub)                              │
│       │                                                      │
│       ├─── Repository: Inopsio                              │
│       │                                                      │
│       ├─── Members:                                          │
│       │      └─── ilyassmpremium-6244 (You)                 │
│       │                                                      │
│       └─── Installed Apps:                                   │
│              └─── Vercel GitHub App ✅                       │
│                      │                                       │
│                      └─── Access granted to: Inopsio repo    │
│                                                              │
│                         ✅ ACCESS GRANTED                    │
│                             │                                │
│                             ▼                                │
│  Vercel (Personal Account)                                   │
│       │                                                      │
│       └─── ilyassmpremium-6244                              │
│              │                                               │
│              └─── ✅ Can now deploy @inopsio/Inopsio        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 **Deployment Process (Step-by-Step)**

### **Scenario 1: Feature Development → Preview Deployment**

```
Step 1: Developer creates feature branch
┌──────────────────────────────────────┐
│ Local: git checkout -b feature/new   │
│ Local: code src/app/page.tsx         │
│ Local: git commit -m "feat: new"     │
│ Local: git push origin feature/new   │
└──────────────────────────────────────┘
                  │
                  ▼
Step 2: GitHub receives push
┌──────────────────────────────────────┐
│ GitHub: New push detected             │
│ GitHub: Triggers webhook to Vercel    │
└──────────────────────────────────────┘
                  │
                  ▼
Step 3: Vercel builds preview
┌──────────────────────────────────────┐
│ Vercel: Clone repository              │
│ Vercel: Install dependencies          │
│ Vercel: Run build (pnpm build)        │
│ Vercel: Optimize assets               │
│ Vercel: Deploy to Edge Network        │
└──────────────────────────────────────┘
                  │
                  ▼
Step 4: Preview URL created
┌──────────────────────────────────────┐
│ Vercel: Creates unique URL            │
│ URL: marketing-git-feature-new.vercel │
│ Vercel: Adds comment to PR            │
└──────────────────────────────────────┘
                  │
                  ▼
Step 5: Share with team
┌──────────────────────────────────────┐
│ Developer: Share preview URL          │
│ Team: Reviews changes live            │
│ Client: Approves design               │
└──────────────────────────────────────┘
```

### **Scenario 2: Merge to Main → Production Deployment**

```
Step 1: PR approved and merged
┌──────────────────────────────────────┐
│ GitHub: PR merged to main             │
│ GitHub: Triggers production webhook   │
└──────────────────────────────────────┘
                  │
                  ▼
Step 2: Vercel builds production
┌──────────────────────────────────────┐
│ Vercel: Clone main branch             │
│ Vercel: Install dependencies          │
│ Vercel: Run production build          │
│ Vercel: Optimize for production       │
│ Vercel: Deploy to production Edge     │
└──────────────────────────────────────┘
                  │
                  ▼
Step 3: Production updated
┌──────────────────────────────────────┐
│ Vercel: Updates inopsio.com           │
│ Global CDN: Caches new version        │
│ Users: See updated website            │
└──────────────────────────────────────┘
                  │
                  ▼
Step 4: Notifications (optional)
┌──────────────────────────────────────┐
│ Slack: "✅ Deployed to production"   │
│ Email: Deployment success             │
│ Dashboard: Deployment visible         │
└──────────────────────────────────────┘
```

---

## 🔧 **GitHub Actions Workflow**

```
Trigger: Push to GitHub
         │
         ▼
┌─────────────────────────────────────────┐
│  Job 1: Lint & Test (Parallel)         │
├─────────────────────────────────────────┤
│  ├─── Checkout code                     │
│  ├─── Setup Node.js 20                  │
│  ├─── Install pnpm                      │
│  ├─── Install dependencies              │
│  ├─── Run ESLint ──────────┐            │
│  ├─── Run TypeScript ──────┤            │
│  └─── Run Unit Tests ──────┤            │
│                            │             │
│                            ▼             │
│                      All Pass? ─────────┤──── ❌ Fail → Stop
│                            │             │
│                            ✅ Pass       │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Job 2: Lighthouse CI (If PR)           │
├─────────────────────────────────────────┤
│  ├─── Build Next.js app                 │
│  ├─── Run Lighthouse tests              │
│  ├─── Check Core Web Vitals             │
│  └─── Post scores to PR ────────────────┤──── Comment on PR
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Job 3: Deploy (If PR)                  │
├─────────────────────────────────────────┤
│  ├─── Install Vercel CLI                │
│  ├─── Pull Vercel config                │
│  ├─── Build for preview                 │
│  ├─── Deploy to Vercel ─────────────────┤──── Preview URL
│  └─── Comment on PR                     │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Job 4: Deploy Production (If main)     │
├─────────────────────────────────────────┤
│  ├─── Install Vercel CLI                │
│  ├─── Pull Vercel config                │
│  ├─── Build for production              │
│  ├─── Deploy to production ─────────────┤──── inopsio.com
│  └─── Send Slack notification           │
└─────────────────────────────────────────┘
```

---

## 🌐 **Vercel Edge Network**

```
┌───────────────────────────────────────────────────────────────┐
│                  VERCEL GLOBAL EDGE NETWORK                    │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  User Request (Browser)                                        │
│       │                                                        │
│       ▼                                                        │
│  Nearest Edge Location (Automatic)                             │
│       │                                                        │
│       ├─── North America ──► Washington DC, San Francisco     │
│       ├─── Europe ──────────► London, Frankfurt, Amsterdam    │
│       ├─── Asia Pacific ────► Tokyo, Singapore, Sydney        │
│       └─── South America ───► São Paulo                       │
│                                                                │
│  Edge Functions                                                │
│       ├─── Next.js Server Components                          │
│       ├─── API Routes (Serverless)                            │
│       └─── Middleware (Authentication, etc.)                  │
│                                                                │
│  Static Assets (Cached)                                        │
│       ├─── HTML, CSS, JS                                       │
│       ├─── Images (Optimized)                                 │
│       └─── Fonts                                               │
│                                                                │
│  Response Time: <100ms globally ✅                            │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

---

## 📊 **Deployment Timeline**

```
Development Cycle Timeline:

Hour 0:00 ──► Developer starts coding
Hour 0:30 ──► Commits changes locally
Hour 0:31 ──► Pushes to GitHub
Hour 0:32 ──► GitHub Actions triggered
Hour 0:33 ──► Vercel starts building
Hour 0:35 ──► Preview deployment ready ✅
            │
            └──► Preview URL available
            └──► Share with team
            └──► Collect feedback

Hour 2:00 ──► Feedback incorporated
Hour 2:01 ──► Push updates
Hour 2:03 ──► New preview ready ✅

Hour 4:00 ──► PR approved
Hour 4:01 ──► Merge to main
Hour 4:02 ──► Production build starts
Hour 4:04 ──► Production deployed ✅
            │
            └──► Live at inopsio.com
            └──► Global CDN updated

Average Times:
├─── Commit to preview: ~2-3 minutes
├─── Commit to production: ~2-3 minutes
└─── Build time: ~1-2 minutes
```

---

## 🔄 **Rollback Process**

```
Issue Detected in Production
         │
         ▼
Option 1: Instant Rollback (Recommended)
┌────────────────────────────────────┐
│  Go to Vercel Dashboard            │
│  ├─── Click "Deployments"          │
│  ├─── Find last working deployment │
│  └─── Click "Promote to Prod"      │
│         │                           │
│         ▼                           │
│  ✅ Instant rollback                │
│     (No rebuild needed!)            │
│     Takes: ~10 seconds              │
└────────────────────────────────────┘

Option 2: Git Revert (Alternative)
┌────────────────────────────────────┐
│  git revert <bad-commit-hash>      │
│  git push origin main               │
│         │                           │
│         ▼                           │
│  Triggers new deployment            │
│  Takes: ~2-3 minutes                │
└────────────────────────────────────┘
```

---

## 📝 **Configuration Files Reference**

```
Your Project Structure:

Inopsio/
├─── .github/
│    └─── workflows/
│         └─── marketing-deploy.yml ◄── GitHub Actions CI/CD
│
├─── frontend/
│    └─── apps/
│         └─── marketing/
│              ├─── vercel.json ◄────── Vercel configuration
│              ├─── .env.example ◄──── Environment variables
│              ├─── next.config.js ◄── Next.js config
│              └─── package.json ◄──── Dependencies
│
└─── docs/
     └─── dev/
          ├─── vercel-deployment-guide.md
          └─── deployment-workflow-diagram.md ◄── This file

Key Configuration Values:
├─── VERCEL_PROJECT_ID: prj_U8Kvo2KKfzkUTTitrgJVDFFIooW1
├─── GitHub Org: @inopsio
├─── Repository: inopsio/Inopsio
└─── Personal Account: ilyassmpremium-6244
```

---

**Last Updated**: January 2025
**Maintained By**: DevOps Team
