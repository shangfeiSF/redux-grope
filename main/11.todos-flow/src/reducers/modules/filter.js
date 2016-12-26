// @flow

import type {Filter, Action} from '../../types'

import * as FilterTypes from '../../constants/FilterTypes'
import * as ActionTypes from '../../constants/ActionTypes'

export default (state: Filter = 'ALL', action: Action): Filter => {
  switch (action.type) {
    case 'FILTER':
      return action.filter

    default:
      return state
  }
}