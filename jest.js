#!/usr/bin/env node
var fs = require('fs')
var path = require('path')

var nopt = require('nopt')
var Promise = require('bluebird')

Promise.promisifyAll(fs)

var options = nopt({
  'bail': Boolean,
  'verbose': Boolean,
  'path': String,
  'regexp': String
}, {
  'b': ['--bail'],
  'b1': ['--bail', 'true'],
  'v': ['--verbose'],
  'v1': ['--verbose', 'true'],
  'p': ['--path'],
  'r': ['--regexp']
}, process.argv, 2)

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
    var testRegex = '(/tests/.*|\\.(test|spec))\\.(js|jsx)$'

    if (options.path && options.path.length) {
      testRegex = options.path.replace(/\./g, '\.') + '$'
    }
    else if (options.regexp && options.regexp.length) {
      testRegex = options.regexp
    }

    var json = {
      testRegex: testRegex,
      bail: options.bail === undefined ? false : options.bail,
      verbose: options.verbose === undefined ? false : options.verbose
    }

    if (spec.existed) {
      return fs.writeFileAsync(jestConfigFile, JSON.stringify(json, null, 2), {encoding: 'utf-8'})
    } else {
      return fs.writeAsync(spec.fd, JSON.stringify(json, null, 2))
    }
  })