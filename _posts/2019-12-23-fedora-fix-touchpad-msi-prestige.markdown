---
layout: post
comments: true
title: "Fedora Fix touchpad MSI Prestige"
date: 2019-12-23 11:10:45 +0200
categories: fedora msi
tags:
- fedora
- msi
background: '/assets/images/bg-fedora.webp'
redirect_from:
- "/fedora/msi/2019/12/23/fedora-fix-touchpad-msi-prestige.html"
- "/fedora/msi/2019/12/23/fedora-fix-touchpad-msi-prestige/"
---

Seems that there is a problem in the latest versions of Fedora, when the computer wakes up after sleep mode or hibernate mode, the MSI Prestige touchpad freezes and didn't respond until OS is restarted.

There are several ways to fix that.

**Create an alias inside your .bashrc file

```bash
alias fixtouchpad='sudo rmmod i2c_hid; sudo modprobe i2c_hid'
```

Download GitHub Gist [Fedora Fix Touchpad MSI Prestige](https://gist.github.com/carlesloriente/cc701a468c7e402e757a2d2198bcfafd){:target="_blank"}

Everytime your computer wakes up you can call from terminal 'fixtouchpad'.
