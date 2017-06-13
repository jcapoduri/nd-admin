var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var mainNpmFiles = require('gulp-main-npm-files');
var config = require('../settings');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var build   = require('./build');

var task = function() {
  browserSync.init({
    server: config.distPath
  });
  gulp.watch(config.scripts, ['build']);
  gulp.watch(config.distPath + '/*').on('change', browserSync.reload);
};

gulp.task('watch', task);
