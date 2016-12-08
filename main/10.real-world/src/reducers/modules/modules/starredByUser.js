import {
  STARRED_REQUEST as REQUEST,
  STARRED_SUCCESS as SUCCESS,
  STARRED_FAILURE as FAILURE
} from '../../../constants/ActionTypes'

import * as UTILS from './utils'

const inital = {}

export default (state = inital, action) => {
  switch (action.type) {
    case REQUEST:
    case SUCCESS:
    case FAILURE:
      const key = action.login
      action.typeIndex = [REQUEST, SUCCESS, FAILURE].indexOf(action.type)

      return {
        ...state,
        [key]: UTILS.update(state[key], action, _index_)
      }

    default:
      return state
  }
}