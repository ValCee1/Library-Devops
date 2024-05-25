
module "app_instance" {
  source        = "../module/app_instance"
  ami           = var.ami
  app_name      = "Library-App"
  azs           = module.data.availability_zone[0]
  environment   = var.environment
  instance_type = var.instance_type
  key_name      = var.key_name
  sh_script     = file("my_shell.sh")
  SSH_PORT      = var.SSH_PORT
  trustedIPs    = var.trustedIPs
  vpc_id        = module.vpc.vpc_id
  cidr_block    = var.app_cidr
}
