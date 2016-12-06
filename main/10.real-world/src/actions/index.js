import * as ActionTypes from '../constants/ActionTypes'
import {CALL_API, Schemas} from '../middleware/api'

const fetchUser = login => ({
  [CALL_API]: {
    types: [
      ActionTypes.USER_REQUEST,
      ActionTypes.USER_SUCCESS,
      ActionTypes.USER_FAILURE
    ],
    endpoint: `users/${login}`,
    schema: Schemas.USER
  }
})

const fetchRepo = fullName => ({
  [CALL_API]: {
    types: [
      ActionTypes.REPO_REQUEST,
      ActionTypes.REPO_SUCCESS,
      ActionTypes.REPO_FAILURE
    ],
    endpoint: `repos/${fullName}`,
    schema: Schemas.REPO
  }
})

const fetchStarred = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ],
    endpoint: nextPageUrl,
    schema: Schemas.REPO_ARRAY
  }
})

const fetchStargazers = (fullName, nextPageUrl) => ({
  fullName,
  [CALL_API]: {
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY
  }
})

export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[login]

  const exist = requiredFields.every(key => user && user.hasOwnProperty(key))

  return user && exist ? null : dispatch(fetchUser(login))
}

export const loadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
  const repo = getState().entities.repos[fullName]

  const exist = requiredFields.every(key => repo && repo.hasOwnProperty(key))

  return repo && exist ? null : dispatch(fetchRepo(fullName))
}

export const loadStarred = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `users/${login}/starred`,
    pageCount = 0
  } = getState().pagination.starredByUser[login] || {}

  return pageCount > 0 && !nextPage ? null : dispatch(fetchStarred(login, nextPageUrl))
}

export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `repos/${fullName}/stargazers`,
    pageCount = 0
  } = getState().pagination.stargazersByRepo[fullName] || {}

  return pageCount > 0 && !nextPage ? null : dispatch(fetchStargazers(fullName, nextPageUrl))
}

export const resetErrorMessage = () => ({
  type: ActionTypes.RESET_ERROR_MESSAGE
})