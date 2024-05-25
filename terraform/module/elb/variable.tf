# Variable definitions for Subnet module

variable "frontend_ip" {
  description = "IP address for frontend instances"
  type        = list(string)
}

variable "backend_ip" {
  description = "IP address for backend instances"
  type        = list(string)

}

variable "instance_ids" {
  description = "Instance IDs to be used"
  type        = list(string)
}

variable "openVPN_ip" {
  description = "IP address for openVPN"
  type        = string
}
variable "SSH_PORT" {
  description = "Custom SSH Port"
  type        = number
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
