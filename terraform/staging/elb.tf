module "elb" {
  source       = "../module/elb"
  vpc_id       = module.vpc.vpc_id
  subnet_ids   = [module.app_instance.subnet_id, module.backend_subnet.subnet_id]
  frontend_ip  = [module.app_instance.private_ip]
  backend_ip   = [module.backend_instance_1.private_ip, module.backend_instance_2.private_ip]
  openVPN_ip   = module.openVPN_instance.private_ip
  instance_ids = [module.backend_instance_1.instance_id, module.backend_instance_2.instance_id]
  SSH_PORT     = var.SSH_PORT
  depends_on   = [module.backend_instance_1, module.app_instance, module.openVPN_instance]

}
