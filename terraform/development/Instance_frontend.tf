
module "Frontend" {
  source             = "../module/public_instance"
  ami                = var.ami
  environment        = var.environment
  instance_type      = var.instance_type
  key_name           = var.key_name
  sh_script          = local.change_ssh_port_script
  public_subnet_id   = module.public_subnet.subnet_id
  security_group_ids = [module.public_subnet.sg_id]

  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "Frontend App Instance"
  }

}
