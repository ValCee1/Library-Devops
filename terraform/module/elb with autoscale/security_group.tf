
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

  tags = var.tags
}
