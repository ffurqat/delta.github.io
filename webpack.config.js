var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: getEntrySources(['./src/index.js']),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'public/bundle.js',
    publicPath: 'http://localhost:8080/'
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'source-map'
      }
    ],
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, loaders: ['react-hot','babel?presets[]=stage-0,presets[]=react,presets[]=es2015'] },
      { test: /\.scss$/, loaders: ['style','css','autoprefixer?browsers=last 3 versions','sass?outputStyle=expanded'] }
    ]
  }
};

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}
