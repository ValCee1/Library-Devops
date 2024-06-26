
module "app_instance" {
  source        = "../module/app_instance"
  ami           = var.ami
  environment   = var.environment
  instance_type = var.instance_type
  key_name      = var.key_name
  sh_script     = file("my_shell.sh")
  vpc_id        = module.vpc.vpc_id
  open_ports    = [80, 443, 3000, 4000, 5000, 9615, 9080, 9090, 9100, 9273, 3100, var.SSH_PORT]
  subnet_id     = module.public_subnet.subnet_id
  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "App Frontend"
  }
}
