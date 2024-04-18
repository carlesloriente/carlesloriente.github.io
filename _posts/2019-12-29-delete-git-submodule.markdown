---
layout: post
comments: true
title: "Delete submodule Git"
date: 2019-12-29 10:53:23 +0200
categories: git submodule
tags:
- git
- submodule
background: '/assets/images/bg-git.webp'
redirect_from: "/git/2019/12/29/delete-git-submodule/"
---

How to delete a Git submodule.

{% include code_block.html lang="bash" content='git submodule deinit -f -- a/submodule
rm -rf .git/modules/a/submodule
git rm -f a/submodule' %}

Download the GitHub Gist [delete-git-submodule.sh](https://gist.github.com/carlesloriente/dfe339351c15ba784428d5a993f29f19){:target="_blank"}

Remember to commit and push your changes to the repo.
