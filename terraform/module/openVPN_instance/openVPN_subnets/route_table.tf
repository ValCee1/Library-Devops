#Routing Table for NAT for departmental openVPN subnet
resource "aws_route_table" "openVPN" {
  vpc_id = var.vpc_id
  route {
    cidr_block = var.ALL_IPs
    gateway_id = aws_internet_gateway.openVPN.id
  }

  tags = var.tags

}
