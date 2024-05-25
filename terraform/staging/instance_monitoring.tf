
module "monitoring_instance" {
  source             = "../module/private_instance"
  ami                = var.ami
  environment        = var.environment
  custom_name        = "Monitor"
  security_group_ids = [module.backend_subnet.sg_id]
  private_subnet_id  = module.backend_subnet.subnet_id
  instance_type      = var.instance_type
  key_name           = aws_key_pair.ssh.key_name
  sh_script          = file("my_shell.sh")
  depends_on         = [module.backend_subnet]
}
