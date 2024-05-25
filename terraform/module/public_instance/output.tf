output "instance_id" {
  value = aws_instance.public.id
}
output "azs" {
  value = aws_instance.public.availability_zone
}
output "private_ip" {
  value = aws_instance.public.private_ip
}
output "public_ip" {
  value = aws_instance.public.public_ip
}
