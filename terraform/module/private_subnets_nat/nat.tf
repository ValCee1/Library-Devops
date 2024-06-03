
resource "aws_nat_gateway" "private" {
  allocation_id = aws_eip.nat.id
  subnet_id     = var.public_subnet_id
  tags          = var.tags
}
