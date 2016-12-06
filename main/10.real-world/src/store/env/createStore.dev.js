import {compose} from 'redux'
import DevTools from '../../uitls/DevTools'
import createLogger from 'redux-logger'

import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

import api from '../../middleware/api'
import reducers from '../../reducers'

export default  initState => {
  const store = createStore(
    reducers,
    initState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    module.hot.accept('../../reducers', () => {
      const nextRootReducer = require('../../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}