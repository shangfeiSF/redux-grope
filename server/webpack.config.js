var fs = require('fs')
var path = require('path')

var webpack = require('webpack')
var Visualizer = require('webpack-visualizer-plugin')

var colors = require('colors')
var HappyPack = require('happypack')

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

try {
  fs.accessSync(path.join(__dirname, './vendors/manifest.json'), fs.F_OK)
} catch (e) {
  console.log(colors.red(e.message))
  console.log(colors.yellow('[Tips]:Please execute `node bin/dll` or `npm run dll` first and then execute `node bin/server` or `npm start`.'))
  process.exit(500)
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
        loaders: ['happypack/loader?id=json']
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, '../main'),
          path.join(__dirname, '../node_modules/todomvc-app-css')
        ],
        loaders: ['happypack/loader?id=css']
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, '../main'),
        loaders: ['happypack/loader?id=js']
      }
    ]
  },

  plugins: [
    new HappyPack({
      id: 'json',
      loaders: ['json'],
      threads: 2,
      verbose: false
    }),
    new HappyPack({
      id: 'css',
      loaders: ['style!css'],
      threads: 2,
      verbose: false
    }),
    new HappyPack({
      id: 'js',
      loaders: [{
        path: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }],
      threads: 2,
      verbose: false
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendors/manifest.json'),
    }),
    new Visualizer()
  ]
}