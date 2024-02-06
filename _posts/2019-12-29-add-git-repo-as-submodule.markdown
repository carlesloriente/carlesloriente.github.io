---
layout: post
comments: true
title: "Add submodule Git"
date: 2019-12-29 9:53:23 +0200
categories: git
background: '/assets/images/bg-git.webp'
---

Using Git submodules you can attach other Git repositories to your current Git repostory at a specific path. This allows you to commit, pull, and push there repositories independently. You can add as many Git submodules as you need.

```bash
git submodule add git@bitbucket.org:user/repo a/submodule
git submodule update --init --recursive
```

Download GitHub Gist [add-git-submodule.sh](https://gist.github.com/carlesloriente/d5373b80d541598028af74904f232126){:target="_blank"}
