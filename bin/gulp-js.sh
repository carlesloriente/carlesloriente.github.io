#!/bin/bash

# Install GulpJS
npm config set fund false
npm install fix-path
npm install --global gulp-cli
npm init
npm install --save-dev gulp
npm audit fix --force

# Create default gulpfile.js
dd of=../gulpfile.js << EOF
var critical = require('critical');
gulp.task('critical', ['build'], function (cb) {
    critical.generate({
        inline: true,
        base: 'dist/',
        src: 'index.html',
        dest: 'dist/index-critical.html',
        minify: true,
        width: 320,
        height: 480
    });
});

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
EOF