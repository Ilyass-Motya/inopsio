# Create CRITICAL files for Inopsio Phase 1 development
# Run from project root: .\scripts\create-critical-files.ps1

Write-Host "🚀 Creating CRITICAL files for Phase 1..." -ForegroundColor Green

# Root Configuration Files
Write-Host "📁 Creating root configuration files..." -ForegroundColor Cyan
New-Item -Path ".env.example" -ItemType File -Force | Out-Null
New-Item -Path "tsconfig.json" -ItemType File -Force | Out-Null
New-Item -Path "turbo.json" -ItemType File -Force | Out-Null

# Marketing App (Phase 1 - CRITICAL)
Write-Host "📁 Creating Marketing App structure..." -ForegroundColor Cyan
New-Item -Path "frontend/apps/marketing/src/app" -ItemType Directory -Force | Out-Null
New-Item -Path "frontend/apps/marketing/public" -ItemType Directory -Force | Out-Null
New-Item -Path "frontend/apps/marketing/README.md" -ItemType File -Force | Out-Null
New-Item -Path "frontend/apps/marketing/.env.example" -ItemType File -Force | Out-Null
New-Item -Path "frontend/apps/marketing/tsconfig.json" -ItemType File -Force | Out-Null
New-Item -Path "frontend/apps/marketing/tailwind.config.ts" -ItemType File -Force | Out-Null
New-Item -Path "frontend/apps/marketing/src/app/layout.tsx" -ItemType File -Force | Out-Null
New-Item -Path "frontend/apps/marketing/src/app/page.tsx" -ItemType File -Force | Out-Null
New-Item -Path "frontend/apps/marketing/src/app/globals.css" -ItemType File -Force | Out-Null
New-Item -Path "frontend/apps/marketing/public/.gitkeep" -ItemType File -Force | Out-Null

# Design System (Phase 1 - CRITICAL)
Write-Host "📁 Creating Design System structure..." -ForegroundColor Cyan
New-Item -Path "frontend/packages/ui/src/components" -ItemType Directory -Force | Out-Null
New-Item -Path "frontend/packages/ui/src/styles" -ItemType Directory -Force | Out-Null
New-Item -Path "frontend/packages/ui/README.md" -ItemType File -Force | Out-Null
New-Item -Path "frontend/packages/ui/tsconfig.json" -ItemType File -Force | Out-Null
New-Item -Path "frontend/packages/ui/src/index.ts" -ItemType File -Force | Out-Null
New-Item -Path "frontend/packages/ui/src/components/button.tsx" -ItemType File -Force | Out-Null
New-Item -Path "frontend/packages/ui/src/styles/globals.css" -ItemType File -Force | Out-Null

# Storybook
Write-Host "📁 Creating Storybook structure..." -ForegroundColor Cyan
New-Item -Path "frontend/devtools/storybook/.storybook" -ItemType Directory -Force | Out-Null
New-Item -Path "frontend/devtools/storybook/.storybook/main.ts" -ItemType File -Force | Out-Null
New-Item -Path "frontend/devtools/storybook/.storybook/preview.ts" -ItemType File -Force | Out-Null
New-Item -Path "frontend/devtools/storybook/package.json" -ItemType File -Force | Out-Null

# Design Tokens
Write-Host "📁 Creating Design Tokens..." -ForegroundColor Cyan
New-Item -Path "frontend/config" -ItemType Directory -Force | Out-Null
New-Item -Path "frontend/config/design-tokens.json" -ItemType File -Force | Out-Null
New-Item -Path "frontend/config/tailwind-preset.js" -ItemType File -Force | Out-Null

# Documentation - Brand & Design (Phase 1)
Write-Host "📁 Creating Brand & Design docs..." -ForegroundColor Cyan
New-Item -Path "docs/design" -ItemType Directory -Force | Out-Null
New-Item -Path "docs/design/brand-guidelines.md" -ItemType File -Force | Out-Null
New-Item -Path "docs/design/design-tokens.md" -ItemType File -Force | Out-Null
New-Item -Path "docs/design/component-library.md" -ItemType File -Force | Out-Null
New-Item -Path "docs/design/accessibility-standards.md" -ItemType File -Force | Out-Null

# Documentation - Development Guides (Phase 1)
Write-Host "📁 Creating Development guides..." -ForegroundColor Cyan
New-Item -Path "docs/dev/getting-started.md" -ItemType File -Force | Out-Null
New-Item -Path "docs/dev/local-setup.md" -ItemType File -Force | Out-Null
New-Item -Path "docs/dev/frontend-development.md" -ItemType File -Force | Out-Null
New-Item -Path "docs/dev/git-workflow.md" -ItemType File -Force | Out-Null
New-Item -Path "docs/dev/coding-standards.md" -ItemType File -Force | Out-Null

# E2E Tests (Phase 1)
Write-Host "📁 Creating E2E test files..." -ForegroundColor Cyan
New-Item -Path "frontend/playwright/tests" -ItemType Directory -Force | Out-Null
New-Item -Path "frontend/playwright/tests/accessibility.spec.ts" -ItemType File -Force | Out-Null
New-Item -Path "frontend/playwright/tests/performance.spec.ts" -ItemType File -Force | Out-Null

Write-Host "✅ CRITICAL files created successfully!" -ForegroundColor Green
Write-Host "📊 Total files created: ~35" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Fill in package.json files with dependencies"
Write-Host "2. Configure TypeScript and Tailwind"
Write-Host "3. Set up environment variables"
Write-Host "4. Start building the marketing website!"
