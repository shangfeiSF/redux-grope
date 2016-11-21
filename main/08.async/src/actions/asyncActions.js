import * as syncAcitons from './syncActions'

const fetchHeplers = {
  fetchPosts: reddit => dispatch => {
    dispatch(syncAcitons.requestPosts(reddit))
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(syncAcitons.receivePosts(reddit, json)))
  },

  shouldFetchPosts: (state, reddit) => {
    const posts = state.postsByReddit[reddit]
    if (!posts) {
      return true
    }
    if (posts.isFetching) {
      return false
    }
    return posts.didInvalidate
  }
}

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
  if (fetchHeplers.shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchHeplers.fetchPosts(reddit))
  }
}