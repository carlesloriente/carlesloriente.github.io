#!/bin/bash

export GEM_PATH=$(pwd)/vendor/bundle
cp -TR node_modules/nocc-bootstrap-theme assets/vendor/nocc-bootstrap-theme/ && JEKYLL_ENV=production bundle exec jekyll build --incremental --verbose --trace --destination docs --config _config.yml
