import actionSpec from '../middlewares/github/sybmols/actionSpec'
import Schemas from '../middlewares/github/schemas'

import * as ActionTypes from '../constants/ActionTypes'

export const loadUserActions = login => ({
  [actionSpec]: {
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

  [actionSpec]: {
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ],
    route: nextPageUrl,
    schema: Schemas.REPO_ARRAY
  }
})