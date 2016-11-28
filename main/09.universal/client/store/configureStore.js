import {createStore, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import reducers from '../reducers'

const configureStore = (preloadedState) => {
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(thunk)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore