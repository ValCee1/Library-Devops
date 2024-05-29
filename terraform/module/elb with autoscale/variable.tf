# Variable definitions for Subnet module

variable "ALL_IPs" {
  description = "IP address CIDR and subnet mask for all IP ranges, without exception"
  type        = string
  default     = "0.0.0.0/0"
}

variable "frontend_ip" {
  description = "IP address for frontend instances"
  type        = list(string)
}

variable "backend_ip" {
  description = "IP address for backend instances"
  type        = list(string)

}
variable "ami" {
  description = "instance_ami to be created"
  type        = string

}
variable "instance_type" {
  description = "Instance Type to be used"
  type        = string
}
variable "instance_ids" {
  description = "Instance IDs to be used"
  type        = list(string)
}

variable "key_name" {
  description = "SSH key name"
  type        = string
}

variable "open_ports" {
  description = "List of ports to allow"
  type        = list(number)
}


variable "max_size" {
  description = "Maximum Number of Instances"
  type        = number
}
variable "min_size" {
  description = "Minimum Number of Instances"
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
