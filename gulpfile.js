'use strict';
// var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');
// var paths = {
//   pages: ['src/**/*.html']
// };

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('./dist/**/*').on('change', browserSync.reload);
});
var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/main.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));

// gulp.task('copy-html', function() {
//   return gulp.src(paths.pages)
//     .pipe(gulp.dest('dist'));
// });

gulp.task('html', ['css', 'copy-sprites'], function() {
  var target = gulp.src('./src/index.html');
  var sources = gulp.src(['./dist/bundle.js', './dist/app.css'], {
    read: false
  });
  var injectPipe = inject(sources, {
    ignorePath: 'dist/',
    addRootSlash: false
  });

  target
  // .pipe(injectPipe)
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', function() {
  return gulp.src('./src/**/*.css')
    .pipe(concat('app.css'))
    // .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    // .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-sprites', ['copy-sprites-images', 'copy-sprites-json']);

gulp.task('copy-sprites-images', function() {
  return gulp.src('./src/**/sprites/**/*.png')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-sprites-json', function() {
  return gulp.src('./src/**/sprites/**/*.json')
    .pipe(gulp.dest('./dist'));
});


function bundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
}

gulp.watch('./src/**/sprites/**/*.json', ['copy-sprites-json']);
gulp.watch('./src/**/sprites/**/*.png', ['copy-sprites-images']);

gulp.task('default', ['html', 'server'], bundle);
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);
