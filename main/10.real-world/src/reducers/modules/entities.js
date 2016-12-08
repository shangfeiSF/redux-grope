import merge from 'lodash/merge'

const initial = {
  users: {},
  repos: {}
}

const entities = (state = initial, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

export default entities