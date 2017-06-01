import * as userPageSyncActions from './userPageSyncActions'

export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().getIn('entities', 'users')[login]

  const exist = requiredFields.every(key => user && user.hasOwnProperty(key))

  return user && exist ? null : dispatch(userPageSyncActions.loadUserActions(login))
}

export const loadStarred = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `users/${login}/starred`,
    pageCount = 0
  } = getState().getIn('pagination', 'starredByUser')[login] || {}

  return pageCount > 0 && !nextPage ? null : dispatch(userPageSyncActions.loadStarredActions(login, nextPageUrl))
}