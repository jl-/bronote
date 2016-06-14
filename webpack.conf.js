import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import keys from 'lodash/keys';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import I18nPlugin from 'i18n-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import * as i18n from './i18n/web';
const I18N_KEYS = keys(i18n);

const WEBPACK_HOST = process.env.HOST || 'localhost';
const WEBPACK_PORT = process.env.PORT || 3005;
const PATHS = {
  SRC: path.resolve(__dirname, 'src'),
  STYLES: path.resolve(__dirname, 'src', 'styles'),
  REACT_COMPONENTS: path.resolve(__dirname, 'src', 'components'),
  APP: path.resolve(__dirname, 'src', 'app'),
  REDUX_MODULES: path.resolve(__dirname, 'src', 'modules'),
  STATICS: path.resolve(__dirname, 'statics'),
  LIBS: path.resolve(__dirname, 'statics', 'libs'),
  UTILS: path.resolve(__dirname, 'utils'),
  I18N: path.resolve(__dirname, 'i18n'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  DIST: path.resolve(__dirname, 'dist'),
  TEST: path.resolve(__dirname, 'test'),
  PARTIALS: path.resolve(__dirname, 'src', 'partials'),
  ELECTRON_MAIN: path.resolve(__dirname, 'src', 'electron', 'main.js'),
  PUBLIC: '/',
};

const AUTOPREFIXER_CONF = {
  browsers: ['last 5 version'],
};
const SASS_LOADER_CONF = [
  `includePaths[]=${PATHS.SRC}`
].join('&');
const EXTRACT_TEXT_CONF = {
  remove: false,
  extract: true,
};
const CSS_MODULES_CONF = '&modules&localIdentName=[name]__[local]___[hash:base64:5]';
const MOMENT_LOCALE_MAP = {
  zh: 'zh-cn',
};
const UGLIFYJS_CONF = {
  mangle: {
    except: ['$super', '$', 'exports', 'require']
  },
  compress: {
    warnings: false
  },
  sourceMap: false,
  output: {
    comments: false
  }
};

const nodeModules = fs.readdirSync('node_modules')
  .filter(x => ['.bin', '.DS_Store'].indexOf(x) === -1)
  .reduce((res, mod) => {
    /* eslint no-param-reassign: 0 */
    res[mod] = `commonjs ${mod}`;
    return res;
  }, {});

const targetNode = {
  console: false,
  global: true,
  process: true,
  Buffer: true,
  __filename: true,
  __dirname: true,
  setImmediate: true
};

const WEBPACK_RESOLVE = {
  extensions: ['', '.js', '.jsx', '.css', '.scss', '.json'],
  modulesDirectories: ['node_modules', 'web_modules'],
  alias: {
    libs: PATHS.LIBS,
    utils: PATHS.UTILS,
    assets: PATHS.STATICS,
    styles: PATHS.STYLES,
    modules: PATHS.REDUX_MODULES,
    partials: PATHS.PARTIALS,
    components: PATHS.REACT_COMPONENTS,
    configs: path.resolve(PATHS.SRC, 'configs')
  },
};
const DEFAULT_OUTPUT = {
  filename: '[name].bundle.js',
  sourceMapFilename: '[name].bundle.map',
  chunkFilename: '[name].chunk.js',
  // publicPath: isDev ? PATHS.PUBLIC : DOMAIN_STATICS,
  // publicPath: PATHS.PUBLIC,
  libraryTarget: 'umd',
};

function addDevServerEntry(entry) {
  const hook1 = `webpack-dev-server/client?http://${WEBPACK_HOST}:${WEBPACK_PORT}`;
  const hook2 = 'webpack/hot/only-dev-server';
  keys(entry).forEach((_entry) => {
    entry[_entry].unshift(hook1, hook2);
  });
  return entry;
}

function makeStyleLoader(isDev, isLocal) {
  const cssLoaderConf = `css?importLoaders=2${isLocal ? CSS_MODULES_CONF : ''}`;
  const restLoaderConf = `postcss?pack=sass!sass?${SASS_LOADER_CONF}`;
  const conf = {
    test: /\.(css|scss)$/,
    loader: isDev ?
      `style!${cssLoaderConf}!${restLoaderConf}` :
      ExtractTextPlugin.extract('style', `${cssLoaderConf}!${restLoaderConf}`)
  };
  if (isLocal) {
    conf.include = [PATHS.APP, PATHS.PARTIALS];
    conf.exclude = path.resolve(PATHS.APP, 'app.entry.scss');
  } else {
    conf.include = [PATHS.STYLES, PATHS.REACT_COMPONENTS].concat(path.resolve(PATHS.APP, 'app.entry.scss'));
  }

  return conf;
}
function postcssHook() {
  return {
    default: [
      autoprefixer(AUTOPREFIXER_CONF), precss
    ],
    sass: [
      autoprefixer(AUTOPREFIXER_CONF)
    ]
  };
}

function configLoaders(conf, { isDev }) {
  const module = conf.module || (conf.module = {});
  const loaders = module.loaders || (module.loaders = []);

  loaders.push({
    test: /\.jsx?$/,
    loaders: isDev ? ['react-hot', 'babel'] : ['babel'],
    include: [PATHS.SRC, PATHS.UTILS, PATHS.I18N, PATHS.ELECTRON_MAIN]
  }, makeStyleLoader(isDev, false), makeStyleLoader(isDev, true), {
    test: /\.(eot|woff|woff2|ttf|svg|png|jpg)/,
    loader: 'url?limit=30000&name=[name]-[hash].[ext]'
  }, {
    test: /\.json$/,
    loader: 'json'
  }, {
    test: /\.md$/,
    loader: 'html!markdown'
  });
  conf.postcss = postcssHook;
  module.noParse = /node_modules\/json-schema\/lib\/validate\.js/;

  return conf;
}

function makeOutput(lang) {
  return {
    ...DEFAULT_OUTPUT,
    path: path.resolve(PATHS.DIST, lang)
  };
}

function makePlugins(lang, { isDev, isTest, common, html }) {
  const definePlugin = new webpack.DefinePlugin({
    __I18N_LANG__: JSON.stringify(lang),
    __MOMENT_LOCALE__: JSON.stringify(MOMENT_LOCALE_MAP[lang] || 'en'),
    'process.env': {
      /* eslint no-nested-ternary: 0 */
      NODE_ENV: JSON.stringify(isDev ? 'development' : isTest ? 'test' : 'production')
    }
  });
  const contextReplacementPlugin = new webpack.ContextReplacementPlugin(
    /moment[\\\/]locale$/, new RegExp(`\\.\\/${MOMENT_LOCALE_MAP[lang] || 'en'}$`)
  );
  const plugins = [
    definePlugin, contextReplacementPlugin
  ];
  if (common) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'commons', minChunks: 3, filename: '[name].common.js'
    }));
  }
  plugins.push(
    new I18nPlugin(i18n[lang])
  );
  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.push(
      new ExtractTextPlugin('[name].css'),
      new webpack.optimize.UglifyJsPlugin(UGLIFYJS_CONF)
    );
  }
  if (html) {
    plugins.push(new HtmlWebpackPlugin({ inject: 'body', hash: false, ...html }));
  }

  return plugins;
}

