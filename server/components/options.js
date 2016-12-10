var nopt = require('nopt')
var lodash = require('lodash')

var DirSpec = require('../constants/DirSpec')

var knowns = {
  'hot': Boolean,
  'index': Array,
  'quiet': Boolean,
  'dev': Boolean,
  'pro': Boolean
}

var baseShorts = {
  'h': ['--hot', 'true'],
  'i': ['--index'],
  'q': ['--quiet'],
  'd': ['--dev', 'true'],
  'p': ['--pro', 'true']
}

var extraShorts = {}
DirSpec.mainSubDirNames.forEach(function (dir) {
  var index = dir.split('\.').shift()
  var cmd = 'i' + index

  extraShorts[cmd] = ['--index']
  extraShorts[cmd].push(index)
})

var options = nopt(knowns, lodash.merge({}, baseShorts, extraShorts), process.argv, 2)

module.exports = options