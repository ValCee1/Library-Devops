
# output "Backend_private_ip" {
#   value = module.Backend.private_ip
# }
# output "Backend_public_ip" {
#   value = module.Backend.public_ip
# }

output "Frontend_private_ip" {
  value = module.Frontend.private_ip
}
output "Frontend_public_ip" {
  value = module.Frontend.public_ip
}

# output "monitoring_private_ip" {
#   value = module.monitoring_instance.private_ip
# }

# output "monitoring_public_ip" {
#   value = module.monitoring_instance.public_ip
# }

# output "route53_endpoint" {
#   value = module.route_53.name_servers
# }
