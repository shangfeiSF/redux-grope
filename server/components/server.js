var path = require('path')

var express = require('express')
var expressUrlrewrite = require('express-urlrewrite')

var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')

var WebpackDevServer = require('webpack-dev-server')
var webpackDevMiddleware = require('webpack-dev-middleware')

var options = require('./options')
var compiler = require('./compiler')

var dirConfig = require('../configs/dirConfig')
var serverConfig = require('../configs/serverConfig')
var webpackDevServerConfig = require('../configs/webpackDevServerConfig')

var server = null

if (options.hot) {
  server = new WebpackDevServer(compiler, webpackDevServerConfig)
}
else {
  server = express()

  server.use(expressUrlrewrite(serverConfig.vendors.from, serverConfig.vendors.to))

  dirConfig.mainSubDirNames.forEach(function (dir) {
    server.use(expressUrlrewrite('/' + dir + '/*', '/' + dir + '/index.html'))
  })

  server.use(express.static(dirConfig.mainDirPath))
  server.use(express.static(dirConfig.buildDirPath))
  server.use(express.static(dirConfig.vendorsPath))

  !serverConfig.isWin32 && compiler.apply(new DashboardPlugin(new Dashboard().setData))
  server.use(webpackDevMiddleware(compiler, webpackDevServerConfig))

  server.get('/index.html', function (req, res) {
    res.writeHead(200)
    res.end(serverConfig.html)
  })
}

module.exports = server