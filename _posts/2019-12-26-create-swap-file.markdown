---
layout: post
comments: true
toc: false
title: "Create swap file in linux"
date: 2019-12-26 11:43:45 +0200
categories: linux swap
tags:
- linux
- swap
background: '/assets/images/bg-post.webp'
redirect_From: "/linux/swap/2019/12/26/create-swap-file/"
---

Create a swap file executing the following script.

If you want to automount the swap file on boot, add to /etc/fstab `/swapfile swap swap defaults 0 0`