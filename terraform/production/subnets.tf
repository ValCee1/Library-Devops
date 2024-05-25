
module "engineering_private_subnet" {
  source            = "../module/private_subnets"
  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  availability_zone = module.data.availability_zone[0]
  cidr_block        = lookup(var.engineering_subnets, "private")
  department        = "engineering"
  trustedIPs        = var.trustedIPs
  SSH_PORT          = var.SSH_PORT
}
