import reducers from '../../../../main/07.tree-view/src/reducers/index'
import * as actions from '../../../../main/07.tree-view/src/actions/index'

describe('reducers', () => {
  it('should provide the initial state', () => {
    let receivedValue = reducers(undefined, {})

    let expectedValue = {}

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `GENERATE_TREE` action', () => {
    let configOverrides = {
      rootId: 10,
      total: 20,
      dilution: 5,
      limit: 30,
      threshold: 99
    }
    const prevState = {
      length: 0,
      rootId: 0,
      threshold: 20
    }

    const action = actions.generateTree(configOverrides)

    let receivedValue = reducers(prevState, action)

    let expectedValue = {
      ...action.tree
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `REBUILD_TREE` action', () => {
    let rootId = 99
    const prevState = {
      length: 2,
      rootId: rootId,
      threshold: 99,
      99: {
        id: 99,
        counter: 1,
        childIds: [100]
      },
      100: {
        id: 100,
        counter: 2,
        childIds: []
      }
    }

    const action = actions.rebuildTree(rootId)

    let receivedValue = reducers(prevState, action)

    const expectedValue = {
      length: 2,
      rootId: 0,
      threshold: 99,
      0: {
        id: 0,
        counter: 1,
        childIds: [1]
      },
      1: {
        id: 1,
        counter: 2,
        childIds: []
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `DELETE_NODE` action without autoRebuild', () => {
    let rootId = 10
    let deleteId = 11
    const prevState = {
      length: 3,
      rootId: rootId,
      threshold: 99,
      10: {
        id: 10,
        counter: 1,
        childIds: [11]
      },
      11: {
        id: 11,
        counter: 2,
        childIds: [12]
      },
      12: {
        id: 12,
        counter: 3,
        childIds: []
      }
    }

    const action = actions.deleteNode(deleteId)

    let receivedValue = reducers(prevState, action)

    const expectedValue = {
      length: 1,
      rootId: rootId,
      threshold: 99,
      10: {
        id: 10,
        counter: 1,
        childIds: [11]
        // actions.deleteNode just delete the node and its childNodes,
        // but not remove itself form the childIds of its parentNode
        // actions.removeChild need to be called when delete some node in view
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `DELETE_NODE` action with autoRebuild', () => {
    let rootId = 100
    let deleteId = 101
    const prevState = {
      length: 3,
      rootId: rootId,
      threshold: 99,
      100: {
        id: 100,
        counter: 1,
        childIds: [101]
      },
      101: {
        id: 101,
        counter: 2,
        childIds: [102]
      },
      102: {
        id: 102,
        counter: 3,
        childIds: []
      }
    }

    const action = actions.deleteNode(deleteId)

    let receivedValue = reducers(prevState, action)

    const expectedValue = {
      length: 1,
      rootId: 0,
      threshold: 99,
      0: {
        id: 0,
        counter: 1,
        childIds: [undefined]
        // actions.deleteNode just delete the node and its childNodes,
        // but not remove itself form the childIds of its parentNode
        // actions.removeChild need to be called when delete some node in view
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `ADD_CHILD` action without autoRebuild', () => {
    let rootId = 10
    let parentId = 11
    let addId = 13
    const prevState = {
      length: 3,
      rootId: rootId,
      threshold: 99,
      10: {
        id: 10,
        counter: 1,
        childIds: [11]
      },
      11: {
        id: 11,
        counter: 2,
        childIds: [12]
      },
      12: {
        id: 12,
        counter: 3,
        childIds: []
      }
    }

    const action = actions.addChild(parentId, addId)

    let receivedValue = reducers(prevState, action)

    const expectedValue = {
      length: 3,
      // actions.addChild just add the node to its parend node
      // but not create itself and add the length of nodes
      // actions.createNode need to be called when add some node into the tree
      rootId: rootId,
      threshold: 99,
      10: {
        id: 10,
        counter: 1,
        childIds: [11]
      },
      11: {
        id: 11,
        counter: 2,
        childIds: [12, 13]
      },
      12: {
        id: 12,
        counter: 3,
        childIds: []
      },
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `ADD_CHILD` action with autoRebuild', () => {
    let rootId = 100
    let parentId = 101
    let addId = 103
    const prevState = {
      length: 3,
      rootId: rootId,
      threshold: 99,
      100: {
        id: 100,
        counter: 1,
        childIds: [101]
      },
      101: {
        id: 101,
        counter: 2,
        childIds: [102]
      },
      102: {
        id: 102,
        counter: 3,
        childIds: []
      }
    }

    const action = actions.addChild(parentId, addId)

    let receivedValue = reducers(prevState, action)

    const expectedValue = {
      length: 3,
      // actions.addChild just add the node to its parend node
      // but not create itself and add the length of nodes
      // actions.createNode need to be called when add some node into the tree
      rootId: 0,
      threshold: 99,
      0: {
        id: 0,
        counter: 1,
        childIds: [1]
      },
      1: {
        id: 1,
        counter: 2,
        childIds: [2, undefined]
      },
      2: {
        id: 2,
        counter: 3,
        childIds: []
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `INCREMENT` action', () => {
    let id = 11
    const prevState = {
      length: 3,
      rootId: 10,
      threshold: 99,
      10: {
        id: 10,
        counter: 1,
        childIds: [11]
      },
      11: {
        id: 11,
        counter: 2,
        childIds: [12]
      },
      12: {
        id: 12,
        counter: 3,
        childIds: []
      }
    }

    const action = actions.increment(id)

    let receivedValue = reducers(prevState, action)

    const expectedValue = {
      length: 3,
      rootId: 10,
      threshold: 99,
      10: {
        id: 10,
        counter: 1,
        childIds: [11]
      },
      11: {
        id: 11,
        counter: 3,
        childIds: [12]
      },
      12: {
        id: 12,
        counter: 3,
        childIds: []
      },
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `CREATE_NODE` action', () => {
    let maxId = 2
    const prevState = {
      length: 3,
      rootId: 0,
      threshold: 99,
      0: {
        id: 0,
        counter: 1,
        childIds: [1]
      },
      1: {
        id: 1,
        counter: 2,
        childIds: [2]
      },
      2: {
        id: 2,
        counter: 3,
        childIds: []
      }
    }

    const action = actions.createNode(maxId)

    let receivedValue = reducers(prevState, action)

    const expectedValue = {
      length: 4,
      rootId: 0,
      threshold: 99,
      0: {
        id: 0,
        counter: 1,
        childIds: [1]
      },
      1: {
        id: 1,
        counter: 2,
        childIds: [2]
      },
      2: {
        id: 2,
        counter: 3,
        childIds: []
      },
      3: {
        id: 3,
        counter: 0,
        childIds: []
      },
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle REMOVE_CHILD action', () => {
    let parentId = 11
    let removeId = 12
    const prevState = {
      length: 3,
      rootId: 10,
      threshold: 99,
      10: {
        id: 10,
        counter: 1,
        childIds: [11]
      },
      11: {
        id: 11,
        counter: 2,
        childIds: [12]
      },
      12: {
        id: 12,
        counter: 3,
        childIds: []
      }
    }

    const action = actions.removeChild(parentId, removeId)

    let receivedValue = reducers(prevState, action)

    const expectedValue = {
      length: 3,
      // actions.removeChild jsut remove the node from the childIds of its parend node
      // but not delete itself from the tree
      // actions.deleteNode need to be called when remove some node from the tree
      rootId: 10,
      threshold: 99,
      10: {
        id: 10,
        counter: 1,
        childIds: [11]
      },
      11: {
        id: 11,
        counter: 2,
        childIds: []
      },
      12: {
        id: 12,
        counter: 3,
        childIds: []
      },
    }

    expect(receivedValue).toEqual(expectedValue)
  })
})