import Immutable from 'immutable'
import {LOCATION_BEFORE_TRANSITIONS, LOCATION_CHANGE} from '../../constants/RouterRedux'

const initialState = Immutable.fromJS({
  [LOCATION_BEFORE_TRANSITIONS]: null
})

const routing = (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set(LOCATION_BEFORE_TRANSITIONS, action.payload)
  }
  return state
}

export default routing