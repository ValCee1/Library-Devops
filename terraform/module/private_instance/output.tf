output "instance_id" {
  value = aws_instance.private.id
}

output "azs" {
  value = aws_instance.private.availability_zone
}
output "private_ip" {
  value = aws_instance.private.private_ip
}
output "public_ip" {
  value = aws_instance.private.public_ip
}
