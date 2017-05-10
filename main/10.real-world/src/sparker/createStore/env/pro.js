import Immutable from 'immutable'
import {createStore, applyMiddleware} from 'redux'

import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'

const composeEnhancers = composeWithDevTools({
  serialize: {
    immutable: Immutable
  }
})

export default (config) => {
  // http://cn.redux.js.org/docs/api/compose.html
  const store = createStore(
    config.reducers,
    Immutable.Map(config.initState || {}),
    composeEnhancers(applyMiddleware(...config.middlewares))
  )

  return store
}