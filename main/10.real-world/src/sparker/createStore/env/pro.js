import Immutable from 'immutable'
import {createStore, applyMiddleware, compose} from 'redux'

export default (config) => {
  // http://cn.redux.js.org/docs/api/compose.html
  const store = createStore(
    config.reducers,
    Immutable.Map(config.initState || {}),
    compose(applyMiddleware(...config.middlewares))
  )

  return store
}