#!/usr/bin/env node
var fs = require('fs')
var path = require('path')

var nopt = require('nopt')
var Promise = require('bluebird')

Promise.promisifyAll(fs)

var options = nopt({
  'path': String
}, {
  'p': ['--path'],
}, process.argv, 2)

var jestConfigFile = path.join(__dirname, 'config.jest.json')

fs.readFileAsync(jestConfigFile, {encoding: 'utf-8'})
  .then(function (data) {
    var data = JSON.parse(data)

    data.testRegex = options.path.length ? options.path.replace(/\./g, '\.') + '$' : '(/tests/.*|\\.(test|spec))\\.(js|jsx)$'

    data = JSON.stringify(data, null, 2)

    return fs.writeFileAsync(jestConfigFile, data, {encoding: 'utf-8'})
  })
