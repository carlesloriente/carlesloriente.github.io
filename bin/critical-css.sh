#!/bin/bash

# Install critical
npm install critical --save-dev
npm install scssify
npm install dotenv


# Create default gulpfile.js
dd of=../includes/minimal_critical.scss << EOF
// Import partials for critical css content
@import "variables", "mixins", "base",
  "layout", "posts_above", "pages",
  "utils";
EOF
