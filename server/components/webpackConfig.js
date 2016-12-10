var path = require('path')
var child_process = require('child_process')

var webpack = require('webpack')
var webpackConfig = require('../webpack.config')

var options = require('./options')
var DirSpec = require('../constants/DirSpec')

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