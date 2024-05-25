
# route associations for openVPN subnet
resource "aws_route_table_association" "openVPN" {
  subnet_id      = aws_subnet.openVPN.id
  route_table_id = aws_route_table.openVPN.id

}

