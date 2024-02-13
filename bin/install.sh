#!/bin/bash

bundle install
bundle add webrick

sudo gem pristine ffi --version 1.11.3
gem install github-pages
