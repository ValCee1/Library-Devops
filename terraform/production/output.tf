
output "private_instance_private_ip" {
  value = module.engineering_instance.private_ip
}
output "private_instance_public_ip" {
  value = module.engineering_instance.public_ip
}

output "openVPN_private_ip" {
  value = module.openVPN_instance.private_ip
}
output "openVPN_public_ip" {
  value = module.openVPN_instance.public_ip
}
