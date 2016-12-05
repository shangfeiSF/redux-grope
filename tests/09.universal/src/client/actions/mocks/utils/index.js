import * as ActionTypes from '../../../../../../../main/09.universal/src/client/constants/ActionTypes'

export const mocks = {
  _fetch: url => {
    return {
      type: ActionTypes.INCREASE,
    }
  }
}