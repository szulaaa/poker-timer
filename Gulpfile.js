var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var sourcemaps = require('gulp-sourcemaps'); // v1.2.2
var cleanCSS = require('gulp-clean-css'); // v1.2.2
//var autoprefixer = require('gulp-autoprefixer');

var CSSDestinationPath = './assets/css/';

gulp.task('sass', function() {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'compressed',
            errLogToConsole: false,
        }))
        .on('error', function(err) {
            notify().write(err);
            this.emit('end');
        })
        .pipe(cleanCSS())

        //.pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(CSSDestinationPath))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write({ includeContent: false, sourceRoot: CSSDestinationPath }))
        .pipe(browserSync.stream());
   
});


gulp.task('browsersync', ['sass'], function() {

   /* browserSync.init({
        proxy: "http://localhost/dropbox/poker-timer/"
    });*/

    gulp.watch('assets/sass/*.scss', ['sass']);
    gulp.watch("index.html").on('change', browserSync.reload);
    gulp.watch("js/**/*.js").on('change', browserSync.reload);

    gulp.watch("js/templates/**/*.html").on('change', browserSync.reload);
});
//Watch task
gulp.task('default', ['browsersync']);
