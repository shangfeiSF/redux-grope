import polyfill from '../polyfill'

import {connect} from 'react-redux'
import {resetErrorMessage} from '../actions/syncActions'

import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  let pathname = polyfill.replace(ownProps.location.pathname.substring(1))

  return {
    inputValue: pathname,
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)