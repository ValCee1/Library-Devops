variable "availability_zone" {
  description = "Preferred Availability zone"
  type        = string
}

variable "allocated_storage" {
  description = "Database storage size"
  type        = number
}
variable "db_name" {
  description = "database name"
  type        = string
}
variable "db_family" {
  description = "database family/version"
  type        = string
}
variable "db_password" {
  description = "database login password"
  type        = string
}
variable "db_username" {
  description = "database login username"
  type        = string
}
variable "engine" {
  description = "database engine"
  type        = string
}
variable "engine_version" {
  description = "database engine version"
  type        = string
}
variable "instance_class" {
  description = "Database Instance Class"
  type        = string
}
variable "instance_sg" {
  description = "security group for databse instance"
  type        = list(string)
}
variable "multi_az" {
  description = "Should database span across multiple availability zones?"
  type        = bool
}
variable "subnet_ids" {
  description = "List of subnet ids for the new subnet group"
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
