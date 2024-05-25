module "app_subnet" {
  source            = "./app_subnets"
  environment       = var.environment
  vpc_id            = var.vpc_id
  availability_zone = var.azs
  cidr_block        = var.cidr_block
  trustedIPs        = var.trustedIPs
  SSH_PORT          = var.SSH_PORT
  open_ports        = var.open_ports
  tags              = var.tags
}

