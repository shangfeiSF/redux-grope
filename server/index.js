var fs = require('fs')
var path = require('path')

var colors = require('colors')
var ServerConfig = require('./constants/ServerConfig')

var options = require('./components/options')
var server = require('./components/server')

module.exports.start = function () {
  server.listen(ServerConfig.port, function () {
    var model = '[Server Model] ' + (options.hot ? 'Hot Module Replacement' : 'Normal')
    console.log(model.yellow)
    console.log(('Dev-Server is listening on http://localhost:' + ServerConfig.port + '...').green)
  })
}