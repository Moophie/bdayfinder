const gulp = require('gulp');
const { src, dest, watch } = require('gulp');

const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('node-sass');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');

sass2css = function () {
    return src('src/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('src/css'));
}

minifyHtml = function () {
    return src('src/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(dest('public'));
}

minifyCss = function () {
    return src('src/css/*.css')
        .pipe(csso())
        .pipe(dest('public/css'));
};

minifyJs = function () {
    return src('src/js/*.js')
    .pipe(uglify())
    .pipe(dest('public/js'))
};

exports.default = function () {
    watch('./src/html/*.html', minifyHtml);
    watch('./src/sass/**/*.scss', sass2css);
    watch('./src/css/*.css', minifyCss);
    watch('./src/js/*.js', minifyJs);
}