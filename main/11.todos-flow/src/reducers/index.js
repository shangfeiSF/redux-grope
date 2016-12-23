// @flow

import type {State, Action} from '../types'

import todos from './modules/todos'
import filter from './modules/filter'

export default (state: ?State, action: Action): State => {
  const _state = state || {}

  return {
    todos: todos(_state.todos, action),
    filter: filter(_state.filter, action)
  }
}