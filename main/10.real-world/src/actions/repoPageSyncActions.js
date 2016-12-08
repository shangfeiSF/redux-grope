import {SPEC} from '../middleware/symbol'
import {Schemas} from '../middleware/schema'

import * as ActionTypes from '../constants/ActionTypes'

export const loadRepoActions = fullName => ({
  [SPEC]: {
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

  [SPEC]: {
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ],
    route: nextPageUrl,
    schema: Schemas.USER_ARRAY
  }
})