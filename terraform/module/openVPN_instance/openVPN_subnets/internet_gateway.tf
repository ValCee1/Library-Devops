# departmental internet Gateway for VPC
# This is the first step to ensure that our instances on this vpc can communicate to
# the outside world using the openVPN ip address

resource "aws_internet_gateway" "openVPN" {
  vpc_id = var.vpc_id

  tags = var.tags

}
