import {entitiesInitialState} from '../../models'

const entities = (state = entitiesInitialState, action) => {
  if (action.response && action.response.entities) {
    return state.mergeDeep(action.response.entities)
  } else {
    return state
  }
}

export default entities