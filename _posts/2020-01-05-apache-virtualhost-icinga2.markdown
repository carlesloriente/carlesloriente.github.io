---
layout: post
comments: true
title:  "Apache Virtualhost for Icinga2"
date:   2020-01-05 8:33:23 +0200
categories: icinga2
background: '/assets/images/bg-icinga2.webp'
---

[Icinga2](https://icinga.com/docs/icinga2/latest/) is a very cool monitoring tool, we have used it in several projects with satisfactory results. You can practically monitor anything that is needed. Local or remote infrastructure, baremetal or virtual, etc.

You can configure to use Apache and Icinga2 using the following Virtualhost.

{% gist carlesloriente/e208a167ac882f30ee745659d8ae9f21 icinga_apache_vhost.conf %}
