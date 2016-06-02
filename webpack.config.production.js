var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry:  './src/index',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('css/style.css'),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'src') },
      {
        test: /\.scss?$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader']),
        include: __dirname
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  }
};
