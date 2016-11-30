import qs from 'qs'

import React from 'react'
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'

import {counter} from './counter'
import {template} from './template'

import createStore from '../../client/store/createStore'
import AppContainer from '../../client/containers/AppContainer'

export const renderMiddleware = (req, res) => {
  counter({
    delay: 500,
    min: 1,
    max: 100
  })
    .then(data => {
      const query = qs.parse(req.query)
      const counter = parseInt(query.counter, 10) || data

      const store = createStore({counter})

      const html = renderToString(
        <Provider store={store}>
          <AppContainer />
        </Provider>
      )

      res.send(template(html, store.getState()))
    })
}