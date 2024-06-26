#Security Group for department
resource "aws_security_group" "public" {
  vpc_id                 = var.vpc_id
  name                   = "${var.environment}_Public_SG"
  description            = "security group for ${var.environment} vpc"
  revoke_rules_on_delete = true

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.ALL_IPs]
    description = "Permit all outbound traffic"
  }


  ingress {
    from_port   = "-1"
    to_port     = "-1"
    protocol    = "icmp"
    cidr_blocks = [var.ALL_IPs]
    description = "Allow inbound ICMP ping"
  }

  tags = var.tags

}


