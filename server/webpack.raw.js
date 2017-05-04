var fs = require('fs')
var os = require('os')
var path = require('path')

var colors = require('colors')
var webpack = require('webpack')
var HappyPack = require('happypack')
var Visualizer = require('webpack-visualizer-plugin')

var options = require('./components/options')

var dirConfig = require('./configs/dirConfig')

var isWin32 = os.platform() == 'win32'
var verbose = options.quiet == undefined ? (isWin32 ? true : false) : !options.quiet
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

try {
  fs.accessSync(path.join(__dirname, './vendors/manifest.json'), fs.F_OK)
}
catch (e) {
  console.log(colors.red(e.message))
  console.log(colors.yellow('[Tips]: Please execute `node bin/dll` or `npm run dll` first and then execute `node bin/server` or `npm start`.'))
  process.exit(500)
}

module.exports = {
  _isWin32: isWin32,
  _makeEntry: makeEntry,

  devtool: 'inline-source-map',

  entry: makeEntry(dirConfig.mainSubDirNames),

  output: {
    path: dirConfig.buildDirPath,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/' + dirConfig.buildDirName + '/'
  },

  resolve: {
    alias: {
      'react-router': path.join(__dirname, '..', 'node_modules', 'react-router', 'lib')
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
      verbose: verbose
    }),
    new HappyPack({
      id: 'css',
      loaders: ['style!css'],
      threads: 2,
      verbose: verbose
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
      verbose: verbose
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendors/manifest.json'),
    }),
    new Visualizer()
  ]
}