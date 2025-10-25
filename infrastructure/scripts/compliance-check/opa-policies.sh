#!/bin/bash

# OPA (Open Policy Agent) Compliance Check Script
# Validates infrastructure configurations against custom OPA policies

set -euo pipefail

# Configuration
POLICIES_DIR="${1:-infrastructure/scripts/compliance-check/opa-policies}"
INFRASTRUCTURE_DIR="${2:-infrastructure}"
OUTPUT_FORMAT="${3:-json}"
OUTPUT_FILE="${4:-opa-compliance-results.json}"

echo "🔍 Running OPA compliance check on infrastructure configurations..."
echo "📁 Policies directory: $POLICIES_DIR"
echo "📁 Infrastructure directory: $INFRASTRUCTURE_DIR"
echo "📊 Output format: $OUTPUT_FORMAT"
echo "📄 Output file: $OUTPUT_FILE"

# Create output directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Check if OPA is installed
if ! command -v opa &> /dev/null; then
  echo "❌ OPA is not installed. Please install OPA first."
  echo "📖 Installation guide: https://www.openpolicyagent.org/docs/latest/#running-opa"
  exit 1
fi

# Check if policies directory exists
if [ ! -d "$POLICIES_DIR" ]; then
  echo "❌ Policies directory not found: $POLICIES_DIR"
  exit 1
fi

# Run OPA evaluation
echo "🔍 Evaluating policies against infrastructure configurations..."

# Create temporary directory for OPA evaluation
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

# Copy infrastructure files to temp directory
cp -r "$INFRASTRUCTURE_DIR" "$TEMP_DIR/"

# Run OPA evaluation
opa eval \
  --data "$POLICIES_DIR" \
  --data "$TEMP_DIR" \
  --format "$OUTPUT_FORMAT" \
  --output "$OUTPUT_FILE" \
  "data.compliance.violations"

# Check exit code
if [ $? -eq 0 ]; then
  echo "✅ OPA compliance check completed"
  echo "📊 Results saved to: $OUTPUT_FILE"
else
  echo "❌ OPA compliance check failed"
  echo "📊 Results saved to: $OUTPUT_FILE"
  echo "🔍 Review the results and fix any compliance issues"
  exit 1
fi

# Generate summary report
if [ -f "$OUTPUT_FILE" ]; then
  echo "📋 Generating compliance summary..."
  
  # Count violations
  VIOLATION_COUNT=$(jq -r '.result[] | length' "$OUTPUT_FILE" 2>/dev/null || echo "0")
  
  echo "📊 Compliance Summary:"
  echo "  🔍 Total violations: $VIOLATION_COUNT"
  
  if [ "$VIOLATION_COUNT" -gt 0 ]; then
    echo "❌ Compliance violations found. Please review and fix:"
    jq -r '.result[] | "  - \(.message)"' "$OUTPUT_FILE" 2>/dev/null || true
    exit 1
  else
    echo "✅ No compliance violations found"
  fi
fi

echo "✅ OPA compliance check completed successfully"
