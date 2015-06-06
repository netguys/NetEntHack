var gulp = require("gulp");
var gutil = require('gulp-util');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var htmlreplace = require('gulp-html-replace');
var livereload = require('gulp-livereload'); //https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

var paths = {
    scripts: [
        'app/client/js/libs/**/*.js',
        'app/client/js/app/**/*.js'

    ],
    images: 'app/client/img/**/*',
    json : 'app/client/res/*.json',
    audio:  'app/client/res/audio/*'
};


gulp.task('default',  ['build', 'images',  'json', 'htmlCompile', 'watch']);

gulp.task("build", function () {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat("build.js"))
        .pipe(babel().on('error', gutil.log))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/client/js"))
        .pipe(livereload());
});

gulp.task("htmlCompile", function () {
    return gulp.src("app/client/index.html")
        .pipe(htmlreplace({
            'js': 'js/build.js'
        }))
        .pipe(gulp.dest("dist/client"));
});

// Copy all static images
gulp.task('images', function() {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(gulp.dest('dist/client/img'));
});

gulp.task('json', function() {
    return gulp.src(paths.json)
        // Pass in options to the task
        .pipe(gulp.dest('dist/client/json'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(paths.scripts, ['build', 'images', 'htmlCompile']);
});
