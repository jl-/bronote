import gulp from 'gulp';
import run from 'run-sequence';
import del from 'del';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import childProcess from 'child_process';
import electron from 'electron-prebuilt';

import {
  WEBPACK_HOST, WEBPACK_PORT,
  webpackDevConf, webpackDevServerConf
} from './webpack.conf';

// pathes config
const CONF = {
  DIST: 'dist',
  MOCK_DEV_HTML: 'src/app/dev.html'
};

/* eslint prefer-template: 0 */
gulp.task('clean', done => del(CONF.DIST + '*', done));

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

gulp.task('runelectron', (done) => {
  childProcess.spawn(electron, ['./dev-entry.js'], {
    stdio: 'inherit'
  }).on('close', () => {
    // User closed the app. Kill the host process.
    process.exit();
  });
  done();
});

gulp.task('dev', () => {
  run('clean', 'watch', 'wp:dev', 'runelectron');
});
