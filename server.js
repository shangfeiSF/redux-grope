var fs = require('fs')
var path = require('path')

var nopt = require('nopt')
var colors = require('colors')
var express = require('express')
var expressUrlrewrite = require('express-urlrewrite')

var Promise = require("bluebird")
Promise.promisifyAll(fs)

var webpack = require('webpack')
var webpackConfig = require('./webpack.config')
var WebpackDevServer = require('webpack-dev-server')
var webpackDevMiddleware = require('webpack-dev-middleware')

var options = nopt({
  'hot': Boolean,
}, {
  'h': ['--hot', 'true'],
}, process.argv, 2)

// init compiler
var compiler = null
if (options.hot) {
  Object.keys(webpackConfig.entry).forEach(function (name) {
    var entry = webpackConfig.entry[name]

    webpackConfig.entry[name] = [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      entry
    ]
  })

  webpackConfig.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )

  compiler = webpack(webpackConfig)
}
else {
  compiler = webpack(webpackConfig)
}

// init devConfig
var devConfig = null
if (options.hot) {
  devConfig = {
    inline: true,

    hot: true,

    historyApiFallback: {
      index: '/'
    },

    setup: function (app) {
      fs.readdirSync(path.join(__dirname, 'main'))
        .filter(function (file) {
          return fs.statSync(path.join(__dirname, 'main', file)).isDirectory()
        })
        .forEach(function (dir) {
          app.use(expressUrlrewrite('/main/' + dir + '/*', '/main/' + dir + '/index.html'))
        })
    },

    noInfo: false,

    quiet: false,

    publicPath: '/__build__/',

    headers: {
      "X-Custom-Header": "yes"
    },

    stats: {
      colors: true
    }
  }
}
else {
  devConfig = {
    noInfo: false,

    quiet: false,

    publicPath: '/__build__/',

    headers: {
      "X-Custom-Header": "yes"
    },

    stats: {
      colors: true
    }
  }
}

// init server
var server = null
if (options.hot) {
  server = new WebpackDevServer(compiler, devConfig)
}
else {
  server = express()

  server.use(express.static('./'))
  server.use(express.static(path.join(__dirname, '__build__')))

  server.use(webpackDevMiddleware(compiler, devConfig))

  fs.readdirAsync(path.join(__dirname, 'main'))
    .filter(function (file) {
      return fs.statAsync(path.join(__dirname, 'main', file))
        .then(function (stat) {
          return stat.isDirectory()
        })
    })
    .then(function (files) {
      files.forEach(function (file) {
        server.use(expressUrlrewrite('/main/' + file + '/*', '/main/' + file + '/index.html'))
      })
    })
}

// start server
server.listen(8080, 'localhost', function () {
  var model = '[Server Model] ' + (options.hot ? 'Hot Module Replacement' : 'Normal')
  console.log(model.yellow)
  console.log('Dev-Server is listening on http://localhost:8080...'.green)
})