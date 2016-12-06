import {connect} from 'react-redux'
import {resetErrorMessage} from '../actions'

import App from '../components/App'

const mapStateToProps = (state, ownProps) => ({
  inputValue: ownProps.location.pathname.substring(1),
  errorMessage: state.errorMessage
})

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)