---
layout: post
comments: true
title:  "Fedora Fix touchpad MSI Prestige"
date:   2019-09-13 20:10:45 +0200
categories: github fedora gist msi
background: '/assets/images/bg-post.jpg'
---

Fedora Fix Touchpad MSI Prestige

Seems that there is a problem in the latest versions of Fedora, when the computer wakes up after sleep mode or hibernate mode, the MSI Prestige touchpad freezes and didn't respond until OS is restarted.

There are several ways to fix that.

**Create an alias inside your .bashrc files

{% gist cc701a468c7e402e757a2d2198bcfafd %}

Everytime your computer wakes up you can call from terminal 'fixtouchpad'.