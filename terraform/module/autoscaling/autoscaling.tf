#Autoscaling Configuration policy - Scaling Alarm
resource "aws_autoscaling_policy" "custom" {
  name                   = "custom-cpu-policy"
  autoscaling_group_name = aws_autoscaling_group.custom.name
  adjustment_type        = "ChangeInCapacity"
  scaling_adjustment     = "1"
  cooldown               = "200"
  policy_type            = "SimpleScaling"
}
