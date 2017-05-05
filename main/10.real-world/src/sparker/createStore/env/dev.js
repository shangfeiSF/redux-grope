import Immutable from 'immutable'
import {createStore, applyMiddleware, compose} from 'redux'

import {DevTools} from '../../devTools'
import createLogger from 'redux-logger'

export default (config) => {
  !config.test && config.middlewares.push(createLogger())

  // http://cn.redux.js.org/docs/api/compose.html
  const store = createStore(
    config.reducers,
    Immutable.Map(config.initState || {}),
    compose(applyMiddleware(...config.middlewares), DevTools.instrument())
  )

  return store
}