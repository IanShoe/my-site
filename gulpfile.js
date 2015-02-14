var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var es = require('event-stream');
var html2js = require('gulp-ng-html2js');
var install = require('gulp-install');
var minifyHtml = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var wiredep = require('wiredep');

var pkg = {
  name: 'my-site',
  bower: 'bower_components/',
  dist: 'dist'
};

var wiredepConfig = {
  directory: 'bower_components',
  bowerJson: require('./bower.json')
};

var paths = {
  js: 'src/**/*.js',
  css: 'src/css/*.css',
  images: 'resources/images/*',
  videos: 'resources/videos/*',
  fonts: [
    pkg.bower + 'bootstrap/fonts/*'
  ],
  cssMaps: [
    pkg.bower + 'bootstrap/dist/css/bootstrap.css.map'
  ],
  jsMaps: [
    pkg.bower + 'angular-resource/angular-resource.min.js.map'
  ],
  dist: {
    css: pkg.dist + '/css',
    fonts: pkg.dist + '/fonts',
    images: pkg.dist + '/images',
    js: pkg.dist + '/js',
    videos: pkg.dist + '/videos',
  },
  index: 'src/index.html',
  templates: 'src/app/**/*.html'
};

gulp.task('clean', function() {
  return del([pkg.dist]);
});

gulp.task('clean-dependencies', function() {
  return del([pkg.bower]);
});

gulp.task('install', ['clean-dependencies'], function() {
  return gulp.src(['bower.json']).pipe(install());
});

// In the future, it should change things based on environment that's being run
gulp.task('build-index', function() {
  return gulp.src(paths.index)
    .pipe(gulp.dest(pkg.dist));
});

gulp.task('build-css', function() {
  return gulp.src(paths.css)
    .pipe(concat(pkg.name + '.css'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(rename(pkg.name + '.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('build-js', function() {
  var templateStream = gulp.src(paths.templates)
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

  var jsStream = gulp.src(paths.js);

  return es.merge(templateStream, jsStream)
    .pipe(concat(pkg.name + '.js'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('build-vendor-css', function() {
  return gulp.src(wiredep(wiredepConfig).css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(rename('vendor.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('build-vendor-js', function() {
  return gulp.src(wiredep(wiredepConfig).js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('copy-css-maps', function() {
  return gulp.src(paths.cssMaps)
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('copy-fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dist.fonts));
});

gulp.task('copy-images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist.images));
});

gulp.task('copy-js-maps', function() {
  return gulp.src(paths.jsMaps)
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('copy-videos', function() {
  return gulp.src(paths.videos)
    .pipe(gulp.dest(paths.dist.videos));
});

gulp.task('watches', function() {
  gulp.watch([paths.js, paths.templates], ['build-js']);
  gulp.watch([paths.index], ['build-index']);
  gulp.watch([paths.css], ['build-css']);
});

gulp.task('build', ['build-js', 'build-css', 'build-vendor-js', 'build-vendor-css', 'build-index']);
gulp.task('copies', ['copy-js-maps', 'copy-css-maps', 'copy-fonts', 'copy-images', 'copy-videos']);
gulp.task('default', ['build', 'copies', 'watches']);