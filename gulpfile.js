var gulp = require('gulp');
var connect = require('gulp-connect');
 
gulp.task('server', function() {
  connect.server({
    root: './',
    livereload: true
  });
  gulp.watch(['./*.html'], ['html']);
  gulp.watch(['./style/**/*.scss'], ['sass']);
  gulp.watch(['./js/**/*.jsx'], ['js']);
});
 
gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

var sass = require('gulp-sass');
 
gulp.task('sass', function() {
  gulp.src('./style/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

// Svg store module
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');

gulp.task('svgstore', function() {

  var config = {
      inlineSvg: true, // Remueve etiqueta <xml> y <!DOCTYPE>
  };

  gulp
    .src('./logos/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./img/logos'));

  return gulp
    .src('./icons/*.svg')
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgmin())
    .pipe(svgstore(config))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./img/'))
    .pipe(connect.reload());
});

// React Web Pack

var webpackStream = require('webpack-stream');

gulp.task('js', function() {

  return gulp.src('./js/react/*.jsx')
    .pipe(webpackStream({
      externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'chartjs': 'window.Chart',
        'jquery': 'window.$',
        'lodash': 'window._',
        'timelinelite': 'window.TimelineLite'
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    }))
    .pipe(rename('main.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(connect.reload());
});

// Init

gulp.task('init', [
  'sass',
  'svgstore',
  'js'
], function() {
  
});
