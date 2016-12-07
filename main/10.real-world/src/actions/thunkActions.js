import * as syncActions from './syncActions'

export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[login]

  const exist = requiredFields.every(key => user && user.hasOwnProperty(key))

  return user && exist ? null : dispatch(syncActions.fetchUser(login))
}

export const loadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
  const repo = getState().entities.repos[fullName]

  const exist = requiredFields.every(key => repo && repo.hasOwnProperty(key))

  return repo && exist ? null : dispatch(syncActions.fetchRepo(fullName))
}

export const loadStarred = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `users/${login}/starred`,
    pageCount = 0
  } = getState().pagination.starredByUser[login] || {}

  return pageCount > 0 && !nextPage ? null : dispatch(syncActions.fetchStarred(login, nextPageUrl))
}

export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `repos/${fullName}/stargazers`,
    pageCount = 0
  } = getState().pagination.stargazersByRepo[fullName] || {}

  return pageCount > 0 && !nextPage ? null : dispatch(syncActions.fetchStargazers(fullName, nextPageUrl))
}