var path = require('path')
var child_process = require('child_process')

var lodash = require('lodash')
var webpack = require('webpack')

var webpackRaw = require('../webpack.raw')

var dirConfig = require('../configs/dirConfig')
var options = require('../components/options')

var bundleDirs = options.index && options.index.length ?
  dirConfig.mainSubDirNames.filter(function (dir) {
    return options.index.indexOf(dir.split('\.').shift()) > -1
  }) :
  dirConfig.mainSubDirNames

if (!options.index || (options.index && options.index.indexOf('09') > -1)) {
  child_process.exec('npm run universal', {
    cwd: path.join(__dirname, '../../')
  })
}

var generate = function (webpackRaw) {
  var webpackConfig = webpackRaw

  webpackConfig._bundleDirs = bundleDirs

  webpackConfig.entry = webpackRaw._makeEntry(bundleDirs)

  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: options.pro ? '"production"' : '"development"'
      }
    })
  )

  return webpackConfig
}

module.exports = generate(webpackRaw)