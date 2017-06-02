import {entitiesInitialState} from '../../models'

import {Map} from 'Immutable'

const entities = (state = entitiesInitialState, action) => {
  if (action.response && action.response.entities) {
    return state.mergeDeep(action.response.entities)
  } else {
    return state
  }
}

export default entities