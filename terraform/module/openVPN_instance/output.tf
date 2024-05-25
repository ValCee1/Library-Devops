output "instance_id" {
  value = aws_instance.openVPN.id
}
output "azs" {
  value = aws_instance.openVPN.availability_zone
}
output "private_ip" {
  value = aws_instance.openVPN.private_ip
}
output "public_ip" {
  value = aws_instance.openVPN.public_ip
}
