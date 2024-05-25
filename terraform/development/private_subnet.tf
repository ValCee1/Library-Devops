
module "backend_subnet" {
  source            = "../module/private_subnets"
  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  availability_zone = "module.data.availability_zone[0]"
  cidr_block        = lookup(var.subnet_cidr, "private")
  SSH_PORT          = var.SSH_PORT
  openVPN_ip        = module.openVPN_instance.private_ip
  open_ports        = [80, 443, 27017]
  depends_on        = [module.openVPN_instance, module.vpc]
  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "Backend Private Subnet"
  }
}
