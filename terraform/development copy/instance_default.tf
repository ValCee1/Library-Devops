resource "aws_instance" "default" {
  ami                         = var.ami
  instance_type               = var.instance_type
  key_name                    = var.key_name
  user_data_replace_on_change = true
  user_data = file("./my_shell.sh")

  root_block_device {
    volume_size           = 8
    delete_on_termination = true
  }

  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "Default VPC Instance"
  }
}
