import {
  STARGAZERS_REQUEST as REQUEST,
  STARGAZERS_SUCCESS as SUCCESS,
  STARGAZERS_FAILURE as FAILURE
} from '../../../constants/ActionTypes'

import * as UTILS from './utils'

import {stargazersByRepoInitialState} from '../../../models'

export default (state = stargazersByRepoInitialState, action) => {
  const key = action.fullName

  switch (action.type) {
    case REQUEST:
    case SUCCESS:
    case FAILURE:
      action.typeIndex = [REQUEST, SUCCESS, FAILURE].indexOf(action.type)

      return state.merge({
        [key]: UTILS.update(state.getIn([key]), action)
      })

    default:
      return state
  }
}