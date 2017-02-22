/* eslint-disable */

const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const config = {
  devtool: 'cheap-module-source-map',
  noInfo: true,
  entry: './src/index.js',              
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
                
  module: {
    loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',                                           
          query: {
              presets: ['es2015', 'react']
          }
        }
      ]
    },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
    new webpack.NoErrorsPlugin()
  ]
}

module.exports = config;

// http://stackoverflow.com/a/41434778