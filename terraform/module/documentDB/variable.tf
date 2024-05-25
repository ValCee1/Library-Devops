
variable "azs" {
  description = "Availability zones"
  type        = list(string)
}
variable "backend_ip" {
  description = "IP addresses of the backend instances"
  type        = list(string)
}
variable "db_name" {
  description = "Database Identifier"
  type        = string
}
variable "db_master_username" {
  description = "Database Username"
  type        = string
}
variable "db_master_password" {
  description = "Database Password"
  type        = string
}
variable "environment" {
  description = "Database Identifier"
  type        = string
}

variable "docdb_instance_class" {
  description = "Availability zones"
  type        = string
}

variable "subnet_ids" {
  description = "list of subnet ids"
  type        = list(string)
}
variable "tags" {
  description = "CIDR block for VPC"
  type        = map(string)
}

variable "vpc_id" {
  description = "VPC id"
  type        = string
}
