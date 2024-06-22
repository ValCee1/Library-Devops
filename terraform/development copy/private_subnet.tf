
module "backend_subnet" {
  source            = "../module/private_subnets_nat"
  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  availability_zone = module.data.availability_zone[0]
  cidr_block        = lookup(var.subnet_cidr, "private")
  open_ports        = [80, 443, 3000, 4000, 5000, 9615, 9080, 9090, 9100, 9273, 3100, var.SSH_PORT]
  public_subnet_id  = module.public_subnet.subnet_id
  depends_on        = [module.vpc]
  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "Backend Private Subnet"
  }
}
