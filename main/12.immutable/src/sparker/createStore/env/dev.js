import Immutable from 'immutable'
import {createStore, applyMiddleware} from 'redux'

import createLogger from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'

const composeEnhancers = composeWithDevTools({
  serialize: {
    immutable: Immutable
  }
})

export default (config) => {
  !config.test && config.middlewares.push(createLogger({
    stateTransformer: state => state.toJS()
  }))

  const store = createStore(
    config.reducers,
    Immutable.Map(config.initState || {}),
    composeEnhancers(applyMiddleware(...config.middlewares))
  )

  return store
}