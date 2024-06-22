#!/usr/bin/env bash
sudo su -
sed -i -e "/Port /c\Port 12890" /etc/ssh/sshd_config
shutdown -r now # For Ubuntu

# For Amazon Linux AMI
# echo "Port 12890" >> /etc/ssh/sshd_config 
# systemctl restart sshd 
# sudo ss -tulpn | grep ssh # Displays existing ssh port
# sudo systemctl status ssh # Confirm ssh is up and running
# systemctl status nginx        Check if nginx is running