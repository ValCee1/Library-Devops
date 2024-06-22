

variable "ALL_IPs" {
  description = "All IP addresses"
  type        = string
  default     = "0.0.0.0/0"
}
variable "allowed_IPs" {
  description = "Allowed IP addresses on open ports"
  type        = list(string)
}

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
variable "docdb_instance_class" {
  description = "Availability zones"
  type        = string
}
variable "environment" {
  description = "Database Identifier"
  type        = string
}

variable "open_ports" {
  description = "List of open ports"
  type        = list(number)
}

variable "openVPN_ip" {
  description = "List of open ports"
  type        = string
}

variable "SSH_PORT" {
  description = "My Custom SSH port"
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
