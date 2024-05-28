
module "app_instance" {
  source        = "../module/app_instance"
  ami           = var.ami
  environment   = var.environment
  instance_type = var.instance_type
  key_name      = var.key_name
  sh_script     = file("my_shell.sh")
  openVPN_ip    = module.openVPN_instance.private_ip
  SSH_PORT      = var.SSH_PORT
  vpc_id        = module.vpc.vpc_id
  open_ports    = [80, 443]
  subnet_id     = module.public_subnet.subnet_id
  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "App Frontend"
  }
}
