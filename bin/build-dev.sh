#!/bin/bash
export GEM_PATH=$(pwd)/vendor/bundle
cp -TR node_modules/nocc-bootstrap-theme assets/vendor/nocc-bootstrap-theme/ && JEKYLL_ENV=development bundle exec jekyll build --incremental --verbose --trace --destination _site_dev --config _config.yml,_config_development.yml
echo "Sync files to Local webserver"
rsync -avz --no-perms --delete _site_dev/* $USER@192.168.1.36:/share/notesoncloudcomputing.local