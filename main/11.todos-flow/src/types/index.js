// @flow

// http://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html
import type {Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux'

export type Id = number

export type Text = string

export type Event = {
  preventDefault: () => void
}

export type Item = {
  id: Id,
  text: Text,
  completed: boolean
}

export type Items = Array<Item>

export type Filter = 'ALL' | 'ACTIVE' | 'COMPLETED'

export type State = {
  items: Items,
  filter: Filter
}

export type Action = {
  type: 'ADD',
  id: Id,
  text: Text
} | {
  type: 'TOGGLE',
  id: Id
} | {
  type: 'FILTER',
  filter: Filter
}

export type Store = ReduxStore<State, Action>

export type Dispatch = ReduxDispatch<Action>