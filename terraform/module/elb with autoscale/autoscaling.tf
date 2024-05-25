
#Autoscaling Group
resource "aws_autoscaling_group" "custom" {
  name                      = "custom-autoscaling"
  vpc_zone_identifier       = var.subnet_ids
  launch_configuration      = aws_launch_configuration.custom_launchconfig.name
  min_size                  = var.min_size
  max_size                  = var.max_size
  health_check_grace_period = 200
  health_check_type         = "ELB"
  load_balancers            = [aws_elb.custom-elb.name]
  force_delete              = true

  tag {
    key                 = "Name"
    value               = "LB EC2 instance"
    propagate_at_launch = true
  }
}
