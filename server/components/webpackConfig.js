var path = require('path')
var webpack = require('webpack')
var child_process = require('child_process')

var options = require('./options')
var DirSpec = require('../constants/DirSpec')
var webpackConfig = require('../webpack.config')

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: options.pro ? '"production"' : '"development"'
    }
  })
)

var bundleDirs = options.index && options.index.length ?
  DirSpec.mainSubDirNames.filter(function (dir) {
    return options.index.indexOf(dir.split('\.').shift()) > -1
  }) :
  DirSpec.mainSubDirNames

if (!options.index || (options.index && options.index.indexOf('09') > -1)) {
  child_process.exec('npm run universal', {
    cwd: path.join(__dirname, '../../')
  })
}

webpackConfig.entry = webpackConfig._makeEntry(bundleDirs)
webpackConfig._bundleDirs = bundleDirs

module.exports = webpackConfig