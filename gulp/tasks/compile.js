var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var mainNpmFiles = require('gulp-main-npm-files');
var config = require('../settings');
var run = require('run-sequence');

var styles = require('./style');
var code   = require('./build');
var fonts  = require('./fonts');
var clean  = require('./clean');

var task = function() {
  return gulp.src(config.index)
        .pipe(gulp.dest(config.distPath)) // write first to get relative path for inject
        .pipe(plugins.inject(code(), {relative: true}))
        .pipe(plugins.inject(styles(), {relative: true}))
        .pipe(gulp.dest(config.distPath));
};

gulp.task('compile-build', task);

gulp.task('compile', function(cb) {
    return run('clean', ['compile-build', 'fonts', 'static'], cb);
});

/*gulp.task('compile-build', ['clean'], function(callback) {
  run(['fonts', 'static'], function(){
    callback();
  });
});

gulp.task('compile', ['compile-build'], task);*/

module.exports = task;
