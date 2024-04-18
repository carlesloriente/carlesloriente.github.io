#!/bin/bash

export GEM_PATH=$(pwd)/vendor/bundle
INPUT_DIR="node_modules/nocc-bootstrap-theme"
WEBROOT="_site_local"
OUTPUT_DIR="assets/vendor"

if [ ! -d $INPUT_DIR ]; then
  echo "Nocc node_module directory not found, please install the package";
  exit 0;
fi

test_bin() {
  echo -n "Checking xsg-utils package: "
  pkg_return=$( which xdg-open > /dev/null 2>&1 ; echo $? )
  if [ "$pkg_return" = "0" ] ;then
    test_pass
  else
    errmsg="This script requires xdg-utils to be installed"
    test_fail
  fi
}

test_pass() {
  printf "[\e[1m\033[32mPASS\033[0m]\n";
}

test_fail() {
  printf "[\e[1m\033[31mFAIL\033[0m]\n";
  echo "$errmsg";
  exit 1;
}

build_site() {
  echo "Building local site: "
  JEKYLL_ENV=development bundle exec jekyll build --incremental --verbose --destination ${WEBROOT} --config _config.yml;
  mkdir -p ${WEBROOT}/${OUTPUT_DIR};
  rsync -avz --progress ${INPUT_DIR} ${WEBROOT}/${OUTPUT_DIR} --exclude src && ruby bin/webserver.rb;
}

test_bin
build_site