#Routing Table for NAT for departmental private subnet
resource "aws_route_table" "private" {
  vpc_id = var.vpc_id
  route {
    cidr_block     = var.ALL_IPs
    nat_gateway_id = aws_nat_gateway.private.id
  }

  tags = var.tags

}
