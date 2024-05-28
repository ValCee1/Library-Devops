# assign a elastic ip to the network interface created in step 7
resource "aws_eip" "library_eip" {
  domain            = "vpc"
  network_interface = module.backend_subnet.nic_id
  depends_on        = [module.elb, module.backend_subnet]
}
