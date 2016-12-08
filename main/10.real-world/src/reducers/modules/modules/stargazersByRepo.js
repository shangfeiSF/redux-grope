import {
  STARGAZERS_REQUEST as REQUEST,
  STARGAZERS_SUCCESS as SUCCESS,
  STARGAZERS_FAILURE as FAILURE
} from '../../../constants/ActionTypes'

import * as UTILS from './utils'

const inital = {}

export default (state = inital, action) => {
  switch (action.type) {
    case  REQUEST:
    case SUCCESS:
    case FAILURE:
      const key = action.fullName
      action.typeIndex = [REQUEST, SUCCESS, FAILURE].indexOf(action.type)

      return {
        ...state,
        [key]: UTILS.update(state[key], action)
      }

    default:
      return state
  }
}