import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

gulp.task('default', ['compile']);

gulp.task('compile', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(concat('drag-en-select.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist'))
});

gulp.task('serve', function () {
    browserSync.init(['dist/**/*.js'], {
        server: ["demo", "dist"]
    });

    gulp.watch('src/**/*.js', ['compile']);
});