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

export const resetErrorMessage = () => ({
  type: ActionTypes.RESET_ERROR_MESSAGE
})