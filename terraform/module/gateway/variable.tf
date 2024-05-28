
variable "environment" {
  description = "Current deployment environment"
  type        = string
}

variable "tags" {
  description = "CIDR block for VPC"
  type        = map(string)
}

variable "vpc_id" {
  description = "ID of the chosen vpc"
  type        = string
}
