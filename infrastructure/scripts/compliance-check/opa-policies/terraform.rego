package compliance

# Terraform compliance policies for Inopsio infrastructure

# Check for required tags on all resources
required_tags = {
    "Environment",
    "Project", 
    "Owner",
    "CostCenter",
    "Compliance"
}

# Check if resource has all required tags
has_required_tags(resource) {
    resource.tags
    required_tags - {tag | tag := resource.tags[tag]}
}

# Check for public S3 buckets
public_s3_bucket(bucket) {
    bucket.acl == "public-read"
    bucket.acl == "public-read-write"
}

# Check for unencrypted S3 buckets
unencrypted_s3_bucket(bucket) {
    not bucket.server_side_encryption_configuration
}

# Check for public RDS instances
public_rds_instance(instance) {
    instance.publicly_accessible == true
}

# Check for unencrypted RDS instances
unencrypted_rds_instance(instance) {
    not instance.storage_encrypted
}

# Check for security groups with overly permissive rules
permissive_security_group(sg) {
    rule := sg.ingress[_]
    rule.cidr_blocks[_] == "0.0.0.0/0"
    rule.from_port == 22
    rule.to_port == 22
}

# Check for resources without backup
resource_without_backup(resource) {
    resource.type == "aws_db_instance"
    not resource.backup_retention_period
    resource.backup_retention_period == 0
}

# Main compliance check
violations[msg] {
    resource := input.terraform.resources[_]
    
    # Check required tags
    missing_tags := required_tags - {tag | tag := resource.tags[tag]}
    count(missing_tags) > 0
    msg := sprintf("Resource %s missing required tags: %v", [resource.name, missing_tags])
}

violations[msg] {
    bucket := input.terraform.resources[_]
    bucket.type == "aws_s3_bucket"
    public_s3_bucket(bucket)
    msg := sprintf("S3 bucket %s is publicly accessible", [bucket.name])
}

violations[msg] {
    bucket := input.terraform.resources[_]
    bucket.type == "aws_s3_bucket"
    unencrypted_s3_bucket(bucket)
    msg := sprintf("S3 bucket %s is not encrypted", [bucket.name])
}

violations[msg] {
    instance := input.terraform.resources[_]
    instance.type == "aws_db_instance"
    public_rds_instance(instance)
    msg := sprintf("RDS instance %s is publicly accessible", [instance.name])
}

violations[msg] {
    instance := input.terraform.resources[_]
    instance.type == "aws_db_instance"
    unencrypted_rds_instance(instance)
    msg := sprintf("RDS instance %s is not encrypted", [instance.name])
}

violations[msg] {
    sg := input.terraform.resources[_]
    sg.type == "aws_security_group"
    permissive_security_group(sg)
    msg := sprintf("Security group %s has overly permissive SSH rule", [sg.name])
}

violations[msg] {
    instance := input.terraform.resources[_]
    instance.type == "aws_db_instance"
    resource_without_backup(instance)
    msg := sprintf("RDS instance %s has no backup retention configured", [instance.name])
}
