variable "ami" {
  description = "Free tier Amazon-linux ami"
  type        = string
}
variable "ALL_IPs" {
  description = "All IP addresses"
  type        = string
  default     = "0.0.0.0/0"
}
variable "allowed_IPs" {
  description = "Allowed IP addresses on open ports"
  type        = list(string)
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

variable "open_ports" {
  description = "List of ports to allow"
  type        = list(number)
}


variable "sh_script" {
  description = "Desired line of code"
  type        = string
}

variable "subnet_id" {
  description = "Desired subnet for Frontend App"
  type        = string
}

variable "tags" {
  description = "CIDR block for VPC"
  type        = map(string)
}

variable "vpc_id" {
  description = "App VPC id"
  type        = string
}
