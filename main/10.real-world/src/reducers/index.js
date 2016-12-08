import {combineReducers} from 'redux'

import routing from './modules/routing'
import entities from './modules/entities'
import pagination from './modules/pagination'
import errorMessage from './modules/errorMessage'

export default combineReducers({
  routing,
  entities,
  pagination,
  errorMessage
})