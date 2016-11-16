import * as actions from '../constants/ActionTypes'

const autoRebuild = (state) => {
  let sortedKeys = Object.keys(state)
    .filter(key => {
      return parseInt(key) == parseInt(key)
    })
    .sort((a, b) => {
      return parseInt(a) - parseInt(b)
    })

  let maxId = parseInt(sortedKeys.pop())

  if (maxId > 20) {
    return update.tree(state)
  } else {
    return state
  }
}

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
  },

  tree: (state) => {
    let sortedKeys = Object.keys(state)
      .filter(key => {
        return parseInt(key) == parseInt(key)
      })
      .sort((a, b) => {
        return parseInt(a) - parseInt(b)
      })

    let MAP = {}
    let rootId = 0
    let newState = {
      rootId: rootId,
      length: sortedKeys.length
    }
    sortedKeys.forEach(key => {
      MAP[key] = rootId++
    })

    sortedKeys.forEach((key) => {
      let newChildIds = state[key].childIds.length ? state[key].childIds.map(id => MAP[id]) : []

      newState[MAP[key]] = {
        id: MAP[key],
        counter: state[key].counter,
        childIds: newChildIds
      }
    })

    return newState
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

  if (action.type === actions.GENERATE_TREE) {
    return {
      ...action.tree
    }
  }

  if (action.type === actions.REBUILD_TREE) {
    return update.tree(state)
  }

  if (action.type === actions.DELETE_NODE) {
    let removedIds = [id, ...remove.descendantIds(state, id)]
    return autoRebuild(remove.nodes(state, removedIds))
  }

  return autoRebuild({
    ...state,
    length: action.type === actions.CREATE_NODE ? state.length + 1 : state.length,
    [id]: update.node(state[id], action)
  })
}