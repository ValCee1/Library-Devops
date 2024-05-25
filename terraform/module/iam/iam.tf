#TF File for IAM Users and Groups

resource "aws_iam_user" "user" {
  name = var.username
}
