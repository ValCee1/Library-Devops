
# Create ingress rules for each port
resource "aws_security_group_rule" "ingress" {
  

  type              = "ingress"
  from_port         = var.open_ports[count.index]
  to_port           = var.open_ports[count.index]
  count             = length(var.open_ports)
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.private.id
}
