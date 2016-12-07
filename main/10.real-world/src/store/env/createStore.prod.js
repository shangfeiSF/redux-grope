import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

import github from '../../middleware/github'
import reducers from '../../reducers'

export default initState => createStore(
  reducers,
  initState,
  applyMiddleware(thunk, github)
)