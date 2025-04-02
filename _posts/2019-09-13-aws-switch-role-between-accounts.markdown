---
layout: post
comments: true
toc: true
title: "AWS Switch role between accounts (Administrator access)"
date: 2019-09-13 20:10:45 +0200
categories: aws iam
tags:
- aws
- iam
background: '/assets/images/bg-post.webp'
redirect_from: "/aws/iam/2019/09/13/aws-switch-role-between-accounts/"
---

## Log the AWS Console with the account that you want to be the accessed account

Select IAM -> Roles, create a new role, attach the policy "AdministratorAccess", fill in role name (e.g: Admin) and description.

Select the previously created role, click "Trust relationships", edit trust relationship, paste the following policy:

{% include code_block.html lang="json" content='{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCESSED_ACCOUNT_ID:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {}
    }
  ]
}' %}

Download the GitHub Gist [IAM Policy account accessed](https://gist.github.com/carlesloriente/69d9aa0ee17675def577727fd5829459){:target="_blank"}

## Log the AWS Console with the account that you want to be the accessing account

Click in your user id, select switch role, fill in with the Account name and role (from accessed account), click switch role and that's it.
