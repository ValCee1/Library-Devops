#RDS Resources
resource "aws_db_subnet_group" "custom" {
  name        = "${var.db_name}-subnets"
  description = "Amazon RDS subnet group"
  subnet_ids  = var.subnet_ids
}

#RDS Parameters
resource "aws_db_parameter_group" "custom" {
  name        = "${var.db_name}-parameters"
  family      = var.db_family
  description = "${var.db_name} parameter group"

  parameter {
    name  = "max_allowed_packet"
    value = "16777216"
  }
}
