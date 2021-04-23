---
layout: post
comments: true
title:  "Configure a IKEv2 RoadWarrior VPN connection using p12 certificate on Fedora 31+"
date:   2021-04-24 12:43:23 +0200
categories: fedora vpn ikev2
background: '/assets/images/bg-fedora.jpg'
---

Using the following script you can install all the libraries needed for IKEv2 IPSec VPNs and configure a roadwarrior connection.

Requirements:

- IKEv2 IPsec VPN gateway 
- P12 User Certificate with passphrase
- Your Fedora OS should be in english language 

{% gist 4496fa54e444456435ec7e7e897a28e3 %}

Save the script to your $HOME folder and execute it in shell using the command: sudo sh configure-and-setup-ikev2.sh 

When the script has finished the message "Please reboot the system" will appear on your terminal, please reboot it. After that your IKEv2 connection will be configured, you can start the connection using shell typing in "start_vpn" (without quotes), or stop it typing in "stop_vpn" (without quotes).

** Related articles

[Configure a VPN server using IKEv2 IPSec with certificates on Mikrotik RouterOS](https://carlesloriente.github.io/routeros/mikrotik/vpn/2021/04/23/configure-vpn-server-ikev2-ipsec-with-certificates-mikrotik-routeros.html) 