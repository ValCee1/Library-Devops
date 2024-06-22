
module "monitoring_instance" {
  source             = "../module/public_instance"
  ami                = var.ami
  environment        = var.environment
  security_group_ids = [module.public_subnet.sg_id]
  public_subnet_id   = module.public_subnet.subnet_id
  instance_type      = var.instance_type
  key_name           = aws_key_pair.ssh.key_name
  sh_script          = local.change_ssh_port_script
  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "Monitoring Instance"
  }
}
