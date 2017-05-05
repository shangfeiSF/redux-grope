import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

export default (store) => {
  return syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
      return state.get('routing').toJS()
    }
  })
}