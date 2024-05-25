# Variable definitions for VPC module

variable "environment" {
  description = "Current deployment environment"
  type        = string
}

variable "tags" {
  description = "CIDR block for VPC"
  type        = map(string)
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
}
