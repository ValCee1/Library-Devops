variable "domain_name" {
  description = "The domain name to register in Route 53"
  type        = string
}

variable "ip_address" {
  description = "The IP address to point the domain to"
  type        = string
}
