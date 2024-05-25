
#Autoscaling Group
resource "aws_autoscaling_group" "custom" {
  name                      = "custom-autoscaling"
  vpc_zone_identifier       = var.subnet_ids #["subnet-9e0ad9f5", "subnet-d7a6afad"]
  launch_configuration      = aws_launch_configuration.custom.id
  min_size                  = var.min_size
  max_size                  = var.max_size
  health_check_grace_period = 200
  health_check_type         = "EC2"
  force_delete              = true

  tag {
    key                 = "Name"
    value               = "Custom EC2 instance"
    propagate_at_launch = true
  }
}
