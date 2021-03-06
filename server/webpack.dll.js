var path = require('path')

var webpack = require('webpack')

var vendors = require('./dll/index')
var dirConfig = require('./configs/dirConfig')
var constants = require('./dll/constants')

var baseName = constants.baseName
var manifest = constants.manifest

module.exports = {
  output: {
    path: dirConfig.vendorsPath,
    filename: baseName + '_[chunkhash].js',
    library: baseName + '_[chunkhash]',
  },

  entry: {
    vendors: vendors
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.DllPlugin({
      path: path.join(dirConfig.vendorsPath, manifest),
      name: baseName + '_[chunkhash]',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]
}