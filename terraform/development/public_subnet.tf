
module "public_subnet" {
  source            = "../module/public_subnets"
  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  availability_zone = module.data.availability_zone[0]
  cidr_block        = lookup(var.subnet_cidr, "public")
  open_ports        = [80, 443, 3000, 4000, 5000, 9615, 9080, 9090, 9100, 9273, 3100, var.SSH_PORT]
  depends_on        = [module.vpc]
  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "Public Subnet"
  }
}
