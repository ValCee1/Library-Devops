
module "mongodb_cluster" {
  source               = "../module/documentDB"
  azs                  = [module.data.availability_zone[0]]
  backend_ip           = [module.backend_instance_1.private_ip, module.backend_instance_2.private_ip]
  db_master_password   = "CHIKERE.Ezechukwu"
  db_master_username   = "chiemerie"
  db_name              = "library-app"
  docdb_instance_class = "t4g.nano"
  environment          = var.environment
  subnet_ids           = [module.backend_subnet.subnet_id]
  vpc_id               = module.vpc.vpc_id
  depends_on           = [module.backend_instance_1]
}
