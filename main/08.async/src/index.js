import React from 'react'
import {render} from 'react-dom'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import AppContainer from './containers/AppContainer'
import reducers from './reducers'

import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const middleware = [thunk]
process.env.NODE_ENV !== 'production' && middleware.push(createLogger())

const store = createStore(reducers, applyMiddleware(...middleware))

const root = document.getElementById('example')
var content = (
  <Provider store={store}>
    <AppContainer/>
  </Provider>
)

render(content, root)