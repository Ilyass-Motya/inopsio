# Vercel + GitHub Setup Guide

**Your Configuration**:
- GitHub Organization: `@inopsio`
- Personal GitHub Account: `ilyassmpremium-6244`
- Vercel Project ID: `prj_U8Kvo2KKfzkUTTitrgJVDFFIooW1`
- Repository: `inopsio/Inopsio` (assumed)

---

## 🚨 **Current Issue**

```
❌ Vercel needs permission to access @inopsio GitHub organization
```

**Error Message**:
> "Please connect ilyassmpremium-6244 on Vercel to the @inopsio GitHub account to request access and join the Team."

---

## ✅ **Solution: Grant Vercel Access to @inopsio Organization**

### **Step 1: Install Vercel GitHub App on @inopsio**

#### **Option A: You are @inopsio Organization Owner**

1. Go to: https://github.com/organizations/inopsio/settings/installations
2. Look for **"Vercel"** in the list of installed GitHub Apps
3. Click **"Configure"** next to Vercel
4. Scroll down to **"Repository access"**
5. Select **"Only select repositories"**
6. Choose: `Inopsio` (your repository)
7. Click **"Save"**

#### **Option B: You are NOT @inopsio Organization Owner**

**Ask the organization owner to**:
1. Go to: https://github.com/organizations/inopsio/settings/installations
2. Install Vercel GitHub App
3. Grant access to `Inopsio` repository

**OR ask them to invite you as Owner/Admin**:
1. https://github.com/orgs/inopsio/people
2. Change your role to "Owner" or "Admin"
3. Then you can install the Vercel app yourself

### **Step 2: Reconnect in Vercel**

1. Go to Vercel dashboard: https://vercel.com/dashboard
2. Go to your marketing website project
3. Settings → Git
4. You should now see the repository connected
5. ✅ Done!

**OR if creating a new project**:
1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. You should now see `@inopsio/Inopsio` in the list
4. Click **"Import"**
5. Select `frontend/apps/marketing` as root directory
6. Deploy!

---

## 🔐 **Step 3: Add GitHub Secrets (For GitHub Actions)**

To enable the advanced CI/CD workflow, add these secrets to your GitHub repository.

### **3.1: Get Vercel Tokens**

