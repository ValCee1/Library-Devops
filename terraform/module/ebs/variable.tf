variable "department" {
  description = "Department of deployment"
  type        = string
}
variable "azs" {
  description = "EBS availability zone"
  type        = string
}

variable "ebs_size" {
  description = "The size of the additional ebs size necessary to add"
  type        = string
}

variable "ebs_type" {
  description = "The size of the additional ebs size necessary to add"
  type        = string
}

variable "environment" {
  description = "Current deployment environment"
  type        = string
}
variable "instance_id" {
  description = "ID of instance to be linked to the EBS volume"
  type        = string
}

variable "vpc_id" {
  description = "ID of the chosen vpc"
  type        = string
}

variable "tags" {
  description = "CIDR block for VPC"
  type        = map(string)
}
