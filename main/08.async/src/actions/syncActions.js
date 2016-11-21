import * as ActionTypes from '../constants/ActionTypes'

export const selectReddit = reddit => ({
  type: ActionTypes.SELECT_REDDIT,
  reddit
})

export const invalidateReddit = reddit => ({
  type: ActionTypes.INVALIDATE_REDDIT,
  reddit
})

export const requestPosts = reddit => ({
  type: ActionTypes.REQUEST_POSTS,
  reddit
})

export const receivePosts = (reddit, json) => ({
  type: ActionTypes.RECEIVE_POSTS,
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})