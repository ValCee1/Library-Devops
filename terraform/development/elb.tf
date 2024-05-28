module "elb" {
  source       = "../module/elb"
  vpc_id       = module.vpc.vpc_id
  subnet_ids   = [module.backend_subnet.subnet_id]
  openVPN_ip   = module.openVPN_instance.private_ip
  instance_ids = [module.backend_instance_1.instance_id, module.backend_instance_2.instance_id]
  SSH_PORT     = var.SSH_PORT
  depends_on   = [module.backend_instance_1, module.app_instance, module.openVPN_instance]
  open_ports   = [80, 443]

  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "Development ELB"
  }
}
