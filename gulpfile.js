// grab our gulp packages
var gulp  = require('gulp'),
  cleanCSS = require('gulp-clean-css'),
  cleanJS = require('gulp-minify'),
  concat = require('gulp-concat'),
  sass   = require('gulp-sass'),
  util = require('gulp-util');

// sources
var jsSource = 'node_modules/materialize-css/js/*.js',
  cssSource = 'node_modules/materialize-css/sass/materialize.scss';

// default task
gulp.task('default', function() {
  util.log('Complete Build');
  gulp.start('build-css');
  gulp.start('build-js');
});

// default task
gulp.task('production', function() {
  util.log('Complete Production Build');
  gulp.start('build-css').start('clean-css');
  gulp.start('build-js').start('clean-js');
});

// build css
gulp.task('build-css', function() {
  util.log('Building CSS files!');
  return gulp.src([cssSource, './scss/settings.scss'], { base: '.' })
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build/css'));
});

// compress css
gulp.task('clean-css', function(){
  util.log('Compressing CSS files!');
  return gulp.src('build/css/app.css')
    .pipe(concat('app.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});

// build js
gulp.task('build-js', function() {
  util.log('Building JS files!');
  return gulp.src([jsSource, './js/app.js'], { base: '.' })
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js'));
});

// compress js
gulp.task('clean-js', function() {
  util.log('Compressing JS files!');
  gulp.src('build/js/app.js')
    .pipe(cleanJS({
        ext:{
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('build/js'))
});
