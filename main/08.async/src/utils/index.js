import * as syncActions from '../actions/syncActions'

const REDDIT_PATH = 'https://www.reddit.com/r/'
const SUFFIX = '.json'

export const _need = (state, theme) => {
  const detail = state.details[theme]

  let need = false

  if (detail) {
    need = detail.isFetching ? false : detail.isRefresh
  } else {
    need = true
  }

  return need
}

export const _fetch = theme => dispatch => {
  dispatch(syncActions.request(theme))

  return fetch(REDDIT_PATH + theme + SUFFIX)
    .then(response => response.json())
    .then(json => dispatch(syncActions.receive(theme, json)))
}