var path = require('path')
var express = require('express')
var expressUrlrewrite = require('express-urlrewrite')
var WebpackDevServer = require('webpack-dev-server')
var webpackDevMiddleware = require('webpack-dev-middleware')

var options = require('./options')
var DirSpec = require('../constants/DirSpec')
var compiler = require('./compiler')
var devConfig = require('./devConfig')
var ServerConfig = require('../constants/ServerConfig')

var server = new WebpackDevServer(compiler, devConfig)

if (!options.hot) {
  server = express()

  server.use(expressUrlrewrite(ServerConfig.vendors.from, ServerConfig.vendors.to))

  DirSpec.mainSubDirNames.forEach(function (dir) {
    server.use(expressUrlrewrite('/' + dir + '/*', '/' + dir + '/index.html'))
  })

  server.use(express.static(DirSpec.mainDirPath))
  server.use(express.static(path.join(DirSpec.mainDirPath, '../__build__')))
  server.use(express.static(DirSpec.vendorsPath))

  server.use(webpackDevMiddleware(compiler, devConfig))

  server.get('/index.html', function (req, res) {
    res.writeHead(200)
    res.end(ServerConfig.html)
  })
}

module.exports = server