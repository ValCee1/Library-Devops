
# Group TF Definition
resource "aws_iam_group" "users" {
  name = var.group_name
}

#Assign User to AWS Group
resource "aws_iam_group_membership" "add_users" {
  name  = "${var.group_name}_users_add"
  users = var.username
  group = aws_iam_group.users.name
}

#Policy for AWS Group
resource "aws_iam_policy_attachment" "admin-users-attach" {
  name       = "${var.group_name}_users_attach"
  groups     = [aws_iam_group.users.name]
  policy_arn = var.policy_arn
}
