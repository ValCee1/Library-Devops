#AutoScaling Launch Configuration
resource "aws_launch_configuration" "custom" {
  name_prefix   = "custom-launchconfig"
  image_id      = var.ami
  instance_type = var.instance_type
  key_name      = var.key_name
}

