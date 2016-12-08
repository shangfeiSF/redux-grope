import * as repoPageSyncActions from './repoPageSyncActions'

export const loadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
  const repo = getState().entities.repos[fullName]

  const exist = requiredFields.every(key => repo && repo.hasOwnProperty(key))

  return repo && exist ? null : dispatch(repoPageSyncActions.loadRepoActions(fullName))
}

export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `repos/${fullName}/stargazers`,
    pageCount = 0
  } = getState().pagination.stargazersByRepo[fullName] || {}

  return pageCount > 0 && !nextPage ? null : dispatch(repoPageSyncActions.loadStargazersActions(fullName, nextPageUrl))
}