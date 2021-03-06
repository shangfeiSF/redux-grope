import React from 'react'
import {render} from 'react-dom'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import AppContainer from './containers/AppContainer'
import reducers from './reducers'

import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import generateTree from './utils/generateTree'

const middleware = [thunk]
process.env.NODE_ENV !== 'production' && middleware.push(createLogger())

const tree = generateTree({
  rootId: 0,
  total: 50,
  dilution: 3,
  limit: 5,
  threshold: 20
})

const store = createStore(reducers, tree, applyMiddleware(...middleware))

const root = document.getElementById('example')
var content = (
  <Provider store={store}>
    <AppContainer/>
  </Provider>
)

render(content, root)