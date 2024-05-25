variable "ami" {
  description = "Free tier Amazon-linux ami"
  type        = string
}
variable "azs" {
  description = "App availability zone"
  type        = string
}
variable "app_name" {
  description = "Name of the app to be launched"
  type        = string
}
variable "cidr_block" {
  description = "CIDR block for public subnet"
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

variable "open_ports" {
  description = "List of ports to allow"
  type        = list(number)
}

variable "SSH_PORT" {
  description = "new ssh port"
  type        = number
}


variable "sh_script" {
  description = "Desired line of code"
  type        = string
}

variable "tags" {
  description = "CIDR block for VPC"
  type        = map(string)
}

variable "trustedIPs" {
  description = "Desired line of code"
  type        = list(string)
}

variable "vpc_id" {
  description = "App VPC id"
  type        = string
}
