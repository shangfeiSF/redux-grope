import merge from 'lodash/merge'
import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'

import paginate from './modules/paginate'
import * as ActionTypes from '../constants/ActionTypes'

const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ]
  }),

  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ]
  })
})

const entities = (state = {users: {}, repos: {}}, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

const errorMessage = (state = null, action) => {
  const {type, error} = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  }
  else if (error) {
    return action.error
  }

  return state
}

export default combineReducers({
  routing,
  pagination,
  entities,
  errorMessage
})