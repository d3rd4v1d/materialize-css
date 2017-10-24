// grab our gulp packages
var gulp      = require('gulp'),
  cleanCSS    = require('gulp-clean-css'),
  cleanJS     = require('gulp-minify'),
  concat      = require('gulp-concat'),
  sass        = require('gulp-sass'),
  sourcemaps  = require('gulp-sourcemaps'),
  util        = require('gulp-util');

// default task
gulp.task('default', function() {
  util.log('Complete Build');
  gulp.start('copy-font');
  gulp.start('build-css');
  gulp.start('build-js');
});

// build css
gulp.task('build-css', function() {
  util.log('Building CSS files!');
  return gulp.src(['node_modules/materialize-css/sass/materialize.scss', './scss/settings.scss'], { base: '.' })
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'));
});

// build js
gulp.task('build-js', function() {
  util.log('Building JS files!');
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      "node_modules/materialize-css/js/initial.js",
      "node_modules/materialize-css/js/jquery.easing.1.4.js",
      "node_modules/materialize-css/js/animation.js",
      "node_modules/materialize-css/js/velocity.min.js",
      "node_modules/materialize-css/js/hammer.min.js",
      "node_modules/materialize-css/js/jquery.hammer.js",
      "node_modules/materialize-css/js/global.js",
      "node_modules/materialize-css/js/collapsible.js",
      "node_modules/materialize-css/js/dropdown.js",
      "node_modules/materialize-css/js/modal.js",
      "node_modules/materialize-css/js/materialbox.js",
      "node_modules/materialize-css/js/parallax.js",
      "node_modules/materialize-css/js/tabs.js",
      "node_modules/materialize-css/js/tooltip.js",
      "node_modules/materialize-css/js/waves.js",
      "node_modules/materialize-css/js/toasts.js",
      "node_modules/materialize-css/js/sideNav.js",
      "node_modules/materialize-css/js/scrollspy.js",
      "node_modules/materialize-css/js/forms.js",
      "node_modules/materialize-css/js/slider.js",
      "node_modules/materialize-css/js/cards.js",
      "node_modules/materialize-css/js/chips.js",
      "node_modules/materialize-css/js/pushpin.js",
      "node_modules/materialize-css/js/buttons.js",
      "node_modules/materialize-css/js/transitions.js",
      "node_modules/materialize-css/js/scrollFire.js",
      "node_modules/materialize-css/js/date_picker/picker.js",
      "node_modules/materialize-css/js/date_picker/picker.date.js",
      "node_modules/materialize-css/js/date_picker/picker.time.js",
      "node_modules/materialize-css/js/character_counter.js",
      "node_modules/materialize-css/js/carousel.js",
      "node_modules/materialize-css/js/tapTarget.js",
      './js/app.js'
    ], { base: '.' })
    .pipe(concat('app.js'))
    .pipe(cleanJS({
      ext:{
        min:'.min.js'
      }
    }))
    .pipe(gulp.dest('build/js'));
});

// copy fonts
gulp.task('copy-font', function() {
  util.log('Copying Roboto font files!');
  return gulp.src('node_modules/materialize-css/dist/fonts/roboto/*')
      .pipe(gulp.dest('build/fonts/roboto'));
});
