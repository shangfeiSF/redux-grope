import actionSpec from '../middlewares/github/sybmols/actionSpec'
import Schemas from '../middlewares/github/schemas'

import * as ActionTypes from '../constants/ActionTypes'

export const loadRepoActions = fullName => ({
  [actionSpec]: {
    types: [
      ActionTypes.REPO_REQUEST,
      ActionTypes.REPO_SUCCESS,
      ActionTypes.REPO_FAILURE
    ],
    route: `repos/${fullName}`,
    schema: Schemas.REPO
  }
})

export const loadStargazersActions = (fullName, nextPageUrl) => ({
  fullName,

  [actionSpec]: {
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ],
    route: nextPageUrl,
    schema: Schemas.USER_ARRAY
  }
})