
# Create ingress rules for each port
resource "aws_security_group_rule" "ingress" {

  type              = "ingress"
  from_port         = var.open_ports[count.index]
  to_port           = var.open_ports[count.index]
  count             = length(var.open_ports)
  protocol          = "tcp"
  cidr_blocks       = ["10.0.0.0/16"]
  security_group_id = aws_security_group.private.id
}


resource "aws_security_group_rule" "allow_ping" {

  type              = "ingress"
  security_group_id = aws_security_group.private.id
  description       = "Allow inbound ICMP ping"
  from_port         = "-1"
  to_port           = "-1"
  protocol          = "icmp"
  cidr_blocks       = ["0.0.0.0/0"]
}
