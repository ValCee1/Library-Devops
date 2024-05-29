
module "openVPN_instance" {
  source              = "../module/openVPN_instance"
  environment         = var.environment
  ami                 = var.openvpn_ami
  instance_type       = var.instance_type
  azs                 = module.data.availability_zone[0]
  vpc_id              = module.vpc.vpc_id
  key_name            = aws_key_pair.ssh.key_name
  instance_connect_ip = module.data.instance_connect_ips
  subnet_id           = module.public_subnet.subnet_id
  open_ports          = [22, 943, 443, 1194]
  trustedIPs          = [var.ALL_IPs]
  tags = {
    "Application" = "Library App"
    "Environment" = "Development"
    "Name"        = "OpenVPN Instance"
  }
  depends_on = [module.data, module.vpc, module.public_subnet]
}
