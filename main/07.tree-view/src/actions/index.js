import * as ActionTypes from '../constants/ActionTypes'

export const increment = (id) => ({
  type: ActionTypes.INCREMENT,
  id
})

export const createNode = (sum) => ({
  type: ActionTypes.CREATE_NODE,
  id: sum
})

export const deleteNode = (id) => ({
  type: ActionTypes.DELETE_NODE,
  id
})

export const addChild = (id, childId) => ({
  type: ActionTypes.ADD_CHILD,
  id,
  childId
})

export const removeChild = (id, childId) => ({
  type: ActionTypes.REMOVE_CHILD,
  id,
  childId
})