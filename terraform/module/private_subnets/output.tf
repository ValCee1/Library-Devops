output "subnet_id" {
  value = aws_subnet.private.id
}
output "sg_id" {
  value = aws_security_group.private.id
}
output "nic_id" {
  value = aws_network_interface.private.id
}
