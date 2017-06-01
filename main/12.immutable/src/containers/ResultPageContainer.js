import {connect} from 'react-redux'

import ResultPage from '../components/ResultPage'
import {getGithub} from '../actions/githubActions'

const mapStateToProps = (state, ownProps) => {
  let userId = ownProps.params.userId

  return {
    userId: userId.length ? userId : state.getIn(['github', 'userId']),
    data: state.getIn(['github', 'data'])
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmitUserId: userId => (
    dispatch(getGithub(userId))
  )
})

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps, {
    onSubmitUserId: () => (dispatchProps.onSubmitUserId(stateProps.userId))
  })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ResultPage)
