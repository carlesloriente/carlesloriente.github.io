---
layout: post
comments: true
title:  "Clear local cache using terminal"
date:   2023-08-06 12:53:45 +0200
categories: clear flushcache mDNSResponder
background: '/assets/images/dreamstudio/2023-08-06-flushcache-and-kill-mDNSResponder.jpg'
---

The local cache contains files and data that your system has saved to speed up certain processes, but sometimes, you want to ensure you're seeing the most up-to-date version, which clearing the cache can help with.

*Mac*:
{% gist 1cf094165955b85617cd917573df65e1 %}

*Linux*:
<code>sudo /etc/init.d/nscd restart</code>

Background header image created using [Dream Studio by stability.ai](https://dreamstudio.ai){:target="_blank"}.

*Prompt*:
> Create an image portraying a Clear local cache memory using the command line interface in macos computer

[Download Full size image 2K](/assets/images/dreamstudio/2K/2023-08-06-flushcache-and-kill-mDNSResponder.png){:target="_blank"}