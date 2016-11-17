import generateTree from '../../../../main/07.tree-view/src/utils/generateTree'

describe('generateTree', () => {
  it('generateTree should return a new tree by defaultConfig', () => {
    let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'length', 'rootId', 'threshold']

    let receivedValue = generateTree()

    expect(receivedValue.length).toEqual(10)
    expect(receivedValue.rootId).toEqual(0)
    expect(receivedValue.threshold).toEqual(10)

    expect(Object.keys(receivedValue)).toEqual(keys)
  })

  it('generateTree should return a new tree by configOverrides', () => {
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

    let receivedValue = generateTree(configOverrides)

    expect(receivedValue.length).toEqual(configOverrides.total)
    expect(receivedValue.rootId).toEqual(configOverrides.rootId)
    expect(receivedValue.threshold).toEqual(configOverrides.threshold)

    expect(Object.keys(receivedValue)).toEqual(keys)
  })
})