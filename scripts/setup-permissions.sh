#!/bin/bash

# Setup Script Permissions for Inopsio
# This script sets executable permissions for all shell scripts

echo "Setting up script permissions for Inopsio..."

# Set executable permissions for all shell scripts
find . -name "*.sh" -type f -exec chmod +x {} \;

# Set executable permissions for specific script directories
chmod +x scripts/ci/*.sh 2>/dev/null || true
chmod +x scripts/local/*.sh 2>/dev/null || true
chmod +x scripts/test/*.sh 2>/dev/null || true
chmod +x scripts/migrations/*.sh 2>/dev/null || true
chmod +x scripts/deploy/*.sh 2>/dev/null || true
chmod +x scripts/patch/*.sh 2>/dev/null || true
chmod +x scripts/monitor/*.sh 2>/dev/null || true
chmod +x scripts/utils/*.sh 2>/dev/null || true
chmod +x scripts/telemetry/*.sh 2>/dev/null || true
chmod +x infrastructure/scripts/*.sh 2>/dev/null || true
chmod +x infrastructure/scripts/health-checks/*.sh 2>/dev/null || true

# Set executable permissions for Makefile
chmod +x Makefile

# Set executable permissions for .husky hooks
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
chmod +x .husky/_/husky.sh

echo "Script permissions setup complete!"
echo "All shell scripts are now executable."
