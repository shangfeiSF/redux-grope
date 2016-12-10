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

module.exports = {
  output: {
    path: path.join(__dirname, './vendors'),
    filename: 'index_[chunkhash].js',
    library: 'index_[chunkhash]',
  },

  entry: {
    vendors: vendors
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'vendors/manifest.json'),
      name: 'index_[chunkhash]',
      context: __dirname
    })
  ]
}