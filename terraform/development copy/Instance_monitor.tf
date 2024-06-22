
module "Monitor" {
  source             = "../module/public_instance"
  ami                = var.ami
  environment        = var.environment
  instance_type      = var.instance_type
  key_name           = var.key_name
  sh_script          = file("my_shell.sh")
  public_subnet_id   = module.public_subnet.subnet_id
  security_group_ids = [module.public_subnet.sg_id]
  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "Monitor Instance"
  }
}
