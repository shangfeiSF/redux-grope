// @flow

import * as ActionTypes from '../constants/ActionTypes'
import * as FilterTypes from '../constants/FilterTypes'

// http://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html
import type {Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux'

export type Id = number

export type Text = string

export type Todo = {
  id: Id,
  text: Text,
  completed: boolean
}

export type Todos = Array<Todo>

export type VisibilityFilter = FilterTypes.SHOW_ALL |
  FilterTypes.SHOW_ACTIVE |
  FilterTypes.SHOW_COMPLETED

export type State = {
  todos: Todos,
  visibilityFilter: VisibilityFilter
}

export type Action = {
  type: ActionTypes.ADD_TODO,
  id: Id,
  text: Text
} | {
  type: ActionTypes.TOGGLE_TODO,
  id: Id
} | {
  type: ActionTypes.SET_VISIBILITY_FILTER,
  filter: VisibilityFilter
}

export type Store = ReduxStore<State, Action>

export type Dispatch = ReduxDispatch<Action>