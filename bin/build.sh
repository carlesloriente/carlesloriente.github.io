#!/bin/bash

# Install rbenv
cp -TR node_modules/nocc-bootstrap-theme assets/vendor/nocc-bootstrap-theme/ && JEKYLL_ENV=production bundle exec jekyll build --incremental --verbose