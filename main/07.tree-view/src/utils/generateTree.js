export default function generateTree(configOverrides) {
  let config = Object.assign({
    rootId: 0,
    total: 10,
    dilution: 2,
    limit: 10,
    threshold: 10
  }, configOverrides)

  let tree = {
    length: config.total,
    rootId: config.rootId,
    threshold: config.threshold,
    [config.rootId]: {
      id: config.rootId,
      counter: 0,
      childIds: []
    }
  }

  for (let index = 1; index < config.total; index++) {
    let id = config.rootId + index

    tree[id] = {
      id: id,
      counter: Math.floor(Math.random() * config.limit),
      childIds: []
    }

    let parentId = Math.floor(config.rootId + Math.pow(Math.random(), config.dilution) * index)

    tree[parentId].childIds.push(id)
  }

  return tree
}