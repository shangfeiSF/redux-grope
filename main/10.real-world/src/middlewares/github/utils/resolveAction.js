import actionSpec from '../sybmols/actionSpec'

export default (action, extraData) => {
  let merged = Object.assign({}, action, extraData)

  delete merged[actionSpec]

  return merged
}