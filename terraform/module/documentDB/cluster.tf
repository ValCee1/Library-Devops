
# DocumentDB Cluster
resource "aws_docdb_cluster" "app_db" {
  cluster_identifier     = "${var.db_name}-${var.environment}-docdb-cluster"
  master_username        = var.db_master_username
  master_password        = var.db_master_password # Ensure to use a secure password
  skip_final_snapshot    = true
  db_subnet_group_name   = aws_docdb_subnet_group.app_db.name
  vpc_security_group_ids = [aws_security_group.app_db_sg.id]
  tags                   = var.tags
}
