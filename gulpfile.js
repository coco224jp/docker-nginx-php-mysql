'use strict';
//OS判別
global.is_windows = process.platform === 'win32'
global.is_mac = process.platform === 'darwin'
global.is_linux = process.platform === 'linux'

//モジュール読み込み
const gulp = require('gulp');
const sass = require('gulp-sass');
const glob = require('gulp-sass-glob'); // sassのimportでワイルトカードを利用可能に
const maps = require('gulp-sourcemaps');
const prefix = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const cssDeclarationSorter = require('css-declaration-sorter');
const mqpacker = require('css-mqpacker');
const bs = require('browser-sync').create();
const connect = require('gulp-connect-php');
const connectSSI = require('connect-ssi');

// Sassの設定
gulp.task('sass', (done) => {
  gulp.src('public_html/src/scss/*.scss')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(maps.init())
    .pipe(glob({ ignorePaths: ['*node_modules*'] }))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([cssDeclarationSorter({ order: 'smacss' })]))
    .pipe(postcss([mqpacker()]))
    .pipe(prefix())
    .pipe(gulp.dest('public_html/dist/css/'))
    .pipe(bs.stream());
  done();
});

// BrowserSyncの設定
// ブラウザ画面への通知を無効化
gulp.task('sync', (done) => {
  connect.server(
    {
      base: "./",
      livereload: true,
      port: 3001,　//ポート番号指定必須　（3000だとうまく行かない？）
    },
    function () {
      bs.init({
        proxy: "localhost:3001", //ポート番号指定必須 connect.serverに渡す値と同一にする
        middleware: [
          connectSSI({　//connectSSIを有効にするには、php.iniで extension=php_openssl.dll をコメントアウトで無効にする
            baseDir: "./",
            ext: [".php", ".html"]
          })
        ]
      });
    });
  done();
});

//BrowserSyncのリロード
gulp.task('reload', (done) => {
  bs.reload();
  done();
});

//ファイルの変更を監視
gulp.task('watch', (done) => {
  gulp.watch('public_html/**/*.scss', gulp.task('sass'));
  gulp.watch('public_html/**/*.js', gulp.task('reload'));
  gulp.watch('public_html/**/*.php', gulp.task('reload'));
  done();
});

gulp.task('default', gulp.series('sass', 'sync', 'reload', 'watch'));