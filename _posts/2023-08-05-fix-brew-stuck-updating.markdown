---
layout: post
comments: true
title: "Fix Brew stuck/hangs updating in MacOs"
date: 2023-08-05 10:53:45 +0200
categories: fix brew update stuck cli macos
tags:
- macos
- brew
background: '/assets/images/2023-08-05-fix-brew-stuck-updating.webp'
redirect_from: 
- "/fix/brew/update/stuck/cli/macos/2023/08/05/fix-brew-stuck-updating.html"
- "/fix/brew/update/stuck/cli/macos/2023/08/05/fix-brew-stuck-updating/"
searchs: "3189"
---

The [brew (Hombrebrew)](https://brew.sh/index){:target="_blank"} package manager is a mush have tool for developers using macOs. It enables you to install, update, and manage a wide range of software packages from the command line.
However, sometimes you might encounter issues when updating. If brew update command get stuck you can execute the following commands to fix it.

{% include code_block.html lang="rsc" content='#!/bin/bash

## Full script for fixing homebrew update error

sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install

## Reset homebrew-cask

brew untap homebrew/homebrew-cask --force
brew reinstall cask

## Reset homebrew-core

brew update-reset -d -v' %}

Download the GitHub Gist [fix_brew_stuck_updating.bash](https://gist.github.com/carlesloriente/d565db45a60dd91a41be5bb9eb68079c){:target="_blank"}

Background header image created using [Dream Studio by stability.ai](https://dreamstudio.ai){:target="_blank"}.

> *Prompt*: Create an illustration of fixing Brew updating in MacOs

[Download Full size image 2K](/assets/images/dreamstudio/2K/Fix-Brew-stuck-updating.webp){:target="_blank"}
