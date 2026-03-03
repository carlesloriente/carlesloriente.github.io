#!/bin/bash

sudo yum -y install gcc kernel kernel-devel tbb tbb-devel

echo "Download and install AWS NVIDIA GPU Drivers";
curl -o NVIDIA.run https://s3.amazonaws.com/ec2-linux-nvidia-drivers/grid-10.0/NVIDIA-Linux-x86_64-440.43-grid.run
sudo /bin/sh ./NVIDIA.run