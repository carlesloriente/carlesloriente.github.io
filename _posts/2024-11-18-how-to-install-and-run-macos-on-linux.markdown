---
layout: post
comments: true
title: "How to install MacOS on Linux with Sosumi"
description: "A guide to install and run MacOS in a Virtual Machine on Fedora or any linux using Sosumi"
date: 2024-11-18 9:20:05 +0200
categories: install virtualization macos linux fedora sosumi
tags:
- install
- virtualization
- macos
- linux
- fedora
- sosumi
background: '/assets/images/bg-macos.webp'
---

**Running MacOS on Linux**: made it easy

[Sosumi](https://github.com/popey/sosumi-snap){:target="_blank"} is an application that will take care of all the headaches and cornerstones to install and run MacOS in practically any linux distribution.

As some of you may know. I'm a long time [Fedora](/posts/2024-11-17-how-to-install-snap-on-fedora/) supporter. So let me explain how I did to configure and run MacOS on Fedora just for learning purposes.

## Installing Sosumi

We will use [Snap](https://snapcraft.io/){:target="_blank"}, a software packaging and deployment system developed by [Canonical](https://canonical.com/){:target="_blank"}.

(Don't have snap installed? Check [how to install Snap](/posts/2024-11-17-how-to-install-snap-on-fedora/) article.)

*Open your terminal and type*:
{% include code_block.html lang="bash" content='sudo snap install sosumi' %}

After installing some packages everything will be ready to start the party.

All the Sosumi files are installed in `$HOME/snap/sosumi/` unless you have a custom directory set.

Let's start Sosumi for the first time:

*Type in your terminal*:
{% include code_block.html lang="bash" content='sosumi' %}

The command will download all the needed resources and when ready, will open QEMU and the Clover bootloader.

![sosumi-sc-1](/assets/images/2024-11-18-how-to-install-and-run-macos-on-linux-1.png)

### Installing MacOS

In the QEMU window, click "Boot macOS Install from macOS Base System"

![sosumi-sc-1-5](/assets/images/2024-11-18-how-to-install-and-run-macos-on-linux-1-5.png)

### Step by step setup

1. Select Disk Utility option in the dialog and click Continue
![sosumi-sc-2](/assets/images/2024-11-18-how-to-install-and-run-macos-on-linux-2.png)

2. Choose the volume Apple Inc. Virtio Block Media (There are two volumes, so choose the bigger one)
![sosumi-sc-3](/assets/images/2024-11-18-how-to-install-and-run-macos-on-linux-3.png)

3. Click Erase from the top bar menu to format the disk
![sosumi-sc-4](/assets/images/2024-11-18-how-to-install-and-run-macos-on-linux-4.png)

4. Click Done in the new dialog
![sosumi-sc-5](/assets/images/2024-11-18-how-to-install-and-run-macos-on-linux-5.png)

5. Quit Disk Utility
![sosumi-sc-5-5](/assets/images/2024-11-18-how-to-install-and-run-macos-on-linux-5-5.png)

6. Now, choose Reinstall macOS and click Continue

7. The installer will appears, click Continue, read the terms and license agreement, Click Agree.
![sosumi-sc-6](/assets/images/2024-11-18-how-to-install-and-run-macos-on-linux-6.png)

8. Select the destination disk
![sosumi-sc-7](/assets/images/2024-11-18-how-to-install-and-run-macos-on-linux-7.png)

9. The installation begans
![sosumi-sc-8](/assets/images/2024-11-18-how-to-install-and-run-macos-on-linux-8.png)

10. After the completed, the last step is to create your user and set some additional settings.

## Increasing the MacOS volume size

if you need to resize the volume used by MacOS, goto `$HOME/snap/sosumi/common`, among other files you will find `macos.qcow2`.

*To increase the size, type in terminal*:
{% include code_block.html lang="bash" content='sudo qemu-img resize --shrink macos.qcow2 +20G' %}

The command will expand in 20GB the volume.

## Decreasing the MacOS volume size

*To decrease the size, type in terminal*:
{% include code_block.html lang="bash" content='sudo qemu-img resize --shrink macos.qcow2 -20G' %}

The command will shrink in 20GB the volume.

## Uninstalling Sosumi and all the related files

*To uninstall, type in terminal*:
{% include code_block.html lang="bash" content='sudo snap remove --purge sosumi' %}