////////////////////////////////
/// webpack dev conf
const webpackDevConf = I18N_KEYS.map(lang => {
  const isDev = true;
  const debug = isDev;
  const devtool = 'source-map';
  const target = 'electron-renderer';
  const entry = addDevServerEntry({
    app: [path.resolve(PATHS.APP, 'app.entry.js')]
  });
  const resolve = WEBPACK_RESOLVE;
  const output = makeOutput(lang, { isDev });
  const plugins = makePlugins(lang, {
    isDev,
    html: {
      title: 'Bronote',
      filename: 'index.html',
      template: path.resolve(PATHS.APP, 'tpl.html')
    }
  });
  return configLoaders({ target, entry, resolve, output, plugins, devtool, debug }, { isDev });
});

const webpackDevServerConf = {
  hot: true,
  historyApiFallback: true,
  publicPath: '/',
  contentBase: PATHS.DIST,
  stats: {
    colors: true
  }
};

const webpackProdMainConf = I18N_KEYS.map(lang => {
  const isDev = false;
  const debug = isDev;
  const devtool = 'source-map';
  const target = 'electron'; // 'electron-main'
  const entry = PATHS.ELECTRON_MAIN;
  const resolve = WEBPACK_RESOLVE;
  const output = {
    path: path.resolve(PATHS.DIST, lang),
    filename: 'main.js'
  };
  const plugins = makePlugins(lang, { isDev });
  const externals = nodeModules;
  const node = targetNode;
  return configLoaders({ target, entry, resolve, output, plugins, devtool, debug, externals, node }, { isDev });
});
const webpackProdRendererConf = I18N_KEYS.map(lang => {
  const isDev = false;
  const debug = isDev;
  const devtool = 'source-map';
  const target = 'electron-renderer';
  const entry = path.resolve(PATHS.APP, 'app.entry.js');
  const resolve = WEBPACK_RESOLVE;
  const output = makeOutput(lang, { isDev });
  const plugins = makePlugins(lang, {
    isDev,
    html: {
      title: 'Bronote',
      filename: 'index.html',
      template: path.resolve(PATHS.APP, 'tpl.html')
    }
  });
  return configLoaders({ target, entry, resolve, output, plugins, devtool, debug }, { isDev });
});

const webpackDevTestConf = I18N_KEYS.map(lang => {
  const isDev = true;
  const conf = configLoaders({}, { isDev });
  const { loaders } = conf.module;
  const babelLoader = {
    ...loaders.shift(),
    loader: 'babel'
  };
  return {
    devtool: 'inline-source-map',
    module: {
      loaders: [babelLoader, ...loaders],
      preLoaders: [{
        test: /\.jsx?$/,
        include: [PATHS.SRC, PATHS.TEST],
        loader: 'isparta'
      }]
    },
    externals: {
      fs: 'empty',
      cheerio: 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  };
});

export {
  PATHS, WEBPACK_HOST, WEBPACK_PORT,
  webpackDevConf, webpackDevTestConf, webpackDevServerConf,
  webpackProdMainConf, webpackProdRendererConf
};
