import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as asyncActions from '../actions/asyncActions'
import * as syncActions from '../actions/syncActions'

import  App from '../components/App'

const mapStateToProps = state => {
  const {details, selected, themes} = state

  const {contexts, lastUpdated, isFetching, isRefresh} = details[selected] || {
    contexts: [],
    lastUpdated: '',
    isFetching: true,
    isRefresh: false
  }

  return {
    themes,
    selected,

    contexts,
    lastUpdated,
    isFetching,
    isRefresh
  }
}

const mapDispatchToProps = dispatch => ({
  asyncActions: bindActionCreators(asyncActions, dispatch),

  syncActions: bindActionCreators(syncActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)