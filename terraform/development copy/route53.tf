module "route_53" {
  source      = "../module/route53"
  domain_name = "gloriousseed.site"
  ip_address  = module.Frontend.public_ip
}
