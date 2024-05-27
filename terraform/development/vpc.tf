
module "vpc" {
  source      = "../module/vpc"
  vpc_cidr    = var.vpc_cidr
  environment = var.environment
  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "Library VPC"
  }
}
