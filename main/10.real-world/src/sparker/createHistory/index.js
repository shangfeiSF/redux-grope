import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {ROUTING} from '../../constants/RouterRedux'

export default (store) => {
  return syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
      return state.get(ROUTING).toJS()
    }
  })
}