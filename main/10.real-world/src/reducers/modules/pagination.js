import {combineReducers} from 'redux'

import starredByUser from './modules/starredByUser'
import stargazersByRepo from './modules/stargazersByRepo'

export default combineReducers({
  starredByUser,
  stargazersByRepo
})