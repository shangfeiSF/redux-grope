// @flow

import type {Id, Text, Item, Items, Action} from '../../types'

const _add = (id: Id, text: Text): Item => ({
  id,
  text,
  completed: false
})

const _toggle = (items: Items, id: Id): Items => items.map(item => {
  return item.id !== id ? item : {
      ...item,
      completed: !item.completed
    }
})

export default (state: Items = [], action: Action): Items => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        _add(action.id, action.text)
      ]

    case 'TOGGLE':
      return _toggle(state, action.id)

    default:
      return state
  }
}