#!/bin/bash

INPUT_DIR="node_modules/nocc-bootstrap-theme"
WEBROOT="_site_dev"
OUTPUT_DIR="assets/vendor"
export GEM_PATH=$(pwd)/vendor/bundle

if [ ! -d $INPUT_DIR ]; then
  echo "Nocc node_module directory not found, please install the package";
  exit 0;
fi

build_site() {
  JEKYLL_ENV=development bundle exec jekyll build --incremental --verbose --trace --destination ${WEBROOT}/ --config _config.yml,_config_development.yml;
  mkdir -p ${WEBROOT}/${OUTPUT_DIR};
  rsync -avz --progress ${INPUT_DIR} ${WEBROOT}/${OUTPUT_DIR} --exclude src;
  echo "Sync files to Local webserver";
  rsync -avz --no-perms --delete ${WEBROOT}/* $USER@192.168.1.36:/share/notesoncloudcomputing.local;
}

build_site;