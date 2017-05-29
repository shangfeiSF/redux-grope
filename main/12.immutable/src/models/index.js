import Immutable from 'immutable'
import {LOCATION_BEFORE_TRANSITIONS} from '../constants/RouterRedux'

export const uiInitialState = Immutable.fromJS({
  spinnerVisible: false
})

export const githubInitialState = Immutable.fromJS({
  userId: '',
  data: {}
})

export const routingInitialState = Immutable.fromJS({
  [LOCATION_BEFORE_TRANSITIONS]: null
})
