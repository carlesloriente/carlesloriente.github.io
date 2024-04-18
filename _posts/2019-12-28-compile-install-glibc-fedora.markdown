---
layout: post
comments: true
title: "Compile and install GLIBC 2.18 in CentOS 7"
date: 2019-12-28 16:10:23 +0200
categories: fedora glibc
tags:
- fedora
- glibc
background: '/assets/images/bg-fedora.webp'
redirect_from:
- "/fedora/glibc/2019/12/28/compile-install-glibc-fedora.html"
- "/fedora/glibc/2019/12/28/compile-install-glibc-fedora/"
---

Download and compile GLIBC 2.18 in CentOS executing the following script.

{% include code_block.html lang="bash" content='# Check gist comments to verify system PATH and or adapt it.
wget https://ftp.gnu.org/gnu/glibc/glibc-2.18.tar.gz
tar zxvf glibc-2.18.tar.gz
cd glibc-2.18
mkdir build
cd build
../configure --prefix=/opt/glibc-2.18
make -j4
sudo make install
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/glibc-2.18/lib' %}

Download the GitHub Gist [compile-and-install-glibc_2.18-centos-7.sh](https://gist.github.com/carlesloriente/ab3387e7d035ed400dc2816873e9089e){:target="_blank"}
