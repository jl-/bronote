import gulp from 'gulp';
import run from 'run-sequence';
import del from 'del';
import karma from 'karma';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import childProcess from 'child_process';
import electron from 'electron-prebuilt';

import {
  WEBPACK_HOST, WEBPACK_PORT,
  webpackDevConf, webpackDevServerConf,
  webpackProdMainConf, webpackProdRendererConf
} from './webpack.conf';

// pathes config
const CONF = {
  DIST: 'dist',
  MOCK_DEV_HTML: 'src/app/dev.html'
};

gulp.task('clean', done => del(CONF.DIST + '*', done));

gulp.task('statics', () => {
  return gulp.src('statics/**/*')
    .pipe(gulp.dest(CONF.DIST + '/statics'));
});

gulp.task('watch', () => {
  gulp.watch('statics/**/*', ['statics']);
});

gulp.task('wp:dev', (done) => {
  const compiler = webpack(webpackDevConf);
  const devServer = new WebpackDevServer(compiler, webpackDevServerConf);
  compiler.plugin('done', () => done());
  devServer.listen(WEBPACK_PORT, WEBPACK_HOST, (err, result) => {
    console.log(err || 'Listening at %s:%s', WEBPACK_HOST, WEBPACK_PORT);
  });
});

gulp.task('wp:build-main', (done) => {
  webpack(webpackProdMainConf, function(err, stats) {
    done();
  });
});

gulp.task('wp:build-renderer', (done) => {
  webpack(webpackProdRendererConf, function(err, stats) {
    done();
  });
});

gulp.task('runelectron', (done) => {
  childProcess.spawn(electron, ['./dev-entry.js'], {
    stdio: 'inherit'
  }).on('close', function () {
    // User closed the app. Kill the host process.
    process.exit();
  });

  done();
})

gulp.task('dev', () => {
  run('clean', 'statics', 'watch', 'wp:dev', 'runelectron');
});
gulp.task('build', () => {
  run('clean', 'statics', 'wp:build-renderer', 'wp:build-main');
});

gulp.task('test', (done) => {
  const server = new karma.Server({
    configFile: __dirname + '/karma.client.conf.js',
    singleRun: false
  }, () => done());
  server.start();
});
