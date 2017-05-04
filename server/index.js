var fs = require('fs')
var path = require('path')
var colors = require('colors')

var server = require('./components/server')
var options = require('./components/options')

var serverConfig = require('./configs/serverConfig')

module.exports.start = function () {
  server.listen(serverConfig.port, function () {
    var dev = '[Development Mode]: ' + (options.dev ? 'Yes' : 'No')
    var hot = '[Hot Module Replacement]: ' + (options.hot ? 'Yes' : 'No')
    var indexes = '[Start Indexes]: ' + (options.index ? options.index.join(',') : 'all')

    console.log(dev.yellow)
    console.log(hot.yellow)
    console.log(indexes.yellow)
  })
}