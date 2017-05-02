var webpack = require('webpack')
var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')

var options = require('./options')
var webpackConfig = require('./webpackConfig')
var ServerConfig = require('../constants/ServerConfig')

var hotConfig = {
  client: 'webpack-dev-server/client?http://localhost:' + ServerConfig.port + '/',

  server: 'webpack/hot/dev-server'
}

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin()
]

!ServerConfig.isWin32 && plugins.push(new DashboardPlugin(new Dashboard().setData))

if (options.hot) {
  Object.keys(webpackConfig.entry).forEach(function (name) {
    var original = webpackConfig.entry[name]

    webpackConfig.entry[name] = [
      hotConfig.client,
      hotConfig.server,
      original
    ]
  })

  webpackConfig.plugins = webpackConfig.plugins.concat(plugins)
}

var compiler = webpack(webpackConfig)

module.exports = compiler