---
layout: post
comments: true
toc: false
title: "RouterOS export and send by mail config file"
date: 2019-12-27 12:43:23 +0200
categories: routeros mikrotik
tags:
- routeros
- mikrotik
background: '/assets/images/bg-mikrotik.webp'
redirect_from: 
- "/routeros/mikrotik/2019/12/27/routeros-export-and-send-config.html"
- "/routeros/mikrotik/2019/12/27/routeros-export-and-send-config/"
---

If you have some hardware from Mikrotik, or use a virtual/cloud appliance that runs RouterOS, this little script could be very handy, exports and send by email the device configuration.

{% include code_block.html lang="rsc" content='/export file=export
/tool e-mail send to="REPLACEME@WITHYOURMAIL.COM" subject=([/system identity get name] . " Export " . [/system clock get date]) body="([/system clock get date] configuration file)" file=export.rsc' %}

Download the GitHub Gist [mikrotik-routeros_export-config-file-and-sent-email.rsc](https://gist.github.com/carlesloriente/e83e61f883fab90c2ea9e16d08df7413){:target="_blank"}
