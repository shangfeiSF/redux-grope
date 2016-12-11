var path = require('path')
var webpack = require('webpack')

var vendors = require('./dll/index')

var baseName = 'vendorsBundle'
var manifest = 'manifest.json'

module.exports = {
  _baseName: baseName,
  _manifest: manifest,

  output: {
    path: path.join(__dirname, './vendors'),
    filename: baseName + '_[chunkhash].js',
    library: baseName + '_[chunkhash]',
  },

  entry: {
    vendors: vendors
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'vendors', manifest),
      name: baseName + '_[chunkhash]',
      context: __dirname
    })
  ]
}