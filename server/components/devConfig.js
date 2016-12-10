var lodash = require('lodash')
var express = require('express')
var expressUrlrewrite = require('express-urlrewrite')

var options = require('./options')
var DirSpec = require('../constants/DirSpec')
var ServerConfig = require('../constants/ServerConfig')

var devConfig = {
  quiet: !!options.quiet,

  publicPath: '/__build__/',

  headers: {
    "X-Custom-Header": "yes"
  },

  noInfo: false,

  stats: {
    colors: true
  }
}

if (options.hot) {
  devConfig = lodash.merge({}, devConfig, {
    inline: true,

    hot: true,

    historyApiFallback: {
      index: '/'
    },

    setup: function (app) {
      app.use(express.static(DirSpec.mainDirPath))
      app.use(express.static(DirSpec.vendorsPath))

      app.get('/index.html', function (req, res) {
        res.writeHead(200)
        res.end(ServerConfig.html)
      })

      DirSpec.mainSubDirNames.forEach(function (dir) {
        app.use(expressUrlrewrite('/' + dir + '/*', '/' + dir + '/index.html'))
      })
    }
  })
}

module.exports = devConfig