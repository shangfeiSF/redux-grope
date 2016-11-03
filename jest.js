#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var cp = require('child_process')

var nopt = require('nopt')
var colors = require('colors')
var Promise = require('bluebird')

Promise.promisifyAll(fs)
var execAsync = Promise.promisify(cp.exec, {
  context: cp,
  multiArgs: true
})

var options = nopt({
  'path': String
}, {
  'p': ['--path'],
}, process.argv, 2)

var jestConfigFile = path.join(__dirname, 'config.jest.json')
var jestCommand = ['node', 'node_modules/jest/bin/jest.js', '--config', 'config.jest.json'].join(' ')

fs.readFileAsync(jestConfigFile, {encoding: 'utf-8'})
  .then(function (data) {
    console.log('Start ...'.yellow)
    var data = JSON.parse(data)

    data.testRegex = options.path.length ? options.path.replace(/\./g, '\.') + '$' : '(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$'

    console.log(String(data.testRegex).green)

    data = JSON.stringify(data, null, 2)

    return fs.writeFileAsync(jestConfigFile, data, {encoding: 'utf-8'})
  })
  // .then(function () {
  //   console.log('Execute ...'.yellow)
  //   console.log(String(jestCommand).green)
  //   return execAsync(jestCommand, {cwd: process.cwd()})
  // })
  // .then(function (data) {
  //   console.log('Done ...'.yellow)
  //   if (data[0]) {
  //     console.error('exec error:' + String(data[0]).red)
  //   } else {
  //     console.log(String(data[1]).green)
  //   }
  // })