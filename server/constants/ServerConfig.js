var fs = require('fs')
var path = require('path')

var webpackConfig = require('../components/webpackConfig')

var universalPort = 3000
var universalIndex = 'http://localhost:' + universalPort + '/index.html?counter=10'

var LINKS = webpackConfig._bundleDirs.map(function (dir) {
  var href = dir == '09.universal' ? universalIndex : ('/' + dir + '/')
  var title = dir

  return '<li><a href="' + href + '">' + title + '</a></li>'
})
var html = fs.readFileSync(path.join(__dirname, 'index.html'), {
  encoding: 'utf-8'
}).replace('{{LINKS}}', LINKS.join('\n'))

module.exports = {
  port: 8080,

  universalPort: universalPort,

  universalIndex: universalIndex,

  html: html,
}