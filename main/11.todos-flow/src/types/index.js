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

export type Filter = FilterTypes.ALL | FilterTypes.ACTIVE | FilterTypes.COMPLETED

export type State = {
  todos: Todos,
  filter: Filter
}

export type Action = {
  type: ActionTypes.ADD,
  id: Id,
  text: Text
} | {
  type: ActionTypes.TOGGLE,
  id: Id
} | {
  type: ActionTypes.FILTER,
  filter: Filter
}

export type Store = ReduxStore<State, Action>

export type Dispatch = ReduxDispatch<Action>