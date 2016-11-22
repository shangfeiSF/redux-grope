import {combineReducers} from 'redux'

import details from './modules/details'
import selected from './modules/selected'

export default combineReducers({
  details,
  selected
})