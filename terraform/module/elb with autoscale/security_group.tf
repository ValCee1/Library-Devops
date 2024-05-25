
#Security group for AWS ELB
resource "aws_security_group" "custom-elb" {
  vpc_id      = var.vpc_id
  name        = "custom-elb-sg"
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
    cidr_blocks = [var.openVPN_ip]
    description = "Allow SSH access for VPN"
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.frontend_ip
    description = "Allow all access for frontend  instances"
  }


  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = var.frontend_ip
    description = "Allow all access for frontend  instances"
  }


  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.backend_ip
    description = "Allow all access for backend  instances"
  }


  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = var.backend_ip
    description = "Allow all access for backend  instances"
  }


  tags = var.tags
}
