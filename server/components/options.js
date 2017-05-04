var nopt = require('nopt')
var lodash = require('lodash')

var dirConfig = require('../configs/dirConfig')

var knowns = {
  'index': Array,
  'quiet': Boolean,
  'hot': Boolean,
  'dev': Boolean
}

var baseShorts = {
  'i': ['--index'],
  'q': ['--quiet', 'true'],
  'h': ['--hot', 'true'],
  'd': ['--dev', 'true']
}

var extraShorts = {}
dirConfig.mainSubDirNames.forEach(function (dir) {
  var index = dir.split('\.').shift()
  var cmd = 'i' + index

  extraShorts[cmd] = ['--index']
  extraShorts[cmd].push(index)
})

var options = nopt(knowns, lodash.merge({}, baseShorts, extraShorts), process.argv, 2)

module.exports = options