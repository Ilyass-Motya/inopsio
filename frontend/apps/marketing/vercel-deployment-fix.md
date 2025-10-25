# Vercel Deployment Fix Guide

## Issue
**Error**: "Deployment request did not have a git author with contributing access to the project on Vercel"

## Solutions

### Option 1: Fix Vercel Project Settings
1. Go to https://vercel.com/inopsio-dev
2. Click on "inopsio-website" project
3. Go to **Settings → Git**
4. Click **"Disconnect"** from current repository
5. Click **"Connect Git Repository"**
6. Select `Ilyass-Motya/inopsio`
7. Set **Root Directory** to: `frontend/apps/marketing`
8. Set **Build Command** to: `pnpm build`
9. Click **"Deploy"**

### Option 2: Create New Vercel Project
1. Go to https://vercel.com/new
2. Import from GitHub: `Ilyass-Motya/inopsio`
3. Set **Root Directory** to: `frontend/apps/marketing`
4. Set **Framework Preset** to: `Next.js`
5. Set **Build Command** to: `pnpm build`
6. Click **"Deploy"**

### Option 3: Check GitHub Permissions
1. Go to https://github.com/settings/applications
2. Find "Vercel" in authorized applications
3. Click **"Revoke"** and then **"Authorize"** again
4. Make sure Vercel has access to your repositories

### Option 4: Manual Deployment
1. In Vercel dashboard, go to **Deployments**
2. Click **"Redeploy"** on the latest deployment
3. Or click **"Deploy"** to trigger a new deployment

## Project Configuration
- **Repository**: `Ilyass-Motya/inopsio`
- **Root Directory**: `frontend/apps/marketing`
- **Build Command**: `pnpm build`
- **Output Directory**: `.next` (auto-detect)
- **Install Command**: `pnpm install`

## Expected Result
After fixing, your website should be available at:
**https://inopsio-website.vercel.app**

## Verification
Once deployed, you should see:
- Beautiful gradient background (blue to indigo)
- "Welcome to Inopsio" heading
- "The All-in-One Business Platform" subtitle
- Two call-to-action buttons
