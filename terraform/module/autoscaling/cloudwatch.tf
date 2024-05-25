

#Auto scaling Cloud Watch Monitoring
resource "aws_cloudwatch_metric_alarm" "custom-cpu-alarm" {
  alarm_name          = "custom-cpu-alarm"
  alarm_description   = "Alarm once CPU Use Increases"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "120"
  statistic           = "Average"
  threshold           = var.max_threshold

  dimensions = {
    "AutoScalingGroupName" = aws_autoscaling_group.custom.name
  }

  actions_enabled = true
  alarm_actions   = [aws_autoscaling_policy.custom.arn]
}







#Auto descaling cloud watch 
resource "aws_cloudwatch_metric_alarm" "custom-cpu-alarm-scaledown" {
  alarm_name          = "custom-cpu-alarm-scaledown"
  alarm_description   = "Alarm once CPU Uses Decrease"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "120"
  statistic           = "Average"
  threshold           = var.min_threshold

  dimensions = {
    "AutoScalingGroupName" = aws_autoscaling_group.custom.name
  }

  actions_enabled = true
  alarm_actions   = [aws_autoscaling_policy.custom-cpu-policy-scaledown.arn]
}
