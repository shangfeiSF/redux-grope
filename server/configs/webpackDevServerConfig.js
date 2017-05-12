var os = require('os')

var lodash = require('lodash')
var express = require('express')
var expressUrlrewrite = require('express-urlrewrite')

var options = require('../components/options')

var dirConfig = require('../configs/dirConfig')
var serverConfig = require('../configs/serverConfig')

var setup = function (app) {
  app.use(expressUrlrewrite(serverConfig.vendors.from, serverConfig.vendors.to))

  dirConfig.mainSubDirNames.forEach(function (dir) {
    app.use(expressUrlrewrite('/' + dir + '/*', '/' + dir + '/index.html'))
  })

  app.get('/index.html', function (req, res) {
    res.writeHead(200)
    res.end(serverConfig.html)
  })

  app.use(express.static(dirConfig.mainDirPath))
  app.use(express.static(dirConfig.vendorsPath))
}

var webpackDevServerConfig = {
  quiet: serverConfig.isWin32 ? !!options.quiet : true,

  publicPath: '/' + dirConfig.buildDirName + '/',

  headers: {'X-Custom-Header': 'yes'},

  noInfo: false,

  compress: true,

  stats: {colors: true}
}

if (options.hot) {
  webpackDevServerConfig = lodash.merge(webpackDevServerConfig, {
    inline: true,

    hot: true,

    historyApiFallback: {index: '/'},

    setup: setup
  })
}

module.exports = webpackDevServerConfig