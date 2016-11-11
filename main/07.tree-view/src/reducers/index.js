import * as actions from '../constants/ActionTypes'

const update = {
  node: (nodeState, action) => {
    switch (action.type) {
      case actions.INCREMENT:
        return {
          ...nodeState,
          counter: nodeState.counter + 1
        }

      case actions.CREATE_NODE:
        return {
          id: action.id,
          counter: 0,
          childIds: []
        }

      case actions.ADD_CHILD:
      case actions.REMOVE_CHILD:
        return {
          ...nodeState,
          childIds: update.childIds(nodeState.childIds, action)
        }

      default:
        return nodeState
    }
  },

  childIds: (childIdsState, action) => {
    switch (action.type) {
      case actions.ADD_CHILD:
        return [...childIdsState, action.childId]

      case actions.REMOVE_CHILD:
        return childIdsState.filter(id => id !== action.childId)

      default:
        return childIdsState
    }
  }
}

const remove = {
  descendantIds: (state, id) => (
    state[id].childIds.reduce((collection, childId) => (
      [...collection, childId, ...remove.descendantIds(state, childId)]
    ), [])
  ),

  nodes: (state, ids) => {
    state = {...state}
    ids.forEach(id => delete state[id])
    return {
      ...state,
      length: state.length - ids.length
    }
  }
}

export default (state = {}, action) => {
  const {id} = action

  if (id === undefined) {
    return state
  }

  if (action.type === actions.DELETE_NODE) {
    let removedIds = [id, ...remove.descendantIds(state, id)]

    return remove.nodes(state, removedIds)
  }

  return {
    ...state,
    length: action.type === actions.CREATE_NODE ? state.length + 1 : state.length,
    [id]: update.node(state[id], action)
  }
}