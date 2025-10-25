# Vercel Quick Start Guide

**TL;DR**: Deploy your marketing website to Vercel in 5 minutes with automatic CI/CD.

---

## ✅ **Yes, Use Vercel for Marketing Website!**

### Why?
- ✅ **Every PR = Live Preview URL** (automatic!)
- ✅ **Merge to main = Production deployment** (automatic!)
- ✅ **Zero configuration** for Next.js
- ✅ **Free tier** perfect for your needs
- ✅ **Custom domain** (inopsio.com) with auto HTTPS

---

## 🚀 **5-Minute Setup**

### Step 1: Sign Up (1 min)
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"

### Step 2: Import Project (2 min)
1. Click "Add New Project"
2. Select `Inopsio` repository
3. Set **Root Directory**: `frontend/apps/marketing`
4. Click "Deploy"

### Step 3: Done! (2 min)
- ✅ Your site is live at `inopsio.vercel.app`
- ✅ Every PR gets a preview URL
- ✅ Merge to main = production deployment

---

## 🔄 **How CI/CD Works**

### Development Workflow
```
1. Create feature branch
   git checkout -b feature/new-page

2. Make changes
   code src/app/page.tsx

3. Push to GitHub
   git push origin feature/new-page

4. ✨ Vercel automatically:
   - Detects push
   - Builds your app
   - Creates preview URL
   - Comments on PR with link

5. Share preview URL with team
   https://marketing-git-feature-new-page.vercel.app

6. Merge PR to main

7. ✨ Vercel automatically:
   - Deploys to production
   - Updates inopsio.com
   - Takes ~1-2 minutes
```

---

## 🌐 **Viewing Your Site**

### Preview Deployments (Every Branch)
**URL**: `marketing-git-<branch-name>.vercel.app`

**When**: Automatically on every push
**Who**: Shareable with anyone
**Use**: Testing, client reviews, stakeholder approvals

### Production Deployment (Main Branch)
**URL**: `inopsio.com` (or `inopsio.vercel.app`)

**When**: Automatically when merged to `main`
**Who**: Public
**Use**: Live website

---

## 📋 **What You Need**

### Required Files (Already Created)
- ✅ `frontend/apps/marketing/vercel.json` - Vercel config
- ✅ `frontend/apps/marketing/.env.example` - Environment variables template
- ✅ `.github/workflows/marketing-deploy.yml` - Enhanced CI/CD (optional)

### Environment Variables to Add in Vercel
```bash
# CMS
NEXT_PUBLIC_CMS_URL=https://cms.inopsio.com
CMS_API_TOKEN=your_token_here

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email
EMAIL_SERVICE_API_KEY=your_sendgrid_key
```

Add these in: **Vercel Dashboard → Project Settings → Environment Variables**

---

## 🎯 **Common Scenarios**

### Scenario 1: Preview Before Merge
```bash
# Create branch
git checkout -b feature/pricing-update

# Make changes
code src/app/pricing/page.tsx

# Push to GitHub
git push origin feature/pricing-update

# ✅ Get preview URL from Vercel comment on PR
# Share with team: "Hey, check out the new pricing page!"
```

### Scenario 2: Deploy to Production
```bash
# After PR is approved
git checkout main
git merge feature/pricing-update
git push origin main

# ✅ Vercel automatically deploys to inopsio.com
# Takes ~1-2 minutes
```

### Scenario 3: Rollback Bad Deployment
```
1. Go to Vercel dashboard → Deployments
2. Find previous working deployment
3. Click "Promote to Production"
4. ✅ Instant rollback (no rebuild needed!)
```

---

## 🔧 **Advanced: Custom Domain**

### Add inopsio.com

1. Vercel Dashboard → Project Settings → Domains
2. Click "Add Domain"
3. Enter `inopsio.com`
4. Add DNS records to your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. Wait 24-48 hours for DNS propagation
6. ✅ Automatic HTTPS enabled!

---

## 📊 **Monitoring**

### View Deployment Status
**Vercel Dashboard**: https://vercel.com/dashboard

See:
- ✅ Build logs
- ✅ Deployment history
- ✅ Analytics (Core Web Vitals)
- ✅ Function logs

### Enable Vercel Analytics (Free)
1. Project Settings → Analytics
2. Toggle "Enable Analytics"
3. ✅ See real user performance metrics

---

## 🚨 **Troubleshooting**

### Build Failed?
1. Go to Vercel dashboard
2. Click failed deployment
3. View "Build Logs"
4. Fix error and push again

### Preview Not Created?
- Check Vercel has GitHub repository access
- Verify branch is pushed to GitHub (not just local)

### Domain Not Working?
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Use `dig inopsio.com` to verify

---

## 📖 **Full Documentation**

For complete guide, see: `/docs/dev/vercel-deployment-guide.md`

---

## 🎉 **That's It!**

You now have:
- ✅ Automatic preview deployments (every PR)
- ✅ Automatic production deployments (merge to main)
- ✅ Live URLs to share with team/clients
- ✅ Zero-config CI/CD workflow
- ✅ Free hosting with unlimited bandwidth

**Next steps**:
1. Create Vercel account: https://vercel.com
2. Import your repository
3. Deploy!
4. Share preview URLs with your team

---

**Questions?** See full guide: `/docs/dev/vercel-deployment-guide.md`
