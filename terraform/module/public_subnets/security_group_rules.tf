
# Create ingress rules for each port
resource "aws_security_group_rule" "ingress" {
  for_each = toset(var.open_ports)

  type              = "ingress"
  from_port         = each.value
  to_port           = each.value
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.public.id
}
