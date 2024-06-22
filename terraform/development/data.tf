module "data" {
  source     = "../module/data"
  AWS_REGION = var.AWS_REGION
}

# Use templatefile to generate the script
locals {
  change_ssh_port_script = templatefile("${path.module}/change_ssh_port.sh.tpl", {
    NEW_SSH_PORT = var.SSH_PORT
  })
}
