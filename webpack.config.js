var webpack = require('webpack');
var path = require('path');

var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// postcss plugins
var cssnext = require('postcss-cssnext');
var postcssImport = require('postcss-import');
var reporter = require('postcss-reporter');
var cssnano = require('cssnano');
var messages = require('postcss-browser-reporter');
var nesting = require('postcss-nesting');

var config = {
  context: __dirname + '/src',
  // the entry point of your library
  entry: './index.js',
  // where 3rd-party modules can reside
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components']
  },

  output: {
    // where to put standalone build file
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    // the name of the standalone build file
    filename: 'bundle.js',
    // the standalone build should be wrapped in UMD for interop
    libraryTarget: 'umd',
    // the name of your library in global scope
    library: 'moduleName'
  },

  externals: {
    angular: 'angular'
  },

  plugins: [
    new ngAnnotatePlugin({
      add: true,
      remove: true
    }),
    new webpack.DefinePlugin({
      ON_DEV: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
      ON_TEST: process.env.NODE_ENV === 'test',
      ON_PROD: process.env.NODE_ENV === 'production'
    })
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?stage=1&optional=runtime&loose=all',
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.html$/,
      loader: 'raw'
    }, {
      test:   /\.css$/,
      loader: 'style!css!postcss',
      exclude: /(node_modules|bower_components)/
    }]
  },

  postcss: function () {
    var postcssPlugins = [
      postcssImport({
        onImport: function (files) {
          files.forEach(this.addDependency);
        }.bind(this)
      }),
      nesting(),
      cssnext({browsers: 'last 2 versions'}),
      reporter()
    ];

    if (process.env.NODE_ENV === 'production') {
      postcssPlugins.push(cssnano({
        mergeRules: false,
        zindex: false,
        reduceIdents: false,
        mergeIdents: false
      }));
    } else {
      postcssPlugins.push(messages());
    }

    return postcssPlugins;
  },

  devtool: 'source-map',

  devServer: {
    contentBase: '',
    noInfo: false, //  --no-info option
    hot: true,
    inline: true
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
