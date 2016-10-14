var fs = require('fs')
var path = require('path')

var webpack = require('webpack')

var mainDir = path.join(__dirname, 'main')

var makeEntry = function () {
  var entry = {}

  fs.readdirSync(mainDir)
    .filter(function (dir) {
      return dir === '01.counter-vanilla' ||
        dir === '02.counter' ||
        dir === '03.todos' ||
        dir === '04.todos-with-undo'
    })
    .reduce(function (entry, dir) {
      var isDirectory = fs.statSync(path.join(mainDir, dir)).isDirectory()

      isDirectory && (entry[dir] = path.join(mainDir, dir, 'src', 'index.js'));

      return entry
    }, entry)

  return entry
}

module.exports = {
  devtool: 'inline-source-map',

  entry: makeEntry(),

  output: {
    path: __dirname + '/__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-1']
        },
        loader: "babel-loader"
      }
    ]
  },

  resolve: {
    alias: {
      'react-router': path.join(__dirname, 'node_modules', 'react-router', 'lib')
    },
    extensions: ['', '.js', '.json']
  },

  context: __dirname,

  node: {
    __dirname: true
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]
}