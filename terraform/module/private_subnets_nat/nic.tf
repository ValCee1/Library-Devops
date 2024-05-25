# Network Interface (NIC) created on private subnet
resource "aws_network_interface" "private" {
  subnet_id       = aws_subnet.private.id #private subnet
  security_groups = [aws_security_group.private.id]



  tags = var.tags
}
