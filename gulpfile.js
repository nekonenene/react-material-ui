var gulp = require('gulp');
var pump = require('pump');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

// JS plugins
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');

// CSS plugins
var sass    = require('gulp-sass');
var postCss = require('gulp-postcss');
var cssNext = require('postcss-cssnext');
var csso    = require('postcss-csso');

// HTML plugins
var pug  = require('gulp-pug');
var htmlMin = require('gulp-htmlmin');

// Images plugins
var imageMin = require('gulp-imagemin');

// Live Reload
var connect = require('gulp-connect');

var buildTasks = [
  'copy',
  'compile',
  'minify',
];

var defaultTasks = [
  'build',
  'server',
  'watch',
];

/* gulp とコマンドを打つと実行される */
gulp.task('default', defaultTasks);

/* gulp build */
gulp.task('build', buildTasks);

/* watch 系まとめ : gulp watch */
gulp.task('watch', function() {
  gulp.watch(['./src/react/**/*.{js,jsx}'], ['webpack']);
  gulp.watch(['./src/pug/**/*.pug'],    ['pug']);
  gulp.watch(['./src/sass/**/*.scss'],  ['sass']);
  gulp.watch(['./src/www/**/*.css']  ,  ['cssMinify']);
  gulp.watch(['./src/www/**/*.html'] ,  ['htmlMinify']);
});


/* Live Reload!! */
gulp.task('server', function() {
  connect.server({
    root       : './build/',
    name       : 'Server(Product)',
    port       : 8013,
    livereload : true,
  });
});

/* COPY : HTML, CSS, JS などでないファイルを build にコピー */
gulp.task('copy', function() {
  var ignoreSuffixes = '{html,css,js,pug,es6,scss,gif,jpg,png,svg}';

  gulp.src(['./src/www/**/*', '!./src/www/**/*.' + ignoreSuffixes])
    .pipe(gulp.dest('./build/'));

  // .DS_Store は削除
  del(['./**/.DS_Store']);
});

/* **********
 *  Compile 系 : .html, .css, .js ファイルへ変換
 **********   */
gulp.task('compile', ['webpack', 'sass', 'pug']);

/* webpack : React 関連の JS ファイルをまとめて１つにコンパイル、minify もかます */
gulp.task('webpack', function() {
  pump([
    gulp.src('./src/react/**/*.{js,jsx}'),
    gulpWebpack(require('./webpack.config.js'), webpack),
    gulp.dest('./build/'),
    connect.reload(),
  ]);
});

/* Sass + Scss , and PostCSS */
gulp.task('sass', function() {
  var postCssTasks = [
    cssNext({ browsers: ['last 2 version'] }),
  ];

  gulp.src(['./src/sass/**/*.{sass,scss}'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      indentType: 'tab',
      indentWidth: 1,
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(postCss(postCssTasks))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/www/'));
});

/* Pug : Jade の新しい名前。HTML へコンパイル */
gulp.task('pug', function() {
  gulp.src('./src/pug/**/*.pug')
    .pipe(pug({
      pretty : '  ', // indent style
    }).on('error', function(e) { console.log(e.message); }))
    .pipe(gulp.dest('./src/www/'));
});

/* HTML Copy : ただコピーしたい場合に使う */
gulp.task('copyHtml', function() {
  gulp.src('./src/www/**/*.html')
    .pipe(gulp.dest('./build/'));
});

/* **********
 *  Minify 系 : ファイルの圧縮
 **********   */
gulp.task('minify', ['cssMinify', 'htmlMinify', 'imageMinify']);
gulp.task('codeMinify', ['cssMinify', 'htmlMinify']);

/* CSS Min */
gulp.task('cssMinify', function() {
  var postCssTasks = [
    csso(),
  ];

  gulp.src('./src/www/**/*.css')
    .pipe(postCss(postCssTasks))
    .pipe(gulp.dest('./build/'))
    .pipe(connect.reload());
});

/* HTML Min */
gulp.task('htmlMinify', function() {
  gulp.src('./src/www/**/*.html')
    .pipe(htmlMin({
      removeComments               : true,
      removeCommentsFromCDATA      : true,
      removeCDATASectionsFromCDATA : true,
      collapseWhitespace           : true,
      preserveLineBreaks           : true,
      collapseBooleanAttributes    : true,
      removeTagWhitespace          : true,
      removeAttributeQuotes        : true,
      removeRedundantAttributes    : true,
      preventAttributesEscaping    : true,
      useShortDoctype              : true,
      removeEmptyAttributes        : true,
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(connect.reload());
});

/* ImageMin : 画像圧縮 */
gulp.task('imageMinify', function() {
  gulp.src('./src/www/**/*.{gif,jpg,png,svg}')
    .pipe(imageMin({
      progressive : true,
      interlaced  : true,
    }))
    .pipe(gulp.dest('./build/'));
});
