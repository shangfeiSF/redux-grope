import * as ActionTypes from '../constants/ActionTypes'

export const set = (value) => ({
  type: ActionTypes.SET,
  payload: value
})

export const increase = () => ({
  type: ActionTypes.INCREASE
})

export const decrease = () => ({
  type: ActionTypes.DECREASE
})