#!/bin/bash

# Checkov Terraform Compliance Check Script
# Validates Terraform configurations against security and compliance policies

set -euo pipefail

# Configuration
TERRAFORM_DIR="${1:-infrastructure/terraform}"
OUTPUT_FORMAT="${2:-json}"
OUTPUT_FILE="${3:-checkov-terraform-results.json}"
SEVERITY_LEVEL="${4:-MEDIUM}"
FRAMEWORK="${5:-terraform}"

echo "🔍 Running Checkov compliance check on Terraform configurations..."
echo "📁 Directory: $TERRAFORM_DIR"
echo "📊 Output format: $OUTPUT_FORMAT"
echo "📄 Output file: $OUTPUT_FILE"
echo "⚠️  Severity level: $SEVERITY_LEVEL"
echo "🏗️  Framework: $FRAMEWORK"

# Create output directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Run Checkov with specified parameters
checkov \
  --directory "$TERRAFORM_DIR" \
  --framework "$FRAMEWORK" \
  --output "$OUTPUT_FORMAT" \
  --output-file-path "$OUTPUT_FILE" \
  --severity "$SEVERITY_LEVEL" \
  --compact \
  --quiet \
  --no-guide \
  --skip-check CKV_AWS_79,CKV_AWS_23,CKV_AWS_24 \
  --include-check CKV_AWS_1,CKV_AWS_2,CKV_AWS_3,CKV_AWS_4,CKV_AWS_5 \
  --external-checks-dir ./infrastructure/scripts/compliance-check/custom-checks/ \
  --policy-metadata-filter "category=security" \
  --policy-metadata-filter "severity=HIGH" \
  --policy-metadata-filter "severity=CRITICAL"

# Check exit code
if [ $? -eq 0 ]; then
  echo "✅ Checkov compliance check passed"
  echo "📊 Results saved to: $OUTPUT_FILE"
else
  echo "❌ Checkov compliance check failed"
  echo "📊 Results saved to: $OUTPUT_FILE"
  echo "🔍 Review the results and fix any compliance issues"
  exit 1
fi

# Generate summary report
if [ -f "$OUTPUT_FILE" ]; then
  echo "📋 Generating compliance summary..."
  
  # Count findings by severity
  HIGH_COUNT=$(jq -r '.results.failed_checks[] | select(.check_result.result == "FAILED") | select(.check_result.severity == "HIGH") | .check_id' "$OUTPUT_FILE" 2>/dev/null | wc -l || echo "0")
  MEDIUM_COUNT=$(jq -r '.results.failed_checks[] | select(.check_result.result == "FAILED") | select(.check_result.severity == "MEDIUM") | .check_id' "$OUTPUT_FILE" 2>/dev/null | wc -l || echo "0")
  LOW_COUNT=$(jq -r '.results.failed_checks[] | select(.check_result.result == "FAILED") | select(.check_result.severity == "LOW") | .check_id' "$OUTPUT_FILE" 2>/dev/null | wc -l || echo "0")
  
  echo "📊 Compliance Summary:"
  echo "  🔴 High severity issues: $HIGH_COUNT"
  echo "  🟡 Medium severity issues: $MEDIUM_COUNT"
  echo "  🟢 Low severity issues: $LOW_COUNT"
  
  # Exit with error if high severity issues found
  if [ "$HIGH_COUNT" -gt 0 ]; then
    echo "❌ High severity compliance issues found. Please fix before proceeding."
    exit 1
  fi
fi

echo "✅ Terraform compliance check completed successfully"
