// @flow

import type {Store} from './types'

import React from 'react'
import {render} from 'react-dom'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import App from './components/App'
import reducers from './reducers'

import '../../global.css'

import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const middleware = [thunk]
process.env.NODE_ENV !== 'production' && middleware.push(createLogger())

const store: Store = createStore(reducers, applyMiddleware(...middleware))

const root = document.getElementById('example')
var content = (
  <Provider store={store}>
    <App/>
  </Provider>
)

render(content, root)