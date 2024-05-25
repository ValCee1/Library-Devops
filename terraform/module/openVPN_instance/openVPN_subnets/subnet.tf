

# Creating openVPN openVPN Subnets in departmental VPC
resource "aws_subnet" "openVPN" {
  vpc_id                  = var.vpc_id
  cidr_block              = var.openVPN_cidr_block
  map_public_ip_on_launch = true
  availability_zone       = var.availability_zone

  tags = var.tags
}
