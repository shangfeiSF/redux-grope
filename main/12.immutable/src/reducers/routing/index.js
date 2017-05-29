import {handleActions} from 'redux-actions'

import {routingInitialState} from '../../models'
import {LOCATION_CHANGE, LOCATION_BEFORE_TRANSITIONS} from '../../constants/RouterRedux'

export default handleActions({
  [LOCATION_CHANGE]: (state, {payload}) => (
    state.set(LOCATION_BEFORE_TRANSITIONS, payload)
  )
}, routingInitialState)