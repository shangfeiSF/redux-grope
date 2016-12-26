// @flow

import type {Filter, Action} from '../../types'

export default (state: Filter = 'ALL', action: Action): Filter => {
  switch (action.type) {
    case 'FILTER':
      return action.filter

    default:
      return state
  }
}