#### **Get VERCEL_TOKEN**
1. Go to: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name: `GitHub Actions - Inopsio`
4. Scope: **Full Account**
5. Click **"Create"**
6. **Copy the token** (you won't see it again!)

#### **Get VERCEL_ORG_ID**
1. Go to: https://vercel.com/account
2. Settings → General
3. Copy **"Your ID"** (starts with `team_` or `user_`)

**Your Project ID** (already have):
```
prj_U8Kvo2KKfzkUTTitrgJVDFFIooW1
```

### **3.2: Add Secrets to GitHub**

1. Go to: https://github.com/inopsio/Inopsio/settings/secrets/actions
2. Click **"New repository secret"**
3. Add these three secrets:

**Secret 1: VERCEL_TOKEN**
```
Name: VERCEL_TOKEN
Value: [paste the token you created]
```

**Secret 2: VERCEL_ORG_ID**
```
Name: VERCEL_ORG_ID
Value: [your Vercel org/user ID]
```

**Secret 3: VERCEL_PROJECT_ID**
```
Name: VERCEL_PROJECT_ID
Value: prj_U8Kvo2KKfzkUTTitrgJVDFFIooW1
```

**Optional Secret 4: SLACK_WEBHOOK_URL** (if you want Slack notifications)
```
Name: SLACK_WEBHOOK_URL
Value: [your Slack webhook URL]
```

### **3.3: Verify Secrets Added**

You should now see in GitHub:
- `VERCEL_TOKEN` ✅
- `VERCEL_ORG_ID` ✅
- `VERCEL_PROJECT_ID` ✅

---

## 🎯 **Verify Everything Works**

### **Test 1: Manual Vercel Deployment**

1. Go to Vercel project: https://vercel.com/ilyassmpremium-6244/[project-name]
2. Click **"Deployments"**
3. Click **"Redeploy"**
4. ✅ Should deploy successfully

### **Test 2: GitHub Actions Workflow**

1. Make a small change to your marketing website:
```bash
# Create test branch
git checkout -b test/vercel-setup

# Make a change
echo "// Test deployment" >> frontend/apps/marketing/src/app/page.tsx

# Commit and push
git add .
git commit -m "test: verify Vercel deployment"
git push origin test/vercel-setup
```

2. Open a PR on GitHub
3. ✅ GitHub Actions should run automatically
4. ✅ Vercel should create a preview deployment
5. ✅ PR should have a comment with the preview URL

### **Test 3: Production Deployment**

1. Merge the PR to `main`
2. ✅ GitHub Actions should run
3. ✅ Vercel should deploy to production
4. ✅ Check your website is live

---

## 🔄 **Your Complete Workflow**

### **Development Workflow**

```
1. Create feature branch
   git checkout -b feature/new-page

2. Make changes locally
   code frontend/apps/marketing/src/app/page.tsx

3. Test locally
   cd frontend/apps/marketing
   pnpm dev
   # Open http://localhost:3000

4. Push to GitHub
   git add .
   git commit -m "feat: add new page"
   git push origin feature/new-page

5. Open PR on GitHub
   # Go to https://github.com/inopsio/Inopsio/pulls
   # Click "New pull request"

6. ✨ Automatic actions:
   ├── GitHub Actions runs tests
   ├── Vercel creates preview deployment
   ├── Preview URL posted in PR comments
   └── Lighthouse CI runs performance tests

7. Review and merge
   # After approval, merge PR

8. ✨ Automatic production deployment:
   ├── GitHub Actions runs tests
   ├── Vercel deploys to production
   ├── Website updates at inopsio.com
   └── Takes ~2 minutes

9. ✅ Done! Live at inopsio.com
```

---

## 🛠️ **Troubleshooting**

### **Issue: "Repository not found" in Vercel**

**Solution**:
1. Verify Vercel GitHub App is installed on @inopsio org
2. Verify you have access to the repository
3. Try disconnecting and reconnecting in Vercel Settings → Git

### **Issue: GitHub Actions workflow not running**

**Check**:
- ✅ Workflow file exists: `.github/workflows/marketing-deploy.yml`
- ✅ You pushed to a branch that triggers the workflow (`main` or `develop`)
- ✅ The file paths in `on.paths` match your changes

**Enable Actions** (if disabled):
1. Go to: https://github.com/inopsio/Inopsio/settings/actions
2. Enable **"Allow all actions and reusable workflows"**
3. Save

### **Issue: Vercel deployment fails with "Missing secrets"**

**Solution**:
1. Verify all three secrets are added to GitHub
2. Secret names must match exactly (case-sensitive)
3. VERCEL_PROJECT_ID should be: `prj_U8Kvo2KKfzkUTTitrgJVDFFIooW1`

### **Issue: Still getting "@inopsio access required" error**

**Solution**:
1. Ask @inopsio organization owner to:
   - Install Vercel GitHub App on the organization
   - Grant you "Owner" or "Admin" role in the organization
2. Or use your personal GitHub account instead:
   - Fork the repository to `ilyassmpremium-6244/Inopsio`
   - Deploy from personal account

---

## 📋 **Quick Reference**

### **Your Vercel Project**
- **Project ID**: `prj_U8Kvo2KKfzkUTTitrgJVDFFIooW1`
- **Project URL**: https://vercel.com/ilyassmpremium-6244/[project-name]

### **GitHub Repository**
- **Organization**: `@inopsio`
- **Repository**: `inopsio/Inopsio` (assumed - verify this)
- **Your Account**: `ilyassmpremium-6244`

### **Required GitHub Secrets**
```
VERCEL_TOKEN          → Get from https://vercel.com/account/tokens
VERCEL_ORG_ID         → Get from https://vercel.com/account
VERCEL_PROJECT_ID     → prj_U8Kvo2KKfzkUTTitrgJVDFFIooW1
```

### **Useful Links**
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Tokens**: https://vercel.com/account/tokens
- **GitHub Actions**: https://github.com/inopsio/Inopsio/actions
- **GitHub Secrets**: https://github.com/inopsio/Inopsio/settings/secrets/actions
- **GitHub Apps (Org)**: https://github.com/organizations/inopsio/settings/installations

---

## 🎉 **After Setup is Complete**

You will have:
- ✅ Automatic preview deployments on every PR
- ✅ Automatic production deployments on merge to `main`
- ✅ Lighthouse CI performance checks
- ✅ ESLint and TypeScript validation
- ✅ PR comments with preview URLs
- ✅ Slack notifications (optional)

---

## 📞 **Need Help?**

### **GitHub Organization Issues**
Contact the @inopsio organization owner to:
- Install Vercel GitHub App
- Grant you appropriate permissions
- Add you to the organization team

### **Vercel Issues**
- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

### **GitHub Actions Issues**
- Check workflow runs: https://github.com/inopsio/Inopsio/actions
- View logs for failed runs
- Verify secrets are added correctly

---

**Last Updated**: January 2025
**Status**: Setup in Progress
**Next**: Grant Vercel access to @inopsio organization
