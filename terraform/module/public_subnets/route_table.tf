#Routing Table for NAT for departmental public subnet
resource "aws_route_table" "public" {
  vpc_id = var.vpc_id
  route {
    cidr_block = var.ALL_IPs
    gateway_id = aws_internet_gateway.general.id
  }

  tags = var.tags

}
