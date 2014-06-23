var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var es = require('event-stream');
var html2js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var pkg = {
  name: 'my-site'
};

var bowerPath = 'client/bower_components';

var path = {
  js: ['client/src/**/*.js', 'client/src/utils.js'],
  css: 'client/src/css/*.css',
  vendorJs: [
    bowerPath + '/angular/angular.js',
    bowerPath + '/angular-animate/angular-animate.js',
    bowerPath + '/angular-dnd/dnd.js',
    bowerPath + '/angular-font-select/angular-font-select.js',
    bowerPath + '/angular-message-center/dist/message-center.js',
    bowerPath + '/angular-resource/angular-resource.js',
    bowerPath + '/angular-route/angular-route.js',
    bowerPath + '/jquery/dist/jquery.js',
    bowerPath + '/bootstrap/dist/js/bootstrap.js',
    bowerPath + '/momentjs/moment.js',
    bowerPath + '/ngprogress/build/ngProgress.js'
  ],
  vendorCss: [
    bowerPath + '/angular-dnd/dnd.css',
    bowerPath + '/angular-font-select/angular/font-select.css',
    bowerPath + '/angular-message-center/dist/message-center.css',
    bowerPath + '/bootstrap/dist/css/bootstrap.css',
    bowerPath + '/ngprogress/ngProgress.css'
  ],
  fonts: [
    bowerPath + '/bootstrap/dist/fonts/*'
  ],
  dist: 'client/dist',
  templates: 'client/src/**/*.html'
};


gulp.task('clean', function() {
  return gulp.src(path.dist).pipe(clean());
});

gulp.task('build-js', function() {
  var templateStream = gulp.src(path.templates)
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(html2js({
      moduleName: pkg.name + '.templates',
      prefix: 'views/',
      stripPrefix: 'app/'
    }));

  var jsStream = gulp.src(path.js);

  return es.merge(templateStream, jsStream)
    .pipe(concat(pkg.name + '.js'))
    .pipe(gulp.dest('client/dist'))
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('client/dist'));
});

gulp.task('build-vendor-js', function() {
  return gulp.src(path.vendorJs)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('client/dist'));
});

gulp.task('build-css', function() {
  return gulp.src(path.css)
    .pipe(concat(pkg.name + '.css'))
    .pipe(gulp.dest('client/dist'))
    .pipe(rename(pkg.name + '.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('client/dist'));
});

gulp.task('build-vendor-css', function() {
  return gulp.src(path.vendorCss)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('client/dist'));
});

gulp.task('copy', function() {
  return gulp.src(path.fonts)
    .pipe(gulp.dest('client/fonts'));
});

gulp.task('watches', function() {
  gulp.watch([path.js, path.templates], ['build-js']);
  gulp.watch([path.css], ['build-css']);
});

gulp.task('builds', ['build-js', 'build-css', 'build-vendor-js',
  'build-vendor-css'
]);
gulp.task('default', ['builds', 'copy', 'watches']);
