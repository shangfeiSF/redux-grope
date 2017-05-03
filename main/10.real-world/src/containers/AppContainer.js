import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import App from '../components/App'

import {resetErrorMessage} from '../actions/errorActions'

const mapStateToProps = (state, ownProps) => {
  let _state = state.toJS()

  let inputValue = ''

  if (ownProps.params.login) {
    inputValue += ownProps.params.login
    if (ownProps.params.name) {
      inputValue += '/' + ownProps.params.name
    }
  }

  return {
    inputValue: inputValue,
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