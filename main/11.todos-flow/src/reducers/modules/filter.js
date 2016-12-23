// @flow

import type {Filter, Action} from '../types'

import {ALL} from '../../constants/FilterTypes'
import {FILTER} from '../../constants/ActionTypes'

export default (state: Filter = ALL, action: Action): Filter => {
  switch (action.type) {
    case FILTER:
      return action.filter

    default:
      return state
  }
}