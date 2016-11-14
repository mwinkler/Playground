
const webpack = require('webpack');
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: {
    //'vendor': './src/vendor',
    'app': './src/app.ts'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts'/*, '.js', '.json'*/]
  },
  module: {
    rules: [
      { test: /\.ts$/, /*exclude: /node_modules/,*/ loader: 'awesome-typescript' },
      //{ test: /\.html$/, loader: 'file' },
      //{ enforce: 'pre', test: /\.ts$/, exclude: /node_modules/, loader: 'tslint' },
      // { test: /\.json$/, loader: 'json' },
      // { test: /\.html/, loader: 'html?minimize=false' },
      // { test: /\.styl$/, loader: 'css!stylus' },
      // { test: /\.css$/, loader: 'style!css' },
      // { test: /\.(gif|png|jpe?g)$/i, loader: 'file?name=dist/images/[name].[ext]' },
      // { test: /\.woff2?$/, loader: 'url?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' },
      // { test: /\.(ttf|eot|svg)$/, loader: 'file?name=dist/fonts/[name].[ext]' }
    ]
  }, 
  plugins: [
      new cleanWebpackPlugin(['dist']),
      new copyWebpackPlugin([{ from: './src/index.html' }])
  ]
};

module.exports = config;