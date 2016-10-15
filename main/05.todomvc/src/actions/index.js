import * as ActionTypes from '../constants/ActionTypes'

export const addActionCreater = text => ({
  type: ActionTypes.ADD,
  text
})

export const deleteActionCreater = id => ({
  type: ActionTypes.DELETE,
  id
})

export const editActionCreater = (id, text) => ({
  type: ActionTypes.EDIT,
  id,
  text
})

export const completeActionCreater = id => ({
  type: ActionTypes.COMPLETE,
  id
})

export const completeAllActionCreater = () => ({
  type: ActionTypes.COMPLETE_ALL
})

export const clearCompletedActionCreater = () => ({
  type: ActionTypes.CLEAR_COMPLETED
})