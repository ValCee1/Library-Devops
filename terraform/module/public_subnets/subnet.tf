

# Creating public Public Subnets in departmental VPC
resource "aws_subnet" "public" {
  vpc_id                  = var.vpc_id
  cidr_block              = var.cidr_block
  map_public_ip_on_launch = true
  availability_zone       = var.availability_zone

  tags = var.tags
}
