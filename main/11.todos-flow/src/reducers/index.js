// @flow

import type {State, Action} from '../types'

import items from './modules/items'
import filter from './modules/filter'

export default (state: ?State, action: Action): State => {
  const _state = state || {}

  return {
    items: items(_state.items, action),
    filter: filter(_state.filter, action)
  }
}