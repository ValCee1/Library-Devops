variable "ami" {
  description = "Free tier Amazon-linux ami"
  type        = string
}
variable "department" {
  description = "Department of deployment"
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
variable "public_subnet_id" {
  description = "public subnet_id"
  type        = string
}


variable "security_group_ids" {
  description = "Instance security_groups"
  type        = list(string)
}
variable "sh_script" {
  description = "Desired line of code"
  type        = string
}

variable "tags" {
  description = "CIDR block for VPC"
  type        = map(string)
}
