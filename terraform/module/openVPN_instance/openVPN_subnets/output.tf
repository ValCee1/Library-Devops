output "subnet_id" {
  value = aws_subnet.openVPN.id
}

output "sg_id" {
  value = aws_security_group.openVPN.id
}
output "gateway_id" {
  value = aws_internet_gateway.openVPN.id
}
