import * as ActionTypes from '../constants/ActionTypes'

export const select = theme => ({
  type: ActionTypes.SELECT,
  theme
})

export const request = theme => ({
  type: ActionTypes.REQUEST,
  theme
})

export const receive = (theme, contexts) => ({
  type: ActionTypes.RECEIVE,
  theme,
  contexts: contexts.data.children.map(child => child.data),
  lastUpdated: new Date().toJSON()
})

export const refresh = theme => ({
  type: ActionTypes.REFRESH,
  theme
})