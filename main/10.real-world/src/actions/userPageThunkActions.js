import * as userPageSyncActions from './userPageSyncActions'

export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[login]

  const exist = requiredFields.every(key => user && user.hasOwnProperty(key))

  return user && exist ? null : dispatch(userPageSyncActions.loadUserActions(login))
}

export const loadStarred = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `users/${login}/starred`,
    pageCount = 0
  } = getState().pagination.starredByUser[login] || {}

  return pageCount > 0 && !nextPage ? null : dispatch(userPageSyncActions.loadStarredActions(login, nextPageUrl))
}