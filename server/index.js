var fs = require('fs')
var path = require('path')
var colors = require('colors')

var server = require('./components/server')
var options = require('./components/options')

var serverConfig = require('./configs/serverConfig')

module.exports.start = function () {
  server.listen(serverConfig.port, function () {
    var hot = '[Hot Module Replacement]: ' + options.hot ? 'Yes' : 'No'
    var info = '[Server Info]: Server is listening on http://localhost:' + serverConfig.port + '/index.html'

    console.log(hot.yellow)
    console.log(info.green)
  })
}