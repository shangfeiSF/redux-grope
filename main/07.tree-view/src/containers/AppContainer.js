import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as actions from '../actions/index'

import  App from '../components/App'

function mapStateToProps(state) {
  return {
    ...state[state.rootId],
    tree: state
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
