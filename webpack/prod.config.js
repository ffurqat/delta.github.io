var webpack = require("webpack");
var config = require('./basic.config');

config.plugins.push(new webpack.DefinePlugin({
  "process.env": {
    BROWSER: JSON.stringify(true),

    // used to know we are on browser
    NODE_ENV: JSON.stringify("production")

    // clean up some react stuff
  }
}));

module.exports = config;