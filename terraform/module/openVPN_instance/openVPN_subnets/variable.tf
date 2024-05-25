# Variable definitions for Subnet module

variable "ALL_IPs" {
  description = "IP address CIDR and subnet mask for all IP ranges, without exception"
  type        = string
  default     = "0.0.0.0/0"

}
variable "availability_zone" {
  description = "Current deployment availability zone"
  type        = string
}

variable "openVPN_cidr_block" {
  description = "CIDR block for openVPN subnet"
  type        = string
  default     = "10.0.255.0/24"
}

variable "environment" {
  description = "Current deployment environment"
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
  description = "ID of the chosen vpc"
  type        = string
}
