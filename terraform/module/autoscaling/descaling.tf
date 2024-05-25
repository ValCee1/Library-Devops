
#Auto Descaling Policy
resource "aws_autoscaling_policy" "custom-cpu-policy-scaledown" {
  name                   = "custom-cpu-policy-scaledown"
  autoscaling_group_name = aws_autoscaling_group.custom.name
  adjustment_type        = "ChangeInCapacity"
  scaling_adjustment     = "-1"
  cooldown               = "200"
  policy_type            = "SimpleScaling"
}
