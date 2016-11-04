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

fs.statAsync(jestConfigFile)
  .then(
    function () {
      return fs.readFileAsync(jestConfigFile, {encoding: 'utf-8'})
        .then(function (data) {
          return {
            existed: true,
            data: JSON.parse(data)
          }
        })
    },
    function () {
      return fs.openAsync(jestConfigFile, 'w')
        .then(function (fd) {
          return {
            existed: false,
            fd: fd
          }
        })
    }
  )
  .then(function (spec) {
    var testRegex = options.path.length ? options.path.replace(/\./g, '\.') + '$' : '(/tests/.*|\\.(test|spec))\\.(js|jsx)$'

    if (spec.existed) {
      spec.data.testRegex = testRegex

      return fs.writeFileAsync(jestConfigFile, JSON.stringify(spec.data, null, 2), {encoding: 'utf-8'})
    }
    else {
      return fs.writeAsync(spec.fd, JSON.stringify({
        testRegex: testRegex
      }, null, 2))
    }
  })