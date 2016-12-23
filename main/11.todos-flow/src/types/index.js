// @flow

import {ADD, TOGGLE, FILTER} from '../constants/ActionTypes'
import {ALL, ACTIVE, COMPLETED} from '../constants/FilterTypes'

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

export type Filter = ALL | ACTIVE | COMPLETED

export type State = {
  todos: Todos,
  filter: Filter
}

export type Action = {
  type: ADD,
  id: Id,
  text: Text
} | {
  type: TOGGLE,
  id: Id
} | {
  type: FILTER,
  filter: Filter
}

export type Store = ReduxStore<State, Action>

export type Dispatch = ReduxDispatch<Action>