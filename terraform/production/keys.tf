resource "aws_key_pair" "department" {
  key_name   = var.key_name
  public_key = file(var.PATH_TO_PUBLIC_KEY)
}
