import  * as ActionTypes from '../../../../main/07.tree-view/src/constants/ActionTypes'
import * as actions from '../../../../main/07.tree-view/src/actions/index'

describe('ActionCreaters', () => {
  it('generateTree should create `GENERATE_TREE` action and return a new tree by defaultConfig', () => {
    let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'length', 'rootId', 'threshold']

    let receivedValue = actions.generateTree()

    expect(receivedValue.type).toEqual(ActionTypes.GENERATE_TREE)
    expect(receivedValue.id).toEqual(0)

    expect(receivedValue.tree.length).toEqual(10)
    expect(receivedValue.tree.rootId).toEqual(0)
    expect(receivedValue.tree.threshold).toEqual(10)

    expect(Object.keys(receivedValue.tree)).toEqual(keys)
  })

  it('generateTree should create `GENERATE_TREE` action and return a new tree by configOverrides', () => {
    let configOverrides = {
      rootId: 10,
      total: 20,
      dilution: 5,
      limit: 30,
      threshold: 99
    }
    let keys = (function (total, rootId) {
      let array = new Array()

      while (total--) {
        array.push((rootId++).toString())
      }

      return array.concat(['length', 'rootId', 'threshold'])
    })(configOverrides.total, configOverrides.rootId)

    let receivedValue = actions.generateTree(configOverrides)

    expect(receivedValue.type).toEqual(ActionTypes.GENERATE_TREE)
    expect(receivedValue.id).toEqual(configOverrides.rootId)

    expect(receivedValue.tree.length).toEqual(configOverrides.total)
    expect(receivedValue.tree.rootId).toEqual(configOverrides.rootId)
    expect(receivedValue.tree.threshold).toEqual(configOverrides.threshold)

    expect(Object.keys(receivedValue.tree)).toEqual(keys)
  })

  it('rebuildTree should create `REBUILD_TREE` action', () => {
    let rootId = 1
    let expectedValue = {
      type: ActionTypes.REBUILD_TREE,
      id: rootId
    }

    expect(actions.rebuildTree(rootId)).toEqual(expectedValue)
  })

  it('increment should create `INCREMENT` action', () => {
    let id = 10
    let expectedValue = {
      type: ActionTypes.INCREMENT,
      id: id
    }

    expect(actions.increment(id)).toEqual(expectedValue)
  })

  it('createNode should create `CREATE_NODE` action', () => {
    let maxId = 10
    let expectedValue = {
      type: ActionTypes.CREATE_NODE,
      id: maxId + 1
    }

    expect(actions.createNode(maxId)).toEqual(expectedValue)
  })

  it('deleteNode should create `DELETE_NODE` action', () => {
    let id = 10
    let expectedValue = {
      type: ActionTypes.DELETE_NODE,
      id: id
    }

    expect(actions.deleteNode(id)).toEqual(expectedValue)
  })

  it('addChild should create `ADD_CHILD` action', () => {
    let id = 10, childId = 12
    let expectedValue = {
      type: ActionTypes.ADD_CHILD,
      id: id,
      childId: childId
    }

    expect(actions.addChild(id, childId)).toEqual(expectedValue)
  })

  it('removeChild should create `REMOVE_CHILD` action', () => {
    let id = 10, childId = 12
    let expectedValue = {
      type: ActionTypes.REMOVE_CHILD,
      id: id,
      childId: childId
    }

    expect(actions.removeChild(id, childId)).toEqual(expectedValue)
  })
})