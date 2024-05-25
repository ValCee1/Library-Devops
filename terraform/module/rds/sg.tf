
#Security Group for MariaDB

resource "aws_security_group" "allow-mariadb" {
  vpc_id      = var.vpc_id
  name        = "allow-mariadb"
  description = "security group for Maria DB"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 3306
    to_port   = 3306
    protocol  = "tcp"
    self      = true
  }

  tags = var.tags
}
