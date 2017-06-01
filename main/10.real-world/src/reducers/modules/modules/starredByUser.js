import {
  STARRED_REQUEST as REQUEST,
  STARRED_SUCCESS as SUCCESS,
  STARRED_FAILURE as FAILURE
} from '../../../constants/ActionTypes'

import * as UTILS from './utils'

import {starredByUserInitialState} from '../../../models'

export default (state = starredByUserInitialState, action) => {
  const key = action.login

  switch (action.type) {
    case REQUEST:
      return state.merge({
        [key]: {
          ids: [],
          pageCount: 0,
          isFetching: true,
          nextPageUrl: undefined
        }
      })

    case SUCCESS:
    case FAILURE:
      action.typeIndex = [SUCCESS, FAILURE].indexOf(action.type)

      return state.merge({
        [key]: UTILS.update(state.getIn([key]), action)
      })

    default:
      return state
  }
}