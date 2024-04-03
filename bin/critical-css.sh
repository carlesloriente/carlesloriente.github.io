#!/bin/bash

# Install critical
npm install --save critical scssify dotenv

# Create config
dd of=../includes/minimal_critical.scss << EOF
// Import partials for critical css content
@import "variables", "mixins", "base",
  "layout", "posts_above", "pages",
  "utils";
EOF
