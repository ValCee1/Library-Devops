#!/usr/bin/env bash
sudo su -
echo "Port 12890" >> /etc/ssh/sshd_config
systemctl restart sshd