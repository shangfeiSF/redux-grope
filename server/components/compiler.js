var webpack = require('webpack')

var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')

var options = require('./options')

var serverConfig = require('../configs/serverConfig')
var webpackConfig = require('../middlewares/generateWebpackConfig')

var hotConfig = {
  client: 'webpack-dev-server/client?http://localhost:' + serverConfig.port + '/',
  server: 'webpack/hot/dev-server'
}

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin()
]
!serverConfig.isWin32 && plugins.push(new DashboardPlugin(new Dashboard().setData))

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