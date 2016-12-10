var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackDevMiddleware = require('webpack-dev-middleware')

var express = require('express')
var expressUrlrewrite = require('express-urlrewrite')

var DirSpec = require('../constants/DirSpec')
var ServerConfig = require('../constants/ServerConfig')

var options = require('./options')
var compiler = require('./compiler')
var devConfig = require('./devConfig')

var server = new WebpackDevServer(compiler, devConfig)
if (!options.hot) {
  server = express()

  server.use(express.static(DirSpec.mainDirPath))
  server.use(express.static(path.join(DirSpec.mainDirPath, '../__build__')))

  server.use(webpackDevMiddleware(compiler, devConfig))

  server.get('/index.html', function (req, res) {
    res.writeHead(200)
    res.end(ServerConfig.html)
  })

  DirSpec.mainSubDirNames.forEach(function (dir) {
    server.use(expressUrlrewrite('/' + dir + '/*', '/' + dir + '/index.html'))
  })
}

module.exports = server