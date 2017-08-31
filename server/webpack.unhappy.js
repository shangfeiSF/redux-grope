var fs = require('fs')
var path = require('path')

var webpack = require('webpack')
var Visualizer = require('webpack-visualizer-plugin')

var dirConfig = require('./configs/dirConfig')

var makeEntry = function (dirs) {
  var entry = {}

  dirConfig.mainSubDirNames
    .filter(function (dir) {
      return dir !== '09.universal' && (dirs === undefined ? true : dirs.indexOf(dir) > -1)
    })
    .reduce(function (entry, dir) {
      entry[dir] = path.join(dirConfig.mainDirPath, dir, 'src', 'index.js')
      return entry
    }, entry)

  return entry
}
var unhappybuildDirName = '__build_unhappy__'

module.exports = {
  // _makeEntry: makeEntry,

  devtool: 'inline-source-map',

  entry: makeEntry(dirConfig.mainSubDirNames),

  output: {
    path: path.join(__dirname, '..', unhappybuildDirName),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/' + unhappybuildDirName + '/'
  },

  resolve: {
    alias: {
      'react-router': path.join(__dirname, '..', 'node_modules', 'react-router')
    },
    extensions: ['.js', '.json']
  },

  context: path.join(__dirname, '../'),

  node: {
    __dirname: true
  },

  module: {
    rules: [
      {
        test: /\.json/,
        include: path.join(__dirname, '../main/06.shopping-cart/src/api'),
        use: ['json-loader']
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, '../main'),
          path.join(__dirname, '../node_modules/todomvc-app-css')
        ],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, '../main'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-1']
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendors/manifest.json'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true
      }
    }),
    new Visualizer()
  ]
}