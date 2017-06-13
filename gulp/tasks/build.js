var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var mainNpmFiles = require('gulp-main-npm-files');
var config = require('../settings');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();

var task = function() {
    // set up the browserify instance on a task basis
  var b = browserify(config.appBootstrap, {
    transform: [
      ['babelify', {
        'presets': ['es2015']
      }],
      ['hbsfy', {
          'extensions': ['html']
      }]
    ]
  });

  //copy();

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init())
    .pipe(gulp.dest(config.distPath))
    .pipe(plugins.sourcemaps.write())
    .pipe(browserSync.stream());
    
};

module.exports = task;

gulp.task('build', task);
