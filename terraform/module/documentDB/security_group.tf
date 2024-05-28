#Security Group for department
resource "aws_security_group" "app" {
  vpc_id                 = var.vpc_id
  name                   = "docDB SG"
  description            = "security group for documentDBS"
  revoke_rules_on_delete = true

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.ALL_IPs]
    description = "Permit all outbound traffic"
  }

  ingress {
    from_port   = var.SSH_PORT
    to_port     = var.SSH_PORT
    protocol    = "tcp"
    cidr_blocks = ["${var.openVPN_ip}/32"]
    description = "Allow SSH access for VPN"
  }

  tags = var.tags

}


