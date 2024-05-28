
module "public_subnet" {
  source            = "../module/public_subnets"
  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  availability_zone = module.data.availability_zone[0]
  cidr_block        = lookup(var.subnet_cidr, "public")
  SSH_PORT          = var.SSH_PORT
  open_ports        = [80, 443, 27017]
  depends_on        = [module.vpc]
  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "Public Subnet"
  }
}
