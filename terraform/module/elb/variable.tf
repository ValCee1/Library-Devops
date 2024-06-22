# Variable definitions for Subnet module

variable "allowed_IPs" {
  description = "Allowed IP addresses on open ports"
  type        = list(string)
}

variable "instance_ids" {
  description = "Instance IDs to be used"
  type        = list(string)
}

variable "open_ports" {
  description = "List of ports to allow"
  type        = list(number)
}

variable "subnet_ids" {
  description = "List of subnet_ids to be linked with the load balancer"
  type        = list(string)
}

variable "tags" {
  description = "CIDR block for VPC"
  type        = map(string)
}


variable "vpc_id" {
  description = "ID of the chosen vpc"
  type        = string
}
