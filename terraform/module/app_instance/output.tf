output "private_ip" {
  value = aws_instance.app.private_ip
}
output "public_ip" {
  value = aws_instance.app.public_ip
}

output "sg_id" {
  value = aws_security_group.app.id
}
