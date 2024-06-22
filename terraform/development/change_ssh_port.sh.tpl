#!/bin/bash
# change_ssh_port.sh.tpl

NEW_SSH_PORT=${NEW_SSH_PORT}
sudo su -
# Update SSH port in sshd_config
sed -i "s/^#Port 22/Port $NEW_SSH_PORT/" /etc/ssh/sshd_config
sed -i "s/^Port 22/Port $NEW_SSH_PORT/" /etc/ssh/sshd_config

# Handle socket activation by updating the sshd.socket configuration
if [ -f /lib/systemd/system/ssh.socket ]; then
    mkdir -p /etc/systemd/system/ssh.socket.d
    cat <<EOL > /etc/systemd/system/ssh.socket.d/override.conf
[Socket]
ListenStream=
ListenStream=$NEW_SSH_PORT
EOL
    systemctl daemon-reload
    systemctl restart ssh.socket
else
    systemctl restart sshd
fi

# Validate SSH configuration
sshd -t

# Sleep to allow SSH to restart properly
sleep 5

sed -i "s/^#Port 22/Port 12890/" /etc/ssh/sshd_config
sed -i "s/^Port 22/Port 12890/" /etc/ssh/sshd_config

cat <<EOL > /etc/systemd/system/ssh.socket.d/override.conf
[Socket]
ListenStream=
ListenStream=12890
EOL
    systemctl daemon-reload
    systemctl restart ssh.socket