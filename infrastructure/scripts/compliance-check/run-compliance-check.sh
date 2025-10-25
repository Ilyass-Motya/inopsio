#!/bin/bash

# Comprehensive Infrastructure Compliance Check Script
# Runs all compliance checks (Checkov + OPA) and generates a combined report

set -euo pipefail

# Configuration
INFRASTRUCTURE_DIR="${1:-infrastructure}"
OUTPUT_DIR="${2:-compliance-results}"
SEVERITY_LEVEL="${3:-MEDIUM}"

echo "🔍 Running comprehensive infrastructure compliance check..."
echo "📁 Infrastructure directory: $INFRASTRUCTURE_DIR"
echo "📁 Output directory: $OUTPUT_DIR"
echo "⚠️  Severity level: $SEVERITY_LEVEL"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Initialize results
TOTAL_ISSUES=0
HIGH_ISSUES=0
MEDIUM_ISSUES=0
LOW_ISSUES=0

# Function to run compliance check
run_compliance_check() {
  local check_name="$1"
  local check_script="$2"
  local output_file="$3"
  shift 3
  local check_args="$@"
  
  echo "🔍 Running $check_name..."
  
  if [ -f "$check_script" ]; then
    if bash "$check_script" $check_args; then
      echo "✅ $check_name passed"
    else
      echo "❌ $check_name failed"
      return 1
    fi
  else
    echo "⚠️  $check_script not found, skipping $check_name"
    return 0
  fi
}

# Run Terraform compliance check
echo "🏗️  Running Terraform compliance check..."
run_compliance_check \
  "Terraform Checkov" \
  "./infrastructure/scripts/compliance-check/checkov-terraform.sh" \
  "$OUTPUT_DIR/checkov-terraform-results.json" \
  "$INFRASTRUCTURE_DIR/terraform" \
  "json" \
  "$OUTPUT_DIR/checkov-terraform-results.json" \
  "$SEVERITY_LEVEL" \
  "terraform"

# Run Kubernetes compliance check
echo "☸️  Running Kubernetes compliance check..."
run_compliance_check \
  "Kubernetes Checkov" \
  "./infrastructure/scripts/compliance-check/checkov-kubernetes.sh" \
  "$OUTPUT_DIR/checkov-k8s-results.json" \
  "$INFRASTRUCTURE_DIR/kubernetes" \
  "json" \
  "$OUTPUT_DIR/checkov-k8s-results.json" \
  "$SEVERITY_LEVEL" \
  "kubernetes"

# Run OPA compliance check
echo "📋 Running OPA compliance check..."
run_compliance_check \
  "OPA Policies" \
  "./infrastructure/scripts/compliance-check/opa-policies.sh" \
  "$OUTPUT_DIR/opa-compliance-results.json" \
  "./infrastructure/scripts/compliance-check/opa-policies" \
  "$INFRASTRUCTURE_DIR" \
  "json" \
  "$OUTPUT_DIR/opa-compliance-results.json"

# Generate combined report
echo "📊 Generating combined compliance report..."

COMBINED_REPORT="$OUTPUT_DIR/compliance-summary.json"

cat > "$COMBINED_REPORT" << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "infrastructure_directory": "$INFRASTRUCTURE_DIR",
  "severity_level": "$SEVERITY_LEVEL",
  "checks": {
    "terraform": {
      "status": "$([ -f "$OUTPUT_DIR/checkov-terraform-results.json" ] && echo "completed" || echo "skipped")",
      "results_file": "$OUTPUT_DIR/checkov-terraform-results.json"
    },
    "kubernetes": {
      "status": "$([ -f "$OUTPUT_DIR/checkov-k8s-results.json" ] && echo "completed" || echo "skipped")",
      "results_file": "$OUTPUT_DIR/checkov-k8s-results.json"
    },
    "opa": {
      "status": "$([ -f "$OUTPUT_DIR/opa-compliance-results.json" ] && echo "completed" || echo "skipped")",
      "results_file": "$OUTPUT_DIR/opa-compliance-results.json"
    }
  }
}
EOF

# Generate human-readable summary
SUMMARY_FILE="$OUTPUT_DIR/compliance-summary.md"

cat > "$SUMMARY_FILE" << EOF
# Infrastructure Compliance Report

**Generated:** $(date)
**Infrastructure Directory:** $INFRASTRUCTURE_DIR
**Severity Level:** $SEVERITY_LEVEL

## Summary

| Check Type | Status | Results File |
|------------|--------|--------------|
| Terraform (Checkov) | $([ -f "$OUTPUT_DIR/checkov-terraform-results.json" ] && echo "✅ Completed" || echo "⏭️  Skipped") | \`checkov-terraform-results.json\` |
| Kubernetes (Checkov) | $([ -f "$OUTPUT_DIR/checkov-k8s-results.json" ] && echo "✅ Completed" || echo "⏭️  Skipped") | \`checkov-k8s-results.json\` |
| OPA Policies | $([ -f "$OUTPUT_DIR/opa-compliance-results.json" ] && echo "✅ Completed" || echo "⏭️  Skipped") | \`opa-compliance-results.json\` |

## Next Steps

1. **Review Results**: Check the individual result files for detailed findings
2. **Fix Issues**: Address any high and medium severity issues
3. **Re-run Checks**: Execute this script again after making fixes
4. **Integrate**: Add these checks to your CI/CD pipeline

## Files Generated

- \`compliance-summary.json\` - Machine-readable summary
- \`compliance-summary.md\` - Human-readable summary
- \`checkov-terraform-results.json\` - Terraform compliance results
- \`checkov-k8s-results.json\` - Kubernetes compliance results
- \`opa-compliance-results.json\` - OPA policy evaluation results

## Integration with CI/CD

To integrate these checks into your CI/CD pipeline, add the following to your workflow:

\`\`\`yaml
- name: Run Infrastructure Compliance Check
  run: |
    chmod +x ./infrastructure/scripts/compliance-check/run-compliance-check.sh
    ./infrastructure/scripts/compliance-check/run-compliance-check.sh
\`\`\`
EOF

echo "✅ Comprehensive compliance check completed"
echo "📊 Results saved to: $OUTPUT_DIR"
echo "📋 Summary report: $SUMMARY_FILE"
echo "📄 Combined report: $COMBINED_REPORT"

# List generated files
echo "📁 Generated files:"
ls -la "$OUTPUT_DIR"

echo "✅ Infrastructure compliance check completed successfully"
