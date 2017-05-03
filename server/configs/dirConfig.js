var fs = require('fs')
var path = require('path')

var mainDirPath = path.join(__dirname, '../../main')

var mainSubDirNames = fs.readdirSync(mainDirPath).filter(function (dir) {
  return fs.statSync(path.join(mainDirPath, dir)).isDirectory()
})

var buildDirName = '__build__'

var buildDirPath = path.join(__dirname, '../../', buildDirName)

var vendorsPath = path.join(__dirname, '../vendors')

module.exports = {
  mainDirPath: mainDirPath,

  mainSubDirNames: mainSubDirNames,

  buildDirName: buildDirName,

  buildDirPath: buildDirPath,

  vendorsPath: vendorsPath
}