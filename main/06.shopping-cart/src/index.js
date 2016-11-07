import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'

import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
/*
 * Q: What's a thunk?
 * A: A thunk is a function that wraps an expression to delay or modify its evaluation.
 * */

/*
 * Q: What's the motivation of redux-thunk(https://github.com/gaearon/redux-thunk)?
 * A: Redux Thunk middleware allows you to write action creators that return a function instead of an action.
 *     The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
 *     The inner function receives the store methods dispatch and getState as parameters.
 * */
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