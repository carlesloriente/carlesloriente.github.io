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