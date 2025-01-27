---
layout: post
comments: true
title: "Clear local cache using terminal"
date: 2023-08-06 12:53:45 +0200
categories: clear flushcache mDNSResponder
tags:
- flushcache
background: '/assets/images/2023-08-06-flushcache-and-kill-mDNSResponder.webp'
redirect_from: 
- "/clear/flushcache/mdnsresponder/2023/08/06/flushcache-and-kill-mDNSResponder.html"
- "/clear/flushcache/mdnsresponder/2023/08/06/flushcache-and-kill-mDNSResponder/"
views: "0168"
---

The local cache contains files and data that your system has saved to speed up certain processes, but sometimes, you want to ensure you're seeing the most up-to-date version, which clearing the cache can help with.

*Mac*:

{% include code_block.html lang="bash" content='#!/bin/bash
sudo dscacheutil -flushcache;
sudo killall -HUP mDNSResponder;
sleep 2;' %}

Download the GitHub Gist [fedora-configure-and-setup-ikev2.sh](https://gist.github.com/carlesloriente/1cf094165955b85617cd917573df65e1){:target="_blank"}

*Linux*:

{% include code_block.html lang="bash" content='sudo /etc/init.d/nscd restart' %}

Background header image created using [Dream Studio by stability.ai](https://dreamstudio.ai){:target="_blank"}.

> *Prompt*: Create an image portraying a Clear local cache memory using the command line interface in macos computer

[Download Full size image 2K](/assets/images/dreamstudio/2K/Flushcache.webp){:target="_blank"}
