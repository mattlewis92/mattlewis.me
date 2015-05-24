var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('serve', function () {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['serve']);
