variable "ami" {
  description = "Free tier Amazon-linux ami"
  type        = string
}
variable "azs" {
  description = "Availability zone for open VPN"
  type        = string
}
variable "environment" {
  description = "Current deployment environment"
  type        = string
}
variable "instance_type" {
  description = "Free-tier instance type for training purposes"
  type        = string
}

variable "key_name" {
  description = "the name to give my ssh security key"
  type        = string
}


variable "instance_connect_ip" {
  description = "List of IPs that can access openVPN admin"
  type        = list(string)
}

variable "tags" {
  description = "CIDR block for VPC"
  type        = map(string)
}

variable "vpc_id" {
  description = "VPC ID for open VPN instance and subnet"
  type        = string
}
