var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber');


gulp.task('browser-sync', function () {
    browserSync.init({
        server: "./"
        });
});


gulp.task('sass', function() {
    return gulp.src('./sass/*.sass')
    .pipe(plumber({
    errorHandler: function(err) {
    // display the error message
    console.log(err);
    // end the errored task
    this.emit('end')}
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
});


// Semi Working Workflow
gulp.task('default', ['browser-sync'], function() {
    gulp.watch('./sass/*.sass', ['sass']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./**/*.js').on('change', browserSync.reload);
});