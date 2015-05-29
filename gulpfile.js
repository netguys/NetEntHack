var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var htmlreplace = require('gulp-html-replace');

gulp.task("default", function () {
    return gulp.src("app/client/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("all.js"))
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/client/js"));
});

gulp.task("htmlCompile", function () {
    return gulp.src("app/client/index.html")
        .pipe(htmlreplace({
            'js': 'js/all.js'
        }))
        .pipe(gulp.dest("dist/client"));
});