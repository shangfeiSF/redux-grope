var path = require('path')
var webpack = require('webpack')

var constants = require('../asset/constants.js')

module.exports = {
  devtool: 'inline-source-map',

  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '../client/index.js')
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: constants.filename,
    publicPath: constants.publicPath
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react-hmre']
        }
      }
    ]
  }
}
