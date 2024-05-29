#Security Group for private subnet
resource "aws_security_group" "private" {
  vpc_id                 = var.vpc_id
  name                   = "${var.environment}_Private_SG"
  description            = "security group for ${var.environment} vpc"
  revoke_rules_on_delete = true

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.ALL_IPs]
    description = "Permit all outbound traffic"
  }

  tags = var.tags

}


