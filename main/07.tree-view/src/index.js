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
  total: 20,
  dilution: 3,
  limit: 5
})

const store = createStore(reducers, tree, applyMiddleware(...middleware))

const root = document.getElementById('example')
var content = (
  <Provider store={store}>
    <AppContainer id={0}/>
  </Provider>
)

render(content, root)
