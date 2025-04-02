---
layout: post
comments: true
toc: true
title: "Passwordsafe a secure password manager"
description: "A guide to install and use Passwordsafe"
date: 2024-11-19 10:11:02 +0200
categories: install guide passwordsafe fedora macos android ios passwordmanager
tags:
- install
- passwordsafe
- fedora
- mac
- android
- ios
- passwordmanager
background: '/assets/images/bg-safe.webp'
---

**Passwordsafe**: leaving your passwords in good hands

More than 15 years ago I started looking for a password manager because I didn't think it was a good idea to use the same password in multiple places, memorize hundreds or store them in a text document, the latter being a common practice in many companies, even software development companies -sic.

> I've been using [Passwordsafe](https://pwsafe.org/){:target="_blank"} for more than 15 years for managing and storing my sensitive data

My requirements were clear, it had to be free, open source and multiplatform. I found [Passwordsafe](https://pwsafe.org/){:target="_blank"} that met all my needs adding some very interesting features such as the use of hardware keys as a 2FA method, and a multitude of [versions and projects for different operating systems and programming languages ​​of Passwordsafe](https://pwsafe.org/relatedprojects.shtml){:target="_blank"}.

## A secure password manager free, open source and multiplatform

{:.text-center}
![Passwordsafe](/assets/images/2024-11-19-passwordsafe-a-secure-password-manager-free-open-source-and-multiplatform.webp){:.img-fluid}

For all these years [Passwordsafe](https://pwsafe.org/){:target="_blank"} has been with me on my numerous transitions from Windows to MacOS, to Fedora, back to MacOS and back to Fedora. It also accompanies me on my mobile, currently on iOS using [pwSafe](https://pwsafe.app/ios/){:target="_blank"} a paid version in this case.

## Installing Passwordsafe on Fedora

## Quick way: Copr

*Open your terminal and type*:
{% include code_block.html lang="bash" content='sudo dnf copr enable hdfssk/passwordsafe && sudo dnf -y install passwordsafe' %}

If the command fails, means you are missing some requirements, follow the next step
*In your terminal and type*:
{% include code_block.html lang="bash" content='sudo dnf -y install dnf-plugins-core && sudo dnf copr enable hdfssk/passwordsafe && sudo dnf -y install passwordsafe' %}

## Alternative way: Yum Repo

My preferred solution is to create a text file with the repository data.

*Open your terminal and type*:
{% include code_block.html lang="bash" content='sudo dd of=/etc/yum.repos.d/hdfssk-passwordsafe-fedora.repo << EOF
[copr:copr.fedorainfracloud.org:hdfssk:passwordsafe]
name=Copr repo for passwordsafe owned by hdfssk
baseurl=https://download.copr.fedorainfracloud.org/results/hdfssk/passwordsafe/fedora-39-x86_64/
type=rpm-md
skip_if_unavailable=True
gpgcheck=1
gpgkey=https://download.copr.fedorainfracloud.org/results/hdfssk/passwordsafe/pubkey.gpg
repo_gpgcheck=0
enabled=1
enabled_metadata=1
EOF' %}

The new file will be stored at `/etc/yum.repos.d/`.

Now, the last step,

*In your terminal and type*:
{% include code_block.html lang="bash" content='sudo dnf -y install passwordsafe' %}
