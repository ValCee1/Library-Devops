
resource "aws_instance" "app" {
  ami                    = var.ami
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [module.app_subnet.sg_id]   # Security Group
  subnet_id              = module.app_subnet.subnet_id # public subnet
  user_data              = var.sh_script

  root_block_device {
    volume_size           = 8
    delete_on_termination = true
  }

  tags = var.tags
}
