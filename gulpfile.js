var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create()

gulp.task('default', ['compile']);

gulp.task('compile', () => {
    return gulp.src('src/**/*.js')
        .pipe(concat('dragenselect.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./demo"
        }
    });
});