// Webpack config for creating the production bundle.

require("babel/register");

var path = require("path");
var webpack = require("webpack");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var strip = require("strip-loader");

var dist = path.resolve(__dirname, "../static/dist");

module.exports = {
  devtool: "source-map",
  entry: "./src/client.js",
  output: {
    path: dist,
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" },
      { test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=10000' },
      { test: /\.js$/, exclude: /node_modules/, loaders: [strip.loader("debug"), "babel"] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!autoprefixer?browsers=last 2 version!sass") }
    ]
  },
  plugins: [

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin("[name]-[chunkhash].css"),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // Write out stats.json file to build directory.
    new StatsWriterPlugin({
      transform: function (data) {
        return JSON.stringify({
          main: data.assetsByChunkName.main[0],
          css: data.assetsByChunkName.main[1]
        }, null, 2);
      }
    })

  ]
};
