var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var mainNpmFiles = require('gulp-main-npm-files');
var config = require('../settings');

var task = function() {
  return gulp.src(config.fonts)
      .pipe(gulp.dest(config.distPath + '/fonts'));
};

module.exports = task;

gulp.task('fonts', task);
