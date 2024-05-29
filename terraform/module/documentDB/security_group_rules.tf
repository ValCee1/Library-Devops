
# Create ingress rules for each port
resource "aws_security_group_rule" "ingress" {
  type              = "ingress"
  from_port         = var.open_ports[count.index]
  to_port           = var.open_ports[count.index]
  count             = length(var.open_ports)
  protocol          = "tcp"
  cidr_blocks       = ["10.0.0.0/16"]
  security_group_id = aws_security_group.app_db_sg.id
}


resource "aws_security_group_rule" "allow_ping" {

  type              = "ingress"
  security_group_id = aws_security_group.public.id
  description       = "Allow inbound ICMP ping"
  from_port         = 0
  to_port           = 0
  protocol          = "icmp"
  cidr_blocks       = ["0.0.0.0/0"]
}
