var fs = require('fs')
var path = require('path')
var child_process = require('child_process')

var nopt = require('nopt')
var colors = require('colors')
var express = require('express')
var expressUrlrewrite = require('express-urlrewrite')

var Promise = require("bluebird")
Promise.promisifyAll(fs)

var webpack = require('webpack')
var webpackConfig = require('./webpack.config')
var WebpackDevServer = require('webpack-dev-server')
var webpackDevMiddleware = require('webpack-dev-middleware')

// declare the directories
var mainDir = path.join(__dirname, 'main')
var mainSubDirs = fs.readdirSync(mainDir).filter(function (dir) {
  return fs.statSync(path.join(mainDir, dir)).isDirectory()
})

// init the nopt
var knowns = {
  'hot': Boolean,
  'index': Array,
  'quiet': Boolean,
  'dev': Boolean,
  'pro': Boolean
}

var shorts = (function () {
  var shorts = {
    'h': ['--hot', 'true'],
    'i': ['--index'],
    'q': ['--quiet'],
    'd': ['--dev', 'true'],
    'p': ['--pro', 'true']
  }

  mainSubDirs.forEach(function (dir) {
    var index = dir.split('\.').shift()
    var cmd = 'i' + index
    shorts[cmd] = ['--index']
    shorts[cmd].push(index)
  })

  return shorts
})()

var options = nopt(knowns, shorts, process.argv, 2)

// init environment
webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: options.pro ? '"production"' : '"development"'
    }
  })
)

// init webpackConfig.entry by webpackConfig._makeEntry
var bundleDirs = mainSubDirs
if (options.index && options.index.length) {
  bundleDirs = mainSubDirs.filter(function (dir) {
    return options.index.indexOf(dir.split('\.').shift()) > -1
  })
}

if (!options.index || (options.index && options.index.indexOf('09') > -1)) {
  child_process.exec('npm run universal', {cwd: __dirname})
}

webpackConfig.entry = webpackConfig._makeEntry(bundleDirs)

// init compiler
var compiler = null
if (options.hot) {
  Object.keys(webpackConfig.entry).forEach(function (name) {
    var entry = webpackConfig.entry[name]

    webpackConfig.entry[name] = [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      entry
    ]
  })

  webpackConfig.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )

  compiler = webpack(webpackConfig)
}
else {
  compiler = webpack(webpackConfig)
}

// init devConfig
var devConfig = null
if (options.hot) {
  devConfig = {
    inline: true,

    hot: true,

    historyApiFallback: {
      index: '/'
    },

    setup: function (app) {
      app.use(express.static('./main/'))

      app.get('/index.html', function (req, res) {
        var file = path.join(__dirname, 'index.html')

        fs.readFile(file, function (error, data) {
          var html = data.toString('utf-8')
          var LINKS = bundleDirs.map(function (dir) {
            var href = '/' + dir + '/'
            var title = dir

            if (dir == '09.universal') {
              href = 'http://localhost:3000/index.html?counter=10'
              title = '09.universal'
            }

            return '<li><a href="' + href + '">' + title + '</a></li>'
          })

          var html = html.replace('{{LINKS}}', LINKS.join('\n'))
          res.writeHead(200)
          res.end(html)
        })
      })

      fs.readdirSync(path.join(__dirname, 'main'))
        .filter(function (file) {
          return fs.statSync(path.join(__dirname, 'main', file)).isDirectory()
        })
        .forEach(function (dir) {
          app.use(expressUrlrewrite('/' + dir + '/*', '/' + dir + '/index.html'))
        })
    },

    noInfo: false,

    quiet: !!options.quiet,

    publicPath: '/__build__/',

    headers: {
      "X-Custom-Header": "yes"
    },

    stats: {
      colors: true
    }
  }
}
else {
  devConfig = {
    noInfo: false,

    quiet: !!options.quiet,

    publicPath: '/__build__/',

    headers: {
      "X-Custom-Header": "yes"
    },

    stats: {
      colors: true
    }
  }
}

// init server
var server = null
if (options.hot) {
  server = new WebpackDevServer(compiler, devConfig)
}
else {
  server = express()

  server.use(express.static('./main/'))
  server.use(express.static(path.join(__dirname, '__build__')))

  server.get('/index.html', function (req, res) {
    var file = path.join(__dirname, 'index.html')

    fs.readFile(file, function (error, data) {
      var html = data.toString('utf-8')
      var LINKS = bundleDirs.map(function (dir) {
        var href = '/' + dir + '/'
        var title = dir

        if (dir == '09.universal') {
          href = 'http://localhost:3000/index.html?counter=10'
          title = '09.universal'
        }

        return '<li><a href="' + href + '">' + title + '</a></li>'
      })

      var html = html.replace('{{LINKS}}', LINKS.join('\n'))
      res.writeHead(200)
      res.end(html)
    })
  })

  server.use(webpackDevMiddleware(compiler, devConfig))

  fs.readdirAsync(path.join(__dirname, 'main'))
    .filter(function (file) {
      return fs.statAsync(path.join(__dirname, 'main', file))
        .then(function (stat) {
          return stat.isDirectory()
        })
    })
    .then(function (files) {
      files.forEach(function (file) {
        server.use(expressUrlrewrite('/' + file + '/*', '/' + file + '/index.html'))
      })
    })
}

// start server
server.listen(8080, 'localhost', function () {
  var model = '[Server Model] ' + (options.hot ? 'Hot Module Replacement' : 'Normal')
  console.log(model.yellow)
  console.log('Dev-Server is listening on http://localhost:8080...'.green)
})