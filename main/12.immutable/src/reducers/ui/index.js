import {handleActions} from 'redux-actions'

import {uiInitialState} from '../../models'
import {SHOW_SPINNER, HIDE_SPINNER} from '../../constants/actionTypes'

export default handleActions({
  [SHOW_SPINNER]: state => (
    state.set('spinnerVisible', true)
  ),

  [HIDE_SPINNER]: state => (
    state.set('spinnerVisible', false)
  )
}, uiInitialState)