import {compose} from 'redux'
import DevTools from '../../uitls/DevTools'
import createLogger from 'redux-logger'

import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

import github from '../../middleware/github'
import reducers from '../../reducers'

export default (initState, test) => {
  let middlewares = [thunk, github]
  !test && middlewares.push(createLogger())

  const store = createStore(
    reducers,
    initState,
    compose(applyMiddleware(...middlewares), DevTools.instrument())
  )

  if (module.hot) {
    module.hot.accept('../../reducers', () => {
      const nextRootReducer = require('../../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}