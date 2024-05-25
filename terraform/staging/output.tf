
output "frontend_private_ip" {
  value = module.app_instance.private_ip
}
output "frontend_public_ip" {
  value = module.app_instance.public_ip
}

output "backend_1_private_ip" {
  value = module.backend_instance_1.private_ip
}

output "backend_2_private_ip" {
  value = module.backend_instance_2.private_ip
}

output "monitoring_private_ip" {
  value = module.monitoring_instance.private_ip
}

output "elb_ip" {
  value = module.elb.Instance_IP
}
output "cluster_instance_endpoint" {
  value = module.mongodb_cluster.cluster_instance_endpoint
}

output "cluster_endpoint" {
  value = module.mongodb_cluster.cluster_endpoint
}
