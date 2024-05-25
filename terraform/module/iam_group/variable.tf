variable "username" {
  description = "list of usernames to be added to group"
  type        = list(string)
}

variable "group_name" {
  description = "desired group name"
  type        = string
}


variable "policy_arn" {
  description = "list of usernames to be added to group"
  type        = string
}
