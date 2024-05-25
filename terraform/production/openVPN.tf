
module "openVPN_instance" {
  source              = "../module/openVPN_instance"
  environment         = var.environment
  ami                 = var.openvpn_ami
  instance_type       = var.instance_type
  azs                 = module.data.availability_zone[0]
  vpc_id              = module.vpc.vpc_id
  key_name            = aws_key_pair.department.key_name
  instance_connect_ip = module.data.instance_connect_ips

}
