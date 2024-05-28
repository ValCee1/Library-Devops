# Subnet Group
resource "aws_docdb_subnet_group" "app_db" {
  name       = "${var.db_name}-subnet-group"
  subnet_ids = var.subnet_ids
  tags       = var.tags
}
