
module "engineering_instance" {
  source             = "../module/private_instance"
  ami                = var.ami
  environment        = var.environment
  department         = "engineering"
  security_group_ids = [module.engineering_private_subnet.sg_id]
  private_subnet_id  = module.engineering_private_subnet.subnet_id
  instance_type      = var.instance_type
  key_name           = aws_key_pair.department.key_name
  depends_on         = [module.engineering_private_subnet]
  sh_script          = file("my_shell.sh")
}

# module "engineering_public_instance" {
#   source             = "../module/public_instance"
#   ami                = var.ami
#   environment        = var.environment
#   department         = "engineering"
#   security_group_ids = [module.engineering_public_subnet.sg_id]
#   public_subnet_id   = module.engineering_public_subnet.subnet_id
#   instance_type      = var.instance_type
#   depends_on         = [module.engineering_public_subnet]
#   sh_script          = file("my_shell.sh")
# }
