
output "frontend_private_ip" {
  value = module.app_instance.private_ip
}
output "frontend_public_ip" {
  value = module.app_instance.public_ip
}
