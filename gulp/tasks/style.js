var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var mainNpmFiles = require('gulp-main-npm-files');
var config = require('../settings');

var task = function() {
  return gulp.src(config.styles)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass())
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(config.distPath));
};

module.exports = task;

gulp.task('style', task);
