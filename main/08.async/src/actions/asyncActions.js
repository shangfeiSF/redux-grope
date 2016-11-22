import * as syncAcitons from './syncActions'

const REDDIT_PATH = 'https://www.reddit.com/r/'
const SUFFIX = '.json'

const UTILS = {
  _need: (state, theme) => {
    const posts = state.details[theme]

    if (!posts) {
      return true
    }

    if (posts.isFetching) {
      return false
    }

    return posts.refresh
  },

  // ES6 fetch based on Promise
  _fetch: theme => dispatch => {
    dispatch(syncAcitons.request(theme))

    return fetch(REDDIT_PATH + theme + SUFFIX)
      .then(response => response.json())
      .then(contexts => dispatch(syncAcitons.receive(theme, contexts)))
  }
}

export const fetchIfNeed = theme => (dispatch, getState) => {
  if (UTILS._need(getState(), theme)) {
    return dispatch(UTILS._fetch(theme))
  } else {
    return false
  }
}