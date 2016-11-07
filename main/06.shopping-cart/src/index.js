import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'

import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import AppContainer from './containers/AppContainer'
import reducers from './reducers'
import {getAllProducts} from './actions'

const middleware = [thunk]

process.env.NODE_ENV !== 'production' && middleware.push(createLogger())

const store = createStore(reducers, applyMiddleware(...middleware))

store.dispatch(getAllProducts())

const root = document.getElementById('example')
var content = (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

render(content, root)