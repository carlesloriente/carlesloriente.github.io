#!/bin/bash

# Install rbenv
brew install rbenv

# Initialise rbenv
rbenv init

echo "Verify Rbenv"
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash

echo "Install Ruby 3.0.3"
rbenv install 3.0.3
rbenv global 3.0.3

echo 'export PATH="$HOME/.rbenv/versions/3.0.3/bin:$PATH"' >> ~/.bash_profile
source ~/.bashrc
bundle install
