var path = require('path')
var webpack = require('webpack')

var vendors = [
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux',
  'redux-undo',
  'redux-logger',
  'redux-thunk',
  'babel-polyfill',
  'babel-register',
  'qs',
  'humps',
  'lodash',
  'normalizr',
  'classnames'
]

var baseName = 'vendor'
var manifest = 'manifest.json'

module.exports = {
  _baseName: baseName,
  _manifest: manifest,

  output: {
    path: path.join(__dirname, './vendors'),
    filename: baseName + '.[chunkhash].js',
    library: baseName + '_[chunkhash]',
  },

  entry: {
    vendors: vendors
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'vendors', manifest),
      name: baseName + '.[chunkhash]',
      context: __dirname
    })
  ]
}