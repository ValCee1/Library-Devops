output "private_ip" {
  value = aws_instance.app.private_ip
}
output "public_ip" {
  value = aws_instance.app.public_ip
}

output "subnet_id" {
  value = module.app_subnet.subnet_id
}

output "sg_id" {
  value = module.app_subnet.sg_id
}
