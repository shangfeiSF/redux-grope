export default function generateTree(configOverrides) {
  let config = Object.assign({
    total: 10,
    dilution: 2,
    limit: 10
  }, configOverrides)

  let tree = {
    length: config.total,
    0: {
      id: 0,
      counter: 0,
      childIds: []
    }
  }

  for (let index = 1; index < config.total; index++) {
    tree[index] = {
      id: index,
      counter: Math.floor(Math.random() * config.limit),
      childIds: []
    }

    let parentId = Math.floor(Math.pow(Math.random(), config.dilution) * index)

    tree[parentId].childIds.push(index)
  }

  return tree
}