import {SPEC} from '../middleware/symbol'
import {Schemas} from '../middleware/schema'

import * as ActionTypes from '../constants/ActionTypes'

export  const fetchUser = login => ({
  [SPEC]: {
    types: [
      ActionTypes.USER_REQUEST,
      ActionTypes.USER_SUCCESS,
      ActionTypes.USER_FAILURE
    ],
    endpoint: `users/${login}`,
    schema: Schemas.USER
  }
})

export const fetchRepo = fullName => ({
  [SPEC]: {
    types: [
      ActionTypes.REPO_REQUEST,
      ActionTypes.REPO_SUCCESS,
      ActionTypes.REPO_FAILURE
    ],
    endpoint: `repos/${fullName}`,
    schema: Schemas.REPO
  }
})

export const fetchStarred = (login, nextPageUrl) => ({
  login,
  [SPEC]: {
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ],
    endpoint: nextPageUrl,
    schema: Schemas.REPO_ARRAY
  }
})

export const fetchStargazers = (fullName, nextPageUrl) => ({
  fullName,
  [SPEC]: {
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY
  }
})

export const resetErrorMessage = () => ({
  type: ActionTypes.RESET_ERROR_MESSAGE
})