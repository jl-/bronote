import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import {
  WEBPACK_HOST, WEBPACK_PORT,
  webpackDevConf, webpackDevServerConf
} from './webpack.conf';

const app = express();
const compiler = webpack(webpackDevConf);
const wdm = webpackDevMiddleware(compiler, webpackDevServerConf);

app.use(wdm);
app.use(webpackHotMiddleware(compiler));

const server = app.listen(WEBPACK_PORT, WEBPACK_HOST, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Listening at http://${WEBPACK_HOST}:${WEBPACK_PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
