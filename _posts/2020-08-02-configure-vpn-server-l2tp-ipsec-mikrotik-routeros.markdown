---
layout: post
comments: true
toc: false
title: "Configure a VPN server using L2TP IPSec with Mikrotik RouterOS"
date: 2020-08-02 12:43:23 +0200
categories: routeros mikrotik vpn
tags:
- routeros
- mikrotik
background: '/assets/images/bg-mikrotik.webp'
redirect_from:
- "/routeros/mikrotik/vpn/2020/08/02/configure-vpn-server-l2tp-ipsec-mikrotik-routeros.html"
- "/routeros/mikrotik/vpn/2020/08/02/configure-vpn-server-l2tp-ipsec-mikrotik-routeros/"
views: "0390"
---

The following file (rsc) for Mikrotik RouterOS v6.45+ configures an VPN usign L2TP

{% include code_block.html lang="rsc" content='# Mikrotik RouterOs L2TP/IPSec VPN Full configuration

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

/ip ipsec peer
add name=l2tpserver passive=yes

/ip ipsec proposal
set [ find default=yes ] enc-algorithms=3des

/ip ipsec mode-config
add address-pool=pool-vpn name=cfg1 static-dns=8.8.8.8 system-dns=no

/ppp profile
add bridge=bridge local-address=pool-vpn name=profile-vpn remote-address=pool-vpn
add bridge=bridge dns-server=8.8.8.8 local-address=pool-vpn name=ipsec_vpn remote-address=pool-vpn

/interface l2tp-server server
set authentication=mschap1,mschap2 default-profile=ipsec_vpn enabled=yes

/ip dhcp-client
add !dhcp-options disabled=no interface=ether1
add disabled=no interface=bridge

/ip firewall filter
add action=accept chain=input protocol=ipsec-esp

/ip firewall nat
add action=masquerade chain=srcnat out-interface=bridge src-address=10.1.1.2-10.1.1.250
add action=accept chain=srcnat

/ip ipsec identity
add generate-policy=port-override peer=l2tpserver secret="ChangeThisSecret"

/ppp secret
add name=vpn_user password="ChangeThisPasword" profile=profile-vpn service=any' %}

Download the GitHub Gist [mikrotik_routeros_vpn-l2tp-ipsec.rsc](https://gist.github.com/carlesloriente/ee82901e3a67844eaca3097c2352bc03){:target="_blank"}
