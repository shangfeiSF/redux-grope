var fs = require('fs')
var path = require('path')

var webpackConfig = require('../middlewares/generateWebpackConfig')

var universalPort = 3000
var universalIndex = 'http://localhost:' + universalPort + '/index.html?counter=10'

var LINKS = webpackConfig._bundleDirs.map(function (dir) {
  var href = dir == '09.universal' ? universalIndex : ('/' + dir + '/')
  var title = dir

  return '<li><a href="' + href + '">' + title + '</a></li>'
})
var html = fs.readFileSync(path.join(__dirname, '../assets', 'indexTemplate.html'), {
  encoding: 'utf-8'
}).replace('{{LINKS}}', LINKS.join('\n'))

var dirConfig = require('./dirConfig')
var webpackDll = require('../webpack.dll')

var manifestPath = path.join(dirConfig.vendorsPath, webpackDll._manifest)
var manifestJson = JSON.parse(fs.readFileSync(manifestPath).toString('utf-8'))

module.exports = {
  isWin32: webpackConfig._isWin32,

  port: 8080,

  universalPort: universalPort,

  universalIndex: universalIndex,

  html: html,

  vendors: {
    from: '/' + webpackDll._baseName + '.js',
    to: '/' + manifestJson.name + '.js'
  }
}