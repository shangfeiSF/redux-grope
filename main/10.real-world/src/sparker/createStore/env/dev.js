import Immutable from 'immutable'
import {createStore, applyMiddleware} from 'redux'

//import {DevTools} from '../../devTools'
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

  // http://cn.redux.js.org/docs/api/compose.html
  const store = createStore(
    config.reducers,
    Immutable.Map(config.initState || {}),
    composeEnhancers(applyMiddleware(...config.middlewares)/*, DevTools.instrument()*/)
  )

  return store
}