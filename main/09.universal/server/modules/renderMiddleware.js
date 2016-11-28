import qs from 'qs'

import React from 'react'
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'

import {counter} from './counter'
import configureStore from '../../client/store/configureStore'

import AppContainer from '../../client/containers/AppContainer'

const renderFullPage = (html, preloadedState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="example">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

export const renderMiddleware = (req, res) => {
  counter({
    delay: 500,
    min: 1,
    max: 100
  })
    .then(data => {
      const params = qs.parse(req.query)
      const counter = parseInt(params.counter, 10) || data || 0

      const preloadedState = {counter}

      const store = configureStore(preloadedState)

      const html = renderToString(
        <Provider store={store}>
          <AppContainer />
        </Provider>
      )

      const finalState = store.getState()

      res.send(renderFullPage(html, finalState))
    })
}