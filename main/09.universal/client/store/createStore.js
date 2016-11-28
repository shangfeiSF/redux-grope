import {createStore, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import reducers from '../reducers'

export default (initState) => {
  const store = createStore(
    reducers,
    initState,
    applyMiddleware(thunk)
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}