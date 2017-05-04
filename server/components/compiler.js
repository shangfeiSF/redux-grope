var webpack = require('webpack')

var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')

var options = require('./options')

var serverConfig = require('../configs/serverConfig')
var webpackConfig = require('../middlewares/generateWebpackConfig')

if (options.hot) {
  Object.keys(webpackConfig.entry).forEach(function (name) {
    var original = webpackConfig.entry[name]

    webpackConfig.entry[name] = [
      'webpack-dev-server/client?http://localhost:' + serverConfig.port + '/',
      'webpack/hot/dev-server',
      original
    ]
  })

  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ])

  !serverConfig.isWin32 && webpackConfig.plugins.push(
    new DashboardPlugin(new Dashboard().setData)
  )
}

var compiler = webpack(webpackConfig)
var info = '[Server Info]: Server is listening on http://localhost:' + serverConfig.port + '/index.html'

if (serverConfig.isWin32) {
  compiler.apply(
    new webpack.ProgressPlugin(function (percent) {
      return percent < 1 ? false : console.log(info.green)
    })
  )
}

module.exports = compiler