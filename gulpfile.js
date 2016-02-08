'use strict';

var path = require('path');
var fs = require('fs');

var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var babelRegister = require('babel-core/register');

var babelrc = JSON.parse(fs.readFileSync('.babelrc'));

gulp.task('build', ['clean'], function() {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel(babelrc))
    .pipe(gulp.dest('lib'));
});

gulp.task('clean', function() {
  return del(['lib/**/*.js', '!lib', '!lib/.gitkeep']);
});

gulp.task('watch-src-to-build', ['build'], function() {
  return gulp.watch(['src/**/*.js'], function(evt) {
    gulp.src(evt.path)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(babel(babelrc))
      .pipe(gulp.dest(path.dirname(evt.path.replace(path.join(__dirname, 'src'), 'lib'))))
      .on('end', function() {
        return gulp.src(evt.path.replace('src', 'test'))
          .pipe(mocha({
            compilers: {
              js: babelRegister
            }
          }))
          .on('error', gutil.log);
      });
  });
});

gulp.task('watch-test-to-test', ['build'], function() {
  return gulp.watch(['test/**/*.js'], function(evt) {
    gulp.src(evt.path)
      .pipe(mocha({
        compilers: {
          js: babelRegister
        }
      }))
      .on('error', gutil.log);
  });
});

gulp.task('test', ['build'], function() {
  return gulp.src(['test/**/*.js'])
   .pipe(mocha({
     compilers: {
       js: babelRegister
     }
   }));
});

gulp.task('dev', ['watch-src-to-build', 'watch-test-to-test']);
