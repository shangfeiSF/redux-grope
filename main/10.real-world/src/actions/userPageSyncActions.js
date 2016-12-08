import {SPEC} from '../middleware/symbol'
import {Schemas} from '../middleware/schema'

import * as ActionTypes from '../constants/ActionTypes'

export const loadUserActions = login => ({
  [SPEC]: {
    types: [
      ActionTypes.USER_REQUEST,
      ActionTypes.USER_SUCCESS,
      ActionTypes.USER_FAILURE
    ],
    route: `users/${login}`,
    schema: Schemas.USER
  }
})

export const loadStarredActions = (login, nextPageUrl) => ({
  login,

  [SPEC]: {
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ],
    route: nextPageUrl,
    schema: Schemas.REPO_ARRAY
  }
})