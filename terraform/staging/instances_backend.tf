
module "backend_instance_1" {
  source             = "../module/private_instance"
  ami                = var.ami
  environment        = var.environment
  custom_name        = "Library-App-1"
  security_group_ids = [module.backend_subnet.sg_id]
  private_subnet_id  = module.backend_subnet.subnet_id
  instance_type      = var.instance_type
  key_name           = aws_key_pair.ssh.key_name
  depends_on         = [module.backend_subnet]
  sh_script          = file("my_shell.sh")
}

module "backend_instance_2" {
  source             = "../module/private_instance"
  ami                = var.ami
  environment        = var.environment
  custom_name        = "Library-App-2"
  security_group_ids = [module.backend_subnet.sg_id]
  private_subnet_id  = module.backend_subnet.subnet_id
  instance_type      = var.instance_type
  key_name           = aws_key_pair.ssh.key_name
  depends_on         = [module.backend_subnet]
  sh_script          = file("my_shell.sh")
}
