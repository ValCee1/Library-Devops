
# Create ingress rules for each port
resource "aws_security_group_rule" "ingress" {

  type              = "ingress"
  from_port         = var.open_ports[count.index]
  to_port           = var.open_ports[count.index]
  protocol          = "tcp"
  cidr_blocks       = var.allowed_IPs
  security_group_id = aws_security_group.custom-elb.id
  count             = length(var.open_ports)
}

resource "aws_security_group_rule" "allow_ping" {

  type              = "ingress"
  security_group_id = aws_security_group.custom-elb.id
  description       = "Allow inbound ICMP ping"
  from_port         = 0
  to_port           = 0
  protocol          = "icmp"
  cidr_blocks       = [var.ALL_IPs]
}
