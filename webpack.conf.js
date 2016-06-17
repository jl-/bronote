import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const WEBPACK_HOST = process.env.HOST || 'localhost';
const WEBPACK_PORT = process.env.PORT || 3005;
const PATHS = {
  SRC: path.resolve(__dirname, 'src'),
  REACT_COMPONENTS: path.resolve(__dirname, 'src', 'components'),
  APP: path.resolve(__dirname, 'src', 'app'),
  REDUX_MODULES: path.resolve(__dirname, 'src', 'modules'),
  DIST: path.resolve(__dirname, 'dist'),
  PUBLIC: '/',
};

const webpackDevConf = {
  debug: true,
  devtool: 'source-map',
  target: 'electron-renderer',
  entry: {
    app: [
      `webpack-dev-server/client?http://${WEBPACK_HOST}:${WEBPACK_PORT}`,
      'webpack/hot/only-dev-server',
      path.resolve(PATHS.APP, 'app.entry.js')
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss', '.json'],
    modulesDirectories: ['node_modules', 'web_modules'],
    alias: {
      modules: PATHS.REDUX_MODULES,
      configs: path.resolve(PATHS.SRC, 'configs')
    },
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[name].chunk.js',
    libraryTarget: 'umd',
    path: PATHS.DIST
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Bronote',
      filename: 'index.html',
      template: path.resolve(PATHS.APP, 'tpl.html'),
      inject: 'body',
      hash: false,
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: [PATHS.SRC]
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)/,
      loader: 'url?limit=30000&name=[name]-[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.md$/,
      loader: 'html!markdown'
    }],
    // noParse: /node_modules\/json-schema\/lib\/validate\.js/
  }
};

const webpackDevServerConf = {
  hot: true,
  historyApiFallback: true,
  publicPath: '/',
  contentBase: PATHS.DIST,
  stats: {
    colors: true
  }
};

export {
  PATHS, WEBPACK_HOST, WEBPACK_PORT,
  webpackDevConf, webpackDevServerConf
};
