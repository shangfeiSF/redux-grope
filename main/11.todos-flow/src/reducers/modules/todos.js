// @flow

import type {Id, Text, Todo, Todos, Action} from '../../types'

import {ADD, TOGGLE} from '../../constants/ActionTypes'

const _add = (id: Id, text: Text): Todo => ({
  id,
  text,
  completed: false
})

const _toggle = (todos: Todos, id: Id): Todos => todos.map(todo => {
  return todo.id !== id ? todo : {
    ...todo,
    completed: !todo.completed
  }
})

export default (state: Todos = [], action: Action): Todos => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        _add(action.id, action.text)
      ]

    case TOGGLE:
      return _toggle(state, action.id)

    default:
      return state
  }
}