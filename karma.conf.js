const path = require('path');

// laod webpack config here for for webpack preprocessor
const webpackConfig = require('./webpack.config');
webpackConfig.cache = true;

const entry = path.resolve(webpackConfig.context, webpackConfig.entry);
const preprocessors = {};
preprocessors[entry] = ['webpack'];

// pass all essential scripts to istanbul for coverage
webpackConfig.module.postLoaders = [{
  test: /\.js$/,
  exclude: /(\.spec.js|vendor|node_modules)/,
  loader: 'istanbul-instrumenter',
}];

module.exports = function buildConfig(config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
    files: [
      'node_modules/polyfill-function-prototype-bind/bind.js',
      entry,
    ],
    webpack: webpackConfig,

    // list of files to exclude
    exclude: [
      // 'node_modules/d3/d3.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // using object shorthand
    preprocessors,

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      subdir: function subdir(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      reporters: [
        { type: 'cobertura', file: 'cobertura.xml' },
        { type: 'text', file: 'text.txt' },
        { type: 'text-summary', file: 'text-summary.txt' },
        { type: 'html' },
        { type: 'lcov', file: 'lcov.info' },
      ],
    },
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['PhantomJS', 'Chrome', 'Firefox'], // Safari has a bug
    plugins: [
      require('karma-webpack'),
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      // 'karma-safari-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-sinon-chai',
    ],
  });
};
