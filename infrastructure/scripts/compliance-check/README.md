# Infrastructure Compliance Check

This directory contains automated compliance checking scripts for the Inopsio infrastructure using Checkov and Open Policy Agent (OPA).

## Overview

The compliance check system provides automated validation of infrastructure configurations against security and compliance policies. It supports:

- **Terraform** configurations (Checkov)
- **Kubernetes** manifests (Checkov)
- **Custom policies** (OPA)

## Scripts

### Core Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `run-compliance-check.sh` | Main script that runs all compliance checks | `./run-compliance-check.sh [infra_dir] [output_dir] [severity]` |
| `checkov-terraform.sh` | Terraform compliance check using Checkov | `./checkov-terraform.sh [terraform_dir] [format] [output] [severity] [framework]` |
| `checkov-kubernetes.sh` | Kubernetes compliance check using Checkov | `./checkov-kubernetes.sh [k8s_dir] [format] [output] [severity] [framework]` |
| `opa-policies.sh` | OPA policy evaluation | `./opa-policies.sh [policies_dir] [infra_dir] [format] [output]` |

### Policy Files

| File | Purpose | Description |
|------|---------|-------------|
| `opa-policies/terraform.rego` | Terraform OPA policies | Custom policies for Terraform resources |
| `opa-policies/kubernetes.rego` | Kubernetes OPA policies | Custom policies for Kubernetes resources |

## Quick Start

### 1. Run All Compliance Checks

```bash
# Make scripts executable
chmod +x ./infrastructure/scripts/compliance-check/*.sh

# Run comprehensive compliance check
./infrastructure/scripts/compliance-check/run-compliance-check.sh
```

### 2. Run Individual Checks

```bash
# Terraform compliance
./infrastructure/scripts/compliance-check/checkov-terraform.sh

# Kubernetes compliance  
./infrastructure/scripts/compliance-check/checkov-kubernetes.sh

# OPA policies
./infrastructure/scripts/compliance-check/opa-policies.sh
```

## Prerequisites

### Required Tools

- **Checkov**: Infrastructure security scanning
  ```bash
  pip install checkov
  ```

- **OPA**: Open Policy Agent for custom policies
  ```bash
  # macOS
  brew install opa
  
  # Linux
  curl -L -o opa https://openpolicyagent.org/downloads/latest/opa_linux_amd64
  chmod +x opa
  sudo mv opa /usr/local/bin/
  ```

- **jq**: JSON processing (for result parsing)
  ```bash
  # macOS
  brew install jq
  
  # Linux
  sudo apt-get install jq
  ```

## Configuration

### Environment Variables

```bash
# Checkov configuration
export CHECKOV_SKIP_CHECK="CKV_AWS_79,CKV_AWS_23"
export CHECKOV_INCLUDE_CHECK="CKV_AWS_1,CKV_AWS_2"

# OPA configuration
export OPA_POLICIES_DIR="./infrastructure/scripts/compliance-check/opa-policies"
```

### Custom Policies

Add custom OPA policies in the `opa-policies/` directory:

```rego
package compliance

# Custom policy example
violations[msg] {
    resource := input.terraform.resources[_]
    resource.type == "aws_s3_bucket"
    not resource.versioning.enabled
    msg := sprintf("S3 bucket %s has versioning disabled", [resource.name])
}
```

## CI/CD Integration

### GitHub Actions

Add to your workflow:

```yaml
- name: Run Infrastructure Compliance Check
  run: |
    chmod +x ./infrastructure/scripts/compliance-check/*.sh
    ./infrastructure/scripts/compliance-check/run-compliance-check.sh
  env:
    CHECKOV_SKIP_CHECK: "CKV_AWS_79,CKV_AWS_23"
```

### GitLab CI

```yaml
compliance-check:
  stage: test
  script:
    - chmod +x ./infrastructure/scripts/compliance-check/*.sh
    - ./infrastructure/scripts/compliance-check/run-compliance-check.sh
  artifacts:
    reports:
      junit: compliance-results/*.xml
    paths:
      - compliance-results/
```

## Output Files

The compliance check generates several output files:

| File | Description | Format |
|------|-------------|--------|
| `compliance-summary.json` | Machine-readable summary | JSON |
| `compliance-summary.md` | Human-readable summary | Markdown |
| `checkov-terraform-results.json` | Terraform compliance results | JSON |
| `checkov-k8s-results.json` | Kubernetes compliance results | JSON |
| `opa-compliance-results.json` | OPA policy evaluation results | JSON |

## Severity Levels

| Level | Description | Action Required |
|-------|-------------|-----------------|
| `CRITICAL` | Critical security issues | Must fix immediately |
| `HIGH` | High severity issues | Fix before deployment |
| `MEDIUM` | Medium severity issues | Fix in next release |
| `LOW` | Low severity issues | Consider fixing |

## Common Issues and Solutions

### Checkov Issues

**Issue**: `ModuleNotFoundError: No module named 'checkov'`
**Solution**: Install Checkov with `pip install checkov`

**Issue**: `No such file or directory: checkov`
**Solution**: Add Checkov to PATH or use full path

### OPA Issues

**Issue**: `opa: command not found`
**Solution**: Install OPA following the prerequisites section

**Issue**: `Policy evaluation failed`
**Solution**: Check OPA policy syntax and input format

### Permission Issues

**Issue**: `Permission denied`
**Solution**: Make scripts executable with `chmod +x *.sh`

## Customization

### Adding New Policies

1. Create new `.rego` file in `opa-policies/` directory
2. Define policy rules in the `violations` array
3. Test with `opa eval` command

### Modifying Checkov Checks

1. Update skip/include check lists in scripts
2. Add custom checks in `custom-checks/` directory
3. Modify severity thresholds

### Extending Output

1. Modify scripts to generate additional output formats
2. Add custom report generators
3. Integrate with external tools

## Troubleshooting

### Debug Mode

Enable debug output:

```bash
set -x
./run-compliance-check.sh
```

### Verbose Output

Get detailed information:

```bash
./checkov-terraform.sh infrastructure/terraform json results.json MEDIUM terraform --verbose
```

### Policy Testing

Test OPA policies individually:

```bash
opa eval --data opa-policies/ --data infrastructure/ --format json "data.compliance.violations"
```

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review script output and error messages
3. Consult Checkov and OPA documentation
4. Create an issue in the project repository

## Contributing

To contribute to the compliance check system:

1. Follow the existing script patterns
2. Add comprehensive error handling
3. Include documentation for new features
4. Test with various infrastructure configurations
5. Update this README with new functionality