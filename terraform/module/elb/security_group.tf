
#Security group for AWS ELB
resource "aws_security_group" "custom-elb" {
  vpc_id      = var.vpc_id
  name        = "ELB Security Group"
  description = "security group for Elastic Load Balancer"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
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
