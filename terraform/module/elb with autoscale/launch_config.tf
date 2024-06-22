#AutoScaling Launch Configuration
resource "aws_launch_configuration" "custom_launchconfig" {
  name_prefix     = "custom_launch_config"
  image_id        = var.ami
  instance_type   = var.instance_type
  key_name        = var.key_name
  security_groups = [aws_security_group.custom-elb.id]

  lifecycle {
    create_before_destroy = true
  }
}

