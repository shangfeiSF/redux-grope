import polyfill from '../polyfill'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import App from '../components/App'

import {resetErrorMessage} from '../actions/errorActions'

const mapStateToProps = (state, ownProps) => {
  let _state = state.toJS()

  let pathname = polyfill.replace(ownProps.location.pathname.substring(1))

  return {
    inputValue: pathname,
    errorMessage: _state.errorMessage
  }
}

const mapDispatchToProps = dispatch => ({
  resetErrorMessage: bindActionCreators(resetErrorMessage, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)