---
layout: post
comments: true
title:  "RouterOS export and send by mail config file"
date:   2019-12-27 12:43:23 +0200
categories: routeros mikrotik
background: '/assets/images/bg-mikrotik.webp'
---

If you have some hardware from Mikrotik, or use some virtual/cloud appliance that runs RouterOS, this little script could be very handy, exports and send by email the device configuration.

```
/export file=export
/tool e-mail send to="REPLACEME@WITHYOURMAIL.COM" subject=([/system identity get name] . " Export " . [/system clock get date]) body="([/system clock get date] configuration file)" file=export.rsc
```

Download GitHub Gist [mikrotik-routeros_export-config-file-and-sent-email.rsc](https://gist.github.com/carlesloriente/e83e61f883fab90c2ea9e16d08df7413){:target="_blank"}
