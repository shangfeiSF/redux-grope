import {LOCATION_BEFORE_TRANSITIONS, LOCATION_CHANGE} from '../../constants/RouterRedux'

import {routingInitialState} from '../../models'

const routing = (state = routingInitialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set(LOCATION_BEFORE_TRANSITIONS, action.payload)
  }
  return state
}

export default routing