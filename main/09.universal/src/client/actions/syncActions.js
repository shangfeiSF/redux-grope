import * as ActionTypes from '../constants/ActionTypes'

export const set = (payload) => ({
  type: ActionTypes.SET,
  payload
})

export const increase = () => ({
  type: ActionTypes.INCREASE
})

export const decrease = () => ({
  type: ActionTypes.DECREASE
})