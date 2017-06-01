import {combineReducers} from 'redux-immutable'

import ui from './ui'
import github from './github'
import routing from './routing'

export default combineReducers({
  ui,
  github,
  routing
})