import {combineReducers} from 'redux-immutable'

import starredByUser from './modules/starredByUser'
import stargazersByRepo from './modules/stargazersByRepo'

export default combineReducers({
  starredByUser,
  stargazersByRepo
})