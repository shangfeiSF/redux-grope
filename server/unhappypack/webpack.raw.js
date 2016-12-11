var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var Visualizer = require('webpack-visualizer-plugin')

var DirSpec = require('./constants/DirSpec')

var makeEntry = function (dirs) {
  var entry = {}

  DirSpec.mainSubDirNames
    .filter(function (dir) {
      return dir !== '09.universal' && (dirs === undefined ? true : dirs.indexOf(dir) > -1)
    })
    .reduce(function (entry, dir) {
      entry[dir] = path.join(DirSpec.mainDirPath, dir, 'src', 'index.js')

      return entry
    }, entry)

  return entry
}

module.exports = {
  devtool: 'inline-source-map',

  entry: makeEntry(DirSpec.mainSubDirNames),

  _makeEntry: makeEntry,

  output: {
    path: path.join(__dirname, '../__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  resolve: {
    alias: {
      'react-router': path.join(__dirname, '../node_modules', 'react-router', 'lib')
    },
    extensions: ['', '.js', '.json']
  },

  context: path.join(__dirname, '../'),

  node: {
    __dirname: true
  },

  module: {
    loaders: [
      {
        test: /\.json/,
        include: path.join(__dirname, '../main/06.shopping-cart/src/api'),
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, '../main'),
          path.join(__dirname, '../node_modules/todomvc-app-css')
        ],
        loader: "style!css"
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, '../main'),
        loader: "babel-loader",
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendors/manifest.json'),
    }),
    new Visualizer()
  ]
}