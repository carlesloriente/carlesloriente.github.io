---
layout: post
comments: true
title: "Fixing error libruby.so.3.2: cannot open shared object file: No such file or directory"
description: "How to fix a missing or misconfigured Ruby Installation.."
date: 2025-02-26 21:11:02 +0200
categories: ruby libruby fix-installation
tags:
- ruby
- libruby
- fix-installation 
background: '/assets/images/bg-ruby.webp'
---

## libruby.so.3.2: cannot open shared object file: No such file or directory

This error message indicates that the `libruby.so.3.2` shared object file is missing or inaccessible. This file is a crucial component of the Ruby runtime, responsible for providing core Ruby functionalities. When this file is missing, any Ruby command, including `gem` and applications like Jekyll, will fail. This issue typically arises from a broken or incomplete Ruby installation, a misconfigured Ruby environment, or when switching between Ruby versions.

This guide will walk you through the steps to resolve this error on various operating systems.

## Reinstalling Ruby

The most common solution is to reinstall Ruby.I recommend to use a version manager like rbenv or rvm. Alternatively, you can reinstall Ruby directly from your operating system's package manager.

### Ubuntu/Debian

{% include code_block.html lang="bash" content="sudo apt update
sudo apt-get install ruby-full" %}

> **&#9432;** *ruby-full* provides a comprehensive Ruby installation. For install a specific Ruby version use rbenv or rvm.
{:.alert .alert-info}

### Fedora/CentOS

{% include code_block.html lang="bash" content="sudo dnf install ruby-build ruby-build-rbenv ruby-devel
rbenv --version # Check rbenv installation" %}

> **&#9432;** *ruby-build* and *rbenv* are installed for managing multiple Ruby versions. The package *ruby-devel* provides the development headers.
{:.alert .alert-info}

### Windows

1. Download the RubyInstaller from the official [RubyInstaller website](https://rubyinstaller.org/downloads/){:="_blank"}.
2. Ensure you download the installer that includes DevKit. The DevKit is essential for compiling native extensions.
3. Follow the installer's instructions.

### macOS

Homebrew is required, if missing, please install it:
{% include code_block.html lang="bash" content='/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"' %}

Install Ruby stuff:
{% include code_block.html lang="bash" content='brew update
brew install rbenv ruby-build
rbenv install 3.2 # Install Ruby version 3.2 using rbenv and set as default
rbenv versions # Check if install was successful
rbenv global 3.2
rbenv rehash # Update rbenv shims
echo &lsquo;eval &quot;$(rbenv init -)&quot;&rsquo; >> ~/.zshrc source ~/.zshrc # Add rbenv to your shell configuration' %}

> **&#9432;** The ZSH shell installation is optional and only needed if you use Oh My Zsh.
{:.alert .alert-info}

- *rbenv rehash* updates rbenv's shims, which are used to find and execute Ruby executables.
- Adding eval *"$(rbenv init -)"* to your shell configuration ensures rbenv is initialized when you open a new terminal.

## Dependencies

{% include code_block.html lang="bash" content="gem install ffi" %}
The FFI (Foreign Function Interface) gem allows Ruby to interact with native libraries. It's often required by other gems.

- If you encounter issues installing the ffi gem, you may need to install the build-essential package (on Debian-based systems) or the equivalent for your operating system.

{% include code_block.html lang="bash" content="gem install bundler
bundle update" %}
Bundler manages gem dependencies. `bundle update` updates all gems listed in your `Gemfile` to their latest compatible versions. If you do not have a Gemfile, bundle update will have no effect:

## Check Ruby installation

Ensure that the correct version of Ruby is being used.
{% include code_block.html lang="bash" content="ruby -v # Verify the active Ruby version
which ruby # Show which Ruby binary is being used" %}

After these steps, you should be able to run Ruby commands without issues.

Try running the command that initially produced the error. For example, if you encountered the error while running Jekyll, execute `jekyll serve`.

## Troubleshooting

- Same error after reinstalling Ruby, double-check your shell configuration files for any conflicting Ruby paths.
- If using a version manager, ensure that the correct Ruby version is selected.
- If gem install commands are failing due to network problems, verify internet connectivity.
- If you have recently updated your operating system, try reinstalling ruby.
