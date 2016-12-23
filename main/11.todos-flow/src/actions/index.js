// @flow

// how to import and export types:
// https://flowtype.org/docs/syntax.html#importing-and-exporting-types
// It's possible to export types defined in one file for use in another.
// `import type` and `export type` are entirely erased at compile time and have no runtime presence.

import  * as ActionTypes from '../constants/ActionTypes'

import type {Id, Text, VisibilityFilter, Action} from '../types'

let nextTodoId: Id = 0

export const addTodo = (text: Text): Action => ({
  type: ActionTypes.ADD_TODO,
  id: nextTodoId++,
  text
})

export const toggleTodo = (id: Id): Action => ({
  type: ActionTypes.TOGGLE_TODO,
  id
})

export const setVisibilityFilter = (filter: VisibilityFilter): Action => ({
  type: ActionTypes.SET_VISIBILITY_FILTER,
  filter
})