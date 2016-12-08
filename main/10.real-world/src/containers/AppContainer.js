import polyfill from '../polyfill'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import App from '../components/App'

import {resetErrorMessage} from '../actions/errorActions'

const mapStateToProps = (state, ownProps) => {
  let pathname = polyfill.replace(ownProps.location.pathname.substring(1))

  return {
    inputValue: pathname,
    errorMessage: state.errorMessage
  }
}

const mapDispatchToProps = dispatch => ({
  resetErrorMessage: bindActionCreators(resetErrorMessage, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)