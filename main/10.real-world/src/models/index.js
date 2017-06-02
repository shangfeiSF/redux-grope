import Immutable from 'immutable'
import {LOCATION_BEFORE_TRANSITIONS} from '../constants/RouterRedux'

export const entitiesInitialState = Immutable.fromJS({
  users: {},
  repos: {}
})

export const errorMessageInitialState = Immutable.fromJS({
  spec: null
})

export const starredByUserInitialState = Immutable.fromJS({})

export const stargazersByRepoInitialState = Immutable.fromJS({})

export const routingInitialState = Immutable.fromJS({
  [LOCATION_BEFORE_TRANSITIONS]: null
})