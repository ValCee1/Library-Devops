
resource "aws_nat_gateway" "private" {
  allocation_id = aws_eip.private.id
  subnet_id     = aws_subnet.private.id
}
