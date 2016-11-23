import {combineReducers} from 'redux'

import details from './modules/details'
import selected from './modules/selected'
import themes from './modules/themes'

export default combineReducers({
  details,
  selected,
  themes
})