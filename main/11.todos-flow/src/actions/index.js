// @flow

// how to import and export types:
// https://flowtype.org/docs/syntax.html#importing-and-exporting-types
// It's possible to export types defined in one file for use in another.
// `import type` and `export type` are entirely erased at compile time and have no runtime presence.

import * as ActionTypes from '../constants/ActionTypes'

import type {Id, Text, Filter, Action} from '../types'

let id: Id = 0

export const add = (text: Text): Action => ({
  type: ActionTypes.ADD,
  id: id++,
  text
})

export const toggle = (id: Id): Action => ({
  type: ActionTypes.TOGGLE,
  id
})

export const filter = (filter: Filter): Action => ({
  type: ActionTypes.FILTER,
  filter
})