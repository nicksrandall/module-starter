const webpack = require('webpack');
const path = require('path');

const config = {
  context: __dirname + '/src',
  // the entry point of your library
  entry: './index.js',
  // where 3rd-party modules can reside
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
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
    library: 'moduleName',
  },
  externals: {},

  plugins: [
    new webpack.DefinePlugin({
      ON_DEV: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
      ON_TEST: process.env.NODE_ENV === 'test',
      ON_PROD: process.env.NODE_ENV === 'production',
    }),
  ],

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015-loose', 'stage-1'],
        plugins: ['transform-runtime'],
      },
    }],
  },

  devtool: 'source-map',

  devServer: {
    contentBase: '',
    noInfo: false, //  --no-info option
    hot: true,
    inline: true,
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
