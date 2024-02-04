---
layout: post
comments: true
title:  "Using ephemeral volumes in EC2"
date:   2019-12-25 09:43:45 +0200
categories: aws ec2
background: '/assets/images/bg-aws-logo.webp'
---

In some of the AWS EC2 instances you can use an ephemeral volume, be careful with the data you plan to store in it, when the instance is restarted, stopped or terminated all the data is permanently deleted

You can check the (https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html "complete list") of EC2 instances with ephemeral volumes and his types.

Some of them will require to install an additinal package to use it.

For this example we are going to launch a g4dn.xlarge with CentOS 7 using the AWS Console, as you can see in "Step 7: Review Instance Launch" 

![Storage](/assets/images/instance-storage-disk.jpg)

There are two volumes, one EBS and one Ephemeral.

Connect to the instance using SSH and use the df-h command to view the volumes that are formatted and mounted. 

![df -h](/assets/images/df-h.jpg)

Use the lsblk to view any volumes that were mapped at launch but not formatted and mounted

![lsblk](/assets/images/lsblk.jpg)

As you can see, the name of the ephemeral volume is nvme1n1, so we can move forward and format and mount it, but before that we are going to install the package nvme-cli.

{% gist carlesloriente/5dbd6acf64090bba9593146185c11183 format-and-mount-nvme-volumes.sh %}

Now we can use the ephemeral storage mounted at /mnt/ephemeral, e.g: for swapping/caching purposes (don't to do that on EBS Volumes, cost and IOPS will be affected).