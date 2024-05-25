resource "aws_instance" "public" {
  ami                    = var.ami
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = var.security_group_ids # Security Group
  subnet_id              = var.public_subnet_id   # public subnet
  user_data              = var.sh_script

  root_block_device {
    volume_size           = 8
    delete_on_termination = true
  }

  tags = var.tags
}
