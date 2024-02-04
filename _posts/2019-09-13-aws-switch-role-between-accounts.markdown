---
layout: post
comments: true
title:  "AWS Switch role between accounts (Administrator access)"
date:   2019-09-13 20:10:45 +0200
categories: aws iam
background: '/assets/images/bg-post.webp'
---

**Log the AWS Console with the account that you want to be the accessed account**

Select IAM -> Roles, create a new role, attach the policy "AdministratorAccess", fill in role name (e.g: Admin) and description.

Select the previously created role, click "Trust relationships", edit trust relationship, paste the following policy:

{% gist carlesloriente/69d9aa0ee17675def577727fd5829459 %}

**Log the AWS Console with the account that you want to be the accessing account**

Click in your user id, select switch role, fill in with the Account name and role (from accessed account), click switch role and that's it.
