#Security Group for department
resource "aws_security_group" "openVPN" {
  vpc_id                 = var.vpc_id
  name                   = "${var.environment}_openVPN_SG"
  description            = "security group for ${var.environment} openVPN"
  revoke_rules_on_delete = true

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.ALL_IPs]
    description = "Permit all outbound traffic"
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.instance_connect_ip
    description = "Allow SSH access for Instance Connect"
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [var.ALL_IPs]
    description = "Allow https access for ALL IP"
  }

  ingress {
    from_port   = 943
    to_port     = 943
    protocol    = "tcp"
    cidr_blocks = ["196.251.243.156/30"]
    description = "Allow https access for my IP"
  }

  tags = var.tags

}


