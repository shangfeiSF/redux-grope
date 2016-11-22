import * as syncAcitons from './syncActions'

const REDDIT_PATH = 'https://www.reddit.com/r/'
const SUFFIX = '.json'

const UTILS = {
  _need: (state, theme) => {
    const detail = state.details[theme]

    let need = false

    if (detail) {
      need = detail.isFetching ? false : detail.refresh
    } else {
      need = true
    }

    return need
  },

  // ES6 fetch based on Promise
  _fetch: theme => dispatch => {
    dispatch(syncAcitons.request(theme))

    return fetch(REDDIT_PATH + theme + SUFFIX)
      .then(response => response.json())
      .then(json => dispatch(syncAcitons.receive(theme, json)))
  }
}

export const fetchIfNeed = theme => (dispatch, getState) => {
  if (UTILS._need(getState(), theme)) {
    return dispatch(UTILS._fetch(theme))
  } else {
    return false
  }
}