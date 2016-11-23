import * as ActionTypes from '../constants/ActionTypes'

export const select = theme => ({
  type: ActionTypes.SELECT,
  theme
})

export const add = theme => ({
  type: ActionTypes.ADD,
  theme
})

export const request = theme => ({
  type: ActionTypes.REQUEST,
  theme
})

export const receive = (theme, json) => ({
  type: ActionTypes.RECEIVE,
  theme,
  contexts: json.data.children.map(child => child.data).sort((prev, next) => Math.random() > 0.5 ? 1 : -1),
  lastUpdated: new Date().toJSON()
})

export const refresh = theme => ({
  type: ActionTypes.REFRESH,
  theme
})