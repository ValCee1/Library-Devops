output "subnet_id" {
  value = aws_subnet.public.id
}

output "sg_id" {
  value = aws_security_group.app.id
}
output "gateway_id" {
  value = aws_internet_gateway.general.id
}
