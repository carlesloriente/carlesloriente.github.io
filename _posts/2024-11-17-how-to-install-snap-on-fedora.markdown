---
layout: post
comments: true
toc: false
title: "How to install Snap on Fedora"
description: "A guide to install and run Snap on Fedora"
date: 2024-11-17 23:40:05 +0200
categories: install snap fedora
tags:
- install
- snap
- fedora
- daemon
background: '/assets/images/bg-fedora.webp'
---

**Installing Snap on Fedora**: A secure and scalable way to embed applications on Linux devices

What is [Snap](https://snapcraft.io/){:target="_blank"}? From Wikipedia, Snap is a software packaging and deployment system developed by [Canonical](https://canonical.com/){:target="_blank"} for operating systems that use the Linux kernel and the systemd init system.

*Open your terminal and type*:
{% include code_block.html lang="bash" content='sudo dnf install snapd' %}

The command will download and install the snapd daemon.

Now, log out and log in from your system or restart the computer.

{:.text-center}
![Snapcraft logo](/assets/images/2024-11-17-how-to-install-snap-on-fedora.png){:.img-fluid}

To enable classic snap support, create a symbolic link between `/var/lib/snapd/snap` and `/snap`:

*Type in your terminal*:
{% include code_block.html lang="bash" content='sudo ln -s /var/lib/snapd/snap /snap' %}

For more information and troubleshooting, visit the [official documentation]( https://snapcraft.io/docs/installing-snap-on-fedora/){:target="_blank"}
