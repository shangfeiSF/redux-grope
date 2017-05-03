var path = require('path')

var webpack = require('webpack')

var vendors = require('./dll/index')
var dirConfig = require('./configs/dirConfig')

var baseName = 'vendorsBundle'
var manifest = 'manifest.json'

module.exports = {
  _baseName: baseName,
  _manifest: manifest,

  output: {
    path: dirConfig.vendorsPath,
    filename: baseName + '_[chunkhash].js',
    library: baseName + '_[chunkhash]',
  },

  entry: {
    vendors: vendors
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(dirConfig.vendorsPath, manifest),
      name: baseName + '_[chunkhash]',
      context: __dirname
    })
  ]
}