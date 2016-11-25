#!/usr/bin/env node
var fs = require('fs')
var path = require('path')

var nopt = require('nopt')
var Promise = require('bluebird')

Promise.promisifyAll(fs)

var knowns = {
  'bail': Boolean,
  'verbose': Boolean,
  'path': String,
  'regexp': String,
  'index': String
}
var shorts = (function () {
  var testsDir = path.join(process.cwd(), 'tests')

  var shorts = {
    'b': ['--bail'],
    'b1': ['--bail', 'true'],
    'v': ['--verbose'],
    'v0': ['--verbose', 'false'],
    'p': ['--path'],
    'r': ['--regexp'],
    'i': ['--index']
  }

  fs.readdirSync(testsDir).forEach(function (dir) {
    var state = fs.statSync(path.join(testsDir, dir))
    if (state.isDirectory()) {
      var index = dir.split('\.').shift()
      var cmd = 'i' + index
      shorts[cmd] = ['--index']
      shorts[cmd].push(index)
    }
  })

  return shorts
})()
var options = nopt(knowns, shorts, process.argv, 2)

var jestConfigFile = path.join(__dirname, 'config.jest.json')

fs.statAsync(jestConfigFile)
  .then(
    function (states) {
      return fs.readFileAsync(jestConfigFile, {encoding: 'utf-8'})
        .then(function (data) {
          return {
            existed: true,
            states: states,
            data: JSON.parse(data)
          }
        })
    },
    function (errors) {
      return fs.openAsync(jestConfigFile, 'w')
        .then(function (fd) {
          return {
            existed: false,
            errors: errors,
            fd: fd
          }
        })
    }
  )
  .then(function (spec) {
    var testRegex = 'tests/.*/src/.*/.*.spec.js$'

    if (options.path && options.path.length) {
      testRegex = options.path.replace(/\./g, '\.') + '$'
    }
    else if (options.regexp && options.regexp.length) {
      testRegex = options.regexp
    }
    else if (options.index && options.index.length) {
      testRegex = 'tests/' + (options.index.length == 1 ? ('0' + options.index) : options.index ) + '.*/src/.*/.*\.spec\.js$'
    }

    var json = {
      testRegex: testRegex,
      bail: options.bail === undefined ? false : options.bail,
      verbose: options.verbose === undefined ? true : options.verbose
    }

    if (spec.existed) {
      return fs.writeFileAsync(jestConfigFile, JSON.stringify(json, null, 2), {encoding: 'utf-8'})
    } else {
      return fs.writeAsync(spec.fd, JSON.stringify(json, null, 2))
    }
  })