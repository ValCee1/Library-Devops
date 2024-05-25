data "aws_availability_zones" "available" {
  all_availability_zones = true
  state                  = "available"
}


data "aws_ami" "latest_amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }
}

data "aws_vpc" "default_vpc" {
  default = true
}

data "aws_ip_ranges" "european_ec2" {
  regions  = [var.AWS_REGION]
  services = ["ec2_instance_connect"]
}
