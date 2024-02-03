---
layout: post
comments: true
title:  "VPN server using IKEv2 IPSec with certificates on RouterOS"
date:   2021-04-23 14:43:23 +0200
categories: routeros mikrotik vpn
background: '/assets/images/bg-mikrotik.webp'
---

The following file (rsc) for Mikrotik RouterOS v6.45+ configures an VPN usign IKEv2 IPSec

Before use it, please replace the following values:

- CA.yourdomain.com with the CA domain
- YOURSTATE with the state (optional)
- YOURORG with the name of the organization
- YOURCOUNTRY with the country code (https://www.iban.com/country-codes)
- vpn.yourdomain.com with the VPN hostname
- 1.1.1.1 with the vpn IP

{% gist 70fbc993e867f838f8d476097d372518 %}

Then you can use the following commands in routeros to create the user certificates, please remember to replace using your own values

- CA.yourdomain.com with the CA domain
- vpn.yourdomain.com with the VPN hostname
- 1.1.1.1 with the vpn IP
- USERNAME with the username of the VPN connection
- YOURPASSPHRASE with the passphrase of this certificate

{% gist 94a203608009ee1bb3c6c335317e11a6 %}

The next step is download the certificates (e.g. using winbox) to your computer and set up the VPN connection.
## Related articles

[IKEv2 RoadWarrior VPN connection using p12 certificate on Fedora 31+](https://www.notesoncloudcomputing.com/fedora/vpn/ikev2/2021/04/24/configure-ikev2-vpn-connection-fedora.html) 