#Routing Table for NAT for private subnet
resource "aws_route_table" "private" {
  vpc_id = var.vpc_id
  route {
    cidr_block           = var.ALL_IPs
    network_interface_id = aws_network_interface.private.id
  }

  tags = var.tags

}
