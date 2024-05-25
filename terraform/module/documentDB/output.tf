# Output connection string
output "mongo_connection_string" {
  value = "mongodb://${aws_docdb_cluster.app_db.master_username}:${aws_docdb_cluster.app_db.master_password}@${aws_docdb_cluster.app_db.endpoint}:27017"
}

output "cluster_instance_endpoint" {
  value = aws_docdb_cluster_instance.app_db.endpoint
}
output "cluster_endpoint" {
  value = aws_docdb_cluster.app_db.endpoint
}
