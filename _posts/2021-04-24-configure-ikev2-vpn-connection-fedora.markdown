---
layout: post
comments: true
title: "VPN connection using p12 cert on Fedora 31+"
date: 2021-04-24 12:43:23 +KEv2 RoadWarrior 0200
categories: fedora vpn ikev2
tags:
- fedora
- vpn
background: '/assets/images/bg-fedora.webp'
---

Using the following script you can install all the libraries needed for IKEv2 IPSec VPNs and configure a roadwarrior connection.

Requirements:

- IKEv2 IPsec VPN gateway 
- P12 User Certificate with passphrase
- Your Fedora OS should be in english language 

```bash
#!/bin/bash

sudo dnf remove -y strongswan NetworkManager-strongswan NetworkManager-strongswan-gnome strongswan-libipsec
sudo dnf install -y libreswan NetworkManager-libreswan NetworkManager-libreswan-gnome ldns nss-tools firewall-config

echo "Changing ipsec.conf"
sudo sed -i 's/# dnssec-enable=no/dnssec-enable=no/g' /etc/ipsec.conf
sudo sed -i 's/#DNSSEC=allow-downgrade/DNSSEC=false/g' /etc/systemd/resolved.conf

echo "Configuring Firewall"
sudo firewall-cmd --permanent --zone=FedoraWorkstation --add-service ipsec 
sudo firewall-cmd --permanent --add-port=500/udp
sudo firewall-cmd --permanent --add-port=4500/udp
sudo firewall-cmd --reload

sudo mkdir -p /var/lib/ipsec/nss
#sudo chmod 755 /var/lib/ipsec/nss/ /etc/ipsec.d/
#sudo chown ${name}:${name} /var/lib/ipsec/nss/
#sudo chmod 644 /var/lib/ipsec/nss/*.*
sudo ipsec initnss

echo ""
read -p "Enter your username: " name
name=${name}

echo ""
read -p "Enter the VPN gateway: " vpn
vpn=${vpn}
echo "Your ID is ${name}@${vpn}"

echo ""
echo "Rename your cert file to ${name}@${vpn}.p12"
echo "and save it to your ~/Documents folder"

read -p "Press [Enter] to continue..."

if [ ! -f ${HOME}/Documents/${name}@${vpn}.p12 ]
then
    echo "~/Documents/${name}@${vpn}.p12 does not exist, error"
    exit 0
else
    echo ""
    echo "Now you need the VPN password to import the certificate"
    sudo ipsec import ~/Documents/${name}@${vpn}.p12
fi

echo "Create configuration file for IPSec connection, connection name awsibikev2"

sudo dd of=/etc/ipsec.d/roadwarriorclient.conf << EOF
conn roadwarriorvpn
    ikev2=insist
    left=%defaultroute
    leftsubnet=0.0.0.0/0
    leftcert=${name}@${vpn}
    leftid=%fromcert
    leftmodecfgclient=yes
    right=${vpn}
    rightid=%fromcert
    rightsubnet=0.0.0.0/0
    rightca=%same
    authby=rsasig
    narrowing=yes
    mobike=yes
    auto=add
EOF

echo "Added to .bashrc start_vpn and stop_vpn commands"
cat <<EOT >> $HOME/.bashrc
function start_vpn()
{
    sudo ipsec auto --up roadwarriorvpn
}
function stop_vpn()
{
    sudo ipsec auto --down roadwarriorvpn
}
EOT

sudo semanage fcontext -a -t ipsec_key_file_t '/var/lib/ipsec/nss'
sudo restorecon -v /var/lib/ipsec/*

sudo systemctl enable ipsec
sudo ipsec pluto --stderrlog --config /etc/ipsec.conf

echo "Please reboot the system"
```

Download GitHub Gist [fedora-configure-and-setup-ikev2.sh](https://gist.github.com/carlesloriente/4496fa54e444456435ec7e7e897a28e3){:target="_blank"}

Save the script to your $HOME folder and execute it in shell using the command: <code>sudo sh configure-and-setup-ikev2.sh</code>

When the script has finished the message "Please reboot the system" will appear on your terminal, please reboot it. After that your IKEv2 connection will be configured, you can start the connection using shell typing in "start_vpn" (without quotes), or stop it typing in "stop_vpn" (without quotes).

## Related articles

[Configure a VPN server using IKEv2 IPSec with certificates on Mikrotik RouterOS](https://www.notesoncloudcomputing.com/routeros/mikrotik/vpn/2021/04/23/configure-vpn-server-ikev2-ipsec-with-certificates-mikrotik-routeros/)
