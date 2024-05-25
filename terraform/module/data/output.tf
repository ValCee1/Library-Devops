output "availability_zone" {
  value = data.aws_availability_zones.available.names
}

output "instance_connect_ips" {
  value = data.aws_ip_ranges.european_ec2.cidr_blocks
}