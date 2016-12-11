var fs = require('fs')
var path = require('path')

var lodash = require('lodash')

var excludedVendors = require('./excludedVendors')

var package = path.join(__dirname, '../../package.json')

var json = fs.readFileSync(package, {encoding: 'utf-8'})

var includedVendors = Object.keys(JSON.parse(json).dependencies)

module.exports = lodash.xor(includedVendors, excludedVendors)