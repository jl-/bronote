import {
  webpackDevTestConf
} from './webpack.conf';

module.exports = function(config){
  config.set({
    frameworks: [ 'mocha' ],
    browsers: ['PhantomJS'],
    //browsers: ['Chrome'],
    reporters: [ 'spec', 'coverage'],
    preprocessors: {
      ['./test/client/config.webpack.js']: [ 'webpack']
    },
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-phantomjs-launcher',
      //'karma-chrome-launcher',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-sourcemap-loader'
    ],
    singleRun: !!process.env.CI,
    autoWatch: !process.env.CI,

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/babel-polyfill/dist/polyfill.js',
      './test/client/config.webpack.js'
    ],

    webpack: webpackDevTestConf,
    webpackMiddleware: {
      noInfo: true
    },

    coverageReporter: {
      dir: 'coverage',
      // configure the reporter to use isparta for JavaScript coverage
      // Only on { "karma-coverage": "douglasduteil/karma-coverage#next" }
      //instrumenters: { isparta : require('isparta') },
      //instrumenter: {
      //  '**/*.js': 'isparta'
      //},
      reporters: [{
        type: 'json',
        subdir: '.',
        file: 'coverage.json'
      }, {
        type: 'lcov',
        subdir: '.'
      }, {
        type: 'text-summary'
      }]
    }
  });
};
