ALL_IPs    = "0.0.0.0/0"
app_cidr   = "10.0.50.0/24"
ami        = "ami-00ac45f3035ff009e"
AWS_REGION = "eu-west-3"
ebs_size   = "20"
ebs_type   = "gps"
subnet_cidr = {
  private = "10.0.101.0/24"
  public  = "10.0.1.0/24"
}

iam_usernames       = ["emerie", "val"]
instance_type       = "t2.micro"
key_name            = "department"
openvpn_ami         = "ami-07bf5da57dc62b064"
PATH_TO_PUBLIC_KEY  = "devops_training_key.pub"
PATH_TO_PRIVATE_KEY = "devops_training_key"
SSH_PORT            = 12890
trustedIPs          = ["196.251.243.156/30", "10.0.0.0/16"]

vpc_cidr = "10.0.0.0/16"
