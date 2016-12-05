import express from 'express'

import webpack from 'webpack'
import webpackConfig from './webpack.config'

import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'
import {renderMiddleware} from './modules/renderMiddleware'

const port = 3000
const app = new express()

const compiler = webpack(webpackConfig)

app.use(webpackHotMiddleware(compiler))
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

app.get('/index.html', renderMiddleware)
app.get('/serverTime.json', function (req, res) {
  res.writeHead(200)

  setTimeout(function () {
    res.end(JSON.stringify({
      serverTime: Date.now()
    }))
  }, 2000)
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})