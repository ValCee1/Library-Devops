
#RDS Instance properties
resource "aws_db_instance" "custom" {
  allocated_storage       = var.allocated_storage # 20 GB of storage
  engine                  = var.engine
  engine_version          = var.engine_version
  instance_class          = var.instance_class # use micro if you want to use the free tier
  identifier              = var.db_name
  username                = var.db_username # username
  password                = var.db_password # password
  db_subnet_group_name    = aws_db_subnet_group.custom.name
  parameter_group_name    = aws_db_parameter_group.custom.name
  multi_az                = var.multi_az # set to true to have high availability: 2 instances synchronized with each other
  vpc_security_group_ids  = var.instance_sg
  storage_type            = "gp2"
  backup_retention_period = 30                    # how long you’re going to keep your backups
  availability_zone       = var.availability_zone # prefered AZ
  skip_final_snapshot     = true                  # skip final snapshot when doing terraform destroy

  tags = var.tags
}


