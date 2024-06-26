# Variable definitions for Subnet module

variable "ALL_IPs" {
  description = "IP address CIDR and subnet mask for all IP ranges, without exception"
  type        = string
  default     = "0.0.0.0/0"
}

variable "allowed_IPs" {
  description = "Allowed IP addresses on open ports"
  type        = list(string)
}

variable "availability_zone" {
  description = "Current deployment availability zone"
  type        = string
}

variable "cidr_block" {
  description = "CIDR block for this subnet"
  type        = string
}

variable "environment" {
  description = "Current deployment environment"
  type        = string
}

variable "open_ports" {
  description = "List of ports to allow"
  type        = list(number)
}


variable "tags" {
  description = "CIDR block for VPC"
  type        = map(string)
}

variable "vpc_id" {
  description = "ID of the chosen vpc"
  type        = string
}
