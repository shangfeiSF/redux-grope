var path = require('path')

var express = require('express')
var expressUrlrewrite = require('express-urlrewrite')

var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')

var WebpackDevServer = require('webpack-dev-server')
var webpackDevMiddleware = require('webpack-dev-middleware')

var options = require('./options')
var DirSpec = require('../constants/DirSpec')
var compiler = require('./compiler')
var devConfig = require('./devConfig')
var ServerConfig = require('../constants/ServerConfig')

var server = null

if (options.hot) {
  server = new WebpackDevServer(compiler, devConfig)
}
else {
  server = express()

  server.use(expressUrlrewrite(ServerConfig.vendors.from, ServerConfig.vendors.to))

  DirSpec.mainSubDirNames.forEach(function (dir) {
    server.use(expressUrlrewrite('/' + dir + '/*', '/' + dir + '/index.html'))
  })

  server.use(express.static(DirSpec.mainDirPath))
  server.use(express.static(path.join(DirSpec.mainDirPath, '../__build__')))
  server.use(express.static(DirSpec.vendorsPath))

  compiler.apply(new DashboardPlugin(new Dashboard().setData))
  server.use(webpackDevMiddleware(compiler, devConfig))

  server.get('/index.html', function (req, res) {
    res.writeHead(200)
    res.end(ServerConfig.html)
  })
}

module.exports = server