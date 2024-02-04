---
layout: post
comments: true
title:  "Fix mongodb service is not starting up"
date:   2020-01-05 8:33:23 +0200
categories: faq mongodb
background: '/assets/images/bg-mongodb.webp'
---

Sometimes (not many) [MongoDB](https://www.mongodb.com/){:target="_blank"} can't start normally, if there isn't any configuration change for your side, you can fix it using the following commands.

```bash
sudo rm /var/lib/mongo/mongod.lock
sudo mongod --repair -dbpath /var/lib/mongo
sudo service mongod start
```
