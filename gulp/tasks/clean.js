var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var config = require('../settings');
var Q = require('q');

var task = function() {
  return del([config.distPath + '/**/*']);
};

gulp.task('clean', task);

module.exports = task;

