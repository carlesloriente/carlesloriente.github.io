#!/bin/bash

git submodule deinit -f -- a/submodule   
rm -rf .git/modules/a/submodule
git rm -f a/submodule