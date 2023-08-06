#!/bin/bash

# Full script for fixing homebrew update error
# Reset
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install

# Reset homebrew-cask
brew untap homebrew/homebrew-cask - -force
brew reinstall cask

# Reset homebrew-core
brew update-reset -d -v