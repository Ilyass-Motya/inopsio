# Terraform State Backend Configuration
# This file defines where Terraform stores its state file
# Choose one of the following backends based on your cloud provider

# AWS S3 Backend (Recommended for AWS)
terraform {
  backend "s3" {
    bucket         = "inopsio-terraform-state"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "inopsio-terraform-locks"
  }
}

# Alternative: Google Cloud Storage Backend
# terraform {
#   backend "gcs" {
#     bucket = "inopsio-terraform-state"
#     prefix = "infrastructure"
#   }
# }

# Alternative: Cloudflare R2 Backend
# terraform {
#   backend "s3" {
#     bucket   = "inopsio-terraform-state"
#     key      = "infrastructure/terraform.tfstate"
#     region   = "auto"
#     endpoint = "https://your-account-id.r2.cloudflarestorage.com"
#   }
# }

# Alternative: Local Backend (Development only)
# terraform {
#   backend "local" {
#     path = "./terraform.tfstate"
#   }
# }
