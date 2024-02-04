---
layout: post
comments: true
title:  "Apache Virtualhost for Icinga2"
date:   2020-01-05 8:33:23 +0200
categories: icinga2
background: '/assets/images/bg-icinga2.webp'
---

[Icinga2](https://icinga.com/docs/icinga-2/latest/doc/01-about/){:target="_blank"} is a very cool monitoring tool, we have used it in several projects with satisfactory results. You can practically monitor anything that is needed. Local or remote infrastructure, baremetal or virtual, etc.

You can configure to use Apache and Icinga2 using the following Virtualhost.

```conf
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /usr/share/icingaweb2/public
    RedirectMatch permanent "^/$"   "http://yourdomain.com/icingaweb2/"

    Alias /icingaweb2 "/usr/share/icingaweb2/public"

    <Directory "/usr/share/icingaweb2/public">
        Options SymLinksIfOwnerMatch
        AllowOverride None

        <IfModule mod_authz_core.c>
            # Apache 2.4
            <RequireAll>
                Require all granted
            </RequireAll>
        </IfModule>

        <IfModule !mod_authz_core.c>
            # Apache 2.2
            Order allow,deny
            Allow from all
        </IfModule>

        SetEnv ICINGAWEB_CONFIGDIR "/etc/icingaweb2"

        EnableSendfile Off

        <IfModule mod_rewrite.c>
            RewriteEngine on
            RewriteBase /icingaweb2/
            RewriteCond %{REQUEST_FILENAME} -s [OR]
            RewriteCond %{REQUEST_FILENAME} -l [OR]
            RewriteCond %{REQUEST_FILENAME} -d
            RewriteRule ^.*$ - [NC,L]
            RewriteRule ^.*$ index.php [NC,L]
        </IfModule>

        <IfModule !mod_rewrite.c>
            DirectoryIndex error_norewrite.html
            ErrorDocument 404 /error_norewrite.html
        </IfModule>
    </Directory>
</VirtualHost>
```

Download GitHub Gist [icinga_apache_vhost.conf](https://gist.github.com/carlesloriente/e208a167ac882f30ee745659d8ae9f21){:target="_blank"}
