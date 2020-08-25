#!/bin/bash

sudo yum -y install nvme-cli;
sudo mkfs.xfs /dev/nvme1n1;
sudo mkdir -p /mnt/ephemeral;
sudo mount /dev/nvme1n1 /mnt/ephemeral;
sudo chown centos:centos /mnt/ephemeral;