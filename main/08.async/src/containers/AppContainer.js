import {connect} from 'react-redux'

import  App from '../components/App'

const mapStateToProps = state => {
  const {selected, details} = state

  const {contexts, lastUpdated, isFetching, refresh} = details[selected] || {
    contexts: [],
    lastUpdated: '',
    isFetching: true,
    refresh: false
  }

  return {
    selected,
    contexts,
    lastUpdated,
    isFetching,
    refresh
  }
}

export default connect(mapStateToProps)(App)