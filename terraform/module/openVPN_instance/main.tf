
resource "aws_instance" "openVPN" {
  ami                    = var.ami
  instance_type          = var.instance_type
  vpc_security_group_ids = [aws_security_group.OpenVPN.id] # Security Group
  subnet_id              = var.subnet_id                   # public subnet
  key_name               = var.key_name

  root_block_device {
    volume_size           = 8
    delete_on_termination = true
  }

  tags = var.tags
}
