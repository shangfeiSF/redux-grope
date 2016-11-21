import {combineReducers} from 'redux'

import * as ActionTypes from '../constants/ActionTypes'

const selectedReddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case ActionTypes.SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case ActionTypes.INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case ActionTypes.REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case ActionTypes.RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByReddit = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.INVALIDATE_REDDIT:
    case ActionTypes.RECEIVE_POSTS:
    case ActionTypes.REQUEST_POSTS:
      return {
        ...state,
        [action.reddit]: posts(state[action.reddit], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit
})

export default rootReducer
