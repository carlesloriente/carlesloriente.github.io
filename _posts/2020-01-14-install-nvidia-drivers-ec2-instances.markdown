---
layout: post
comments: true
title: "Install Nvidia drivers on EC2 Instances"
date: 2020-01-14 15:23:25 +0200
categories: aws nvidia
tags:
- aws
- nvidia
background: '/assets/images/bg-aws-logo.webp'
---

You can install the AWS grid Nvidia drivers on EC2 Instances type G3 and G4 running CentOS using the following script:

{% include code_block.html lang="bash" content='#!/bin/bash

sudo yum -y install gcc kernel kernel-devel tbb tbb-devel

echo "Download and install AWS NVIDIA GPU Drivers";
curl -o NVIDIA.run https://s3.amazonaws.com/ec2-linux-nvidia-drivers/grid-10.0/NVIDIA-Linux-x86_64-440.43-grid.run
sudo /bin/sh ./NVIDIA.run' %}

Download the GitHub Gist [install_nvidia_drivers_ec2_centos.sh](https://gist.github.com/carlesloriente/2dc56c44afc4b8604f231d083268033f){:target="_blank"}

Follow the installer instructions, when finished, check it using:

{% include code_block.html lang="bash" content='nvidia-smi' %}

The output should be something like this:

```bash
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 440.43       Driver Version: 440.43       CUDA Version: 10.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  Tesla T4            On   | 00000000:00:1E.0 Off |                    0 |
| N/A   36C    P8    15W /  70W |   1430MiB / 15109MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|    0     14402    C+G   ./yourproc                                  1425MiB |
+-----------------------------------------------------------------------------+
```
