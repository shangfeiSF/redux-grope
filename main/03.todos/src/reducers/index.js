import {combineReducers} from 'redux'

import addAndToggle from './modules/addAndToggle'
import filter from './modules/filter'

export default combineReducers({addAndToggle, filter})