---
layout: post
comments: true
title: "Configure a VPN server using PPTP with Mikrotik RouterOS"
date: 2020-08-01 10:23:33 +0200
categories: routeros mikrotik vpn
tags:
- routeros
- mikrotik
background: '/assets/images/bg-mikrotik.webp'
redirect_from: "/routeros/mikrotik/vpn/2020/08/01/configure-vpn-server-pptp-mikrotik-routeros.html"
---

The following file (rsc) for Mikrotik RouterOS v6.45+ configures an VPN usign PPTP

{% include code_block.html lang="rsc" content='# Mikrotik RouterOs PPTP VPN Full configuration

/interface bridge
add fast-forward=no name=bridge

/interface ethernet
set [ find default-name=ether1 ] advertise=10M-half,10M-full,100M-half,100M-full,1000M-half,1000M-full

/interface bridge port
add bridge=bridge hw=no interface=ether1

/snmp community
set [ find default=yes ] addresses=0.0.0.0/0

/system clock
set time-zone-name=Europe/Dublin

/system identity
set name=mikrotik_vpn

/system ntp client
set enabled=yes server-dns-names=pool.ntp.org

/ip service
set telnet disabled=yes
set ftp disabled=yes
set www disabled=yes
set api disabled=yes
set api-ssl disabled=yes

/ip pool
add name=pool-vpn ranges=10.1.1.2-10.1.1.250

/ppp profile
add bridge=bridge local-address=pool-vpn name=profile-vpn remote-address=pool-vpn
add bridge=bridge dns-server=8.8.8.8 local-address=pool-vpn name=pptp_vpn remote-address=pool-vpn

/ip dhcp-client
add !dhcp-options disabled=no interface=ether1
add disabled=no interface=bridge

/ip firewall filter
add chain=input dst-port=1194 protocol=tcp

/ip firewall nat
add action=masquerade chain=srcnat out-interface=bridge src-address=10.1.1.2-10.1.1.250
add chain=srcnat

/ppp secret
add name=vpn_user password="ChangeThisPasword" profile=profile-vpn service=any' %}

Download the GitHub Gist [mikrotik_routeros_vpn-pptp.rsc](https://gist.github.com/carlesloriente/3ba0d4e9902cd517c76415786fca11cd){:target="_blank"}
