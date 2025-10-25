# ABAC (Attribute-Based Access Control) Examples

## User Attributes
```yaml
user_attributes:
  department: [engineering, sales, security, finance]
  clearance_level: [public, internal, confidential, secret]
  location: [us-east, us-west, eu-central, asia-pacific]
  employment_status: [active, inactive, suspended]
  role: [admin, manager, user, analyst]
```

## Resource Attributes
```yaml
resource_attributes:
  classification: [public, internal, confidential, secret]
  department: [engineering, sales, security, finance]
  location: [us-east, us-west, eu-central, asia-pacific]
  data_type: [pii, financial, operational, security]
  retention_period: [1_year, 3_years, 7_years, permanent]
```

## Environment Attributes
```yaml
environment_attributes:
  time: "business_hours | after_hours | weekend"
  location: "office | remote | public"
  network: "corporate | vpn | public"
  device: "managed | unmanaged | mobile"
```

## Policy Examples

### Data Classification Policy
```yaml
policy: data_classification_access
rule: |
  user.clearance_level >= resource.classification AND
  user.department == resource.department AND
  environment.time == "business_hours"
action: allow
```

### Location-Based Access
```yaml
policy: location_based_access
rule: |
  user.location == resource.location AND
  environment.network == "corporate"
action: allow
```

### Time-Based Access
```yaml
policy: time_based_access
rule: |
  environment.time == "business_hours" AND
  user.employment_status == "active"
action: allow
```

### Cross-Department Collaboration
```yaml
policy: cross_department_access
rule: |
  user.clearance_level >= "confidential" AND
  resource.classification <= "confidential" AND
  user.department != resource.department AND
  environment.network == "corporate"
action: allow
```

### Remote Access Policy
```yaml
policy: remote_access
rule: |
  environment.location == "remote" AND
  environment.network == "vpn" AND
  user.clearance_level >= "internal" AND
  resource.classification <= "internal"
action: allow
```

### Security Data Access
```yaml
policy: security_data_access
rule: |
  user.department == "security" AND
  user.clearance_level >= "confidential" AND
  resource.data_type == "security" AND
  environment.device == "managed"
action: allow
```

### Financial Data Access
```yaml
policy: financial_data_access
rule: |
  user.department == "finance" AND
  user.clearance_level >= "confidential" AND
  resource.data_type == "financial" AND
  environment.time == "business_hours"
action: allow
```

## Complex Multi-Attribute Policies

### Executive Access
```yaml
policy: executive_access
rule: |
  user.role == "admin" AND
  user.clearance_level >= "confidential" AND
  (environment.time == "business_hours" OR 
   environment.time == "after_hours") AND
  environment.network == "corporate"
action: allow
```

### Emergency Access
```yaml
policy: emergency_access
rule: |
  user.role == "security_analyst" AND
  user.clearance_level >= "confidential" AND
  resource.data_type == "security" AND
  environment.time == "after_hours" AND
  environment.network == "vpn"
action: allow
```
