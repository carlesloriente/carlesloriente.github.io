---
layout: post
comments: true
title: "VPN server using IKEv2 IPSec with certificates on RouterOS"
date: 2021-04-23 14:43:23 +0200
categories: routeros mikrotik vpn
tags:
- routeros
- mikrotik
background: '/assets/images/bg-mikrotik.webp'
redirect_from: 
- "/routeros/mikrotik/vpn/2021/04/23/configure-vpn-server-ikev2-ipsec-with-certificates-mikrotik-routeros.html"
- "/routeros/mikrotik/vpn/2021/04/23/configure-vpn-server-ikev2-ipsec-with-certificates-mikrotik-routeros/"
---

The following file (rsc) for Mikrotik RouterOS v6.45+ configures an VPN usign IKEv2 IPSec

Before use it, please replace the following values:

- CA.yourdomain.com with the CA domain
- YOURSTATE with the state (optional)
- YOURORG with the name of the organization
- YOURCOUNTRY with the country code (https://www.iban.com/country-codes){:target="_blank"}
- vpn.yourdomain.com with the VPN hostname
- 1.1.1.1 with the vpn IP

```rsc
# Mikrotik RouterOs IKEv2/IPSec VPN Full configuration
# RouterOS v6.45+

/system identity
set name=mikrotik_aws_vpn_ikev2

/system clock
set time-zone-name=Europe/Dublin

/system ntp client
set enabled=yes server-dns-names=pool.ntp.org

/system logging
add topics=firewall action=memory

/system logging 
add topics=ipsec,!debug action=memory

/interface bridge
add name=bridge

/interface wireless security-profiles
set [ find default=yes ] supplicant-identity=MikroTik

/interface bridge port
add bridge=bridge interface=ether1

/ip service
set telnet disabled=yes
set ftp disabled=yes
set www disabled=yes
set api disabled=yes
set api-ssl disabled=yes

/ip dhcp-client
add dhcp-options=hostname,clientid disabled=no interface=bridge

/ip pool
add name=pool-vpn ranges=10.0.254.200-10.0.254.250

#
# CA Certificate

/certificate add name=CA.yourdomain.com country=YOURCOUNTRY state=YOURSTATE locality=YOURSTATE organization=YOURORG common-name=CA.yourdomain.com subject-alt-name=DNS:CA.yourdomain.com key-size=2048 days-valid=3650 trusted=yes key-usage=digital-signature,key-encipherment,data-encipherment,key-cert-sign,crl-sign 

/certificate sign CA.yourdomain.com

/certificate add name=vpn.yourdomain.com country=ES state=YOURSTATE locality=YOURSTATE organization=YOURORG unit=VPN common-name=vpn.yourdomain.com subject-alt-name=DNS:vpn.yourdomain.com key-size=2048 days-valid=1095 trusted=yes key-usage=tls-server

/certificate sign vpn.yourdomain.com ca=CA.yourdomain.com

#
# Client Certificate 

certificate add name=~clienttemplate@vpn.yourdomain.com country=ES state=YOURSTATE locality=YOURSTATE organization=YOURORG common-name=~client-template@vpn.yourdomain.com subject-alt-name=email:~clienttemplate@vpn.yourdomain.com key-size=2048 days-valid=365 trusted=yes key-usage=tls-client

#
# IPSec

/ip ipsec mode-config add address-pool=pool-vpn address-prefix-length=32 name="modeconf vpn.yourdomain.com" split-include=0.0.0.0/0 static-dns=8.8.8.8 system-dns=no 

/ip ipsec proposal add auth-algorithms=sha512,sha256,sha1 enc-algorithms=aes-256-cbc,aes-256-ctr,aes-256-gcm,aes-192-ctr,aes-192-gcm,aes-128-cbc,aes-128-ctr,aes-128-gcm lifetime=8h name="proposal vpn.yourdomain.com" pfs-group=none

/ip ipsec profile add dh-group=modp2048,modp1536,modp1024 enc-algorithm=aes-256,aes-192,aes-128 hash-algorithm=sha256 name="profile vpn.yourdomain.com" nat-traversal=yes proposal-check=obey 

/ip ipsec policy group add name="group vpn.yourdomain.com"

/ip ipsec policy add dst-address=10.0.254.0/24 group="group vpn.yourdomain.com" proposal="proposal vpn.yourdomain.com" src-address=0.0.0.0/0 template=yes sa-src-address=0.0.0.0 sa-dst-address=0.0.0.0 ipsec-protocols=esp level=require protocol=all action=encrypt

/ip ipsec peer add exchange-mode=ike2 address=0.0.0.0/0 name="peer" passive=yes send-initial-contact=yes profile="profile vpn.yourdomain.com"

#
# Firewall

/ip firewall nat
add action=masquerade chain=srcnat out-interface=bridge src-address=10.0.254.200-10.0.254.250
add chain=srcnat

#Input Chain Rules
/ip firewall filter 
add action=accept chain=input connection-state=established,related,untracked comment="DEFAULT: Accept established, related, and untracked traffic." 
add action=drop chain=input connection-state=invalid comment="DEFAULT: Drop invalid traffic 1." 
add action=accept chain=input protocol=icmp comment="DEFAULT: Accept ICMP traffic." 

#Forward Chain Rules
/ip firewall filter 
add action=accept chain=forward ipsec-policy=in,ipsec comment="DEFAULT: Accept In IPsec policy." 
add action=accept chain=forward ipsec-policy=out,ipsec comment="DEFAULT: Accept Out IPsec policy." 
add action=accept chain=forward connection-state=established,related,untracked comment="DEFAULT: Accept established, related, and untracked traffic." 
add action=drop chain=forward connection-state=invalid comment="DEFAULT: Drop invalid traffic 2." 

# No WAN network
/ip firewall filter add place-before=1 protocol=udp dst-port=500,4500 dst-address=1.1.1.1 action=accept chain=input comment="Allow UDP 500,4500 IPSec for peer" 
/ip firewall filter add place-before=1 protocol=ipsec-esp dst-address=1.1.1.1 action=accept chain=input comment="Allow IPSec-esp for peer"
/ip firewall filter add chain=input src-address=10.0.254.0/24 ipsec-policy=in,ipsec action=accept place-before=1 disabled=no comment="IKE2: Allow ALL incoming traffic from 10.0.254.0/24 to this RouterOS"
/ip firewall filter add chain=forward src-address=10.0.254.0/24 dst-address=10.2.0.0/16 ipsec-policy=in,ipsec action=accept place-before=1 disabled=no comment="IKE2: Allow ALL forward traffic from 10.0.254.0/24 to AWS IRELAND network"
/ip firewall filter add chain=forward src-address=10.0.254.0/24 dst-address=0.0.0.0/0 ipsec-policy=in,ipsec action=accept place-before=1 disabled=no comment="IKE2: Allow ALL forward traffic from 10.0.254.0/24 to ANY network" 

# WAN
/ip firewall nat add place-before=0 chain=srcnat src-address=10.0.254.0/24 out-interface=ether1 ipsec-policy=out,none action=masquerade to-addresses=1.1.1.1 comment="SRC-NAT IKE2:10.0.254.0/24 --> ether1 traffic"
/ip firewall mangle add action=change-mss chain=forward new-mss=1360 src-address=10.0.254.0/24 protocol=tcp tcp-flags=syn tcp-mss=!0-1360 ipsec-policy=in,ipsec passthrough=yes comment="IKE2: Clamp TCP MSS from 10.0.254.0/24 to ANY"
/ip firewall mangle add action=change-mss chain=forward new-mss=1360 dst-address=10.0.254.0/24 protocol=tcp tcp-flags=syn tcp-mss=!0-1360 ipsec-policy=out,ipsec passthrough=yes comment="IKE2: Clamp TCP MSS from ANY to 10.0.254.0/24"

/certificate export-certificate CA.yourdomain.com 
```

Download GitHub Gist [mikrotik_routeros_vpn-ikev2-ipsec.rsc](https://gist.github.com/carlesloriente/70fbc993e867f838f8d476097d372518){:target="_blank"}

Then you can use the following commands in routeros to create the user certificates, please remember to replace using your own values

- CA.yourdomain.com with the CA domain
- vpn.yourdomain.com with the VPN hostname
- 1.1.1.1 with the vpn IP
- USERNAME with the username of the VPN connection
- YOURPASSPHRASE with the passphrase of this certificate

```rsc
# Certificate creation for users

/certificate add copy-from=~clienttemplate@vpn.yourdomain.com name=USERNAME@vpn.yourdomain.com common-name=USERNAME@vpn.yourdomain.com subject-alt-name=email:USERNAME@vpn.yourdomain.com
/certificate sign USERNAME@vpn.yourdomain.com ca=CA.yourdomain.com
/certificate export-certificate USERNAME@vpn.yourdomain.com type=pkcs12 export-passphrase=YOURPASSPHRASE
/ip ipsec identity add auth-method=digital-signature certificate=vpn.yourdomain.com remote-certificate=USERNAME@vpn.yourdomain.com generate-policy=port-strict match-by=certificate mode-config="modeconf vpn.yourdomain.com" peer="peer 1.1.1.1" policy-template-group="group vpn.yourdomain.com" remote-id=user-fqdn:USERNAME@vpn.yourdomain.com
```

Download GitHub Gist [mikrotik-routeros_create-ipsec-ikev2-certificates_vpn_users.rsc](https://gist.github.com/carlesloriente/94a203608009ee1bb3c6c335317e11a6){:target="_blank"}

The next step is download the certificates (e.g. using winbox) to your computer and set up the VPN connection.
## Related articles

[IKEv2 RoadWarrior VPN connection using p12 certificate on Fedora 31+](/posts/2021-04-24-configure-ikev2-vpn-connection-fedora/)
