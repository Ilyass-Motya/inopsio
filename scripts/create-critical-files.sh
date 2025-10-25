#!/bin/bash
# Create CRITICAL files for Inopsio Phase 1 development
# Run from project root: bash scripts/create-critical-files.sh

echo "🚀 Creating CRITICAL files for Phase 1..."

# Root Configuration Files
echo "📁 Creating root configuration files..."
touch .env.example
touch tsconfig.json
touch turbo.json

# Marketing App (Phase 1 - CRITICAL)
echo "📁 Creating Marketing App structure..."
mkdir -p frontend/apps/marketing/src/app
mkdir -p frontend/apps/marketing/public
touch frontend/apps/marketing/README.md
touch frontend/apps/marketing/.env.example
touch frontend/apps/marketing/tsconfig.json
touch frontend/apps/marketing/tailwind.config.ts
touch frontend/apps/marketing/src/app/layout.tsx
touch frontend/apps/marketing/src/app/page.tsx
touch frontend/apps/marketing/src/app/globals.css
touch frontend/apps/marketing/public/.gitkeep

# Design System (Phase 1 - CRITICAL)
echo "📁 Creating Design System structure..."
mkdir -p frontend/packages/ui/src/components
mkdir -p frontend/packages/ui/src/styles
touch frontend/packages/ui/README.md
touch frontend/packages/ui/tsconfig.json
touch frontend/packages/ui/src/index.ts
touch frontend/packages/ui/src/components/button.tsx
touch frontend/packages/ui/src/styles/globals.css

# Storybook
echo "📁 Creating Storybook structure..."
mkdir -p frontend/devtools/storybook/.storybook
touch frontend/devtools/storybook/.storybook/main.ts
touch frontend/devtools/storybook/.storybook/preview.ts
touch frontend/devtools/storybook/package.json

# Design Tokens
echo "📁 Creating Design Tokens..."
mkdir -p frontend/config
touch frontend/config/design-tokens.json
touch frontend/config/tailwind-preset.js

# Documentation - Brand & Design (Phase 1)
echo "📁 Creating Brand & Design docs..."
mkdir -p docs/design
touch docs/design/brand-guidelines.md
touch docs/design/design-tokens.md
touch docs/design/component-library.md
touch docs/design/accessibility-standards.md

# Documentation - Development Guides (Phase 1)
echo "📁 Creating Development guides..."
touch docs/dev/getting-started.md
touch docs/dev/local-setup.md
touch docs/dev/frontend-development.md
touch docs/dev/git-workflow.md
touch docs/dev/coding-standards.md

# E2E Tests (Phase 1)
echo "📁 Creating E2E test files..."
mkdir -p frontend/playwright/tests
touch frontend/playwright/tests/accessibility.spec.ts
touch frontend/playwright/tests/performance.spec.ts

echo "✅ CRITICAL files created successfully!"
echo "📊 Total files created: ~35"
echo ""
echo "Next steps:"
echo "1. Fill in package.json files with dependencies"
echo "2. Configure TypeScript and Tailwind"
echo "3. Set up environment variables"
echo "4. Start building the marketing website!"
