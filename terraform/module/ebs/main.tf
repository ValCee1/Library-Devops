
#EBS resource Creation
resource "aws_ebs_volume" "ebs-volume-1" {
  availability_zone = var.azs
  size              = var.ebs_size
  type              = var.ebs_type

  tags = var.tags
}

#Atatch EBS volume with AWS Instance
resource "aws_volume_attachment" "ebs-volume-1-attachment" {
  device_name = "/dev/xvdh"
  volume_id   = aws_ebs_volume.ebs-volume-1.id
  instance_id = var.instance_id
}
