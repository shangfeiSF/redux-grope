import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

import api from '../../middleware/api'
import reducers from '../../reducers'

export default initState => createStore(
  reducers,
  initState,
  applyMiddleware(thunk, api)
)